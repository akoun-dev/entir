import axios from 'axios';
import { API_CONFIG } from '../config/api.config';

// Configuration de base d'axios avec les paramètres centralisés
const api = axios.create({
  baseURL: API_CONFIG.BASE_URL,
  headers: API_CONFIG.HEADERS,
  timeout: API_CONFIG.TIMEOUT,
});

// Intercepteur pour gérer les erreurs et les tentatives
api.interceptors.response.use(
  (response) => response,
  async (error) => {
    const originalRequest = error.config;

    // Si la requête a déjà été tentée le nombre maximum de fois, rejeter l'erreur
    if (
      originalRequest._retry >= API_CONFIG.ERROR_HANDLING.RETRY_COUNT
    ) {
      return Promise.reject(error);
    }

    // Si c'est une erreur réseau ou une erreur de timeout, tenter à nouveau
    if (
      (error.code === 'ECONNABORTED' || !error.response) &&
      !originalRequest._retry
    ) {
      originalRequest._retry = (originalRequest._retry || 0) + 1;

      // Attendre avant de réessayer
      await new Promise(resolve =>
        setTimeout(resolve, API_CONFIG.ERROR_HANDLING.RETRY_DELAY)
      );

      return api(originalRequest);
    }

    return Promise.reject(error);
  }
);

// Exporter api comme exportation nommée
export { api };

// Types pour les utilisateurs
export interface User {
  id: string;
  username: string;
  email: string;
  firstName?: string;
  lastName?: string;
  role: 'admin' | 'manager' | 'user';
  status: 'active' | 'inactive';
  lastLogin?: string;
  groups: string[];
}

// Types pour les groupes
export interface Group {
  id: string;
  name: string;
  description: string;
  permissions: string[];
  active: boolean;
  memberCount?: number;
}

// Types pour les paramètres
export interface Parameter {
  id: string;
  key: string;
  value: string;
  category: string;
  description?: string;
}

// Types pour les devises
export interface Currency {
  id: string;
  name: string;
  symbol: string;
  code: string;
  rate: number;
  position: 'before' | 'after';
  decimal_places: number;
  rounding: number;
  active: boolean;
}

// Types pour les pays
export interface Country {
  id: string;
  name: string;
  code: string;
  phone_code?: string;
  currency_code?: string;
  region?: string;
  active: boolean;
}

// Types pour les langues
export interface Language {
  id: string;
  name: string;
  code: string;
  native_name?: string;
  direction: 'ltr' | 'rtl';
  is_default: boolean;
  active: boolean;
}

// Types pour les formats de date
export interface DateFormat {
  id: string;
  name: string;
  format: string;
  description?: string;
  type: 'date' | 'time' | 'datetime';
  is_default: boolean;
  active: boolean;
}

// Service pour les utilisateurs
export const userService = {
  // Récupérer tous les utilisateurs
  async getAll(): Promise<User[]> {
    const response = await api.get('/users');
    return response.data;
  },

  // Récupérer un utilisateur par son ID
  async getById(id: string): Promise<User> {
    const response = await api.get(`/users/${id}`);
    return response.data;
  },

  // Créer un nouvel utilisateur
  async create(user: Omit<User, 'id'>): Promise<User> {
    const response = await api.post('/users', user);
    return response.data;
  },

  // Mettre à jour un utilisateur
  async update(id: string, user: Partial<User>): Promise<User> {
    const response = await api.put(`/users/${id}`, user);
    return response.data;
  },

  // Supprimer un utilisateur
  async delete(id: string): Promise<void> {
    await api.delete(`/users/${id}`);
  },

  // Activer/désactiver un utilisateur
  async toggleStatus(id: string, status: 'active' | 'inactive'): Promise<User> {
    const response = await api.patch(`/users/${id}/status`, { status });
    return response.data;
  }
};

// Service pour les groupes
export const groupService = {
  // Récupérer tous les groupes
  async getAll(): Promise<Group[]> {
    const response = await api.get('/groups');
    return response.data;
  },

  // Récupérer un groupe par son ID
  async getById(id: string): Promise<Group> {
    const response = await api.get(`/groups/${id}`);
    return response.data;
  },

  // Créer un nouveau groupe
  async create(group: Omit<Group, 'id'>): Promise<Group> {
    const response = await api.post('/groups', group);
    return response.data;
  },

  // Mettre à jour un groupe
  async update(id: string, group: Partial<Group>): Promise<Group> {
    const response = await api.put(`/groups/${id}`, group);
    return response.data;
  },

  // Supprimer un groupe
  async delete(id: string): Promise<void> {
    await api.delete(`/groups/${id}`);
  }
};

