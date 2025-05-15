
import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Link } from 'react-router-dom';
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from '../../../../../src/components/ui/card';
import { Table, TableHeader, TableRow, TableHead, TableBody, TableCell } from '../../../../../src/components/ui/table';
import { Button } from '../../../../../src/components/ui/button';
import { Badge } from '../../../../../src/components/ui/badge';
import { Avatar, AvatarFallback, AvatarImage } from '../../../../../src/components/ui/avatar';
import { User, ChevronRight } from 'lucide-react';

interface Employee {
  id: string;
  name: string;
  job_title: string;
  avatar_url: string;
  is_active: boolean;
}

interface EmployeesTableProps {
  employees: Employee[];
  getInitials: (name: string) => string;
}

const EmployeesTable: React.FC<EmployeesTableProps> = ({ employees, getInitials }) => {
  const navigate = useNavigate();

  return (
    <Card className="w-full">
      <CardHeader className="flex flex-col md:flex-row md:items-center justify-between space-y-2 md:space-y-0">
        <div>
          <CardTitle>Employés</CardTitle>
          <CardDescription>Employés rattachés à ce département</CardDescription>
        </div>
        <Button size="sm" className="flex items-center gap-2" onClick={() => navigate('/hr/employees/new')}>
          <User className="h-4 w-4" />
          Ajouter un employé
        </Button>
      </CardHeader>
      <CardContent>
        <div className="w-full overflow-auto">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Nom</TableHead>
                <TableHead>Poste</TableHead>
                <TableHead>Statut</TableHead>
                <TableHead className="text-right">Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {employees.map(employee => (
                <TableRow key={employee.id}>
                  <TableCell>
                    <div className="flex items-center gap-3">
                      <Avatar className="h-8 w-8">
                        {employee.avatar_url ? (
                          <AvatarImage src={employee.avatar_url} alt={employee.name} />
                        ) : (
                          <AvatarFallback>{getInitials(employee.name)}</AvatarFallback>
                        )}
                      </Avatar>
                      <span className="font-medium">{employee.name}</span>
                    </div>
                  </TableCell>
                  <TableCell>{employee.job_title}</TableCell>
                  <TableCell>
                    <Badge variant={employee.is_active ? "default" : "secondary"} className="whitespace-nowrap">
                      {employee.is_active ? 'Actif' : 'Inactif'}
                    </Badge>
                  </TableCell>
                  <TableCell className="text-right">
                    <Button variant="ghost" size="sm" className="flex items-center gap-1" asChild>
                      <Link to={`/hr/employees/${employee.id}`}>
                        Voir
                        <ChevronRight className="h-4 w-4" />
                      </Link>
                    </Button>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </div>
      </CardContent>
    </Card>
  );
};

export default EmployeesTable;
