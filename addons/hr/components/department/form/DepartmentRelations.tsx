
import React from 'react';
import { Label } from '../../../../../src/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '../../../../../src/components/ui/select';
import { Building2, Users, User, GitMerge } from 'lucide-react';
import { Company, ParentDepartment, Manager, Department } from '../../../types/department';

interface DepartmentRelationsProps {
  department: Department;
  companies: Company[];
  parentDepartments: ParentDepartment[];
  managers: Manager[];
  handleSelectChange: (name: string, value: string) => void;
}

const DepartmentRelations: React.FC<DepartmentRelationsProps> = ({
  department,
  companies,
  parentDepartments,
  managers,
  handleSelectChange
}) => {
  return (
    <>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="space-y-2">
          <Label htmlFor="company_id" className="text-base font-medium">
            <span className="inline-flex items-center gap-2">
              <Building2 className="w-4 h-4 text-ivory-orange" />
              Société <span className="text-destructive">*</span>
            </span>
          </Label>
          <Select
            value={department.company_id}
            onValueChange={(value) => handleSelectChange('company_id', value)}
          >
            <SelectTrigger className="h-11">
              <SelectValue placeholder="Sélectionner une société" />
            </SelectTrigger>
            <SelectContent className="max-h-80">
              {companies.map(company => (
                <SelectItem key={company.id} value={company.id}>{company.name}</SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>

        <div className="space-y-2">
          <Label htmlFor="parent_id" className="text-base font-medium">
            <span className="inline-flex items-center gap-2">
              <GitMerge className="w-4 h-4 text-ivory-orange" />
              Département parent
            </span>
          </Label>
          <Select
            value={department.parent_id}
            onValueChange={(value) => handleSelectChange('parent_id', value)}
          >
            <SelectTrigger className="h-11">
              <SelectValue placeholder="Sélectionner un département parent" />
            </SelectTrigger>
            <SelectContent className="max-h-80">
              {parentDepartments
                .filter(dept => dept.id !== department.id)
                .map(dept => (
                  <SelectItem key={dept.id} value={dept.id}>{dept.complete_name}</SelectItem>
                ))
              }
            </SelectContent>
          </Select>
        </div>
      </div>

      <div className="space-y-2">
        <Label htmlFor="manager_id" className="text-base font-medium">
          <span className="inline-flex items-center gap-2">
            <User className="w-4 h-4 text-ivory-orange" />
            Responsable
          </span>
        </Label>
        <Select
          value={department.manager_id}
          onValueChange={(value) => handleSelectChange('manager_id', value)}
        >
          <SelectTrigger className="h-11">
            <SelectValue placeholder="Sélectionner un responsable" />
          </SelectTrigger>
          <SelectContent className="max-h-80">
            {managers.map(manager => (
              <SelectItem key={manager.id} value={manager.id}>
                {manager.name} - {manager.job_title}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>

      <div className="space-y-2">
        <Label htmlFor="master_department_id" className="text-base font-medium">
          <span className="inline-flex items-center gap-2">
            <Users className="w-4 h-4 text-ivory-orange" />
            Département principal
          </span>
        </Label>
        <Select
          value={department.master_department_id}
          onValueChange={(value) => handleSelectChange('master_department_id', value)}
        >
          <SelectTrigger className="h-11">
            <SelectValue placeholder="Sélectionner un département principal" />
          </SelectTrigger>
          <SelectContent className="max-h-80">
            <SelectItem value="none">Aucun</SelectItem>
            {parentDepartments
              .filter(dept => dept.id !== department.id)
              .map(dept => (
                <SelectItem key={dept.id} value={dept.id}>{dept.complete_name}</SelectItem>
              ))
            }
          </SelectContent>
        </Select>
        <p className="text-xs text-muted-foreground mt-1">
          Utilisé pour regrouper plusieurs départements sous un même département principal.
        </p>
      </div>
    </>
  );
};

export default DepartmentRelations;