// Service pour les paramètres
export const parameterService = {
  // Récupérer tous les paramètres
  async getAll(): Promise<Parameter[]> {
    const response = await api.get('/parameters');
    return response.data;
  },

  // Récupérer les paramètres par catégorie
  async getByCategory(category: string): Promise<Parameter[]> {
    const response = await api.get(`/parameters/category/${category}`);
    return response.data;
  },

  // Récupérer un paramètre par sa clé
  async getByKey(key: string): Promise<Parameter> {
    const response = await api.get(`/parameters/key/${key}`);
    return response.data;
  },

  // Mettre à jour un paramètre
  async update(key: string, value: string): Promise<Parameter> {
    const response = await api.put(`/parameters/key/${key}`, { value });
    return response.data;
  },

  // Mettre à jour plusieurs paramètres
  async updateBatch(parameters: { key: string; value: string }[]): Promise<Parameter[]> {
    const response = await api.put('/parameters/batch', { parameters });
    return response.data;
  }
};

// Service pour les devises
export const currencyService = {
  // Récupérer toutes les devises
  async getAll(): Promise<Currency[]> {
    const response = await api.get('/currencies');
    return response.data;
  },

  // Récupérer une devise par son ID
  async getById(id: string): Promise<Currency> {
    const response = await api.get(`/currencies/${id}`);
    return response.data;
  },

  // Créer une nouvelle devise
  async create(currency: Omit<Currency, 'id'>): Promise<Currency> {
    const response = await api.post('/currencies', currency);
    return response.data;
  },

  // Mettre à jour une devise
  async update(id: string, currency: Partial<Currency>): Promise<Currency> {
    const response = await api.put(`/currencies/${id}`, currency);
    return response.data;
  },

  // Supprimer une devise
  async delete(id: string): Promise<void> {
    await api.delete(`/currencies/${id}`);
  },

  // Activer/désactiver une devise
  async toggleStatus(id: string): Promise<Currency> {
    const response = await api.patch(`/currencies/${id}/toggle-status`);
    return response.data;
  }
};

// Service pour les pays
export const countryService = {
  // Récupérer tous les pays
  async getAll(): Promise<Country[]> {
    const response = await api.get('/countries');
    return response.data;
  },

  // Récupérer un pays par son ID
  async getById(id: string): Promise<Country> {
    const response = await api.get(`/countries/${id}`);
    return response.data;
  },

  // Créer un nouveau pays
  async create(country: Omit<Country, 'id'>): Promise<Country> {
    const response = await api.post('/countries', country);
    return response.data;
  },

  // Mettre à jour un pays
  async update(id: string, country: Partial<Country>): Promise<Country> {
    const response = await api.put(`/countries/${id}`, country);
    return response.data;
  },

  // Supprimer un pays
  async delete(id: string): Promise<void> {
    await api.delete(`/countries/${id}`);
  },

  // Activer/désactiver un pays
  async toggleStatus(id: string): Promise<Country> {
    const response = await api.patch(`/countries/${id}/toggle-status`);
    return response.data;
  }
};

// Service pour les langues
export const languageService = {
  // Récupérer toutes les langues
  async getAll(): Promise<Language[]> {
    const response = await api.get('/languages');
    return response.data;
  },

  // Récupérer une langue par son ID
  async getById(id: string): Promise<Language> {
    const response = await api.get(`/languages/${id}`);
    return response.data;
  },

  // Créer une nouvelle langue
  async create(language: Omit<Language, 'id'>): Promise<Language> {
    const response = await api.post('/languages', language);
    return response.data;
  },

  // Mettre à jour une langue
  async update(id: string, language: Partial<Language>): Promise<Language> {
    const response = await api.put(`/languages/${id}`, language);
    return response.data;
  },

  // Supprimer une langue
  async delete(id: string): Promise<void> {
    await api.delete(`/languages/${id}`);
  },

  // Activer/désactiver une langue
  async toggleStatus(id: string): Promise<Language> {
    const response = await api.patch(`/languages/${id}/toggle-status`);
    return response.data;
  },

  // Définir une langue comme langue par défaut
  async setDefault(id: string): Promise<Language> {
    const response = await api.patch(`/languages/${id}/set-default`);
    return response.data;
  }
};

