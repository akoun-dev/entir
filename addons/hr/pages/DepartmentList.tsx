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
  BuildingIcon,
  PlusIcon,
  SearchIcon,
  MoreHorizontalIcon,
  UsersIcon,
  EditIcon,
  EyeIcon,
  TrashIcon
} from 'lucide-react';

// Types
interface Department {
  id: number;
  name: string;
  code: string;
  description?: string;
  active: boolean;
  budget?: number;
  costCenter?: string;
  employeeCount?: number;
  manager?: {
    id: number;
    firstName: string;
    lastName: string;
  };
}

// Fonction fictive pour récupérer les départements
const fetchDepartments = async (): Promise<Department[]> => {
  // Simuler un appel API
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve([
        {
          id: 1,
          name: 'Direction Générale',
          code: 'DIR',
          description: 'Direction générale de l\'entreprise',
          active: true,
          budget: 500000.00,
          costCenter: 'CC001',
          employeeCount: 5,
          manager: { id: 1, firstName: 'Jean', lastName: 'Dupont' }
        },
        {
          id: 2,
          name: 'Ressources Humaines',
          code: 'RH',
          description: 'Département des ressources humaines',
          active: true,
          budget: 250000.00,
          costCenter: 'CC002',
          employeeCount: 8,
          manager: { id: 2, firstName: 'Marie', lastName: 'Martin' }
        },
        {
          id: 3,
          name: 'Finance',
          code: 'FIN',
          description: 'Département financier',
          active: true,
          budget: 300000.00,
          costCenter: 'CC003',
          employeeCount: 10,
          manager: { id: 3, firstName: 'Pierre', lastName: 'Durand' }
        },
        {
          id: 4,
          name: 'Informatique',
          code: 'IT',
          description: 'Département informatique',
          active: true,
          budget: 400000.00,
          costCenter: 'CC004',
          employeeCount: 15,
          manager: { id: 4, firstName: 'Sophie', lastName: 'Petit' }
        },
        {
          id: 5,
          name: 'Marketing',
          code: 'MKT',
          description: 'Département marketing',
          active: true,
          budget: 350000.00,
          costCenter: 'CC005',
          employeeCount: 12,
          manager: { id: 5, firstName: 'Thomas', lastName: 'Leroy' }
        }
      ]);
    }, 500);
  });
};

/**
 * Page de liste des départements
 */
const DepartmentList = () => {
  const navigate = useNavigate();
  const [searchTerm, setSearchTerm] = useState('');

  // Récupération des départements
  const { data: departments = [], isLoading, error } = useQuery({
    queryKey: ['departments'],
    queryFn: fetchDepartments
  });

  // Filtrer les départements
  const filteredDepartments = departments.filter(department => {
    const matchesSearch =
      department.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      department.code.toLowerCase().includes(searchTerm.toLowerCase()) ||
      (department.description && department.description.toLowerCase().includes(searchTerm.toLowerCase()));

    return matchesSearch;
  });

  // Formater le budget
  const formatBudget = (budget?: number) => {
    if (!budget) return '-';
    return new Intl.NumberFormat('fr-FR', { style: 'currency', currency: 'EUR' }).format(budget);
  };

  // Navigation vers la page de détail d'un département
  const handleViewDepartment = (id: number) => {
    navigate(`/hr/departments/${id}`);
  };

  // Navigation vers la page d'édition d'un département
  const handleEditDepartment = (id: number) => {
    navigate(`/hr/departments/${id}/edit`);
  };

  // Navigation vers la page de création d'un département
  const handleCreateDepartment = () => {
    navigate('/hr/departments/new');
  };

  return (
    <div className="container mx-auto py-6">
      <div className="flex justify-between items-center mb-6">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Départements</h1>
          <p className="text-muted-foreground">
            Gérez les départements de votre entreprise
          </p>
        </div>
        <Button onClick={handleCreateDepartment} className="flex items-center">
          <PlusIcon className="mr-2 h-4 w-4" />
          Nouveau département
        </Button>
      </div>

      <Card className="mb-6">
        <CardHeader className="pb-3">
          <CardTitle>Recherche</CardTitle>
          <CardDescription>
            Recherchez un département par nom, code ou description
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="relative">
            <SearchIcon className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
            <Input
              type="search"
              placeholder="Rechercher un département..."
              className="pl-8"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader className="pb-3">
          <CardTitle>Liste des départements</CardTitle>
          <CardDescription>
            {filteredDepartments.length} département{filteredDepartments.length > 1 ? 's' : ''} trouvé{filteredDepartments.length > 1 ? 's' : ''}
          </CardDescription>
        </CardHeader>
        <CardContent>
          {isLoading ? (
            <div className="flex justify-center items-center h-40">
              <p>Chargement des départements...</p>
            </div>
          ) : error ? (
            <div className="flex justify-center items-center h-40">
              <p className="text-red-500">Erreur lors du chargement des départements</p>
            </div>
          ) : filteredDepartments.length === 0 ? (
            <div className="flex justify-center items-center h-40">
              <p>Aucun département trouvé</p>
            </div>
          ) : (
            <div className="rounded-md border">
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Nom</TableHead>
                    <TableHead>Code</TableHead>
                    <TableHead>Responsable</TableHead>
                    <TableHead>Employés</TableHead>
                    <TableHead>Budget</TableHead>
                    <TableHead>Statut</TableHead>
                    <TableHead className="text-right">Actions</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {filteredDepartments.map((department) => (
                    <TableRow key={department.id}>
                      <TableCell className="font-medium">
                        {department.name}
                      </TableCell>
                      <TableCell>{department.code}</TableCell>
                      <TableCell>
                        {department.manager
                          ? `${department.manager.firstName} ${department.manager.lastName}`
                          : '-'}
                      </TableCell>
                      <TableCell>{department.employeeCount || 0}</TableCell>
                      <TableCell>{formatBudget(department.budget)}</TableCell>
                      <TableCell>
                        <Badge variant={department.active ? "default" : "secondary"}>
                          {department.active ? 'Actif' : 'Inactif'}
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
                            <DropdownMenuItem onClick={() => handleViewDepartment(department.id)}>
                              <EyeIcon className="mr-2 h-4 w-4" />
                              Voir
                            </DropdownMenuItem>
                            <DropdownMenuItem onClick={() => handleEditDepartment(department.id)}>
                              <EditIcon className="mr-2 h-4 w-4" />
                              Modifier
                            </DropdownMenuItem>
                            <DropdownMenuItem>
                              <UsersIcon className="mr-2 h-4 w-4" />
                              Employés
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

export default DepartmentList;
