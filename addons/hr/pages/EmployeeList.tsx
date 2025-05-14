import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useQuery } from '@tanstack/react-query';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle
} from '../../../src/components/ui/card';
import { Input } from '../../../src/components/ui/input';
import { Button } from '../../../src/components/ui/button';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue
} from '../../../src/components/ui/select';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger
} from '../../../src/components/ui/dropdown-menu';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow
} from '../../../src/components/ui/table';
import {
  Pagination,
  PaginationContent,
  PaginationEllipsis,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious
} from '../../../src/components/ui/pagination';
import { Badge } from '../../../src/components/ui/badge';
import {
  UserPlusIcon,
  SearchIcon,
  FilterIcon,
  MoreHorizontalIcon,
  UserIcon,
  FileTextIcon,
  CalendarIcon,
  TrashIcon,
  EditIcon,
  EyeIcon
} from 'lucide-react';

// Types
interface Employee {
  id: number;
  firstName: string;
  lastName: string;
  email: string;
  phone?: string;
  employeeNumber?: string;
  hireDate?: string;
  status: 'active' | 'inactive' | 'on_leave' | 'terminated';
  department?: {
    id: number;
    name: string;
  };
  position?: {
    id: number;
    name: string;
  };
}

// Fonction fictive pour récupérer les employés
const fetchEmployees = async (): Promise<Employee[]> => {
  // Simuler un appel API
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve([
        {
          id: 1,
          firstName: 'Jean',
          lastName: 'Dupont',
          email: 'jean.dupont@example.com',
          phone: '0123456789',
          employeeNumber: 'EMP001',
          hireDate: '2020-01-15',
          status: 'active',
          department: { id: 1, name: 'Informatique' },
          position: { id: 1, name: 'Développeur Senior' }
        },
        {
          id: 2,
          firstName: 'Marie',
          lastName: 'Martin',
          email: 'marie.martin@example.com',
          phone: '0123456790',
          employeeNumber: 'EMP002',
          hireDate: '2021-03-10',
          status: 'active',
          department: { id: 2, name: 'Ressources Humaines' },
          position: { id: 2, name: 'Responsable RH' }
        },
        {
          id: 3,
          firstName: 'Pierre',
          lastName: 'Durand',
          email: 'pierre.durand@example.com',
          phone: '0123456791',
          employeeNumber: 'EMP003',
          hireDate: '2019-06-20',
          status: 'on_leave',
          department: { id: 3, name: 'Finance' },
          position: { id: 3, name: 'Comptable' }
        },
        {
          id: 4,
          firstName: 'Sophie',
          lastName: 'Petit',
          email: 'sophie.petit@example.com',
          phone: '0123456792',
          employeeNumber: 'EMP004',
          hireDate: '2022-01-05',
          status: 'active',
          department: { id: 1, name: 'Informatique' },
          position: { id: 4, name: 'Développeur' }
        },
        {
          id: 5,
          firstName: 'Thomas',
          lastName: 'Leroy',
          email: 'thomas.leroy@example.com',
          phone: '0123456793',
          employeeNumber: 'EMP005',
          hireDate: '2018-11-12',
          status: 'inactive',
          department: { id: 4, name: 'Marketing' },
          position: { id: 5, name: 'Responsable Marketing' }
        }
      ]);
    }, 500);
  });
};

/**
 * Page de liste des employés
 */