// Service pour les formats de date
export const dateFormatService = {
  // Récupérer tous les formats de date
  async getAll(): Promise<DateFormat[]> {
    const response = await api.get('/dateformats');
    return response.data;
  },

  // Récupérer un format de date par son ID
  async getById(id: string): Promise<DateFormat> {
    const response = await api.get(`/dateformats/${id}`);
    return response.data;
  },

  // Créer un nouveau format de date
  async create(dateFormat: Omit<DateFormat, 'id'>): Promise<DateFormat> {
    const response = await api.post('/dateformats', dateFormat);
    return response.data;
  },

  // Mettre à jour un format de date
  async update(id: string, dateFormat: Partial<DateFormat>): Promise<DateFormat> {
    const response = await api.put(`/dateformats/${id}`, dateFormat);
    return response.data;
  },

  // Supprimer un format de date
  async delete(id: string): Promise<void> {
    await api.delete(`/dateformats/${id}`);
  },

  // Activer/désactiver un format de date
  async toggleStatus(id: string): Promise<DateFormat> {
    const response = await api.patch(`/dateformats/${id}/toggle-status`);
    return response.data;
  },

  // Définir un format de date comme format par défaut
  async setDefault(id: string): Promise<DateFormat> {
    const response = await api.patch(`/dateformats/${id}/set-default`);
    return response.data;
  }
};

// Types pour les formats de nombre
export interface NumberFormat {
  id: string;
  name: string;
  decimal_separator: string;
  thousands_separator?: string;
  decimal_places: number;
  currency_display: 'symbol' | 'code' | 'name';
  is_default: boolean;
  active: boolean;
}

// Types pour les traductions
export interface Translation {
  id: string;
  key: string;
  locale: string;
  namespace: string;
  value: string;
  is_default: boolean;
  active: boolean;
  description?: string;
}

// Service pour les traductions
export const translationService = {
  // Récupérer toutes les traductions
  async getAll(): Promise<Translation[]> {
    const response = await api.get('/translations');
    return response.data;
  },

  // Récupérer une traduction par son ID
  async getById(id: string): Promise<Translation> {
    const response = await api.get(`/translations/${id}`);
    return response.data;
  },

  // Récupérer les traductions par locale
  async getByLocale(locale: string): Promise<Record<string, Record<string, string>>> {
    const response = await api.get(`/translations/locale/${locale}`);
    return response.data;
  },

  // Récupérer les traductions par clé
  async getByKey(key: string): Promise<Translation[]> {
    const response = await api.get(`/translations/key/${key}`);
    return response.data;
  },

  // Récupérer les traductions par namespace
  async getByNamespace(namespace: string): Promise<Translation[]> {
    const response = await api.get(`/translations/namespace/${namespace}`);
    return response.data;
  },

  // Créer une nouvelle traduction
  async create(translation: Omit<Translation, 'id'>): Promise<Translation> {
    const response = await api.post('/translations', translation);
    return response.data;
  },

  // Mettre à jour une traduction
  async update(id: string, translation: Partial<Translation>): Promise<Translation> {
    const response = await api.put(`/translations/${id}`, translation);
    return response.data;
  },

  // Supprimer une traduction
  async delete(id: string): Promise<void> {
    await api.delete(`/translations/${id}`);
  },

  // Activer/désactiver une traduction
  async toggleStatus(id: string): Promise<Translation> {
    const response = await api.patch(`/translations/${id}/toggle-status`);
    return response.data;
  },

  // Définir une traduction comme traduction par défaut
  async setDefault(id: string): Promise<Translation> {
    const response = await api.patch(`/translations/${id}/set-default`);
    return response.data;
  }
};

