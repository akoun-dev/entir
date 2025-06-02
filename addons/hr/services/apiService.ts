import axios, { AxiosInstance, AxiosRequestConfig, AxiosResponse } from 'axios';

/**
 * Interface pour les options de configuration de l'API
 */
interface ApiServiceConfig {
  baseUrl: string;
  token?: string;
  timeout?: number;
  headers?: Record<string, string>;
}

/**
 * Service pour gérer les appels API
 * 
 * Ce service fournit une interface pour effectuer des requêtes HTTP
 * vers une API backend, avec gestion de la configuration, de l'authentification
 * et des erreurs.
 */
class ApiService {
  private axiosInstance: AxiosInstance;
  private config: ApiServiceConfig = {
    baseUrl: '/api',
    timeout: 15000, // 15 secondes par défaut
  };

  constructor() {
    this.axiosInstance = axios.create({
      baseURL: this.config.baseUrl,
      timeout: this.config.timeout,
    });

    // Intercepteur pour ajouter le token d'authentification
    this.axiosInstance.interceptors.request.use(
      (config) => {
        if (this.config.token) {
          config.headers.Authorization = `Bearer ${this.config.token}`;
        }
        return config;
      },
      (error) => Promise.reject(error)
    );

    // Intercepteur pour gérer les erreurs de réponse
    this.axiosInstance.interceptors.response.use(
      (response) => response,
      (error) => {
        // Gérer les erreurs spécifiques ici
        if (error.response) {
          // La requête a été faite et le serveur a répondu avec un code d'erreur
          console.error('API Error Response:', {
            status: error.response.status,
            data: error.response.data,
            headers: error.response.headers,
          });
        } else if (error.request) {
          // La requête a été faite mais aucune réponse n'a été reçue
          console.error('API No Response:', error.request);
        } else {
          // Une erreur s'est produite lors de la configuration de la requête
          console.error('API Request Error:', error.message);
        }
        
        return Promise.reject(error);
      }
    );
  }

  /**
   * Initialise le service API avec la configuration fournie
   * @param config Configuration de l'API
   */
  initialize(config: ApiServiceConfig): void {
    this.config = { ...this.config, ...config };
    
    // Recréer l'instance Axios avec la nouvelle configuration
    this.axiosInstance = axios.create({
      baseURL: this.config.baseUrl,
      timeout: this.config.timeout,
      headers: {
        'Content-Type': 'application/json',
        ...this.config.headers,
      },
    });
    
    // Réappliquer les intercepteurs
    this.axiosInstance.interceptors.request.use(
      (config) => {
        if (this.config.token) {
          config.headers.Authorization = `Bearer ${this.config.token}`;
        }
        return config;
      },
      (error) => Promise.reject(error)
    );
    
    this.axiosInstance.interceptors.response.use(
      (response) => response,
      (error) => {
        if (error.response) {
          console.error('API Error Response:', {
            status: error.response.status,
            data: error.response.data,
          });
        } else if (error.request) {
          console.error('API No Response:', error.request);
        } else {
          console.error('API Request Error:', error.message);
        }
        
        return Promise.reject(error);
      }
    );
    
    console.log('API Service initialized with config:', {
      baseURL: this.config.baseUrl,
      timeout: this.config.timeout,
      hasToken: !!this.config.token,
    });
  }

  /**
   * Effectue une requête GET
   * @param url URL de la requête
   * @param config Configuration de la requête
   * @returns Réponse de la requête
   */
  async get<T = any>(url: string, config?: AxiosRequestConfig): Promise<AxiosResponse<T>> {
    return this.axiosInstance.get<T>(url, config);
  }

  /**
   * Effectue une requête POST
   * @param url URL de la requête
   * @param data Données à envoyer
   * @param config Configuration de la requête
   * @returns Réponse de la requête
   */
  async post<T = any>(url: string, data?: any, config?: AxiosRequestConfig): Promise<AxiosResponse<T>> {
    return this.axiosInstance.post<T>(url, data, config);
  }

  /**
   * Effectue une requête PUT
   * @param url URL de la requête
   * @param data Données à envoyer
   * @param config Configuration de la requête
   * @returns Réponse de la requête
   */
  async put<T = any>(url: string, data?: any, config?: AxiosRequestConfig): Promise<AxiosResponse<T>> {
    return this.axiosInstance.put<T>(url, data, config);
  }

  /**
   * Effectue une requête PATCH
   * @param url URL de la requête
   * @param data Données à envoyer
   * @param config Configuration de la requête
   * @returns Réponse de la requête
   */
  async patch<T = any>(url: string, data?: any, config?: AxiosRequestConfig): Promise<AxiosResponse<T>> {
    return this.axiosInstance.patch<T>(url, data, config);
  }

  /**
   * Effectue une requête DELETE
   * @param url URL de la requête
   * @param config Configuration de la requête
   * @returns Réponse de la requête
   */
  async delete<T = any>(url: string, config?: AxiosRequestConfig): Promise<AxiosResponse<T>> {
    return this.axiosInstance.delete<T>(url, config);
  }

  /**
   * Teste la connexion à l'API
   * @returns true si la connexion est établie, false sinon
   */
  async testConnection(): Promise<boolean> {
    try {
      // Effectuer une requête simple pour tester la connexion
      await this.axiosInstance.get('/health');
      return true;
    } catch (error) {
      console.error('API connection test failed:', error);
      return false;
    }
  }

  /**
   * Récupère la configuration actuelle
   * @returns Configuration actuelle
   */
  getConfig(): ApiServiceConfig {
    return { ...this.config };
  }
}

// Exporter une instance unique du service
export default new ApiService();
