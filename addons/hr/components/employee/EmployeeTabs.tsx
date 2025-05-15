
import React from 'react';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '../../../../src/components/ui/tabs';
import PersonalInfoForm from './PersonalInfoForm';
import ProfessionalInfoForm from './ProfessionalInfoForm';

interface EmployeeTabsProps {
  employee: any;
  departments: { id: string; name: string; }[];
  managers: { id: string; name: string; }[];
  employmentTypes: { id: string; name: string; }[];
  onChange: (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement> | { name: string; value: string }) => void;
}

const EmployeeTabs: React.FC<EmployeeTabsProps> = ({
  employee,
  departments,
  managers,
  employmentTypes,
  onChange
}) => {
  return (
    <Tabs defaultValue="personal" className="w-full">
      <TabsList className="mb-4 w-full justify-start border-b pb-0 bg-transparent">
        <TabsTrigger value="personal" className="data-[state=active]:border-b-2 data-[state=active]:border-amber-500 rounded-none">
          Informations personnelles
        </TabsTrigger>
        <TabsTrigger value="professional" className="data-[state=active]:border-b-2 data-[state=active]:border-amber-500 rounded-none">
          Informations professionnelles
        </TabsTrigger>
      </TabsList>
      
      <TabsContent value="personal" className="pt-4">
        <PersonalInfoForm 
          employee={employee} 
          onChange={onChange} 
        />
      </TabsContent>
      
      <TabsContent value="professional" className="pt-4">
        <ProfessionalInfoForm 
          employee={employee}
          departments={departments}
          managers={managers}
          employmentTypes={employmentTypes}
          onChange={onChange}
        />
      </TabsContent>
    </Tabs>
  );
};

export default EmployeeTabs;