// Service pour les formats de nombre
export const numberFormatService = {
  // Récupérer tous les formats de nombre
  async getAll(): Promise<NumberFormat[]> {
    const response = await api.get('/numberformats');
    return response.data;
  },

  // Récupérer un format de nombre par son ID
  async getById(id: string): Promise<NumberFormat> {
    const response = await api.get(`/numberformats/${id}`);
    return response.data;
  },

  // Créer un nouveau format de nombre
  async create(numberFormat: Omit<NumberFormat, 'id'>): Promise<NumberFormat> {
    const response = await api.post('/numberformats', numberFormat);
    return response.data;
  },

  // Mettre à jour un format de nombre
  async update(id: string, numberFormat: Partial<NumberFormat>): Promise<NumberFormat> {
    const response = await api.put(`/numberformats/${id}`, numberFormat);
    return response.data;
  },

  // Supprimer un format de nombre
  async delete(id: string): Promise<void> {
    await api.delete(`/numberformats/${id}`);
  },

  // Activer/désactiver un format de nombre
  async toggleStatus(id: string): Promise<NumberFormat> {
    const response = await api.patch(`/numberformats/${id}/toggle-status`);
    return response.data;
  },

  // Définir un format de nombre comme format par défaut
  async setDefault(id: string): Promise<NumberFormat> {
    const response = await api.patch(`/numberformats/${id}/set-default`);
    return response.data;
  }
};

// Types pour les formats d'heure
export interface TimeFormat {
  id: string;
  name: string;
  format: string;
  example: string;
  region: string;
  uses_24_hour: boolean;
  is_default: boolean;
  active: boolean;
}

// Types pour la configuration du calendrier
export interface CalendarConfig {
  id: string;
  timezone: string;
  workHoursStart: string;
  workHoursEnd: string;
  weekStart: string;
  dateFormat: string;
  timeFormat: string;
  workDays: string[];
  advancedSettings: {
    showWeekNumbers: boolean;
    firstDayOfYear: number;
    minimalDaysInFirstWeek: number;
    workWeekStart: number;
    workWeekEnd: number;
    defaultView: string;
    defaultDuration: number;
    slotDuration: number;
    snapDuration: number;
  };
}

// Types pour les jours fériés
export interface Holiday {
  id: string;
  name: string;
  date: string;
  country: string;
  recurring: boolean;
  type: string;
  description: string;
  active: boolean;
}

// Types pour les intégrations de calendrier
export interface CalendarIntegration {
  id: string;
  type: string;
  name: string;
  userId: string | null;
  userName: string | null;
  lastSync: string | null;
  lastSyncStatus: string | null;
  active: boolean;
}

// Service pour la gestion du calendrier
export const calendarService = {
  // Récupérer la configuration du calendrier
  async getConfig(): Promise<CalendarConfig> {
    const response = await api.get('/calendarconfig');
    return response.data;
  },

  // Mettre à jour la configuration du calendrier
  async updateConfig(config: Partial<CalendarConfig>): Promise<CalendarConfig> {
    const response = await api.put('/calendarconfig', config);
    return response.data;
  },

  // Récupérer tous les jours fériés
  async getHolidays(): Promise<Holiday[]> {
    const response = await api.get('/holidays');
    return response.data;
  },

  // Ajouter un jour férié
  async addHoliday(holiday: Omit<Holiday, 'id' | 'active'>): Promise<Holiday> {
    const response = await api.post('/holidays', holiday);
    return response.data;
  },

  // Supprimer un jour férié
  async deleteHoliday(id: string): Promise<void> {
    await api.delete(`/holidays/${id}`);
  },

  // Récupérer les intégrations de calendrier
  async getIntegrations(): Promise<CalendarIntegration[]> {
    const response = await api.get('/calendarintegrations');
    return response.data;
  },

  // Ajouter une intégration de calendrier
  async addIntegration(integration: Omit<CalendarIntegration, 'id' | 'active' | 'lastSync' | 'lastSyncStatus'>): Promise<CalendarIntegration> {
    const response = await api.post('/calendarintegrations', integration);
    return response.data;
  },

  // Supprimer une intégration de calendrier
  async deleteIntegration(id: string): Promise<void> {
    await api.delete(`/calendarintegrations/${id}`);
  }
};

// Types pour les séquences
export interface Sequence {
  id: string;
  name: string;
  prefix: string;
  suffix: string;
  nextNumber: number;
  padding: number;
  resetFrequency: 'never' | 'yearly' | 'monthly';
  documentType: string;
  lastReset: string | null;
  active: boolean;
}

// Types pour la configuration des séquences
export interface SequenceConfig {
  id: string;
  fiscalYearStart: string;
  fiscalYearEnd: string;
  defaultFormat: string;
  defaultPadding: number;
  autoReset: boolean;
  advancedSettings: {
    yearFormat: string;
    separator: string;
    allowCustomFormat: boolean;
    allowManualReset: boolean;
    allowManualNumbering: boolean;
    enforceUniqueness: boolean;
    lockSequenceAfterUse: boolean;
  };
}

