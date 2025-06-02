import React from 'react';
import { NavLink } from 'react-router-dom';

/**
 * Structure d'un élément de sous-navigation
 */
interface SubNavItem {
  path: string;
  label: string;
  icon?: React.ReactNode;
}

/**
 * Propriétés du composant HrSubNavigation
 */
interface HrSubNavigationProps {
  items: SubNavItem[];
}

/**
 * Composant de sous-navigation standardisé pour le module HR
 * Permet d'afficher une barre de navigation secondaire cohérente dans tous les modules
 */
export const HrSubNavigation: React.FC<HrSubNavigationProps> = ({ items }) => {
  return (
    <div className="bg-background border rounded-md mb-6">
      <nav className="flex flex-col md:flex-row">
        {items.map((item, index) => (
          <NavLink 
            key={index}
            to={item.path} 
            className={({ isActive }) => 
              `flex items-center gap-2 py-3 px-6 border-b md:border-b-0 md:border-r transition-colors
              ${isActive ? 'text-primary font-medium bg-accent/30' : 'hover:bg-accent/20'}
              ${index === items.length - 1 ? 'border-b-0 md:border-r-0' : ''}`
            }
          >
            {item.icon && <span>{item.icon}</span>}
            <span>{item.label}</span>
          </NavLink>
        ))}
      </nav>
    </div>
  );
};

export default HrSubNavigation;
