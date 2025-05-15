
import React, { useCallback } from 'react';
import { Tabs, TabsList, TabsTrigger } from '../../../../src/components/ui/tabs';
import { FolderTree, Building2, Users } from 'lucide-react';

interface OrgNavTabsProps {
  activeTab: string;
  onTabChange: (value: string) => void;
  disabled?: boolean;
}

const OrgNavTabs: React.FC<OrgNavTabsProps> = ({ 
  activeTab, 
  onTabChange,
  disabled = false
}) => {
  // Wrap tab change in useCallback to prevent unnecessary re-renders
  const handleTabChange = useCallback((value: string) => {
    if (disabled) return;
    onTabChange(value);
  }, [onTabChange, disabled]);

  return (
    <Tabs 
      value={activeTab} 
      onValueChange={handleTabChange} 
      className="mb-6"
    >
      <TabsList className="border border-muted bg-card">
        <TabsTrigger 
          value="chart" 
          className="flex items-center gap-2 data-[state=active]:bg-amber-50 data-[state=active]:text-amber-900"
          disabled={disabled}
        >
          <FolderTree className="h-4 w-4" />
          Hiérarchie
        </TabsTrigger>
        <TabsTrigger 
          value="departments" 
          className="flex items-center gap-2 data-[state=active]:bg-amber-50 data-[state=active]:text-amber-900"
          disabled={disabled}
        >
          <Building2 className="h-4 w-4" />
          Départements
        </TabsTrigger>
        <TabsTrigger 
          value="employees" 
          className="flex items-center gap-2 data-[state=active]:bg-amber-50 data-[state=active]:text-amber-900"
          disabled={disabled}
        >
          <Users className="h-4 w-4" />
          Employés
        </TabsTrigger>
      </TabsList>
    </Tabs>
  );
};

export default React.memo(OrgNavTabs);
