import React from 'react';
import { Route } from 'react-router-dom';
import SettingsLayout from '../components/layouts/SettingsLayout';
import CurrenciesSettings from '../pages/settings/CurrenciesSettings';
import SettingsOverview from '../pages/settings/SettingsOverview';
import CompanySettings from '../pages/settings/CompanySettings';
import ModulesListSettings from '../pages/settings/ModulesListSettings';

// Composants temporaires pour les pages de paramètres qui n'existent pas encore
const UsersSettings = () => (
  <div className="container mx-auto px-4 py-6">
    <h1 className="text-3xl font-bold tracking-tight mb-4">Gestion des utilisateurs</h1>
    <p className="text-muted-foreground">Cette page est en cours de développement.</p>
  </div>
);

const GroupsSettings = () => (
  <div className="container mx-auto px-4 py-6">
    <h1 className="text-3xl font-bold tracking-tight mb-4">Groupes d'utilisateurs</h1>
    <p className="text-muted-foreground">Cette page est en cours de développement.</p>
  </div>
);

const LanguagesSettings = () => (
  <div className="container mx-auto px-4 py-6">
    <h1 className="text-3xl font-bold tracking-tight mb-4">Langues</h1>
    <p className="text-muted-foreground">Cette page est en cours de développement.</p>
  </div>
);

const CountriesSettings = () => (
  <div className="container mx-auto px-4 py-6">
    <h1 className="text-3xl font-bold tracking-tight mb-4">Pays</h1>
    <p className="text-muted-foreground">Cette page est en cours de développement.</p>
  </div>
);

const TranslationsSettings = () => (
  <div className="container mx-auto px-4 py-6">
    <h1 className="text-3xl font-bold tracking-tight mb-4">Traductions</h1>
    <p className="text-muted-foreground">Cette page est en cours de développement.</p>
  </div>
);

const DateFormatsSettings = () => (
  <div className="container mx-auto px-4 py-6">
    <h1 className="text-3xl font-bold tracking-tight mb-4">Formats de date</h1>
    <p className="text-muted-foreground">Cette page est en cours de développement.</p>
  </div>
);

const TimeFormatsSettings = () => (
  <div className="container mx-auto px-4 py-6">
    <h1 className="text-3xl font-bold tracking-tight mb-4">Formats d'heure</h1>
    <p className="text-muted-foreground">Cette page est en cours de développement.</p>
  </div>
);

const NumberFormatsSettings = () => (
  <div className="container mx-auto px-4 py-6">
    <h1 className="text-3xl font-bold tracking-tight mb-4">Formats de nombre</h1>
    <p className="text-muted-foreground">Cette page est en cours de développement.</p>
  </div>
);

// Composants pour les paramètres techniques
const DatabaseSettings = () => (
  <div className="container mx-auto px-4 py-6">
    <h1 className="text-3xl font-bold tracking-tight mb-4">Base de données</h1>
    <p className="text-muted-foreground">Cette page est en cours de développement.</p>
  </div>
);

const EmailSettings = () => (
  <div className="container mx-auto px-4 py-6">
    <h1 className="text-3xl font-bold tracking-tight mb-4">Serveurs de messagerie</h1>
    <p className="text-muted-foreground">Cette page est en cours de développement.</p>
  </div>
);

const SecuritySettings = () => (
  <div className="container mx-auto px-4 py-6">
    <h1 className="text-3xl font-bold tracking-tight mb-4">Sécurité</h1>
    <p className="text-muted-foreground">Cette page est en cours de développement.</p>
  </div>
);

const AutomationSettings = () => (
  <div className="container mx-auto px-4 py-6">
    <h1 className="text-3xl font-bold tracking-tight mb-4">Actions automatisées</h1>
    <p className="text-muted-foreground">Cette page est en cours de développement.</p>
  </div>
);

const ApiSettings = () => (
  <div className="container mx-auto px-4 py-6">
    <h1 className="text-3xl font-bold tracking-tight mb-4">API & Intégrations</h1>
    <p className="text-muted-foreground">Cette page est en cours de développement.</p>
  </div>
);

const LoggingSettings = () => (
  <div className="container mx-auto px-4 py-6">
    <h1 className="text-3xl font-bold tracking-tight mb-4">Journalisation</h1>
    <p className="text-muted-foreground">Cette page est en cours de développement.</p>
  </div>
);

