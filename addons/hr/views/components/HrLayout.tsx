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
  showMenu?: boolean; // Option pour masquer le menu si nécessaire
}

export const HrLayout: React.FC<HrLayoutProps> = ({ children, showMenu = true }) => {
  // Fonction pour extraire l'en-tête et le contenu des enfants
  const extractHeaderAndContent = () => {
    // Si children est un tableau, on cherche l'en-tête et le contenu
    if (React.Children.count(children) > 0) {
      // On suppose que le premier élément est un conteneur (div)
      const container = React.Children.only(children) as React.ReactElement;

      if (container && container.props && container.props.children) {
        // Trouver l'en-tête (généralement le premier élément avec className contenant "flex" et "justify-between")
        const childrenArray = React.Children.toArray(container.props.children);

        // On suppose que le premier élément est l'en-tête
        const header = childrenArray[0];

        // Le reste est considéré comme le contenu
        const content = childrenArray.slice(1);

        return { header, content };
      }
    }

    // Si on ne peut pas extraire, on retourne tout comme contenu
    return { header: null, content: children };
  };

  const { header, content } = extractHeaderAndContent();

  return (
    <div className="w-full adinkra-bg">
      {/* En-tête (s'il existe) */}
      {header}

      {/* Menu de navigation (affiché uniquement si showMenu est true) */}
      {showMenu && <HrNavigation />}

      {/* Contenu de la page */}
      <div className="w-full">
        {content}
      </div>
    </div>
  );
};
