
import React, { useState } from 'react';
import { Outlet } from 'react-router-dom';
import { DynamicSidebar } from './DynamicSidebar';
import { Header } from './Header';
import { Toaster } from '../ui/toaster';
import { Toaster as Sonner } from '../ui/sonner';
import { TooltipProvider } from '../ui/tooltip';

/**
 * Layout principal de l'application avec sidebar dynamique
 */
const MainLayout: React.FC = () => {
  const [sidebarOpen, setSidebarOpen] = useState(true);

  return (
    <TooltipProvider>
      <div className="relative flex min-h-screen bg-background">
        <Toaster />
        <Sonner />
        <DynamicSidebar
          isOpen={sidebarOpen}
          onToggle={() => setSidebarOpen(prev => !prev)}
        />
        <main className={`flex-1 transition-all duration-300 ${sidebarOpen ? 'md:ml-64' : 'md:ml-16'}`}>
          <Header toggleSidebar={() => setSidebarOpen(prev => !prev)} isSidebarOpen={sidebarOpen} />
          <div className="w-full transition-all">
            <Outlet />
          </div>
        </main>
      </div>
    </TooltipProvider>
  );
};

export default MainLayout;
