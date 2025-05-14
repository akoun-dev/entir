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
import { Avatar, AvatarFallback, AvatarImage } from '../../../src/components/ui/avatar';
import {
  UserIcon,
  BuildingIcon,
  BriefcaseIcon,
  CalendarIcon,
  PhoneIcon,
  MailIcon,
  MapPinIcon,
  FileTextIcon,
  EditIcon,
  ArrowLeftIcon,
  ClockIcon,
  CreditCardIcon,
  StarIcon
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
  endDate?: string;
  birthDate?: string;
  gender?: string;
  status: 'active' | 'inactive' | 'on_leave' | 'terminated';
  address?: string;
  city?: string;
  state?: string;
  postalCode?: string;
  country?: string;
  bankName?: string;
  bankAccountNumber?: string;
  bankRoutingNumber?: string;
  notes?: string;
  department?: {
    id: number;
    name: string;
  };
  position?: {
    id: number;
    name: string;
  };
  manager?: {
    id: number;
    firstName: string;
    lastName: string;
  };
  contracts?: {
    id: number;
    name: string;
    startDate: string;
    endDate?: string;
    type: string;
    status: string;
  }[];
  leaves?: {
    id: number;
    startDate: string;
    endDate: string;
    status: string;
    leaveType: {
      name: string;
    };
  }[];
}

// Fonction fictive pour récupérer un employé par son ID
const fetchEmployee = async (id: string): Promise<Employee> => {
  // Simuler un appel API
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve({
        id: parseInt(id),
        firstName: 'Jean',
        lastName: 'Dupont',
        email: 'jean.dupont@example.com',
        phone: '0123456789',
        employeeNumber: 'EMP001',
        hireDate: '2020-01-15',
        birthDate: '1985-05-20',
        gender: 'male',
        status: 'active',
        address: '123 Rue de la Paix',
        city: 'Paris',
        state: 'Île-de-France',
        postalCode: '75001',
        country: 'France',
        bankName: 'Banque Nationale',
        bankAccountNumber: 'FR7630001007941234567890185',
        notes: 'Employé très performant',
        department: { id: 1, name: 'Informatique' },
        position: { id: 1, name: 'Développeur Senior' },
        manager: { id: 2, firstName: 'Marie', lastName: 'Martin' },
        contracts: [
          {
            id: 1,
            name: 'CDI Développeur',
            startDate: '2020-01-15',
            type: 'cdi',
            status: 'active'
          }
        ],
        leaves: [
          {
            id: 1,
            startDate: '2023-08-01',
            endDate: '2023-08-15',
            status: 'approved',
            leaveType: { name: 'Congés payés' }
          },
          {
            id: 2,
            startDate: '2023-12-24',
            endDate: '2023-12-31',
            status: 'approved',
            leaveType: { name: 'Congés payés' }
          }
        ]
      });
    }, 500);
  });
};

/**
 * Page de détail d'un employé
 */
