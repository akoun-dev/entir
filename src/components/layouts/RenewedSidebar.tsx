
import React from 'react';
import { NavLink, Link, useLocation } from 'react-router-dom';
import { cn } from '../../lib/utils';
import {
  ChevronLeft,
  ChevronRight,
  LayoutDashboard,
  Users,
  Building2,
  FileText,
  CalendarDays,
  GraduationCap,
  Briefcase,
  Settings,
  LogOut,
  ChevronDown
} from 'lucide-react';
import { Button } from '../ui/button';
import { Tooltip, TooltipContent, TooltipTrigger } from '../ui/tooltip';
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from '../ui/collapsible';

interface RenewedSidebarProps {
  isOpen: boolean;
  onToggle: () => void;
}

export const RenewedSidebar: React.FC<RenewedSidebarProps> = ({ isOpen, onToggle }) => {
  const location = useLocation();
  const [openSection, setOpenSection] = React.useState<string | null>('hr');

  // Menu principal
  const mainMenuItems = [
    { 
      id: 'dashboard', 
      name: 'Tableau de bord', 
      icon: <LayoutDashboard className="w-5 h-5" />, 
      route: '/', 
      activePattern: /^\/$/ 
    },
  ];
  
  // Menu RH
  const hrMenuItems = [
    { 
      id: 'hr-dashboard', 
      name: 'Vue d\'ensemble', 
      icon: <LayoutDashboard className="w-4 h-4" />, 
      route: '/hr', 
      activePattern: /^\/hr$/ 
    },
    { 
      id: 'employees', 
      name: 'Employés', 
      icon: <Users className="w-4 h-4" />, 
      route: '/hr/employees', 
      activePattern: /^\/hr\/employees/ 
    },
    { 
      id: 'departments', 
      name: 'Départements', 
      icon: <Building2 className="w-4 h-4" />, 
      route: '/hr/departments', 
      activePattern: /^\/hr\/departments/ 
    },
    { 
      id: 'contracts', 
      name: 'Contrats', 
      icon: <FileText className="w-4 h-4" />, 
      route: '/hr/contracts', 
      activePattern: /^\/hr\/contracts/ 
    },
    { 
      id: 'leaves', 
      name: 'Congés', 
      icon: <CalendarDays className="w-4 h-4" />, 
      route: '/hr/leaves', 
      activePattern: /^\/hr\/leaves/ 
    },
    { 
      id: 'recruitment', 
      name: 'Recrutement', 
      icon: <Briefcase className="w-4 h-4" />, 
      route: '/hr/recruitment', 
      activePattern: /^\/hr\/recruitment/ 
    },
    { 
      id: 'training', 
      name: 'Formation', 
      icon: <GraduationCap className="w-4 h-4" />, 
      route: '/hr/training', 
      activePattern: /^\/hr\/training/ 
    }
  ];
  
  // Vérifier si un item est actif
  const isActive = (pattern: RegExp) => pattern.test(location.pathname);
  
  // Vérifier si une section est active (pour le highlight du menu collapsible)
  const isSectionActive = (items: any[]) => items.some(item => isActive(item.activePattern));

  return (
    <aside 
      className={cn(
        "fixed inset-y-0 left-0 z-30 bg-sidebar transition-all duration-300 shadow-md border-r border-sidebar-border flex flex-col",
        isOpen ? "w-64" : "w-16"
      )}
    >
      {/* Logo et brand */}
      <div className={cn(
        "h-16 px-4 flex items-center border-b border-sidebar-border",
        isOpen ? "justify-between" : "justify-center"
      )}>
        {isOpen ? (
          <>
            <Link to="/" className="flex items-center space-x-2">
              <div className="w-8 h-8 bg-gradient-to-br from-ivory-orange to-ivory-orange/70 rounded-lg flex items-center justify-center">
                <span className="text-white font-bold">HR</span>
              </div>
              <span className="text-xl font-medium text-sidebar-foreground">ENTIDR</span>
            </Link>
            <Button 
              variant="ghost" 
              size="icon" 
              onClick={onToggle} 
              className="h-8 w-8 text-sidebar-foreground"
            >
              <ChevronLeft className="h-4 w-4" />
            </Button>
          </>
        ) : (
          <Button variant="ghost" size="icon" onClick={onToggle}>
            <ChevronRight className="h-4 w-4" />
          </Button>
        )}
      </div>
      
      {/* Contenu du menu */}
      <div className="flex-1 overflow-y-auto py-4 px-3">
        {/* Menu principal */}
        <nav className="space-y-1.5 mb-6">
          {mainMenuItems.map(item => isOpen ? (
            <NavLink
              key={item.id}
              to={item.route}
              className={({ isActive }) => cn(
                "flex items-center px-3 py-2 rounded-md text-sm font-medium transition-colors",
                isActive 
                  ? "bg-sidebar-accent text-sidebar-accent-foreground"
                  : "text-sidebar-foreground/70 hover:bg-sidebar-accent/50 hover:text-sidebar-foreground"
              )}
            >
              {item.icon}
              <span className="ml-3">{item.name}</span>
            </NavLink>
          ) : (
            <Tooltip key={item.id}>
              <TooltipTrigger asChild>
                <NavLink
                  to={item.route}
                  className={({ isActive }) => cn(
                    "flex justify-center items-center p-2 rounded-md",
                    isActive 
                      ? "bg-sidebar-accent text-sidebar-accent-foreground"
                      : "text-sidebar-foreground/70 hover:bg-sidebar-accent/50 hover:text-sidebar-foreground"
                  )}
                >
                  {item.icon}
                </NavLink>
              </TooltipTrigger>
              <TooltipContent side="right">{item.name}</TooltipContent>
            </Tooltip>
          ))}
        </nav>
        
        {/* Séparateur */}
        <div className="mx-3 h-px bg-sidebar-border my-4" />
        
        {/* Menu RH avec collapse */}
        <div className="mb-6">
          {isOpen ? (
            <Collapsible
              open={openSection === 'hr'}
              onOpenChange={() => setOpenSection(openSection === 'hr' ? null : 'hr')}
            >
              <CollapsibleTrigger asChild>
                <div 
                  className={cn(
                    "flex items-center justify-between px-3 py-2 rounded-md cursor-pointer text-sm font-medium",
                    isSectionActive(hrMenuItems) 
                      ? "text-sidebar-foreground" 
                      : "text-sidebar-foreground/70 hover:text-sidebar-foreground"
                  )}
                >
                  <div className="flex items-center">
                    <Users className="h-5 w-5 text-ivory-orange" />
                    <span className="ml-3">Ressources Humaines</span>
                  </div>
                  <ChevronDown className={cn(
                    "h-4 w-4 transition-transform",
                    openSection === 'hr' ? "transform rotate-180" : ""
                  )} />
                </div>
              </CollapsibleTrigger>
              <CollapsibleContent className="mt-1 ml-2">
                <ul className="pl-4 space-y-1">
                  {hrMenuItems.map(item => (
                    <li key={item.id}>
                      <NavLink
                        to={item.route}
                        className={({ isActive }) => cn(
                          "flex items-center px-3 py-2 rounded-md text-sm",
                          isActive 
                            ? "bg-sidebar-accent text-sidebar-accent-foreground font-medium"
                            : "text-sidebar-foreground/70 hover:bg-sidebar-accent/50 hover:text-sidebar-foreground"
                        )}
                      >
                        {item.icon}
                        <span className="ml-3">{item.name}</span>
                      </NavLink>
                    </li>
                  ))}
                </ul>
              </CollapsibleContent>
            </Collapsible>
          ) : (
            <Tooltip>
              <TooltipTrigger asChild>
                <NavLink
                  to="/hr"
                  className={cn(
                    "flex justify-center items-center p-2 rounded-md",
                    location.pathname.startsWith('/hr') 
                      ? "bg-sidebar-accent text-sidebar-accent-foreground"
                      : "text-sidebar-foreground/70 hover:bg-sidebar-accent/50 hover:text-sidebar-foreground"
                  )}
                >
                  <Users className="h-5 w-5" />
                </NavLink>
              </TooltipTrigger>
              <TooltipContent side="right">Ressources Humaines</TooltipContent>
            </Tooltip>
          )}
        </div>
        
        {/* Menu de configuration */}
        {isOpen ? (
          <div className="px-3 py-2">
            <p className="text-xs font-semibold text-sidebar-foreground/50 uppercase tracking-wider mb-2 px-2">
              Configuration
            </p>
            <NavLink
              to="/settings"
              className={({ isActive }) => cn(
                "flex items-center px-3 py-2 rounded-md text-sm font-medium transition-colors",
                isActive 
                  ? "bg-sidebar-accent text-sidebar-accent-foreground"
                  : "text-sidebar-foreground/70 hover:bg-sidebar-accent/50 hover:text-sidebar-foreground"
              )}
            >
              <Settings className="h-4 w-4" />
              <span className="ml-3">Paramètres</span>
            </NavLink>
          </div>
        ) : (
          <Tooltip>
            <TooltipTrigger asChild>
              <NavLink
                to="/settings"
                className={cn(
                  "flex justify-center items-center p-2 rounded-md",
                  location.pathname === '/settings' 
                    ? "bg-sidebar-accent text-sidebar-accent-foreground"
                    : "text-sidebar-foreground/70 hover:bg-sidebar-accent/50 hover:text-sidebar-foreground"
                )}
              >
                <Settings className="h-4 w-4" />
              </NavLink>
            </TooltipTrigger>
            <TooltipContent side="right">Paramètres</TooltipContent>
          </Tooltip>
        )}
      </div>
      
      {/* Footer avec profil utilisateur */}
      <div className={cn(
        "border-t border-sidebar-border p-4",
        isOpen ? "block" : "hidden"
      )}>
        <div className="flex items-center">
          <div className="w-8 h-8 rounded-full bg-ivory-orange/20 flex items-center justify-center text-ivory-orange">
            <span className="text-sm font-medium">U</span>
          </div>
          <div className="ml-3">
            <p className="text-sm font-medium text-sidebar-foreground">Utilisateur</p>
            <p className="text-xs text-sidebar-foreground/60">utilisateur@example.com</p>
          </div>
          <Button variant="ghost" size="icon" className="ml-auto h-8 w-8 text-sidebar-foreground/70">
            <LogOut className="h-4 w-4" />
          </Button>
        </div>
      </div>
    </aside>
  );
};