// Service pour la gestion des séquences
export const sequenceService = {
  // Récupérer toutes les séquences
  async getSequences(): Promise<Sequence[]> {
    const response = await api.get('/sequences');
    return response.data;
  },

  // Récupérer la configuration des séquences
  async getConfig(): Promise<SequenceConfig> {
    const response = await api.get('/sequenceconfig');
    return response.data;
  },

  // Mettre à jour la configuration des séquences
  async updateConfig(config: Partial<SequenceConfig>): Promise<SequenceConfig> {
    const response = await api.put('/sequenceconfig', config);
    return response.data;
  },

  // Réinitialiser une séquence
  async resetSequence(id: string): Promise<Sequence> {
    const response = await api.post(`/sequences/${id}/reset`);
    return response.data;
  }
};

// Types pour la configuration des performances
export interface PerformanceConfig {
  id: string;
  cacheEnabled: boolean;
  cacheSize: number;
  cacheTTL: number;
  defaultPageSize: number;
  queryOptimization: boolean;
  responseCompression: boolean;
  loggingLevel: string;
  requestTimeout: number;
  maxDbConnections: number;
  advancedSettings: {
    minifyAssets: boolean;
    useEtags: boolean;
    gzipCompression: boolean;
    staticCacheMaxAge: number;
    apiRateLimit: number;
    apiRateLimitWindow: number;
    dbPoolIdleTimeout: number;
    dbPoolAcquireTimeout: number;
    dbPoolMaxUsage: number;
    dbSlowQueryThreshold: number;
    memoryWatchEnabled: boolean;
    memoryWatchThreshold: number;
    cpuWatchEnabled: boolean;
    cpuWatchThreshold: number;
  };
}

// Types pour les métriques de performance
export interface PerformanceMetrics {
  id: string;
  timestamp: string;
  cpuUsage: number;
  memoryUsage: number;
  activeConnections: number;
  requestsPerSecond: number;
  averageResponseTime: number;
  slowQueries: number;
  cacheHitRate: number;
  errorRate: number;
  diskUsage: number;
  networkUsage: number;
  details: {
    cpuDetails: any;
    memoryDetails: any;
    requestDetails: any;
    databaseDetails: any;
  };
}

// Service pour la gestion des performances
export const performanceService = {
  // Récupérer la configuration des performances
  async getConfig(): Promise<PerformanceConfig> {
    const response = await api.get('/performanceconfig');
    return response.data;
  },

  // Mettre à jour la configuration des performances
  async updateConfig(config: Partial<PerformanceConfig>): Promise<PerformanceConfig> {
    const response = await api.put('/performanceconfig', config);
    return response.data;
  },

  // Récupérer les métriques de performance
  async getMetrics(): Promise<PerformanceMetrics> {
    const response = await api.get('/performancemetrics');
    return response.data;
  }
};

// Types pour les canaux de notification
export interface NotificationChannel {
  id: string;
  name: string;
  type: string;
  description: string;
  enabled: boolean;
  config?: any;
}

// Types pour les modèles de notification
export interface NotificationTemplate {
  id: string;
  name: string;
  event: string;
  subject: string;
  content: string;
  htmlContent: string;
  active: boolean;
  category: string;
  channelIds: string[];
}

// Types pour les préférences de notification
export interface NotificationPreference {
  id: string;
  userId: string;
  eventType: string;
  channels: string[];
  enabled: boolean;
}

// Types pour les notifications
export interface Notification {
  id: string;
  userId: string;
  title: string;
  message: string;
  type: string;
  read: boolean;
  createdAt: string;
  link?: string;
  data?: any;
}

// Types pour la configuration des notifications
export interface NotificationConfig {
  id: string;
  defaultChannels: string[];
  batchNotifications: boolean;
  batchInterval: number;
  maxNotificationsPerBatch: number;
  retentionPeriod: number;
  allowUserPreferences: boolean;
  defaultEnabled: boolean;
}

