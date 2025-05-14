import React from 'react';
import {
  LayoutDashboard,
  Users,
  Building2,
  FileText,
  CalendarDays,
  GraduationCap,
  Briefcase,
  Settings,
  BarChart,
  Receipt,
  CreditCard,
  FileBarChart,
  User,
  Home,
  Folder,
  Package,
  ShoppingCart,
  Truck,
  Box,
  Warehouse,
  Clipboard,
  ClipboardList,
  FileSpreadsheet,
  PieChart,
  TrendingUp,
  DollarSign,
  UserPlus,
  Target,
  Calendar,
  FolderKanban,
  CheckSquare,
  Clock,
  Hash,
  Globe,
  Languages,
  Search,
  Plus,
  Pencil,
  Trash2,
  Check,
  Info,
  Shield,
  Mail,
  Lock,
  MessageSquare
} from 'lucide-react';

/**
 * Convertit un nom d'icône en composant React
 * @param iconName Nom de l'icône
 * @param className Classes CSS à appliquer
 * @returns Composant d'icône
 */
export const getIconComponent = (iconName?: string, className: string = 'w-5 h-5') => {
  if (!iconName) return <div className={className} />;

  const props = { className };

  switch (iconName) {
    // Icônes générales
    case 'LayoutDashboard':
    case 'LayoutDashboardIcon':
      return <LayoutDashboard {...props} />;
    case 'Home':
    case 'HomeIcon':
      return <Home {...props} />;
    case 'Settings':
    case 'SettingsIcon':
      return <Settings {...props} />;

    // Icônes RH
    case 'User':
    case 'UserIcon':
      return <User {...props} />;
    case 'Users':
    case 'UsersIcon':
      return <Users {...props} />;
    case 'Building2':
    case 'Building2Icon':
    case 'Building':
    case 'BuildingIcon':
      return <Building2 {...props} />;
    case 'FileText':
    case 'FileTextIcon':
      return <FileText {...props} />;
    case 'CalendarDays':
    case 'CalendarDaysIcon':
      return <CalendarDays {...props} />;
    case 'GraduationCap':
    case 'GraduationCapIcon':
      return <GraduationCap {...props} />;
    case 'Briefcase':
    case 'BriefcaseIcon':
      return <Briefcase {...props} />;

    // Icônes Finance
    case 'BarChart':
    case 'BarChartIcon':
      return <BarChart {...props} />;
    case 'Receipt':
    case 'ReceiptIcon':
      return <Receipt {...props} />;
    case 'CreditCard':
    case 'CreditCardIcon':
      return <CreditCard {...props} />;
    case 'FileBarChart':
    case 'FileBarChartIcon':
      return <FileBarChart {...props} />;
    case 'DollarSign':
    case 'DollarSignIcon':
      return <DollarSign {...props} />;
    case 'PieChart':
    case 'PieChartIcon':
      return <PieChart {...props} />;
    case 'TrendingUp':
    case 'TrendingUpIcon':
      return <TrendingUp {...props} />;

    // Icônes Inventaire/Logistique
    case 'Package':
    case 'PackageIcon':
      return <Package {...props} />;
    case 'ShoppingCart':
    case 'ShoppingCartIcon':
      return <ShoppingCart {...props} />;
    case 'Truck':
    case 'TruckIcon':
      return <Truck {...props} />;
    case 'Box':
    case 'BoxIcon':
      return <Box {...props} />;
    case 'Warehouse':
    case 'WarehouseIcon':
      return <Warehouse {...props} />;

    // Icônes Documents
    case 'Clipboard':
    case 'ClipboardIcon':
      return <Clipboard {...props} />;
    case 'ClipboardList':
    case 'ClipboardListIcon':
      return <ClipboardList {...props} />;
    case 'FileSpreadsheet':
    case 'FileSpreadsheetIcon':
      return <FileSpreadsheet {...props} />;
    case 'Folder':
    case 'FolderIcon':
      return <Folder {...props} />;

    // Icônes pour les paramètres
    case 'UserPlus':
    case 'UserPlusIcon':
      return <UserPlus {...props} />;
    case 'Target':
    case 'TargetIcon':
      return <Target {...props} />;
    case 'Calendar':
    case 'CalendarIcon':
      return <Calendar {...props} />;
    case 'FolderKanban':
    case 'FolderKanbanIcon':
      return <FolderKanban {...props} />;
    case 'CheckSquare':
    case 'CheckSquareIcon':
      return <CheckSquare {...props} />;
    case 'Clock':
    case 'ClockIcon':
      return <Clock {...props} />;
    case 'Hash':
    case 'HashIcon':
      return <Hash {...props} />;
    case 'Globe':
    case 'GlobeIcon':
      return <Globe {...props} />;
    case 'Languages':
    case 'LanguagesIcon':
      return <Languages {...props} />;
    case 'Search':
    case 'SearchIcon':
      return <Search {...props} />;
    case 'Plus':
    case 'PlusIcon':
      return <Plus {...props} />;
    case 'Pencil':
    case 'PencilIcon':
      return <Pencil {...props} />;
    case 'Trash2':
    case 'Trash2Icon':
      return <Trash2 {...props} />;
    case 'Check':
    case 'CheckIcon':
      return <Check {...props} />;
    case 'Info':
    case 'InfoIcon':
      return <Info {...props} />;
    case 'Shield':
    case 'ShieldIcon':
      return <Shield {...props} />;
    case 'Mail':
    case 'MailIcon':
      return <Mail {...props} />;
    case 'Lock':
    case 'LockIcon':
      return <Lock {...props} />;
    case 'MessageSquare':
    case 'MessageSquareIcon':
      return <MessageSquare {...props} />;

    // Fallback
    default:
      console.warn(`Icône non trouvée: ${iconName}`);
      return <div className={className} />;
  }
};
