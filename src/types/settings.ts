/**
 * Types pour la gestion des paramètres
 */

// Type de base pour les paramètres
export interface Settings {
  id?: string;
  module: string;
  createdAt?: Date;
  updatedAt?: Date;
  data: Record<string, unknown>;
}

// Types spécifiques pour chaque module
export interface NotificationSettings extends Settings {
  data: {
    channels: {
      email: boolean;
      sms: boolean;
      inApp: boolean;
      webhook: boolean;
    };
    templates: Record<string, string>;
    preferences: Record<string, unknown>;
    scheduling: {
      immediate: boolean;
      delayed: boolean;
      recurrent: boolean;
    };
  };
}

export interface AuditSettings extends Settings {
  data: {
    logLevel: string;
    retentionPeriod: number;
    eventsToAudit: string[];
    securityAlerts: {
      enabled: boolean;
      email: string;
    };
  };
}

export interface BackupSettings extends Settings {
  data: {
    schedule: {
      daily: boolean;
      weekly: boolean;
      monthly: boolean;
    };
    retentionPolicy: string;
    storageLocations: string[];
    encryption: boolean;
  };
}

export interface AppearanceSettings extends Settings {
  data: {
    theme: 'light' | 'dark' | 'custom';
    primaryColor: string;
    secondaryColor: string;
    displayDensity: 'compact' | 'normal' | 'comfortable';
    accessibility: {
      fontSize: number;
      highContrast: boolean;
    };
  };
}

export interface WorkflowSettings extends Settings {
  data: {
    workflows: Array<{
      name: string;
      steps: string[];
      transitions: string[];
      responsibilities: string[];
      approvalRules: string[];
    }>;
    notificationIntegration: boolean;
  };
}

export interface ComplianceSettings extends Settings {
  data: {
    dataRetentionPolicies: string[];
    anonymization: {
      enabled: boolean;
      methods: string[];
    };
    consentManagement: boolean;
    sensitiveDataLogging: boolean;
    accessRequests: {
      enabled: boolean;
      process: string;
    };
  };
}

export interface ImportExportSettings extends Settings {
  data: {
    formats: string[];
    fieldMappings: Record<string, string>;
    scheduling: {
      enabled: boolean;
      frequency: string;
    };
    validation: {
      strict: boolean;
      errorHandling: string;
    };
    history: {
      enabled: boolean;
      retention: number;
    };
  };
}

export interface CalendarSettings extends Settings {
  data: {
    holidays: Record<string, string[]>;
    workingHours: {
      start: string;
      end: string;
      days: number[];
    };
    timezones: string[];
    displayFormats: {
      date: string;
      time: string;
      datetime: string;
    };
    externalIntegrations: {
      google: boolean;
      outlook: boolean;
    };
  };
}

export interface SequenceSettings extends Settings {
  data: {
    documentTypes: Array<{
      name: string;
      prefix: string;
      suffix: string;
      sequence: string;
      resetPolicy: string;
      perEntity: boolean;
    }>;
  };
}

export interface PerformanceSettings extends Settings {
  data: {
    cache: {
      enabled: boolean;
      ttl: number;
    };
    pagination: {
      defaultLimit: number;
      maxLimit: number;
    };
    resourceIntensiveTasks: {
      schedule: string;
      concurrency: number;
    };
    queryOptimization: boolean;
    monitoring: {
      enabled: boolean;
      interval: number;
    };
  };
}

// Ajouter d'autres interfaces selon les besoins...

export interface CompanySettings extends Settings {
  data: {
    name: string;
    logo: string;
    address: {
      street: string;
      city: string;
      postalCode: string;
      country: string;
    };
    contact: {
      email: string;
      phone: string;
      website: string;
    };
    taxInfo: {
      taxId: string;
      vatNumber: string;
    };
    fiscalYear: {
      start: string;
      end: string;
    };
  };
}

export interface UserSettings extends Settings {
  data: {
    defaultRoles: string[];
    passwordPolicy: {
      minLength: number;
      requireSpecialChar: boolean;
      requireNumber: boolean;
      requireUpper: boolean;
      expireAfter: number;
    };
    authentication: {
      twoFactor: boolean;
      socialLogin: boolean;
    };
    profileFields: string[];
  };
}

export interface GroupSettings extends Settings {
  data: {
    defaultGroups: string[];
    permissionTemplates: Record<string, string[]>;
    inheritanceRules: {
      enabled: boolean;
      depth: number;
    };
  };
}

export interface LanguageSettings extends Settings {
  data: {
    defaultLanguage: string;
    availableLanguages: string[];
    autoTranslation: boolean;
    fallbackLanguage: string;
  };
}

export interface CurrencySettings extends Settings {
  data: {
    defaultCurrency: string;
    availableCurrencies: string[];
    exchangeRates: {
      provider: string;
      updateFrequency: string;
    };
    rounding: {
      method: string;
      precision: number;
    };
  };
}

export interface CountrySettings extends Settings {
  data: {
    defaultCountry: string;
    availableCountries: string[];
    regionSpecific: Record<string, unknown>;
  };
}

export interface DatabaseSettings extends Settings {
  data: {
    type: string;
    host: string;
    port: number;
    name: string;
    user: string;
    backup: {
      frequency: string;
      retention: number;
    };
    performance: {
      poolSize: number;
      timeout: number;
    };
  };
}

export interface EmailSettings extends Settings {
  data: {
    smtp: {
      host: string;
      port: number;
      secure: boolean;
      auth: {
        user: string;
        pass: string;
      };
    };
    from: string;
    templates: Record<string, string>;
    rateLimit: number;
  };
}

export interface SecuritySettings extends Settings {
  data: {
    loginAttempts: number;
    ipWhitelist: string[];
    session: {
      timeout: number;
      concurrent: boolean;
    };
    encryption: {
      algorithm: string;
      keyRotation: number;
    };
  };
}

export interface ModuleListSettings extends Settings {
  data: {
    installedModules: string[];
    autoUpdate: boolean;
    updateChannel: string;
    dependencies: Record<string, string>;
  };
}

export interface AppsStoreSettings extends Settings {
  data: {
    apiKey: string;
    autoUpdate: boolean;
    featuredApps: string[];
    categories: string[];
  };
}

export interface DocumentLayoutsSettings extends Settings {
  data: {
    defaultTemplate: string;
    availableTemplates: string[];
    margins: {
      top: number;
      bottom: number;
      left: number;
      right: number;
    };
    headerFooter: {
      enabled: boolean;
      content: string;
    };
  };
}

export interface ReportTemplatesSettings extends Settings {
  data: {
    defaultFormat: string;
    availableFormats: string[];
    dataSources: string[];
    scheduling: {
      enabled: boolean;
      frequency: string;
    };
  };
}

export interface PaymentProvidersSettings extends Settings {
  data: {
    activeProviders: string[];
    credentials: Record<string, unknown>;
    currencies: string[];
    fees: {
      fixed: number;
      percentage: number;
    };
  };
}

export interface ShippingMethodsSettings extends Settings {
  data: {
    methods: Array<{
      name: string;
      carrier: string;
      transitTime: string;
      cost: number;
      countries: string[];
    }>;
    defaultMethod: string;
    packaging: {
      types: string[];
      default: string;
    };
  };
}
