
import React from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '../../../../src/components/ui/card';
import { Input } from '../../../../src/components/ui/input';
import { Label } from '../../../../src/components/ui/label';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '../../../../src/components/ui/select';
import { Textarea } from '../../../../src/components/ui/textarea';
import { Briefcase } from 'lucide-react';

interface Department {
  id: string;
  name: string;
}

interface Manager {
  id: string;
  name: string;
}

interface EmploymentType {
  id: string;
  name: string;
}

interface ProfessionalInfoFormProps {
  employee: {
    job_title: string;
    department_id: string;
    employment_type: string;
    hire_date: string;
    manager_id: string;
    notes: string;
  };
  departments: Department[];
  managers: Manager[];
  employmentTypes: EmploymentType[];
  onChange: (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement> | { name: string; value: string }) => void;
}

const ProfessionalInfoForm: React.FC<ProfessionalInfoFormProps> = ({
  employee,
  departments,
  managers,
  employmentTypes,
  onChange
}) => {
  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Briefcase className="h-5 w-5" />
          Informations professionnelles
        </CardTitle>
        <CardDescription>
          Détails sur le poste et le département
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="space-y-2">
            <Label htmlFor="job_title">Intitulé du poste</Label>
            <Input
              id="job_title"
              name="job_title"
              value={employee.job_title}
              onChange={onChange}
              placeholder="Ex: Développeur Web"
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="department_id">Département</Label>
            <Select
              value={employee.department_id}
              onValueChange={(value) => onChange({ name: 'department_id', value })}
            >
              <SelectTrigger id="department_id">
                <SelectValue placeholder="Sélectionner un département" />
              </SelectTrigger>
              <SelectContent>
                {departments.map((dept) => (
                  <SelectItem key={dept.id} value={dept.id}>
                    {dept.name}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="space-y-2">
            <Label htmlFor="employment_type">Type d'emploi</Label>
            <Select
              value={employee.employment_type}
              onValueChange={(value) => onChange({ name: 'employment_type', value })}
            >
              <SelectTrigger id="employment_type">
                <SelectValue placeholder="Sélectionner un type" />
              </SelectTrigger>
              <SelectContent>
                {employmentTypes.map((type) => (
                  <SelectItem key={type.id} value={type.id}>
                    {type.name}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
          <div className="space-y-2">
            <Label htmlFor="hire_date">Date d'embauche</Label>
            <Input
              id="hire_date"
              name="hire_date"
              type="date"
              value={employee.hire_date}
              onChange={onChange}
            />
          </div>
        </div>

        <div className="space-y-2">
          <Label htmlFor="manager_id">Responsable</Label>
          <Select
            value={employee.manager_id}
            onValueChange={(value) => onChange({ name: 'manager_id', value })}
          >
            <SelectTrigger id="manager_id">
              <SelectValue placeholder="Sélectionner un responsable" />
            </SelectTrigger>
            <SelectContent>
              {managers.map((manager) => (
                <SelectItem key={manager.id} value={manager.id}>
                  {manager.name}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>

        <div className="space-y-2">
          <Label htmlFor="notes">Notes</Label>
          <Textarea
            id="notes"
            name="notes"
            value={employee.notes}
            onChange={onChange}
            placeholder="Compétences, informations complémentaires..."
            rows={4}
          />
        </div>
      </CardContent>
    </Card>
  );
};

export default ProfessionalInfoForm;
