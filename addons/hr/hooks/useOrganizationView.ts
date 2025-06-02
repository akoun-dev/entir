import { useState, useCallback, useEffect } from 'react';
import { useOrgChart } from './useOrgChart';
import { useOrgChartConfig } from './useOrgChartConfig';
import { OrgChartPerson, Department } from '../types/organization';

/**
 * Hook pour gérer la vue de l'organisation
 * 
 * Ce hook combine les fonctionnalités de l'organigramme et de sa configuration
 * pour fournir une interface unifiée pour les composants de vue de l'organisation.
 */
export const useOrganizationView = () => {
  const { 
    orgChartData, 
    loading, 
    error, 
    lastUpdated, 
    searchPerson, 
    loadOrgChartData, 
    saveOrgChartData,
    isApiMode 
  } = useOrgChart();
  
  const { 
    config, 
    loaded: configLoaded, 
    saveConfig 
  } = useOrgChartConfig();
  
  // États supplémentaires pour la vue
  const [selectedPerson, setSelectedPerson] = useState<OrgChartPerson | null>(null);
  const [selectedDepartment, setSelectedDepartment] = useState<Department | null>(null);
  const [viewMode, setViewMode] = useState<'chart' | 'list' | 'grid'>('chart');
  const [searchQuery, setSearchQuery] = useState('');
  const [searchResults, setSearchResults] = useState<OrgChartPerson[]>([]);
  const [isSearching, setIsSearching] = useState(false);
  const [zoomLevel, setZoomLevel] = useState(1);
  
  // Fonction pour sélectionner une personne
  const handleSelectPerson = useCallback((person: OrgChartPerson | null) => {
    setSelectedPerson(person);
    
    // Si une personne est sélectionnée, trouver son département
    if (person && orgChartData.departments) {
      const dept = orgChartData.departments.find(d => 
        d.employees?.some(e => e.id === person.id)
      );
      
      setSelectedDepartment(dept || null);
    } else {
      setSelectedDepartment(null);
    }
  }, [orgChartData.departments]);
  
  // Fonction pour sélectionner un département
  const handleSelectDepartment = useCallback((department: Department | null) => {
    setSelectedDepartment(department);
    
    // Si un département est sélectionné, sélectionner son manager
    if (department) {
      setSelectedPerson(department.manager || null);
    } else {
      setSelectedPerson(null);
    }
  }, []);
  
  // Fonction pour changer le mode d'affichage
  const handleChangeViewMode = useCallback((mode: 'chart' | 'list' | 'grid') => {
    setViewMode(mode);
    
    // Sauvegarder la préférence dans la configuration
    saveConfig({ displayMode: mode });
  }, [saveConfig]);
  
  // Fonction pour effectuer une recherche
  const handleSearch = useCallback((query: string) => {
    setSearchQuery(query);
    
    if (!query.trim()) {
      setSearchResults([]);
      setIsSearching(false);
      return;
    }
    
    setIsSearching(true);
    const results = searchPerson(query);
    setSearchResults(results);
    setIsSearching(false);
  }, [searchPerson]);
  
  // Fonction pour zoomer
  const handleZoom = useCallback((level: number) => {
    // Limiter le niveau de zoom entre 0.5 et 2
    const newZoomLevel = Math.max(0.5, Math.min(2, level));
    setZoomLevel(newZoomLevel);
  }, []);
  
  // Fonction pour zoomer in/out
  const handleZoomIn = useCallback(() => {
    handleZoom(zoomLevel + 0.1);
  }, [zoomLevel, handleZoom]);
  
  const handleZoomOut = useCallback(() => {
    handleZoom(zoomLevel - 0.1);
  }, [zoomLevel, handleZoom]);
  
  const handleResetZoom = useCallback(() => {
    setZoomLevel(1);
  }, []);
  
  // Initialiser le mode d'affichage à partir de la configuration
  useEffect(() => {
    if (configLoaded && config.displayMode) {
      setViewMode(config.displayMode as 'chart' | 'list' | 'grid');
    }
  }, [configLoaded, config.displayMode]);
  
  // Fonction pour exporter l'organigramme
  const exportOrgChart = useCallback((format: 'pdf' | 'png' | 'svg' = 'pdf') => {
    // Cette fonction serait implémentée avec une bibliothèque d'exportation
    // comme html2canvas, jsPDF, etc.
    console.log(`Exporting org chart as ${format}...`);
    
    // Exemple d'implémentation simulée
    alert(`L'exportation au format ${format.toUpperCase()} sera disponible prochainement.`);
    
    return true;
  }, []);
  
  return {
    // Données de l'organigramme
    orgChartData,
    loading,
    error,
    lastUpdated,
    isApiMode,
    
    // Configuration
    config,
    configLoaded,
    saveConfig,
    
    // Sélection
    selectedPerson,
    selectedDepartment,
    handleSelectPerson,
    handleSelectDepartment,
    
    // Mode d'affichage
    viewMode,
    handleChangeViewMode,
    
    // Recherche
    searchQuery,
    searchResults,
    isSearching,
    handleSearch,
    
    // Zoom
    zoomLevel,
    handleZoom,
    handleZoomIn,
    handleZoomOut,
    handleResetZoom,
    
    // Actions
    loadOrgChartData,
    saveOrgChartData,
    exportOrgChart
  };
};

export default useOrganizationView;
