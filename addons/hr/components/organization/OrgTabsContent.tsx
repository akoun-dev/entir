
import React from 'react';
import { TabsContent } from '../../../../src/components/ui/tabs';
import OrgChart from './OrgChart';
import OrgDepartments from './OrgDepartments';
import OrgEmployeeList from './OrgEmployeeList';
import { OrgChartPerson, OrgChartDepartment, OrgChartData } from '../../types/organization';

interface OrgTabsContentProps {
  activeTab: string;
  displayData: OrgChartData;
  onPersonClick: (person: OrgChartPerson) => void;
  onDepartmentClick: (department: OrgChartDepartment) => void;
  onStructureChange: (updatedRoot: OrgChartPerson) => void;
  isLoading?: boolean;
}

const OrgTabsContent: React.FC<OrgTabsContentProps> = ({
  activeTab,
  displayData,
  onPersonClick,
  onDepartmentClick,
  onStructureChange,
  isLoading = false
}) => {
  // Basic validation to prevent errors
  const hasValidData = displayData && 
    (activeTab === 'chart' ? !!displayData.rootPerson : 
     activeTab === 'departments' || activeTab === 'employees' ? Array.isArray(displayData.departments) : false);

  if (isLoading) {
    return (
      <div className="h-64 flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-amber-500"></div>
      </div>
    );
  }

  if (!hasValidData) {
    return (
      <div className="p-6 text-center border rounded-md bg-amber-50 text-amber-800">
        <p>Aucune donnée disponible pour cet affichage.</p>
        <p className="text-sm mt-2">Veuillez rafraîchir les données ou vérifier la configuration.</p>
      </div>
    );
  }

  return (
    <>
      <TabsContent value="chart" className="mt-6">
        {displayData.rootPerson && (
          <OrgChart 
            rootPerson={displayData.rootPerson} 
            onPersonClick={onPersonClick}
            onStructureChange={onStructureChange}
          />
        )}
      </TabsContent>

      <TabsContent value="departments" className="mt-6">
        {displayData.departments && displayData.departments.length > 0 && (
          <OrgDepartments 
            departments={displayData.departments} 
            onDepartmentClick={onDepartmentClick}
          />
        )}
      </TabsContent>

      <TabsContent value="employees" className="mt-6">
        {displayData.departments && displayData.departments.length > 0 && (
          <OrgEmployeeList 
            departments={displayData.departments} 
            onPersonClick={onPersonClick}
          />
        )}
      </TabsContent>
    </>
  );
};

export default React.memo(OrgTabsContent);
