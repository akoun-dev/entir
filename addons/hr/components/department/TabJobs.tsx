
import React from 'react';
import { Button } from '../../../../src/components/ui/button';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '../../../../src/components/ui/table';
import { PlusCircle, AlertCircle } from 'lucide-react';
import { TabContent } from '../common';

interface Job {
  id: string;
  name: string;
  department_id: string;
}

interface Employee {
  id: string;
  name: string;
  job_title: string;
  department_id: string;
}

interface TabJobsProps {
  jobs: Job[];
  employees: Employee[];
  departmentId: string | undefined;
  isEditMode: boolean;
}

const TabJobs: React.FC<TabJobsProps> = ({ jobs, employees, departmentId, isEditMode }) => {
  const filteredJobs = jobs.filter(job => job.department_id === departmentId);

  const getEmployeeCount = (jobName: string) => {
    return employees.filter(emp => emp.job_title === jobName).length;
  };

  const headerAction = (
    <Button size="sm" className="flex items-center gap-2">
      <PlusCircle className="h-4 w-4" />
      Ajouter un poste
    </Button>
  );

  return (
    <TabContent 
      title="Postes du département"
      description="Postes disponibles dans ce département"
      headerAction={isEditMode ? headerAction : undefined}
    >
      {isEditMode ? (
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Intitulé du poste</TableHead>
              <TableHead>Employés</TableHead>
              <TableHead className="text-right">Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {filteredJobs.length > 0 ? (
              filteredJobs.map(job => (
                <TableRow key={job.id}>
                  <TableCell className="font-medium">{job.name}</TableCell>
                  <TableCell>{getEmployeeCount(job.name)}</TableCell>
                  <TableCell className="text-right">
                    <Button variant="ghost" size="sm">
                      Modifier
                    </Button>
                  </TableCell>
                </TableRow>
              ))
            ) : (
              <TableRow>
                <TableCell colSpan={3} className="text-center py-4 text-muted-foreground">
                  Aucun poste dans ce département
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      ) : (
        <div className="flex flex-col items-center justify-center py-8 text-center text-muted-foreground">
          <AlertCircle className="h-10 w-10 mb-2" />
          <p>Vous pourrez ajouter des postes après avoir créé le département.</p>
        </div>
      )}
    </TabContent>
  );
};

export default TabJobs;