// Composants pour la gestion des modules
const AppsStoreSettings = () => (
  <div className="container mx-auto px-4 py-6">
    <h1 className="text-3xl font-bold tracking-tight mb-4">Boutique d'applications</h1>
    <p className="text-muted-foreground">Cette page est en cours de développement.</p>
  </div>
);

const UpdatesSettings = () => (
  <div className="container mx-auto px-4 py-6">
    <h1 className="text-3xl font-bold tracking-tight mb-4">Mises à jour</h1>
    <p className="text-muted-foreground">Cette page est en cours de développement.</p>
  </div>
);

// Composants pour la gestion des documents
const DocumentLayoutsSettings = () => (
  <div className="container mx-auto px-4 py-6">
    <h1 className="text-3xl font-bold tracking-tight mb-4">Mise en page des documents</h1>
    <p className="text-muted-foreground">Cette page est en cours de développement.</p>
  </div>
);

const ReportTemplatesSettings = () => (
  <div className="container mx-auto px-4 py-6">
    <h1 className="text-3xl font-bold tracking-tight mb-4">Modèles de rapport</h1>
    <p className="text-muted-foreground">Cette page est en cours de développement.</p>
  </div>
);

const PrintersSettings = () => (
  <div className="container mx-auto px-4 py-6">
    <h1 className="text-3xl font-bold tracking-tight mb-4">Imprimantes</h1>
    <p className="text-muted-foreground">Cette page est en cours de développement.</p>
  </div>
);

// Composants pour les intégrations
const PaymentProvidersSettings = () => (
  <div className="container mx-auto px-4 py-6">
    <h1 className="text-3xl font-bold tracking-tight mb-4">Fournisseurs de paiement</h1>
    <p className="text-muted-foreground">Cette page est en cours de développement.</p>
  </div>
);

const ShippingMethodsSettings = () => (
  <div className="container mx-auto px-4 py-6">
    <h1 className="text-3xl font-bold tracking-tight mb-4">Méthodes d'expédition</h1>
    <p className="text-muted-foreground">Cette page est en cours de développement.</p>
  </div>
);

const ExternalServicesSettings = () => (
  <div className="container mx-auto px-4 py-6">
    <h1 className="text-3xl font-bold tracking-tight mb-4">Services externes</h1>
    <p className="text-muted-foreground">Cette page est en cours de développement.</p>
  </div>
);

/**
 * Routes pour la section des paramètres de l'application
 * Ces routes sont chargées dans App.tsx
 */
const SettingsRoutes = (
  <Route path="settings" element={<SettingsLayout />}>
    {/* Page d'accueil des paramètres */}
    <Route index element={<SettingsOverview />} />

    {/* Paramètres généraux */}
    <Route path="company" element={<CompanySettings />} />
    <Route path="users" element={<UsersSettings />} />
    <Route path="groups" element={<GroupsSettings />} />

    {/* Paramètres de localisation */}
    <Route path="languages" element={<LanguagesSettings />} />
    <Route path="currencies" element={<CurrenciesSettings />} />
    <Route path="countries" element={<CountriesSettings />} />
    <Route path="translations" element={<TranslationsSettings />} />
    <Route path="date-formats" element={<DateFormatsSettings />} />
    <Route path="time-formats" element={<TimeFormatsSettings />} />
    <Route path="number-formats" element={<NumberFormatsSettings />} />

    {/* Paramètres techniques */}
    <Route path="database" element={<DatabaseSettings />} />
    <Route path="email" element={<EmailSettings />} />
    <Route path="security" element={<SecuritySettings />} />
    <Route path="automation" element={<AutomationSettings />} />
    <Route path="api" element={<ApiSettings />} />
    <Route path="logging" element={<LoggingSettings />} />

    {/* Gestion des modules */}
    <Route path="modules-list" element={<ModulesListSettings />} />
    <Route path="apps-store" element={<AppsStoreSettings />} />
    <Route path="updates" element={<UpdatesSettings />} />

    {/* Gestion des documents */}
    <Route path="document-layouts" element={<DocumentLayoutsSettings />} />
    <Route path="report-templates" element={<ReportTemplatesSettings />} />
    <Route path="printers" element={<PrintersSettings />} />

    {/* Intégrations */}
    <Route path="payment-providers" element={<PaymentProvidersSettings />} />
    <Route path="shipping-methods" element={<ShippingMethodsSettings />} />
    <Route path="external-services" element={<ExternalServicesSettings />} />
  </Route>
);

// Exporter les routes
export default SettingsRoutes;
