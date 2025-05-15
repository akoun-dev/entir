import React from 'react';
import { Link } from 'react-router-dom';
import {
  Settings,
  Users,
  Shield,
  Bell,
  ChevronRight,
  ArrowLeft,
  Sliders
} from 'lucide-react';
import { cn } from '../../../../src/lib/utils';
import { Button } from '../../../../src/components/ui/button';

/**
 * Sidebar verticale pour les paramètres RH
 */
export const HrSettingsSidebar: React.FC<{
  activeTab: string;
  onTabChange: (tab: string) => void;
}> = ({ activeTab, onTabChange }) => {
  // Définition des éléments du menu
  const menuItems = [
    {
      id: 'general',
      name: 'Général',
      icon: <Settings className="h-4 w-4" />
    },
    {
      id: 'employees',
      name: 'Employés',
      icon: <Users className="h-4 w-4" />
    },
    {
      id: 'permissions',
      name: 'Permissions',
      icon: <Shield className="h-4 w-4" />
    },
  ];

  return (
    <div className="w-72 h-full bg-card border-r border-border overflow-y-auto">
      <div className="sticky top-0 bg-card/80 backdrop-blur-sm border-b p-4 mb-2">
        <div className="flex items-center justify-between">
          <h3 className="font-semibold text-lg flex items-center gap-2">
            <Settings className="h-5 w-5 text-primary" />
            Paramètres RH
          </h3>
        </div>
        <p className="text-xs text-muted-foreground mt-1">
          Configuration du module Ressources Humaines
        </p>
      </div>

      <div className="px-2 pb-4">
        {menuItems.map((item) => (
          <button
            key={item.id}
            onClick={() => onTabChange(item.id)}
            className={cn(
              "flex items-center justify-between w-full px-4 py-3 text-sm rounded-md transition-all my-1",
              activeTab === item.id
                ? "bg-primary text-primary-foreground font-medium shadow-sm"
                : "hover:bg-muted/50 text-muted-foreground hover:text-foreground"
            )}
          >
            <div className="flex items-center gap-3">
              <div className={cn(
                "p-1.5 rounded-md",
                activeTab === item.id
                  ? "bg-primary-foreground/20"
                  : "bg-background"
              )}>
                {item.icon}
              </div>
              <span>{item.name}</span>
            </div>
            {activeTab === item.id && <ChevronRight className="h-4 w-4" />}
          </button>
        ))}
      </div>
    </div>
  );
};