const EmployeeDetail = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();

  // Récupération des données de l'employé
  const { data: employee, isLoading, error } = useQuery({
    queryKey: ['employee', id],
    queryFn: () => fetchEmployee(id || '0'),
    enabled: !!id
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

  // Obtenir les initiales pour l'avatar
  const getInitials = () => {
    if (!employee) return '';
    return `${employee.firstName.charAt(0)}${employee.lastName.charAt(0)}`;
  };

  // Navigation vers la page d'édition
  const handleEdit = () => {
    navigate(`/hr/employees/${id}/edit`);
  };

  // Navigation vers la liste des employés
  const handleBack = () => {
    navigate('/hr/employees');
  };

  // Formater une date
  const formatDate = (dateString?: string) => {
    if (!dateString) return 'Non défini';
    return new Date(dateString).toLocaleDateString('fr-FR');
  };

  if (isLoading) {
    return (
      <div className="container mx-auto py-6">
        <div className="flex justify-center items-center h-40">
          <p>Chargement des informations de l'employé...</p>
        </div>
      </div>
    );
  }

  if (error || !employee) {
    return (
      <div className="container mx-auto py-6">
        <div className="flex justify-center items-center h-40">
          <p className="text-red-500">Erreur lors du chargement des informations de l'employé</p>
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
          <h1 className="text-3xl font-bold tracking-tight">Fiche employé</h1>
          <p className="text-muted-foreground">
            Informations détaillées de l'employé
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
            <CardHeader className="text-center">
              <Avatar className="h-24 w-24 mx-auto">
                <AvatarImage src={`https://api.dicebear.com/7.x/initials/svg?seed=${employee.firstName}%20${employee.lastName}`} alt={`${employee.firstName} ${employee.lastName}`} />
                <AvatarFallback>{getInitials()}</AvatarFallback>
              </Avatar>
              <CardTitle className="mt-2">{employee.firstName} {employee.lastName}</CardTitle>
              <CardDescription>
                {employee.position?.name || 'Aucun poste'}
              </CardDescription>
              <Badge className={`${getStatusColor(employee.status)} mt-2`}>
                {getStatusLabel(employee.status)}
              </Badge>
            </CardHeader>
            <CardContent>
              <div className="space-y-3 text-sm">
                {employee.employeeNumber && (
                  <div className="flex items-center">
                    <UserIcon className="mr-2 h-4 w-4 opacity-70" />
                    <span>N° {employee.employeeNumber}</span>
                  </div>
                )}

                {employee.department && (
                  <div className="flex items-center">
                    <BuildingIcon className="mr-2 h-4 w-4 opacity-70" />
                    <span>{employee.department.name}</span>
                  </div>
                )}

                {employee.position && (
                  <div className="flex items-center">
                    <BriefcaseIcon className="mr-2 h-4 w-4 opacity-70" />
                    <span>{employee.position.name}</span>
                  </div>
                )}

                {employee.manager && (
                  <div className="flex items-center">
                    <UserIcon className="mr-2 h-4 w-4 opacity-70" />
                    <span>Manager: {employee.manager.firstName} {employee.manager.lastName}</span>
                  </div>
                )}

                {employee.hireDate && (
                  <div className="flex items-center">
                    <CalendarIcon className="mr-2 h-4 w-4 opacity-70" />
                    <span>Embauché le {formatDate(employee.hireDate)}</span>
                  </div>
                )}

                <div className="flex items-center">
                  <MailIcon className="mr-2 h-4 w-4 opacity-70" />
                  <span>{employee.email}</span>
                </div>

                {employee.phone && (
                  <div className="flex items-center">
                    <PhoneIcon className="mr-2 h-4 w-4 opacity-70" />
                    <span>{employee.phone}</span>
                  </div>
                )}
              </div>
            </CardContent>
          </Card>
        </div>

        <div className="md:col-span-3">
          <Tabs defaultValue="info" className="space-y-4">
            <TabsList>
              <TabsTrigger value="info">Informations</TabsTrigger>
              <TabsTrigger value="contracts">Contrats</TabsTrigger>
              <TabsTrigger value="leaves">Congés</TabsTrigger>
              <TabsTrigger value="evaluations">Évaluations</TabsTrigger>
            </TabsList>

            <TabsContent value="info" className="space-y-4">
              <Card>
                <CardHeader>
                  <CardTitle>Informations personnelles</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="grid gap-4 md:grid-cols-2">
                    <div>
                      <h3 className="text-sm font-medium mb-2">Date de naissance</h3>
                      <p className="text-sm">{formatDate(employee.birthDate)}</p>
                    </div>
                    <div>
                      <h3 className="text-sm font-medium mb-2">Genre</h3>
                      <p className="text-sm">{employee.gender === 'male' ? 'Homme' : employee.gender === 'female' ? 'Femme' : 'Autre'}</p>
                    </div>
                    <div className="md:col-span-2">
                      <h3 className="text-sm font-medium mb-2">Adresse</h3>
                      <p className="text-sm">
                        {employee.address}<br />
                        {employee.postalCode} {employee.city}<br />
                        {employee.state}, {employee.country}
                      </p>
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle>Informations bancaires</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="grid gap-4 md:grid-cols-2">
                    <div>
                      <h3 className="text-sm font-medium mb-2">Banque</h3>
                      <p className="text-sm">{employee.bankName || 'Non défini'}</p>
                    </div>
                    <div>
                      <h3 className="text-sm font-medium mb-2">Numéro de compte</h3>
                      <p className="text-sm">{employee.bankAccountNumber || 'Non défini'}</p>
                    </div>
                  </div>
                </CardContent>
              </Card>

              {employee.notes && (
                <Card>
                  <CardHeader>
                    <CardTitle>Notes</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="text-sm">{employee.notes}</p>
                  </CardContent>
                </Card>
              )}
            </TabsContent>

            <TabsContent value="contracts" className="space-y-4">
              <Card>
                <CardHeader>
                  <CardTitle>Contrats</CardTitle>
                </CardHeader>
                <CardContent>
                  {employee.contracts && employee.contracts.length > 0 ? (
                    <div className="space-y-4">
                      {employee.contracts.map((contract) => (
                        <div key={contract.id} className="border rounded-md p-4">
                          <div className="flex justify-between items-start">
                            <div>
                              <h3 className="font-medium">{contract.name}</h3>
                              <p className="text-sm text-muted-foreground">
                                Du {formatDate(contract.startDate)}
                                {contract.endDate ? ` au ${formatDate(contract.endDate)}` : ' (sans date de fin)'}
                              </p>
                            </div>
                            <Badge>
                              {contract.status === 'active' ? 'Actif' : contract.status}
                            </Badge>
                          </div>
                          <div className="mt-2">
                            <p className="text-sm">
                              Type: {contract.type === 'cdi' ? 'CDI' : contract.type === 'cdd' ? 'CDD' : contract.type}
                            </p>
                          </div>
                        </div>
                      ))}
                    </div>
                  ) : (
                    <p className="text-muted-foreground">Aucun contrat enregistré</p>
                  )}
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="leaves" className="space-y-4">
              <Card>
                <CardHeader>
                  <CardTitle>Congés</CardTitle>
                </CardHeader>
                <CardContent>
                  {employee.leaves && employee.leaves.length > 0 ? (
                    <div className="space-y-4">
                      {employee.leaves.map((leave) => (
                        <div key={leave.id} className="border rounded-md p-4">
                          <div className="flex justify-between items-start">
                            <div>
                              <h3 className="font-medium">{leave.leaveType.name}</h3>
                              <p className="text-sm text-muted-foreground">
                                Du {formatDate(leave.startDate)} au {formatDate(leave.endDate)}
                              </p>
                            </div>
                            <Badge className={leave.status === 'approved' ? 'bg-green-500' : 'bg-amber-500'}>
                              {leave.status === 'approved' ? 'Approuvé' : leave.status}
                            </Badge>
                          </div>
                        </div>
                      ))}
                    </div>
                  ) : (
                    <p className="text-muted-foreground">Aucun congé enregistré</p>
                  )}
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="evaluations" className="space-y-4">
              <Card>
                <CardHeader>
                  <CardTitle>Évaluations</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-muted-foreground">Aucune évaluation enregistrée</p>
                </CardContent>
              </Card>
            </TabsContent>
          </Tabs>
        </div>
      </div>
    </div>
  );
};

export default EmployeeDetail;
