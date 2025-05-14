import React from 'react';
import { Link } from 'react-router-dom';
import MainMenu from './MainMenu';
import { useIsMobile } from '../hooks/use-mobile';
import { Button } from './ui/button';
import { X } from 'lucide-react';

interface SidebarProps {
  isOpen: boolean;
  onClose: () => void;
}

/**
 * Composant Sidebar pour l'application
 */
export const Sidebar: React.FC<SidebarProps> = ({ isOpen, onClose }) => {
  const isMobile = useIsMobile();

  const sidebarClasses = `
    fixed top-0 left-0 z-40 h-screen
    transition-transform duration-300 ease-in-out
    bg-sidebar border-r border-sidebar-border
    w-64 p-4 flex flex-col
    ${isOpen ? 'translate-x-0' : '-translate-x-full'}
    ${isMobile ? 'md:hidden' : 'md:translate-x-0'}
  `;

  return (
    <>
      {/* Overlay pour mobile */}
      {isMobile && isOpen && (
        <div
          className="fixed inset-0 bg-black/50 z-30 md:hidden"
          onClick={onClose}
        />
      )}

      <aside className={sidebarClasses}>
        <div className="flex items-center justify-between mb-6">
          <Link to="/" className="flex items-center space-x-2" onClick={isMobile ? onClose : undefined}>
            <div className="w-8 h-8 bg-gradient-to-br from-primary to-primary/70 rounded-lg"></div>
            <span className="text-xl font-medium">ENTIDR - Lovable</span>
          </Link>

          {isMobile && (
            <Button variant="ghost" size="icon" onClick={onClose}>
              <X className="h-5 w-5" />
            </Button>
          )}
        </div>

        <div className="flex-1 overflow-y-auto">
          <MainMenu />
        </div>

        <div className="mt-auto pt-4 border-t border-sidebar-border">
          <div className="flex items-center space-x-3">
            <div className="w-8 h-8 rounded-full bg-primary/20 flex items-center justify-center">
              <span className="text-sm font-medium">U</span>
            </div>
            <div>
              <p className="text-sm font-medium">Utilisateur</p>
              <p className="text-xs text-muted-foreground">utilisateur@example.com</p>
            </div>
          </div>
        </div>
      </aside>
    </>
  );
};

export default Sidebar;
