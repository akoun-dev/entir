import React, { createContext, useContext, useState, ReactNode } from 'react';

// Types pour le contexte du chatter
interface ChatterContextType {
  // État du chatter
  isVisible: boolean;      // Indique si le chatter est visible
  modelName: string | null; // Nom du modèle associé (ex: "employee", "invoice", etc.)
  modelId: number | null;   // ID de l'enregistrement associé

  // Actions disponibles
  showChatter: (modelName: string, modelId: number) => void; // Affiche le chatter pour un enregistrement spécifique
  hideChatter: () => void;  // Masque le chatter
  toggleChatter: () => void; // Bascule l'état de visibilité du chatter
}

// Valeurs par défaut du contexte
const defaultContext: ChatterContextType = {
  isVisible: false,
  modelName: null,
  modelId: null,

  showChatter: () => {},
  hideChatter: () => {},
  toggleChatter: () => {}
};

// Création du contexte
const ChatterContext = createContext<ChatterContextType>(defaultContext);

/**
 * Hook personnalisé pour utiliser le contexte du chatter
 *
 * Ce hook permet d'accéder facilement au contexte du chatter depuis n'importe quel composant.
 * Il fournit des méthodes pour afficher, masquer et basculer le chatter, ainsi que l'état actuel.
 */
export const useChatter = () => useContext(ChatterContext);

/**
 * Fournisseur du contexte du chatter
 *
 * Ce composant fournit le contexte du chatter à tous ses enfants.
 * Il gère l'état du chatter et les méthodes pour le manipuler.
 *
 * Doit être placé haut dans l'arbre des composants pour être accessible partout.
 */
export const ChatterProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  // État local
  const [isVisible, setIsVisible] = useState(false);
  const [modelName, setModelName] = useState<string | null>(null);
  const [modelId, setModelId] = useState<number | null>(null);

  // Afficher le chatter pour un modèle et un ID spécifiques
  const showChatter = (modelName: string, modelId: number) => {
    setModelName(modelName);
    setModelId(modelId);
    setIsVisible(true);
  };

  // Masquer le chatter
  const hideChatter = () => {
    setIsVisible(false);
  };

  // Basculer la visibilité du chatter
  const toggleChatter = () => {
    setIsVisible(prev => !prev);
  };

  // Valeur du contexte
  const contextValue: ChatterContextType = {
    isVisible,
    modelName,
    modelId,
    showChatter,
    hideChatter,
    toggleChatter
  };

  return (
    <ChatterContext.Provider value={contextValue}>
      {children}
    </ChatterContext.Provider>
  );
};

export default ChatterProvider;
