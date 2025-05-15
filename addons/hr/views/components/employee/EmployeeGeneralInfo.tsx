
import React, { useEffect } from 'react';
import { Card, CardHeader, CardTitle, CardContent } from '../../../../../src/components/ui/card';
import { Separator } from '../../../../../src/components/ui/separator';
import { useChatter } from '@/hooks/use-chatter';

interface EmployeeGeneralInfoProps {
  employee: {
    birth_date?: string;
    address?: string;
    work_phone?: string;
    mobile_phone?: string;
    department: { name: string };
    employment_type: { name: string };
    hire_date?: string;
    manager: { name: string };
    notes?: string;
  };
}

const EmployeeGeneralInfo: React.FC<EmployeeGeneralInfoProps> = ({ employee }) => {
  // Utiliser le hook pour accéder au contexte du chatter
  const { showChatter } = useChatter();

  // Afficher automatiquement le chatter pour cet employé au chargement
  useEffect(() => {
    if (employee?.id) {
      showChatter('employee', employee.id);
    }
  }, [showChatter, employee]);

  // Format date
  const formatDate = (dateString: string) => {
    if (!dateString) return '';
    const date = new Date(dateString);
    return new Intl.DateTimeFormat('fr-FR', { day: '2-digit', month: '2-digit', year: 'numeric' }).format(date);
  };

  return (
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 w-full">
      <Card className="w-full">
        <CardHeader>
          <CardTitle>Informations personnelles</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <div className="text-sm font-medium text-muted-foreground">Date de naissance</div>
              <div>{employee.birth_date ? formatDate(employee.birth_date) : '-'}</div>
            </div>
          </div>

          <Separator />

          <div>
            <div className="text-sm font-medium text-muted-foreground">Adresse</div>
            <div className="whitespace-pre-line">{employee.address || '-'}</div>
          </div>

          <Separator />

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <div className="text-sm font-medium text-muted-foreground">Téléphone professionnel</div>
              <div>{employee.work_phone || '-'}</div>
            </div>

            <div>
              <div className="text-sm font-medium text-muted-foreground">Téléphone mobile</div>
              <div>{employee.mobile_phone || '-'}</div>
            </div>
          </div>
        </CardContent>
      </Card>

      <Card className="w-full">
        <CardHeader>
          <CardTitle>Informations professionnelles</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <div className="text-sm font-medium text-muted-foreground">Département</div>
              <div>{employee.department?.name || '-'}</div>
            </div>

            <div>
              <div className="text-sm font-medium text-muted-foreground">Type de contrat</div>
              <div>{employee.employment_type?.name || '-'}</div>
            </div>
          </div>

          <Separator />

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <div className="text-sm font-medium text-muted-foreground">Date d'embauche</div>
              <div>{employee.hire_date ? formatDate(employee.hire_date) : '-'}</div>
            </div>
          </div>

          <Separator />

          <div>
            <div className="text-sm font-medium text-muted-foreground">Responsable</div>
            <div>{employee.manager?.name || '-'}</div>
          </div>
        </CardContent>
      </Card>

      {employee.notes && (
        <Card className="lg:col-span-2 w-full">
          <CardHeader>
            <CardTitle>Notes</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="whitespace-pre-line">{employee.notes}</div>
          </CardContent>
        </Card>
      )}
    </div>
  );
};

export default EmployeeGeneralInfo;
