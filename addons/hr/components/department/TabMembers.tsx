
import React from 'react';
import { Link } from 'react-router-dom';
import { Button } from '../../../../src/components/ui/button';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '../../../../src/components/ui/table';
import { UserPlus, ChevronRight, AlertCircle } from 'lucide-react';
import { TabContent } from '../common';

interface Employee {
  id: string;
  name: string;
  job_title: string;
  department_id: string;
}

interface TabMembersProps {
  employees: Employee[];
  departmentId: string | undefined;
  isEditMode: boolean;
}

const TabMembers: React.FC<TabMembersProps> = ({ employees, departmentId, isEditMode }) => {
  const filteredEmployees = employees.filter(emp => emp.department_id === departmentId);

  const headerAction = (
    <Button size="sm" className="flex items-center gap-2" asChild>
      <Link to="/hr/employees/new">
        <UserPlus className="h-4 w-4" />
        Ajouter un employé
      </Link>
    </Button>
  );

  return (
    <TabContent 
      title="Membres du département"
      description="Employés rattachés à ce département"
      headerAction={isEditMode ? headerAction : undefined}
    >
      {isEditMode ? (
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Nom</TableHead>
              <TableHead>Poste</TableHead>
              <TableHead className="text-right">Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {filteredEmployees.length > 0 ? (
              filteredEmployees.map(employee => (
                <TableRow key={employee.id}>
                  <TableCell className="font-medium">{employee.name}</TableCell>
                  <TableCell>{employee.job_title}</TableCell>
                  <TableCell className="text-right">
                    <Button variant="ghost" size="sm" className="flex items-center gap-1" asChild>
                      <Link to={`/hr/employees/${employee.id}`}>
                        Voir
                        <ChevronRight className="h-4 w-4" />
                      </Link>
                    </Button>
                  </TableCell>
                </TableRow>
              ))
            ) : (
              <TableRow>
                <TableCell colSpan={3} className="text-center py-4 text-muted-foreground">
                  Aucun employé dans ce département
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      ) : (
        <div className="flex flex-col items-center justify-center py-8 text-center text-muted-foreground">
          <AlertCircle className="h-10 w-10 mb-2" />
          <p>Vous pourrez ajouter des membres après avoir créé le département.</p>
        </div>
      )}
    </TabContent>
  );
};

export default TabMembers;
