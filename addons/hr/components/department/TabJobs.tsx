
import React from 'react';
import { AlertCircle } from 'lucide-react';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '../../../../src/components/ui/table';
import { TabContent } from '../common';
import { Job } from '../../types/job';
import { Employee } from '../../types/employee';

interface TabJobsProps {
  jobs: Job[];
  employees: Employee[];
  departmentId: string | undefined;
  isEditMode: boolean;
}

const TabJobs: React.FC<TabJobsProps> = ({ jobs, employees, departmentId, isEditMode }) => {
  const filteredJobs = jobs.filter(job => job.department_id === departmentId);
  
  // Count employees per job
  const getEmployeeCount = (jobId: string) => {
    return employees.filter(emp => emp.job_title === jobId).length;
  };

  return (
    <TabContent 
      title="Postes du département"
      description="Postes disponibles dans ce département"
    >
      {isEditMode ? (
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Nom du poste</TableHead>
              <TableHead>Nombre d'employés</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {filteredJobs.length > 0 ? (
              filteredJobs.map(job => (
                <TableRow key={job.id}>
                  <TableCell className="font-medium">{job.name}</TableCell>
                  <TableCell>{getEmployeeCount(job.id)}</TableCell>
                </TableRow>
              ))
            ) : (
              <TableRow>
                <TableCell colSpan={2} className="text-center py-4 text-muted-foreground">
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
