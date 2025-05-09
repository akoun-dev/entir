import React from 'react';
import { Route } from 'react-router-dom';
import SettingsLayout from '../components/layouts/SettingsLayout';

// Nouveaux imports pour les composants de paramètres
import NotificationsSettings from '../pages/settings/NotificationsSettings';
import AuditSettings from '../pages/settings/AuditSettings';
import BackupSettings from '../pages/settings/BackupSettings';
import AppearanceSettings from '../pages/settings/AppearanceSettings';
import WorkflowSettings from '../pages/settings/WorkflowSettings';
import ComplianceSettings from '../pages/settings/ComplianceSettings';
import ImportExportSettings from '../pages/settings/ImportExportSettings';
import CalendarSettings from '../pages/settings/CalendarSettings';
import SequenceSettings from '../pages/settings/SequenceSettings';
import PerformanceSettings from '../pages/settings/PerformanceSettings';
import CurrenciesSettings from '../pages/settings/CurrenciesSettings';
import SettingsOverview from '../pages/settings/SettingsOverview';
import CompanySettings from '../pages/settings/CompanySettings';
import ModulesListSettings from '../pages/settings/ModulesListSettings';
import UsersSettings from '../pages/settings/UsersSettings';
import GroupsSettings from '../pages/settings/GroupsSettings';
import LanguagesSettings from '../pages/settings/LanguagesSettings';
import CountriesSettings from '../pages/settings/CountriesSettings';
import TranslationsSettings from '../pages/settings/TranslationsSettings';
import DateFormatsSettings from '../pages/settings/DateFormatsSettings';
import TimeFormatsSettings from '../pages/settings/TimeFormatsSettings';
import NumberFormatsSettings from '../pages/settings/NumberFormatsSettings';

// Import des composants de paramètres
import DatabaseSettings from '../pages/settings/DatabaseSettings';
import EmailSettings from '../pages/settings/EmailSettings';
import SecuritySettings from '../pages/settings/SecuritySettings';
import AutomationSettings from '../pages/settings/AutomationSettings';
import ApiSettings from '../pages/settings/ApiSettings';
import LoggingSettings from '../pages/settings/LoggingSettings';
import AppsStoreSettings from '../pages/settings/AppsStoreSettings';
import UpdatesSettings from '../pages/settings/UpdatesSettings';
import DocumentLayoutsSettings from '../pages/settings/DocumentLayoutsSettings';
import ReportTemplatesSettings from '../pages/settings/ReportTemplatesSettings';
import PrintersSettings from '../pages/settings/PrintersSettings';
import PaymentProvidersSettings from '../pages/settings/PaymentProvidersSettings';
import ShippingMethodsSettings from '../pages/settings/ShippingMethodsSettings';
import ExternalServicesSettings from '../pages/settings/ExternalServicesSettings';

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

    {/* Notifications */}
    <Route path="notifications-settings" element={<NotificationsSettings />} />

    {/* Audit */}
    <Route path="audit-settings" element={<AuditSettings />} />

    {/* Sauvegarde */}
    <Route path="backup-settings" element={<BackupSettings />} />

    {/* Apparence */}
    <Route path="appearance-settings" element={<AppearanceSettings />} />

    {/* Workflow */}
    <Route path="workflow-settings" element={<WorkflowSettings />} />

    {/* Conformité */}
    <Route path="compliance-settings" element={<ComplianceSettings />} />

    {/* Import/Export */}
    <Route path="import-export-settings" element={<ImportExportSettings />} />

    {/* Calendrier */}
    <Route path="calendar-settings" element={<CalendarSettings />} />

    {/* Numération */}
    <Route path="sequences-settings" element={<SequenceSettings />} />

    {/* Performance */}
    <Route path="performance-settings" element={<PerformanceSettings />} />
  </Route>
);

// Exporter les routes
export default SettingsRoutes;
