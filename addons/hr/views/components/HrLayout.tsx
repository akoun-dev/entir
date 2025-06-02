import React from 'react';
import { HrNavigation } from './HrNavigation';

/**
 * Layout commun pour toutes les vues du module HR
 * Ce composant inclut le menu de navigation et évite la duplication
 * Il standardise également la position du menu pour assurer une cohérence visuelle
 *
 * Note: Les marges ont été réduites pour éviter l'espace excessif entre la sidebar et les vues
 * et pour s'intégrer harmonieusement avec le layout principal de l'application.
 */
interface HrLayoutProps {
  children: React.ReactNode;
  showMenu?: boolean; // Option pour masquer le menu si nécessaire (par exemple dans les paramètres)
  showBreadcrumb?: boolean; // Option pour afficher le fil d'Ariane
}

export const HrLayout: React.FC<HrLayoutProps> = ({
  children,
  showMenu = true,
  showBreadcrumb = true
}) => {
  return (
    <div className="w-full adinkra-bg">
      {/* Menu de navigation (affiché uniquement si showMenu est true) */}
      {showMenu && <HrNavigation />}

      {/* Contenu de la page */}
      <div className="w-full">
        {children}
      </div>
    </div>
  );
};
