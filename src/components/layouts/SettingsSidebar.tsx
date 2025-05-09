import React, { useState } from 'react';
import { NavLink, useLocation } from 'react-router-dom';
import { cn } from '../../lib/utils';
import {
  Settings,
  Building2,
  Users,
  Globe,
  Database,
  Mail,
  Shield,
  Layers,
  Workflow,
  CreditCard,
  FileText,
  ChevronRight,
  ChevronDown,
  Languages,
  Clock,
  Calendar,
  DollarSign,
  Percent,
  Hash,
  Printer,
  Server,
  Key,
  Lock,
  Bell,
  Truck,
  ShoppingCart,
  BarChart,
  FileSpreadsheet
} from 'lucide-react';
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from '../../components/ui/collapsible';

/**
 * Sidebar pour la section des paramètres
 * Cette sidebar apparaît uniquement dans la section des paramètres
 * Basée sur les données de configuration d'Odoo
 */
const SettingsSidebar: React.FC = () => {
  const location = useLocation();
  const [openCategories, setOpenCategories] = useState<string[]>(['general']);

  // Catégories de paramètres basées sur Odoo
  const settingsCategories = [
    {
      id: 'general',
      name: 'Général',
      icon: <Settings className="w-5 h-5" />,
      description: 'Paramètres généraux de l\'application',
      items: [
        { id: 'company', name: 'Société', icon: <Building2 className="w-4 h-4" />, route: '/settings/company' },
        { id: 'users', name: 'Utilisateurs', icon: <Users className="w-4 h-4" />, route: '/settings/users' },
        { id: 'groups', name: 'Groupes d\'utilisateurs', icon: <Users className="w-4 h-4" />, route: '/settings/groups' }
      ]
    },
    {
      id: 'localization',
      name: 'Localisation',
      icon: <Globe className="w-5 h-5" />,
      description: 'Paramètres régionaux et formats',
      items: [
        { id: 'languages', name: 'Langues', icon: <Languages className="w-4 h-4" />, route: '/settings/languages' },
        { id: 'currencies', name: 'Devises', icon: <DollarSign className="w-4 h-4" />, route: '/settings/currencies' },
        { id: 'countries', name: 'Pays', icon: <Globe className="w-4 h-4" />, route: '/settings/countries' },
        { id: 'translations', name: 'Traductions', icon: <Languages className="w-4 h-4" />, route: '/settings/translations' },
        { id: 'date_formats', name: 'Formats de date', icon: <Calendar className="w-4 h-4" />, route: '/settings/date-formats' },
        { id: 'time_formats', name: 'Formats d\'heure', icon: <Clock className="w-4 h-4" />, route: '/settings/time-formats' },
        { id: 'number_formats', name: 'Formats de nombre', icon: <Hash className="w-4 h-4" />, route: '/settings/number-formats' }
      ]
    },
    {
      id: 'technical',
      name: 'Technique',
      icon: <Database className="w-5 h-5" />,
      description: 'Paramètres techniques et base de données',
      items: [
        { id: 'database', name: 'Base de données', icon: <Database className="w-4 h-4" />, route: '/settings/database' },
        { id: 'email', name: 'Serveurs de messagerie', icon: <Mail className="w-4 h-4" />, route: '/settings/email' },
        { id: 'security', name: 'Sécurité', icon: <Shield className="w-4 h-4" />, route: '/settings/security' },
        { id: 'automation', name: 'Actions automatisées', icon: <Workflow className="w-4 h-4" />, route: '/settings/automation' },
        { id: 'api', name: 'API & Intégrations', icon: <Server className="w-4 h-4" />, route: '/settings/api' },
        { id: 'logging', name: 'Journalisation', icon: <FileText className="w-4 h-4" />, route: '/settings/logging' }
      ]
    },
    {
      id: 'modules',
      name: 'Modules',
      icon: <Layers className="w-5 h-5" />,
      description: 'Gestion des modules et applications',
      items: [
        { id: 'modules_list', name: 'Modules installés', icon: <Layers className="w-4 h-4" />, route: '/settings/modules-list' },
        { id: 'apps_store', name: 'Boutique d\'applications', icon: <ShoppingCart className="w-4 h-4" />, route: '/settings/apps-store' },
        { id: 'updates', name: 'Mises à jour', icon: <Workflow className="w-4 h-4" />, route: '/settings/updates' }
      ]
    },
    {
      id: 'documents',
      name: 'Documents',
      icon: <FileText className="w-5 h-5" />,
      description: 'Gestion des documents et rapports',
      items: [
        { id: 'document_layouts', name: 'Mise en page', icon: <FileText className="w-4 h-4" />, route: '/settings/document-layouts' },
        { id: 'report_templates', name: 'Modèles de rapport', icon: <FileSpreadsheet className="w-4 h-4" />, route: '/settings/report-templates' },
        { id: 'printers', name: 'Imprimantes', icon: <Printer className="w-4 h-4" />, route: '/settings/printers' }
      ]
    },
    {
      id: 'integrations',
      name: 'Intégrations',
      icon: <CreditCard className="w-5 h-5" />,
      description: 'Intégrations avec des services externes',
      items: [
        { id: 'payment_providers', name: 'Fournisseurs de paiement', icon: <CreditCard className="w-4 h-4" />, route: '/settings/payment-providers' },
        { id: 'shipping_methods', name: 'Méthodes d\'expédition', icon: <Truck className="w-4 h-4" />, route: '/settings/shipping-methods' },
        { id: 'external_services', name: 'Services externes', icon: <Globe className="w-4 h-4" />, route: '/settings/external-services' }
      ]
    }
  ];

  // Vérifier si un item est actif
  const isActive = (route: string) => location.pathname === route;

  // Vérifier si une catégorie est active (au moins un de ses items est actif)
  const isCategoryActive = (items: any[]) => items.some(item => isActive(item.route) || location.pathname.startsWith(item.route));

  // Gérer l'ouverture/fermeture des catégories
  const toggleCategory = (categoryId: string) => {
    setOpenCategories(prev =>
      prev.includes(categoryId)
        ? prev.filter(id => id !== categoryId)
        : [...prev, categoryId]
    );
  };

  // Ouvrir automatiquement la catégorie active
  React.useEffect(() => {
    settingsCategories.forEach(category => {
      if (isCategoryActive(category.items) && !openCategories.includes(category.id)) {
        setOpenCategories(prev => [...prev, category.id]);
      }
    });
  }, [location.pathname]);

  return (
    <aside className="w-72 bg-sidebar h-full overflow-y-auto">
      {/* En-tête */}
      <div className="p-4 border-b border-sidebar-border">
        <h2 className="text-xl font-semibold flex items-center text-sidebar-foreground">
          <Settings className="w-5 h-5 mr-2 text-ivory-orange" />
          Paramètres
        </h2>
        <p className="text-sm text-sidebar-foreground/70 mt-1">Configuration globale de l'application</p>
      </div>

      {/* Contenu du menu */}
      <div className="py-2">
        {settingsCategories.map(category => (
          <Collapsible
            key={category.id}
            open={openCategories.includes(category.id)}
            onOpenChange={() => toggleCategory(category.id)}
            className="border-b border-sidebar-border/50"
          >
            <CollapsibleTrigger className="w-full">
              <div className={cn(
                "flex items-center justify-between px-4 py-3 hover:bg-sidebar-accent/30 cursor-pointer",
                isCategoryActive(category.items) ? "text-ivory-orange font-medium" : "text-sidebar-foreground"
              )}>
                <div className="flex items-center">
                  {React.cloneElement(category.icon, {
                    className: cn("mr-2", isCategoryActive(category.items) ? "text-ivory-orange" : "text-sidebar-foreground/70")
                  })}
                  <span>{category.name}</span>
                </div>
                <ChevronDown className={cn(
                  "h-4 w-4 transition-transform",
                  openCategories.includes(category.id) ? "transform rotate-180" : ""
                )} />
              </div>
            </CollapsibleTrigger>
            <CollapsibleContent>
              <div className="py-1 bg-sidebar-accent/10">
                <p className="text-xs text-sidebar-foreground/60 px-4 py-1">{category.description}</p>
                <ul className="space-y-1 py-2">
                  {category.items.map(item => (
                    <li key={item.id}>
                      <NavLink
                        to={item.route}
                        className={({ isActive }) => cn(
                          "flex items-center justify-between px-6 py-2 text-sm transition-colors",
                          isActive
                            ? "bg-sidebar-accent text-sidebar-accent-foreground font-medium"
                            : "text-sidebar-foreground/70 hover:bg-sidebar-accent/50 hover:text-sidebar-foreground"
                        )}
                      >
                        <div className="flex items-center">
                          {React.cloneElement(item.icon, { className: "w-4 h-4 mr-2" })}
                          <span>{item.name}</span>
                        </div>
                        <ChevronRight className={cn(
                          "h-4 w-4 transition-opacity",
                          isActive(item.route) ? "opacity-100" : "opacity-0"
                        )} />
                      </NavLink>
                    </li>
                  ))}
                </ul>
              </div>
            </CollapsibleContent>
          </Collapsible>
        ))}
      </div>
    </aside>
  );
};

export default SettingsSidebar;
