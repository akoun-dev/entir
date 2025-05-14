import React from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useQuery } from '@tanstack/react-query';
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle
} from '../../../src/components/ui/card';
import { Button } from '../../../src/components/ui/button';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '../../../src/components/ui/tabs';
import { Badge } from '../../../src/components/ui/badge';
import {
  BuildingIcon,
  UsersIcon,
  DollarSignIcon,
  BarChartIcon,
  EditIcon,
  ArrowLeftIcon,
  UserIcon
} from 'lucide-react';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow
} from '../../../src/components/ui/table';

// Types
interface Department {
  id: number;
  name: string;
  code: string;
  description?: string;
  active: boolean;
  budget?: number;
  costCenter?: string;
  manager?: {
    id: number;
    firstName: string;
    lastName: string;
  };
  parent?: {
    id: number;
    name: string;
  };
  children?: {
    id: number;
    name: string;
    code: string;
    active: boolean;
  }[];
  employees?: {
    id: number;
    firstName: string;
    lastName: string;
    position: {
      name: string;
    };
    status: string;
  }[];
}

// Fonction fictive pour récupérer un département par son ID
const fetchDepartment = async (id: string): Promise<Department> => {
  // Simuler un appel API
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve({
        id: parseInt(id),
        name: 'Informatique',
        code: 'IT',
        description: 'Département informatique responsable du développement et de la maintenance des systèmes d\'information de l\'entreprise.',
        active: true,
        budget: 400000.00,
        costCenter: 'CC004',
        manager: { id: 4, firstName: 'Sophie', lastName: 'Petit' },
        parent: { id: 1, name: 'Direction Générale' },
        children: [
          { id: 6, name: 'Développement', code: 'DEV', active: true },
          { id: 7, name: 'Infrastructure', code: 'INFRA', active: true },
          { id: 8, name: 'Support', code: 'SUPP', active: true }
        ],
        employees: [
          { id: 4, firstName: 'Sophie', lastName: 'Petit', position: { name: 'Directeur Informatique' }, status: 'active' },
          { id: 10, firstName: 'Jean', lastName: 'Dupont', position: { name: 'Développeur Senior' }, status: 'active' },
          { id: 11, firstName: 'Marie', lastName: 'Martin', position: { name: 'Développeur' }, status: 'active' },
          { id: 12, firstName: 'Pierre', lastName: 'Durand', position: { name: 'Administrateur Système' }, status: 'active' },
          { id: 13, firstName: 'Julie', lastName: 'Leroy', position: { name: 'Technicien Support' }, status: 'active' }
        ]
      });
    }, 500);
  });
};

/**
 * Page de détail d'un département
 */
