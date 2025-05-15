
import axios from 'axios';
import { toast } from 'sonner';

// Define custom interfaces to avoid importing from axios
interface CustomAxiosInstance {
  defaults: any;
  interceptors: any;
  get: any;
  post: any;
  put: any;
  patch: any;
  delete: any;
}

interface CustomAxiosRequestConfig {
  baseURL?: string;
  headers?: any;
  params?: any;
  timeout?: number;
  responseType?: string;
}

interface CustomAxiosResponse<T = any> {
  data: T;
  status: number;
  statusText: string;
  headers: any;
  config: CustomAxiosRequestConfig;
}

interface CustomAxiosError<T = any> {
  response?: CustomAxiosResponse<T>;
  request?: any;
  message: string;
  config: CustomAxiosRequestConfig;
  code?: string;
  isAxiosError: boolean;
}

/**
 * Service API pour la communication avec le backend
 * Gère les appels API, l'authentification et les erreurs
 */
export class ApiService {
  private static instance: ApiService;
  private client: any;
  private token: string | null = null;
  private baseUrl: string;
  private isInitialized: boolean = false;
  private offlineMode: boolean = false;
  private pendingRequests: Array<{
    method: string;
    url: string;
    data?: any;
    config?: CustomAxiosRequestConfig;
  }> = [];

  private constructor(baseUrl?: string) {
    // URL par défaut ou URL configurée
    this.baseUrl = baseUrl || '/api';
    
    this.client = axios.create({
      baseURL: this.baseUrl,
      headers: {
        'Content-Type': 'application/json',
      },
      timeout: 15000, // 15 secondes par défaut
    });

    // Intercepteurs pour la gestion des réponses
    this.setupInterceptors();
    
    // Vérification de l'état de la connexion
    this.checkOnlineStatus();
    window.addEventListener('online', this.handleOnline);
    window.addEventListener('offline', this.handleOffline);
  }

  /**
   * Récupère l'instance du service (Singleton)
   */
  public static getInstance(baseUrl?: string): ApiService {
    if (!ApiService.instance) {
      ApiService.instance = new ApiService(baseUrl);
    }
    return ApiService.instance;
  }

  /**
   * Initialise le service avec la configuration
   */
  public initialize(config: {
    baseUrl?: string;
    token?: string;
    timeout?: number;
  }): void {
    if (config.baseUrl) {
      this.baseUrl = config.baseUrl;
      this.client.defaults.baseURL = this.baseUrl;
    }
    
    if (config.token) {
      this.setAuthToken(config.token);
    }
    
    if (config.timeout) {
      this.client.defaults.timeout = config.timeout;
    }
    
    this.isInitialized = true;
    console.log('[API Service] Initialized with config:', { 
      baseUrl: this.baseUrl, 
      hasToken: !!this.token,
      timeout: this.client.defaults.timeout 
    });
  }

  /**
   * Configure le token d'authentification
   */
  public setAuthToken(token: string): void {
    this.token = token;
    this.client.defaults.headers.common['Authorization'] = `Bearer ${token}`;
  }

  /**
   * Supprime le token d'authentification
   */
  public clearAuthToken(): void {
    this.token = null;
    delete this.client.defaults.headers.common['Authorization'];
  }

  /**
   * Vérifie si le service est initialisé
   */
  public isServiceInitialized(): boolean {
    return this.isInitialized;
  }

  /**
   * GET - Récupération de données
   */
  public async get<T = any>(url: string, config?: CustomAxiosRequestConfig): Promise<T> {
    if (this.offlineMode) {
      this.queueRequest('get', url, undefined, config);
      throw new Error('Application en mode hors ligne. La requête sera exécutée lorsque la connexion sera rétablie.');
    }
    
    try {
      const response = await this.client.get(url, config);
      return response.data;
    } catch (error) {
      this.handleError(error);
      throw error;
    }
  }

