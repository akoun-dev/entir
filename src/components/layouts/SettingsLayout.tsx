import React, { useState } from 'react';
import { Outlet } from 'react-router-dom';
import { DynamicSidebar } from './DynamicSidebar';
import SettingsSidebar from './SettingsSidebar';
import { cn } from '../../lib/utils';
import { Button } from '../../components/ui/button';
import { Menu, X } from 'lucide-react';

/**
 * Layout spécifique pour les pages de paramètres
 * Ce layout inclut la sidebar principale et une sidebar spécifique pour les paramètres
 */
const SettingsLayout: React.FC = () => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);
  const [isSettingsSidebarOpen, setIsSettingsSidebarOpen] = useState(true);

  // Gérer l'ouverture/fermeture de la sidebar principale
  const handleSidebarToggle = () => {
    setIsSidebarOpen(!isSidebarOpen);
  };

  // Gérer l'ouverture/fermeture de la sidebar des paramètres
  const handleSettingsSidebarToggle = () => {
    setIsSettingsSidebarOpen(!isSettingsSidebarOpen);
  };

  return (
    <div className="flex-1 h-screen overflow-hidden bg-background">
      {/* Contenu avec sidebar des paramètres */}
      <div className="flex-1 flex">
        {/* Sidebar des paramètres */}
        <div className={cn(
          "h-full transition-all duration-300 hidden md:block border-r border-sidebar-border",
          isSettingsSidebarOpen ? "w-72" : "w-0 opacity-0"
        )}>
          <SettingsSidebar />
        </div>

        {/* Contenu principal */}
        <main className="flex-1 overflow-y-auto">
          {/* Bouton pour afficher/masquer la sidebar des paramètres sur mobile */}
          <div className="md:hidden p-2 border-b">
            <Button variant="outline" size="sm" onClick={handleSettingsSidebarToggle}>
              <Menu className="h-4 w-4 mr-2" />
              Menu des paramètres
            </Button>
          </div>

          {/* Sidebar des paramètres sur mobile */}
          <div className={cn(
            "fixed inset-0 z-50 bg-background/80 backdrop-blur-sm transition-all duration-300 md:hidden",
            isSettingsSidebarOpen ? "opacity-100" : "opacity-0 pointer-events-none"
          )}>
            <div className={cn(
              "fixed inset-y-0 left-0 z-50 w-72 bg-sidebar border-r border-sidebar-border transition-transform duration-300",
              isSettingsSidebarOpen ? "translate-x-0" : "-translate-x-full"
            )}>
              <SettingsSidebar />
              <Button
                variant="outline"
                size="sm"
                className="absolute top-4 right-4"
                onClick={handleSettingsSidebarToggle}
              >
                <X className="h-4 w-4 mr-2" />
                Fermer
              </Button>
            </div>
          </div>

          {/* Contenu de la page */}
          <div className="w-full">
            <Outlet />
          </div>
        </main>
      </div>
    </div>
  );
};

export default SettingsLayout;
