
import { useState, useCallback, useEffect } from 'react';
import { OrgChartPerson, OrgChartDepartment, OrgChartData } from '../types/organization';
import { useOrgChart } from './useOrgChart';
import { toast } from 'sonner';
import { useLocation, useNavigate } from 'react-router-dom';

export const useOrganizationView = () => {
  const { orgChartData, loading, error, loadOrgChartData, saveOrgChartData, isApiMode } = useOrgChart();
  const location = useLocation();
  const navigate = useNavigate();
  
  // Get the active tab from URL query params or localStorage
  const getInitialTab = () => {
    const params = new URLSearchParams(location.search);
    const tabFromUrl = params.get('tab');
    
    if (tabFromUrl && ['chart', 'departments', 'employees'].includes(tabFromUrl)) {
      return tabFromUrl;
    }
    
    const savedTab = localStorage.getItem('orgChartActiveTab');
    if (savedTab && ['chart', 'departments', 'employees'].includes(savedTab)) {
      return savedTab;
    }
    
    return 'chart'; // Default tab
  };

  const [activeTab, setActiveTab] = useState(getInitialTab());
  const [selectedPerson, setSelectedPerson] = useState<OrgChartPerson | null>(null);
  const [selectedDepartment, setSelectedDepartment] = useState<OrgChartDepartment | null>(null);
  const [configDialogOpen, setConfigDialogOpen] = useState(false);
  const [importDialogOpen, setImportDialogOpen] = useState(false);
  const [hasUnsavedChanges, setHasUnsavedChanges] = useState(false);
  const [localOrgData, setLocalOrgData] = useState<OrgChartData | null>(null);
  const [loadingUpdate, setLoadingUpdate] = useState(false);

  // Save active tab to localStorage and update URL when it changes
  useEffect(() => {
    localStorage.setItem('orgChartActiveTab', activeTab);
    
    // Update URL query params without full navigation
    const params = new URLSearchParams(location.search);
    params.set('tab', activeTab);
    const newUrl = `${location.pathname}?${params.toString()}`;
    navigate(newUrl, { replace: true });
  }, [activeTab, location.pathname, location.search, navigate]);

  // Update tab handler with debounce protection
  const handleTabChange = useCallback((newTab: string) => {
    if (loadingUpdate) return; // Prevent tab changes during loading
    setActiveTab(newTab);
  }, [loadingUpdate]);

  // Load organization data when component mounts
  useEffect(() => {
    if (orgChartData && Object.keys(orgChartData).length > 0) {
      setLocalOrgData(orgChartData);
    }
  }, [orgChartData]);

  // Refresh data function with debouncing
  const refreshData = useCallback(async () => {
    if (loadingUpdate) return; // Prevent multiple simultaneous refreshes
    
    setLoadingUpdate(true);
    try {
      await loadOrgChartData();
      toast.success("Données de l'organigramme mises à jour");
    } catch (error) {
      toast.error("Erreur lors de la mise à jour des données");
    } finally {
      setLoadingUpdate(false);
    }
  }, [loadOrgChartData, loadingUpdate]);

  const handlePersonClick = useCallback((person: OrgChartPerson) => {
    setSelectedPerson(person);
    setSelectedDepartment(null); // Clear other selection
  }, []);

  const handleDepartmentClick = useCallback((department: OrgChartDepartment) => {
    setSelectedDepartment(department);
    setSelectedPerson(null); // Clear other selection
  }, []);

  const handleStructureChange = useCallback((updatedRoot: OrgChartPerson) => {
    // In a real app, this would call an API to save the changes
    setLocalOrgData(prev => {
      if (!prev) return orgChartData;
      return {
        ...prev,
        rootPerson: updatedRoot
      };
    });
    
    setHasUnsavedChanges(true);
    toast.success("Structure de l'organigramme mise à jour");
  }, [orgChartData]);

  const handleSaveOrganizationData = useCallback(async () => {
    if (!localOrgData || !localOrgData.rootPerson) return;
    
    setLoadingUpdate(true);
    try {
      // Save using the API service
      const success = await saveOrgChartData(localOrgData.rootPerson);
      
      if (success) {
        toast.success(isApiMode ? 
          "Données enregistrées dans la base de données" : 
          "Données enregistrées localement (mode hors ligne)"
        );
        setHasUnsavedChanges(false);
      } else {
        throw new Error("Échec de l'enregistrement");
      }
    } catch (error) {
      console.error("Erreur lors de l'enregistrement:", error);
      toast.error("Erreur lors de l'enregistrement des modifications");
    } finally {
      setLoadingUpdate(false);
    }
  }, [localOrgData, saveOrgChartData, isApiMode]);

  // Use local data if available, otherwise use data from the hook
  const displayData = localOrgData || orgChartData;

  return {
    activeTab,
    setActiveTab: handleTabChange,
    selectedPerson,
    selectedDepartment,
    configDialogOpen,
    setConfigDialogOpen,
    importDialogOpen,
    setImportDialogOpen,
    hasUnsavedChanges,
    localOrgData,
    displayData,
    loading,
    loadingUpdate,
    error,
    isApiMode,
    handlePersonClick,
    handleDepartmentClick,
    handleStructureChange,
    handleSaveOrganizationData,
    refreshData
  };
};
