
import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Link } from 'react-router-dom';
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from '../../../../../src/components/ui/card';
import { Table, TableHeader, TableRow, TableHead, TableBody, TableCell } from '../../../../../src/components/ui/table';
import { Button } from '../../../../../src/components/ui/button';
import { Badge } from '../../../../../src/components/ui/badge';
import { Building2, ChevronRight } from 'lucide-react';

interface SubDepartment {
  id: string;
  name: string;
  code: string;
  manager: { name: string };
  employee_count: number;
  is_active: boolean;
}

interface SubDepartmentsTableProps {
  subDepartments: SubDepartment[];
  departmentName: string;
}

const SubDepartmentsTable: React.FC<SubDepartmentsTableProps> = ({ subDepartments, departmentName }) => {
  const navigate = useNavigate();

  if (subDepartments.length === 0) return null;

  return (
    <Card className="mb-6 w-full">
      <CardHeader className="flex flex-col md:flex-row md:items-center justify-between space-y-2 md:space-y-0">
        <div>
          <CardTitle>Sous-départements</CardTitle>
          <CardDescription>Départements rattachés à {departmentName}</CardDescription>
        </div>
        <Button size="sm" className="flex items-center gap-2" onClick={() => navigate('/hr/departments/new')}>
          <Building2 className="h-4 w-4" />
          Ajouter un sous-département
        </Button>
      </CardHeader>
      <CardContent>
        <div className="w-full overflow-auto">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Nom</TableHead>
                <TableHead>Code</TableHead>
                <TableHead>Responsable</TableHead>
                <TableHead>Employés</TableHead>
                <TableHead>Statut</TableHead>
                <TableHead className="text-right">Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {subDepartments.map(dept => (
                <TableRow key={dept.id}>
                  <TableCell className="font-medium">{dept.name}</TableCell>
                  <TableCell>{dept.code}</TableCell>
                  <TableCell>{dept.manager.name}</TableCell>
                  <TableCell>{dept.employee_count}</TableCell>
                  <TableCell>
                    <Badge variant={dept.is_active ? "default" : "secondary"} className="whitespace-nowrap">
                      {dept.is_active ? 'Actif' : 'Inactif'}
                    </Badge>
                  </TableCell>
                  <TableCell className="text-right">
                    <Button variant="ghost" size="sm" className="flex items-center gap-1" asChild>
                      <Link to={`/hr/departments/${dept.id}`}>
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

export default SubDepartmentsTable;
