
import React, { useEffect } from 'react';
import { HrLayout } from '../components';
import { Skeleton } from '../../../../src/components/ui/skeleton';
import { Tabs } from '../../../../src/components/ui/tabs';
import { Button } from '../../../../src/components/ui/button';
import { RotateCw, RefreshCw } from 'lucide-react';
import { toast } from 'sonner';
import {
  OrgPageHeader,
  OrgNavTabs,
  OrgTabsContent,
  PersonDetail
} from '../../components/organization';
import { useOrganizationView } from '../../hooks/useOrganizationView';
import ApiService from '../../services/apiService';

/**
 * Page d'affichage de l'organigramme
 */
const OrganizationView: React.FC = () => {
  const {
    activeTab,
    setActiveTab,
    selectedPerson,
    configDialogOpen,
    setConfigDialogOpen,
    importDialogOpen,
    setImportDialogOpen,
    hasUnsavedChanges,
    displayData,
    loading,
    error,
    loadingUpdate,
    isApiMode,
    handlePersonClick,
    handleDepartmentClick,
    handleStructureChange,
    handleSaveOrganizationData,
    refreshData
  } = useOrganizationView();

  // Initialize API service if configuration exists
  useEffect(() => {
    try {
      const savedConfig = localStorage.getItem('api_config');
      if (savedConfig) {
        const config = JSON.parse(savedConfig);
        
        if (config.apiUrl) {
          console.log("Initializing API service from saved config");
          
          // Initialize the API service
          ApiService.initialize({
            baseUrl: config.apiUrl,
            timeout: (config.timeout || 15) * 1000,
          });
          
          // Load pending requests
          ApiService.loadPendingRequestsFromStorage();
        }
      }
    } catch (error) {
      console.error("Error initializing API service:", error);
    }
  }, []);

  // Auto-refresh data on component mount
  useEffect(() => {
    console.log("OrganizationView: Component mounted, refreshing data");
    refreshData();
    
    // Set up periodic refresh (every 5 minutes)
    const refreshInterval = setInterval(() => {
      console.log("OrganizationView: Periodic refresh triggered");
      refreshData();
    }, 5 * 60 * 1000);
    
    return () => clearInterval(refreshInterval);
  }, [refreshData]);

  // Force refresh with cache clearing
  const handleForceRefresh = () => {
    try {
      // Clear the cache from localStorage
      localStorage.removeItem('orgChartData');
      toast.success("Cache effacé, rechargement des données");
      
      // Refresh data
      refreshData();
    } catch (e) {
      console.error("Erreur lors du rafraîchissement forcé:", e);
      toast.error("Erreur lors du rafraîchissement forcé");
    }
  };

  // Handler for API configuration saved
  const handleApiConfigSaved = () => {
    toast.success("Configuration API enregistrée, rechargement des données");
    refreshData();
  };

  // Log the component state for debugging
  console.log("OrganizationView rendering with:", {
    activeTab,
    hasData: !!displayData,
    loading,
    loadingUpdate,
    hasUnsavedChanges,
    hasRootPerson: !!displayData?.rootPerson,
    hasDepartments: displayData?.departments?.length,
    isApiMode
  });

  if (loading) {
    return (
      <HrLayout>
        <div className="space-y-6">
          <OrgLoadingSkeleton />
        </div>
      </HrLayout>
    );
  }

  if (error) {
    return (
      <HrLayout>
        <div className="p-6 text-center">
          <h2 className="text-xl font-medium text-red-600 mb-2">Erreur</h2>
          <p>{error}</p>
          <Button 
            variant="outline" 
            className="mt-4"
            onClick={refreshData}
          >
            <RotateCw className="h-4 w-4 mr-2" />
            Réessayer
          </Button>
        </div>
      </HrLayout>
    );
  }

  return (
    <HrLayout>
      <div>
        {/* Header with action buttons */}
        <OrgPageHeader
          hasUnsavedChanges={hasUnsavedChanges}
          onSave={handleSaveOrganizationData}
          importDialogOpen={importDialogOpen}
          setImportDialogOpen={setImportDialogOpen}
          configDialogOpen={configDialogOpen}
          setConfigDialogOpen={setConfigDialogOpen}
          isApiMode={isApiMode}
          onApiConfigSave={handleApiConfigSaved}
        />

        {/* Refresh buttons */}
        <div className="flex justify-end mb-4 gap-2">
          <Button
            variant="secondary"
            size="sm"
            onClick={handleForceRefresh}
            disabled={loadingUpdate}
            className="flex items-center gap-2"
            title="Effacer le cache et recharger les données"
          >
            <RefreshCw className="h-4 w-4" />
            Réinitialiser
          </Button>
          <Button
            variant="outline"
            size="sm"
            onClick={refreshData}
            disabled={loadingUpdate}
            className="flex items-center gap-2"
          >
            <RotateCw className={`h-4 w-4 ${loadingUpdate ? 'animate-spin' : ''}`} />
            {loadingUpdate ? 'Mise à jour...' : 'Rafraîchir'}
          </Button>
        </div>

        {/* Navigation Tabs with disabled state during loading */}
        <Tabs value={activeTab} onValueChange={setActiveTab}>
          <OrgNavTabs 
            activeTab={activeTab} 
            onTabChange={setActiveTab} 
            disabled={loadingUpdate}
          />

          {/* Tab content with loading state */}
          <OrgTabsContent
            activeTab={activeTab}
            displayData={displayData}
            onPersonClick={handlePersonClick}
            onDepartmentClick={handleDepartmentClick}
            onStructureChange={handleStructureChange}
            isLoading={loadingUpdate}
          />
        </Tabs>

        {/* Selected Person Details */}
        {selectedPerson && <PersonDetail person={selectedPerson} />}
      </div>
    </HrLayout>
  );
};

// Loading skeleton component
const OrgLoadingSkeleton: React.FC = () => (
  <>
    <div className="flex items-center gap-2 mb-6">
      <div className="h-6 w-1.5 bg-amber-500 rounded-full"></div>
      <div className="h-6 w-6 bg-amber-500 rounded-full"></div>
      <h1 className="text-2xl font-bold">Organigramme</h1>
    </div>
    <Skeleton className="h-12 w-full mb-6" />
    <Skeleton className="h-[600px] w-full" />
  </>
);

export default OrganizationView;