const DepartmentDetail = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();

  // Récupération des données du département
  const { data: department, isLoading, error } = useQuery({
    queryKey: ['department', id],
    queryFn: () => fetchDepartment(id || '0'),
    enabled: !!id
  });

  // Formater le budget
  const formatBudget = (budget?: number) => {
    if (!budget) return 'Non défini';
    return new Intl.NumberFormat('fr-FR', { style: 'currency', currency: 'EUR' }).format(budget);
  };

  // Navigation vers la page d'édition
  const handleEdit = () => {
    navigate(`/hr/departments/${id}/edit`);
  };

  // Navigation vers la liste des départements
  const handleBack = () => {
    navigate('/hr/departments');
  };

  // Navigation vers la page de détail d'un employé
  const handleViewEmployee = (employeeId: number) => {
    navigate(`/hr/employees/${employeeId}`);
  };

  // Navigation vers la page de détail d'un sous-département
  const handleViewDepartment = (deptId: number) => {
    navigate(`/hr/departments/${deptId}`);
  };

  if (isLoading) {
    return (
      <div className="container mx-auto py-6">
        <div className="flex justify-center items-center h-40">
          <p>Chargement des informations du département...</p>
        </div>
      </div>
    );
  }

  if (error || !department) {
    return (
      <div className="container mx-auto py-6">
        <div className="flex justify-center items-center h-40">
          <p className="text-red-500">Erreur lors du chargement des informations du département</p>
        </div>
      </div>
    );
  }

  return (
    <div className="container mx-auto py-6">
      <div className="flex items-center mb-6">
        <Button variant="outline" size="icon" onClick={handleBack} className="mr-4">
          <ArrowLeftIcon className="h-4 w-4" />
        </Button>
        <div className="flex-1">
          <h1 className="text-3xl font-bold tracking-tight">Département: {department.name}</h1>
          <p className="text-muted-foreground">
            Code: {department.code}
          </p>
        </div>
        <Button onClick={handleEdit} className="flex items-center">
          <EditIcon className="mr-2 h-4 w-4" />
          Modifier
        </Button>
      </div>

      <div className="grid gap-6 md:grid-cols-4">
        <div className="md:col-span-1">
          <Card>
            <CardHeader>
              <CardTitle>Informations</CardTitle>
              <Badge variant={department.active ? "default" : "secondary"} className="mt-2">
                {department.active ? 'Actif' : 'Inactif'}
              </Badge>
            </CardHeader>
            <CardContent>
              <div className="space-y-3 text-sm">
                {department.parent && (
                  <div className="flex items-center">
                    <BuildingIcon className="mr-2 h-4 w-4 opacity-70" />
                    <span>Département parent: {department.parent.name}</span>
                  </div>
                )}

                {department.manager && (
                  <div className="flex items-center">
                    <UserIcon className="mr-2 h-4 w-4 opacity-70" />
                    <span>Responsable: {department.manager.firstName} {department.manager.lastName}</span>
                  </div>
                )}

                {department.employees && (
                  <div className="flex items-center">
                    <UsersIcon className="mr-2 h-4 w-4 opacity-70" />
                    <span>{department.employees.length} employé{department.employees.length > 1 ? 's' : ''}</span>
                  </div>
                )}

                {department.budget !== undefined && (
                  <div className="flex items-center">
                    <DollarSignIcon className="mr-2 h-4 w-4 opacity-70" />
                    <span>Budget: {formatBudget(department.budget)}</span>
                  </div>
                )}

                {department.costCenter && (
                  <div className="flex items-center">
                    <BarChartIcon className="mr-2 h-4 w-4 opacity-70" />
                    <span>Centre de coût: {department.costCenter}</span>
                  </div>
                )}
              </div>

              {department.description && (
                <div className="mt-4 pt-4 border-t">
                  <h3 className="text-sm font-medium mb-2">Description</h3>
                  <p className="text-sm text-muted-foreground">{department.description}</p>
                </div>
              )}
            </CardContent>
          </Card>
        </div>

        <div className="md:col-span-3">
          <Tabs defaultValue="employees" className="space-y-4">
            <TabsList>
              <TabsTrigger value="employees">Employés</TabsTrigger>
              <TabsTrigger value="subdepartments">Sous-départements</TabsTrigger>
              <TabsTrigger value="budget">Budget</TabsTrigger>
            </TabsList>

            <TabsContent value="employees" className="space-y-4">
              <Card>
                <CardHeader>
                  <CardTitle>Employés du département</CardTitle>
                  <CardDescription>
                    Liste des employés rattachés à ce département
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  {department.employees && department.employees.length > 0 ? (
                    <div className="rounded-md border">
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
                          {department.employees.map((employee) => (
                            <TableRow key={employee.id}>
                              <TableCell className="font-medium">
                                {employee.firstName} {employee.lastName}
                              </TableCell>
                              <TableCell>{employee.position.name}</TableCell>
                              <TableCell>
                                <Badge variant={employee.status === 'active' ? "default" : "secondary"}>
                                  {employee.status === 'active' ? 'Actif' : employee.status}
                                </Badge>
                              </TableCell>
                              <TableCell className="text-right">
                                <Button
                                  variant="ghost"
                                  size="sm"
                                  onClick={() => handleViewEmployee(employee.id)}
                                >
                                  Voir
                                </Button>
                              </TableCell>
                            </TableRow>
                          ))}
                        </TableBody>
                      </Table>
                    </div>
                  ) : (
                    <p className="text-muted-foreground">Aucun employé dans ce département</p>
                  )}
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="subdepartments" className="space-y-4">
              <Card>
                <CardHeader>
                  <CardTitle>Sous-départements</CardTitle>
                  <CardDescription>
                    Départements rattachés à ce département
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  {department.children && department.children.length > 0 ? (
                    <div className="rounded-md border">
                      <Table>
                        <TableHeader>
                          <TableRow>
                            <TableHead>Nom</TableHead>
                            <TableHead>Code</TableHead>
                            <TableHead>Statut</TableHead>
                            <TableHead className="text-right">Actions</TableHead>
                          </TableRow>
                        </TableHeader>
                        <TableBody>
                          {department.children.map((child) => (
                            <TableRow key={child.id}>
                              <TableCell className="font-medium">
                                {child.name}
                              </TableCell>
                              <TableCell>{child.code}</TableCell>
                              <TableCell>
                                <Badge variant={child.active ? "default" : "secondary"}>
                                  {child.active ? 'Actif' : 'Inactif'}
                                </Badge>
                              </TableCell>
                              <TableCell className="text-right">
                                <Button
                                  variant="ghost"
                                  size="sm"
                                  onClick={() => handleViewDepartment(child.id)}
                                >
                                  Voir
                                </Button>
                              </TableCell>
                            </TableRow>
                          ))}
                        </TableBody>
                      </Table>
                    </div>
                  ) : (
                    <p className="text-muted-foreground">Aucun sous-département</p>
                  )}
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="budget" className="space-y-4">
              <Card>
                <CardHeader>
                  <CardTitle>Informations budgétaires</CardTitle>
                  <CardDescription>
                    Détails du budget du département
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="grid gap-4 md:grid-cols-2">
                    <div>
                      <h3 className="text-sm font-medium mb-2">Budget total</h3>
                      <p className="text-2xl font-bold">{formatBudget(department.budget)}</p>
                    </div>
                    <div>
                      <h3 className="text-sm font-medium mb-2">Centre de coût</h3>
                      <p className="text-2xl font-bold">{department.costCenter || 'Non défini'}</p>
                    </div>
                  </div>

                  <div className="mt-6">
                    <h3 className="text-sm font-medium mb-4">Répartition du budget</h3>
                    <div className="h-[200px] flex items-center justify-center text-muted-foreground">
                      Graphique de répartition du budget (à implémenter)
                    </div>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>
          </Tabs>
        </div>
      </div>
    </div>
  );
};

export default DepartmentDetail;