// Service pour la gestion des notifications
export const notificationService = {
  // Récupérer les canaux de notification
  async getChannels(): Promise<NotificationChannel[]> {
    const response = await api.get('/notificationchannels');
    return response.data;
  },

  // Ajouter un canal de notification
  async addChannel(channel: Omit<NotificationChannel, 'id'>): Promise<NotificationChannel> {
    const response = await api.post('/notificationchannels', channel);
    return response.data;
  },

  // Récupérer les modèles de notification
  async getTemplates(): Promise<NotificationTemplate[]> {
    const response = await api.get('/notificationtemplates');
    return response.data;
  },

  // Ajouter un modèle de notification
  async addTemplate(template: Omit<NotificationTemplate, 'id'>): Promise<NotificationTemplate> {
    const response = await api.post('/notificationtemplates', template);
    return response.data;
  },

  // Récupérer les préférences de notification
  async getPreferences(): Promise<NotificationPreference[]> {
    const response = await api.get('/notificationpreferences');
    return response.data;
  },

  // Récupérer les notifications
  async getNotifications(): Promise<Notification[]> {
    const response = await api.get('/notifications');
    return response.data;
  },

  // Récupérer la configuration des notifications
  async getConfig(): Promise<NotificationConfig> {
    const response = await api.get('/notificationconfig');
    return response.data;
  },

  // Mettre à jour la configuration des notifications
  async updateConfig(config: Partial<NotificationConfig>): Promise<NotificationConfig> {
    const response = await api.put('/notificationconfig', config);
    return response.data;
  }
};

// Service pour les formats d'heure
export const timeFormatService = {
  // Récupérer tous les formats d'heure
  async getAll(): Promise<TimeFormat[]> {
    const response = await api.get('/timeformats');
    return response.data;
  },

  // Récupérer un format d'heure par son ID
  async getById(id: string): Promise<TimeFormat> {
    const response = await api.get(`/timeformats/${id}`);
    return response.data;
  },

  // Créer un nouveau format d'heure
  async create(timeFormat: Omit<TimeFormat, 'id'>): Promise<TimeFormat> {
    const response = await api.post('/timeformats', timeFormat);
    return response.data;
  },

  // Mettre à jour un format d'heure
  async update(id: string, timeFormat: Partial<TimeFormat>): Promise<TimeFormat> {
    const response = await api.put(`/timeformats/${id}`, timeFormat);
    return response.data;
  },

  // Supprimer un format d'heure
  async delete(id: string): Promise<void> {
    await api.delete(`/timeformats/${id}`);
  },

  // Activer/désactiver un format d'heure
  async toggleStatus(id: string): Promise<TimeFormat> {
    const response = await api.patch(`/timeformats/${id}/toggle-status`);
    return response.data;
  },

  // Définir un format d'heure comme format par défaut
  async setDefault(id: string): Promise<TimeFormat> {
    const response = await api.patch(`/timeformats/${id}/set-default`);
    return response.data;
  }
};

// Types pour les serveurs d'email
export interface EmailServer {
  id: string;
  name: string;
  protocol: 'smtp' | 'sendmail';
  host: string;
  port: number;
  username?: string;
  password?: string;
  encryption: 'tls' | 'ssl' | 'none';
  from_email: string;
  from_name: string;
  is_default: boolean;
  active: boolean;
}

// Service pour les serveurs d'email
export const emailServerService = {
  // Récupérer tous les serveurs d'email
  async getAll(): Promise<EmailServer[]> {
    const response = await api.get('/emailservers');
    return response.data;
  },

  // Récupérer un serveur d'email par son ID
  async getById(id: string): Promise<EmailServer> {
    const response = await api.get(`/emailservers/${id}`);
    return response.data;
  },

  // Créer un nouveau serveur d'email
  async create(emailServer: Omit<EmailServer, 'id'>): Promise<EmailServer> {
    const response = await api.post('/emailservers', emailServer);
    return response.data;
  },

  // Mettre à jour un serveur d'email
  async update(id: string, emailServer: Partial<EmailServer>): Promise<EmailServer> {
    const response = await api.put(`/emailservers/${id}`, emailServer);
    return response.data;
  },

  // Supprimer un serveur d'email
  async delete(id: string): Promise<void> {
    await api.delete(`/emailservers/${id}`);
  },

  // Activer/désactiver un serveur d'email
  async toggleStatus(id: string): Promise<EmailServer> {
    const response = await api.patch(`/emailservers/${id}/toggle-status`);
    return response.data;
  },

  // Définir un serveur d'email comme serveur par défaut
  async setDefault(id: string): Promise<EmailServer> {
    const response = await api.patch(`/emailservers/${id}/set-default`);
    return response.data;
  },

  // Tester la connexion à un serveur d'email
  async testConnection(id: string): Promise<{ success: boolean; message: string }> {
    const response = await api.post(`/emailservers/${id}/test`);
    return response.data;
  }
};

export default api;
