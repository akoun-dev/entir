import { useState, useEffect, useCallback } from 'react';
import { OrgChartConfiguration } from '../types/organization';

/**
 * Hook pour gérer la configuration de l'organigramme
 * 
 * Ce hook permet de charger, modifier et sauvegarder la configuration
 * de l'organigramme (couleurs, affichage des informations, etc.)
 */
export const useOrgChartConfig = () => {
  // Configuration par défaut de l'organigramme
  const defaultConfig: OrgChartConfiguration = {
    showEmail: true,
    showPhone: true,
    showDepartment: true,
    showPosition: true,
    colorByDepartment: true,
    departmentColors: {
      'Direction Générale': '#4F46E5', // Indigo
      'Ressources Humaines': '#10B981', // Emerald
      'Finance': '#F59E0B', // Amber
      'Technique': '#3B82F6', // Blue
      'Marketing': '#EC4899', // Pink
      'Ventes': '#8B5CF6', // Purple
      'Production': '#EF4444', // Red
      'Logistique': '#F97316', // Orange
      'Juridique': '#6366F1', // Indigo
      'Recherche et Développement': '#14B8A6', // Teal
    },
    defaultNodeColor: '#64748B', // Slate
    nodeWidth: 220,
    nodeHeight: 120,
    maxDepth: 5,
    displayMode: 'hierarchical',
    allowDragDrop: true,
    restrictDragToSameLevel: false,
    confirmOnDrop: true,
    animateDragDrop: true
  };

  // État pour stocker la configuration
  const [config, setConfig] = useState<OrgChartConfiguration>(defaultConfig);
  const [loaded, setLoaded] = useState(false);
  const [error, setError] = useState<string | null>(null);

  // Clé pour le stockage local
  const CONFIG_STORAGE_KEY = 'orgChartConfig';

  // Charger la configuration depuis le stockage local
  const loadConfig = useCallback(() => {
    try {
      const storedConfig = localStorage.getItem(CONFIG_STORAGE_KEY);
      
      if (storedConfig) {
        const parsedConfig = JSON.parse(storedConfig);
        setConfig(prevConfig => ({
          ...prevConfig,
          ...parsedConfig
        }));
      }
      
      setLoaded(true);
    } catch (err) {
      console.error('Erreur lors du chargement de la configuration de l\'organigramme:', err);
      setError('Impossible de charger la configuration de l\'organigramme.');
      setLoaded(true);
    }
  }, []);

  // Sauvegarder la configuration dans le stockage local
  const saveConfig = useCallback((newConfig: Partial<OrgChartConfiguration>) => {
    try {
      // Mettre à jour l'état
      setConfig(prevConfig => {
        const updatedConfig = { ...prevConfig, ...newConfig };
        
        // Sauvegarder dans le stockage local
        localStorage.setItem(CONFIG_STORAGE_KEY, JSON.stringify(updatedConfig));
        
        return updatedConfig;
      });
      
      return true;
    } catch (err) {
      console.error('Erreur lors de la sauvegarde de la configuration de l\'organigramme:', err);
      setError('Impossible de sauvegarder la configuration de l\'organigramme.');
      return false;
    }
  }, []);

  // Réinitialiser la configuration aux valeurs par défaut
  const resetConfig = useCallback(() => {
    try {
      setConfig(defaultConfig);
      localStorage.setItem(CONFIG_STORAGE_KEY, JSON.stringify(defaultConfig));
      return true;
    } catch (err) {
      console.error('Erreur lors de la réinitialisation de la configuration de l\'organigramme:', err);
      setError('Impossible de réinitialiser la configuration de l\'organigramme.');
      return false;
    }
  }, []);

  // Mettre à jour une couleur de département
  const updateDepartmentColor = useCallback((department: string, color: string) => {
    return saveConfig({
      departmentColors: {
        ...config.departmentColors,
        [department]: color
      }
    });
  }, [config.departmentColors, saveConfig]);

  // Charger la configuration au montage du composant
  useEffect(() => {
    loadConfig();
  }, [loadConfig]);

  return {
    config,
    loaded,
    error,
    saveConfig,
    resetConfig,
    updateDepartmentColor
  };
};

export default useOrgChartConfig;