  /**
   * POST - Création de données
   */
  public async post<T = any>(url: string, data?: any, config?: CustomAxiosRequestConfig): Promise<T> {
    if (this.offlineMode) {
      this.queueRequest('post', url, data, config);
      throw new Error('Application en mode hors ligne. La requête sera exécutée lorsque la connexion sera rétablie.');
    }
    
    try {
      const response = await this.client.post(url, data, config);
      return response.data;
    } catch (error) {
      this.handleError(error);
      throw error;
    }
  }

  /**
   * PUT - Mise à jour complète de données
   */
  public async put<T = any>(url: string, data?: any, config?: CustomAxiosRequestConfig): Promise<T> {
    if (this.offlineMode) {
      this.queueRequest('put', url, data, config);
      throw new Error('Application en mode hors ligne. La requête sera exécutée lorsque la connexion sera rétablie.');
    }
    
    try {
      const response = await this.client.put(url, data, config);
      return response.data;
    } catch (error) {
      this.handleError(error);
      throw error;
    }
  }

  /**
   * PATCH - Mise à jour partielle de données
   */
  public async patch<T = any>(url: string, data?: any, config?: CustomAxiosRequestConfig): Promise<T> {
    if (this.offlineMode) {
      this.queueRequest('patch', url, data, config);
      throw new Error('Application en mode hors ligne. La requête sera exécutée lorsque la connexion sera rétablie.');
    }
    
    try {
      const response = await this.client.patch(url, data, config);
      return response.data;
    } catch (error) {
      this.handleError(error);
      throw error;
    }
  }

  /**
   * DELETE - Suppression de données
   */
  public async delete<T = any>(url: string, config?: CustomAxiosRequestConfig): Promise<T> {
    if (this.offlineMode) {
      this.queueRequest('delete', url, undefined, config);
      throw new Error('Application en mode hors ligne. La requête sera exécutée lorsque la connexion sera rétablie.');
    }
    
    try {
      const response = await this.client.delete(url, config);
      return response.data;
    } catch (error) {
      this.handleError(error);
      throw error;
    }
  }

  /**
   * Configuration des intercepteurs de requêtes et réponses
   */
  private setupInterceptors(): void {
    // Intercepteur de requête
    this.client.interceptors.request.use(
      (config: any) => {
        // On peut ajouter des headers dynamiques ici
        return config;
      },
      (error: any) => {
        return Promise.reject(error);
      }
    );

    // Intercepteur de réponse
    this.client.interceptors.response.use(
      (response: any) => {
        return response;
      },
      (error: any) => {
        // Gestion centralisée des erreurs
        if (error.response) {
          // Erreur de réponse serveur (status code hors de la plage 2xx)
          const status = error.response.status;
          
          // Gestion spécifique selon le code d'erreur
          if (status === 401) {
            // Non autorisé - Token expiré ou invalide
            this.clearAuthToken();
            // Déclencher une action de déconnexion ou redirection vers login
            console.error('Session expirée. Veuillez vous reconnecter.');
            toast('Session expirée. Veuillez vous reconnecter.');
          } else if (status === 403) {
            // Interdit - Droits insuffisants
            console.error('Vous n\'avez pas les permissions nécessaires pour cette action.');
            toast('Accès refusé');
          } else if (status === 404) {
            // Ressource non trouvée
            console.error('La ressource demandée n\'existe pas.');
          } else if (status >= 500) {
            // Erreur serveur
            console.error('Une erreur serveur est survenue. Veuillez réessayer plus tard.');
            toast('Erreur serveur');
          }
        } else if (error.request) {
          // Pas de réponse reçue (problème réseau)
          console.error('Le serveur ne répond pas. Vérifiez votre connexion internet.');
          this.setOfflineMode(true);
          toast('Problème de connexion au serveur');
        } else {
          // Erreur pendant la configuration de la requête
          console.error('Erreur lors de la préparation de la requête:', error.message);
        }
        
        return Promise.reject(error);
      }
    );
  }

  /**
   * Gestion des erreurs
   */
  private handleError(error: any): void {
    if (this.isAxiosError(error)) {
      // Déjà géré par l'intercepteur de réponse
      return;
    }
    
    // Autres types d'erreurs
    console.error('Erreur API non gérée:', error);
    toast('Une erreur inattendue est survenue');
  }

