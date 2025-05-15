import React from 'react';
import { useChatter } from '@/contexts/ChatterContext';
import { useLocation } from 'react-router-dom';
import Chatter from './Chatter';

/**
 * Conteneur pour le composant Chatter
 * Utilise le contexte pour déterminer quand et comment afficher le chatter
 *
 * Ce composant est responsable de l'affichage conditionnel du chatter
 * en fonction de l'état du contexte. Il doit être placé dans un layout
 * pour être visible sur toutes les pages de l'application.
 *
 * Il agit comme une couche d'abstraction entre le contexte et le composant Chatter.
 *
 * Note: Le chatter est masqué sur les pages de paramètres, y compris:
 * - Les pages commençant par /settings
 * - Les pages de paramètres du module HR (/hr/settings et /hr/config)
 */
const ChatterContainer: React.FC = () => {
  const { isVisible, modelName, modelId } = useChatter();
  const location = useLocation();

  // Vérifier si nous sommes sur une page de paramètres
  // Cela inclut les URLs commençant par /settings, /hr/settings ou /hr/config
  const isSettingsPage = location.pathname.startsWith('/settings') ||
                         location.pathname.startsWith('/hr/settings') ||
                         location.pathname.startsWith('/hr/config');

  // Ne pas afficher le chatter sur les pages de paramètres
  if (isSettingsPage) {
    return null;
  }

  // Ne rien afficher si le chatter n'est pas visible ou si les informations du modèle sont manquantes
  if (!isVisible || !modelName || modelId === null) {
    return null;
  }

  return (
    <div className="mt-4 border-t pt-4">
      <Chatter
        modelName={modelName}
        modelId={modelId}
      />
    </div>
  );
};

export default ChatterContainer;
