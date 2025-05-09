
import React from 'react';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '../../../../src/components/ui/tabs';
import { Building2, Users, Briefcase } from 'lucide-react';
import TabGeneral from './TabGeneral';
import TabMembers from './TabMembers';
import TabJobs from './TabJobs';
import { Department, Manager, ParentDepartment, Company } from '../../types/department';
import { Job, Employee } from '../../hooks/useDepartmentForm';

interface DepartmentTabsProps {
  department: Department;
  companies: Company[];
  parentDepartments: ParentDepartment[];
  managers: Manager[];
  jobs: Job[];
  employees: Employee[];
  departmentId?: string;
  isEditMode: boolean;
  handleChange: (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => void;
  handleSelectChange: (name: string, value: string) => void;
  handleSwitchChange: (name: string, checked: boolean) => void;
}

const DepartmentTabs: React.FC<DepartmentTabsProps> = ({
  department,
  companies,
  parentDepartments,
  managers,
  jobs,
  employees,
  departmentId,
  isEditMode,
  handleChange,
  handleSelectChange,
  handleSwitchChange,
}) => {
  return (
    <Tabs defaultValue="general" className="w-full">
      <TabsList className="mb-6 grid grid-cols-1 md:grid-cols-3 gap-2 bg-muted/70 p-1.5 rounded-xl">
        <TabsTrigger value="general" className="flex items-center gap-2 h-11 data-[state=active]:bg-ivory-orange data-[state=active]:text-white rounded-lg">
          <Building2 className="h-4 w-4" />
          Général
        </TabsTrigger>
        <TabsTrigger value="members" className="flex items-center gap-2 h-11 data-[state=active]:bg-ivory-orange data-[state=active]:text-white rounded-lg">
          <Users className="h-4 w-4" />
          Membres
        </TabsTrigger>
        <TabsTrigger value="jobs" className="flex items-center gap-2 h-11 data-[state=active]:bg-ivory-orange data-[state=active]:text-white rounded-lg">
          <Briefcase className="h-4 w-4" />
          Postes
        </TabsTrigger>
      </TabsList>

      <div className="bg-white/50 rounded-xl p-0.5 shadow-sm border border-neutral-100/50">
        {/* Onglet Général */}
        <TabsContent value="general" className="mt-0 rounded-lg overflow-hidden">
          <TabGeneral 
            department={department}
            companies={companies}
            parentDepartments={parentDepartments}
            managers={managers}
            handleChange={handleChange}
            handleSelectChange={handleSelectChange}
            handleSwitchChange={handleSwitchChange}
            isEditMode={isEditMode}
          />
        </TabsContent>

        {/* Onglet Membres */}
        <TabsContent value="members" className="mt-0 rounded-lg overflow-hidden">
          <TabMembers 
            employees={employees}
            departmentId={departmentId}
            isEditMode={isEditMode}
          />
        </TabsContent>

        {/* Onglet Postes */}
        <TabsContent value="jobs" className="mt-0 rounded-lg overflow-hidden">
          <TabJobs 
            jobs={jobs}
            employees={employees}
            departmentId={departmentId}
            isEditMode={isEditMode}
          />
        </TabsContent>
      </div>
    </Tabs>
  );
};

export default DepartmentTabs;