  /**
   * Helper function to check if error is an AxiosError
   */
  private isAxiosError(error: any): boolean {
    return error && error.isAxiosError === true;
  }

  /**
   * Vérification de l'état de la connexion
   */
  private checkOnlineStatus(): void {
    this.setOfflineMode(!navigator.onLine);
  }

  /**
   * Gestion du retour en ligne
   */
  private handleOnline = (): void => {
    console.log('[API Service] Connexion rétablie');
    this.setOfflineMode(false);
    this.processPendingRequests();
  };

  /**
   * Gestion de la perte de connexion
   */
  private handleOffline = (): void => {
    console.log('[API Service] Connexion perdue');
    this.setOfflineMode(true);
  };

  /**
   * Définit le mode hors ligne
   */
  private setOfflineMode(offline: boolean): void {
    if (this.offlineMode !== offline) {
      this.offlineMode = offline;
      if (offline) {
        toast('Mode hors ligne activé. Les modifications seront synchronisées ultérieurement.');
      } else {
        toast('Connexion rétablie');
      }
    }
  }

  /**
   * Ajoute une requête à la file d'attente (mode hors ligne)
   */
  private queueRequest(
    method: string,
    url: string,
    data?: any,
    config?: CustomAxiosRequestConfig
  ): void {
    this.pendingRequests.push({ method, url, data, config });
    console.log(`[API Service] Requête ${method.toUpperCase()} vers ${url} mise en file d'attente`);
    
    // Enregistrement dans localStorage pour persistance
    this.savePendingRequestsToStorage();
  }

  /**
   * Traite les requêtes en attente (lorsque la connexion est rétablie)
   */
  private async processPendingRequests(): Promise<void> {
    if (this.pendingRequests.length === 0) return;
    
    toast(`Synchronisation de ${this.pendingRequests.length} requête(s) en attente...`);
    
    const requests = [...this.pendingRequests];
    this.pendingRequests = [];
    this.savePendingRequestsToStorage();
    
    let successCount = 0;
    let failureCount = 0;
    
    for (const request of requests) {
      try {
        const { method, url, data, config } = request;
        
        switch (method.toLowerCase()) {
          case 'get':
            await this.client.get(url, config);
            break;
          case 'post':
            await this.client.post(url, data, config);
            break;
          case 'put':
            await this.client.put(url, data, config);
            break;
          case 'patch':
            await this.client.patch(url, data, config);
            break;
          case 'delete':
            await this.client.delete(url, config);
            break;
        }
        
        successCount++;
      } catch (error) {
        console.error('[API Service] Échec de la requête en attente:', error);
        failureCount++;
        
        // Remettre en file d'attente en cas d'échec
        this.pendingRequests.push(request);
      }
    }
    
    if (failureCount > 0) {
      this.savePendingRequestsToStorage();
      toast(`Synchronisation partielle: ${successCount} succès, ${failureCount} échec(s)`);
    } else {
      toast('Synchronisation terminée avec succès');
    }
  }

  /**
   * Enregistre les requêtes en attente dans le localStorage
   */
  private savePendingRequestsToStorage(): void {
    try {
      localStorage.setItem('api_pending_requests', JSON.stringify(this.pendingRequests));
    } catch (error) {
      console.error('[API Service] Erreur lors de l\'enregistrement des requêtes en attente:', error);
    }
  }

  /**
   * Charge les requêtes en attente depuis le localStorage
   */
  public loadPendingRequestsFromStorage(): void {
    try {
      const storedRequests = localStorage.getItem('api_pending_requests');
      if (storedRequests) {
        this.pendingRequests = JSON.parse(storedRequests);
        console.log(`[API Service] ${this.pendingRequests.length} requête(s) chargée(s) depuis le stockage`);
      }
    } catch (error) {
      console.error('[API Service] Erreur lors du chargement des requêtes en attente:', error);
    }
  }

  /**
   * Nettoyage lors de la destruction du service
   */
  public cleanup(): void {
    window.removeEventListener('online', this.handleOnline);
    window.removeEventListener('offline', this.handleOffline);
  }
}

// Export de l'instance par défaut
export default ApiService.getInstance();