const EmployeeList = () => {
  const navigate = useNavigate();
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState('all');
  const [departmentFilter, setDepartmentFilter] = useState('all');

  // Récupération des employés
  const { data: employees = [], isLoading, error } = useQuery({
    queryKey: ['employees'],
    queryFn: fetchEmployees
  });

  // Filtrer les employés
  const filteredEmployees = employees.filter(employee => {
    const matchesSearch =
      employee.firstName.toLowerCase().includes(searchTerm.toLowerCase()) ||
      employee.lastName.toLowerCase().includes(searchTerm.toLowerCase()) ||
      employee.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
      (employee.employeeNumber && employee.employeeNumber.toLowerCase().includes(searchTerm.toLowerCase()));

    const matchesStatus = statusFilter === 'all' || employee.status === statusFilter;

    const matchesDepartment =
      departmentFilter === 'all' ||
      (employee.department && employee.department.id.toString() === departmentFilter);

    return matchesSearch && matchesStatus && matchesDepartment;
  });

  // Fonction pour obtenir la couleur du badge en fonction du statut
  const getStatusColor = (status: string) => {
    switch (status) {
      case 'active':
        return 'bg-green-500';
      case 'inactive':
        return 'bg-gray-500';
      case 'on_leave':
        return 'bg-amber-500';
      case 'terminated':
        return 'bg-red-500';
      default:
        return 'bg-gray-500';
    }
  };

  // Fonction pour obtenir le libellé du statut
  const getStatusLabel = (status: string) => {
    switch (status) {
      case 'active':
        return 'Actif';
      case 'inactive':
        return 'Inactif';
      case 'on_leave':
        return 'En congé';
      case 'terminated':
        return 'Terminé';
      default:
        return 'Inconnu';
    }
  };

  // Navigation vers la page de détail d'un employé
  const handleViewEmployee = (id: number) => {
    navigate(`/hr/employees/${id}`);
  };

  // Navigation vers la page d'édition d'un employé
  const handleEditEmployee = (id: number) => {
    navigate(`/hr/employees/${id}/edit`);
  };

  // Navigation vers la page de création d'un employé
  const handleCreateEmployee = () => {
    navigate('/hr/employees/new');
  };

  return (
    <div className="container mx-auto py-6">
      <div className="flex justify-between items-center mb-6">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Employés</h1>
          <p className="text-muted-foreground">
            Gérez les employés de votre entreprise
          </p>
        </div>
        <Button onClick={handleCreateEmployee} className="flex items-center">
          <UserPlusIcon className="mr-2 h-4 w-4" />
          Nouvel employé
        </Button>
      </div>

      <Card className="mb-6">
        <CardHeader className="pb-3">
          <CardTitle>Filtres</CardTitle>
          <CardDescription>
            Filtrez la liste des employés
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="flex flex-col md:flex-row gap-4">
            <div className="flex-1">
              <div className="relative">
                <SearchIcon className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
                <Input
                  type="search"
                  placeholder="Rechercher un employé..."
                  className="pl-8"
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                />
              </div>
            </div>
            <Select
              value={statusFilter}
              onValueChange={setStatusFilter}
            >
              <SelectTrigger className="w-full md:w-[180px]">
                <SelectValue placeholder="Statut" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">Tous les statuts</SelectItem>
                <SelectItem value="active">Actif</SelectItem>
                <SelectItem value="inactive">Inactif</SelectItem>
                <SelectItem value="on_leave">En congé</SelectItem>
                <SelectItem value="terminated">Terminé</SelectItem>
              </SelectContent>
            </Select>
            <Select
              value={departmentFilter}
              onValueChange={setDepartmentFilter}
            >
              <SelectTrigger className="w-full md:w-[200px]">
                <SelectValue placeholder="Département" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">Tous les départements</SelectItem>
                <SelectItem value="1">Informatique</SelectItem>
                <SelectItem value="2">Ressources Humaines</SelectItem>
                <SelectItem value="3">Finance</SelectItem>
                <SelectItem value="4">Marketing</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader className="pb-3">
          <CardTitle>Liste des employés</CardTitle>
          <CardDescription>
            {filteredEmployees.length} employé{filteredEmployees.length > 1 ? 's' : ''} trouvé{filteredEmployees.length > 1 ? 's' : ''}
          </CardDescription>
        </CardHeader>
        <CardContent>
          {isLoading ? (
            <div className="flex justify-center items-center h-40">
              <p>Chargement des employés...</p>
            </div>
          ) : error ? (
            <div className="flex justify-center items-center h-40">
              <p className="text-red-500">Erreur lors du chargement des employés</p>
            </div>
          ) : filteredEmployees.length === 0 ? (
            <div className="flex justify-center items-center h-40">
              <p>Aucun employé trouvé</p>
            </div>
          ) : (
            <div className="rounded-md border">
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Nom</TableHead>
                    <TableHead>Email</TableHead>
                    <TableHead>Département</TableHead>
                    <TableHead>Poste</TableHead>
                    <TableHead>Statut</TableHead>
                    <TableHead className="text-right">Actions</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {filteredEmployees.map((employee) => (
                    <TableRow key={employee.id}>
                      <TableCell className="font-medium">
                        {employee.firstName} {employee.lastName}
                      </TableCell>
                      <TableCell>{employee.email}</TableCell>
                      <TableCell>{employee.department?.name || '-'}</TableCell>
                      <TableCell>{employee.position?.name || '-'}</TableCell>
                      <TableCell>
                        <Badge className={getStatusColor(employee.status)}>
                          {getStatusLabel(employee.status)}
                        </Badge>
                      </TableCell>
                      <TableCell className="text-right">
                        <DropdownMenu>
                          <DropdownMenuTrigger asChild>
                            <Button variant="ghost" size="icon">
                              <MoreHorizontalIcon className="h-4 w-4" />
                              <span className="sr-only">Actions</span>
                            </Button>
                          </DropdownMenuTrigger>
                          <DropdownMenuContent align="end">
                            <DropdownMenuLabel>Actions</DropdownMenuLabel>
                            <DropdownMenuSeparator />
                            <DropdownMenuItem onClick={() => handleViewEmployee(employee.id)}>
                              <EyeIcon className="mr-2 h-4 w-4" />
                              Voir
                            </DropdownMenuItem>
                            <DropdownMenuItem onClick={() => handleEditEmployee(employee.id)}>
                              <EditIcon className="mr-2 h-4 w-4" />
                              Modifier
                            </DropdownMenuItem>
                            <DropdownMenuItem>
                              <FileTextIcon className="mr-2 h-4 w-4" />
                              Contrats
                            </DropdownMenuItem>
                            <DropdownMenuItem>
                              <CalendarIcon className="mr-2 h-4 w-4" />
                              Congés
                            </DropdownMenuItem>
                            <DropdownMenuSeparator />
                            <DropdownMenuItem className="text-red-600">
                              <TrashIcon className="mr-2 h-4 w-4" />
                              Supprimer
                            </DropdownMenuItem>
                          </DropdownMenuContent>
                        </DropdownMenu>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </div>
          )}

          <div className="mt-4">
            <Pagination>
              <PaginationContent>
                <PaginationItem>
                  <PaginationPrevious href="#" />
                </PaginationItem>
                <PaginationItem>
                  <PaginationLink href="#" isActive>1</PaginationLink>
                </PaginationItem>
                <PaginationItem>
                  <PaginationLink href="#">2</PaginationLink>
                </PaginationItem>
                <PaginationItem>
                  <PaginationLink href="#">3</PaginationLink>
                </PaginationItem>
                <PaginationItem>
                  <PaginationEllipsis />
                </PaginationItem>
                <PaginationItem>
                  <PaginationNext href="#" />
                </PaginationItem>
              </PaginationContent>
            </Pagination>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default EmployeeList;
