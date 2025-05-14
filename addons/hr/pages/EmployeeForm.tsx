import React, { useState, useEffect } from 'react';
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
import { Input } from '../../../src/components/ui/input';
import { Label } from '../../../src/components/ui/label';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue
} from '../../../src/components/ui/select';
import { Textarea } from '../../../src/components/ui/textarea';
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage
} from '../../../src/components/ui/form';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '../../../src/components/ui/tabs';
import { ArrowLeftIcon, SaveIcon } from 'lucide-react';
import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import * as z from 'zod';

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
  departmentId?: number;
  positionId?: number;
  managerId?: number;
}

interface Department {
  id: number;
  name: string;
}

interface Position {
  id: number;
  name: string;
}

interface Manager {
  id: number;
  firstName: string;
  lastName: string;
}

// Schéma de validation Zod
const employeeSchema = z.object({
  firstName: z.string().min(1, { message: 'Le prénom est requis' }),
  lastName: z.string().min(1, { message: 'Le nom est requis' }),
  email: z.string().email({ message: 'Email invalide' }),
  phone: z.string().optional(),
  employeeNumber: z.string().optional(),
  hireDate: z.string().optional(),
  endDate: z.string().optional(),
  birthDate: z.string().optional(),
  gender: z.enum(['male', 'female', 'other']).optional(),
  status: z.enum(['active', 'inactive', 'on_leave', 'terminated']),
  address: z.string().optional(),
  city: z.string().optional(),
  state: z.string().optional(),
  postalCode: z.string().optional(),
  country: z.string().optional(),
  bankName: z.string().optional(),
  bankAccountNumber: z.string().optional(),
  bankRoutingNumber: z.string().optional(),
  notes: z.string().optional(),
  departmentId: z.string().optional(),
  positionId: z.string().optional(),
  managerId: z.string().optional(),
});

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
        departmentId: 1,
        positionId: 1,
        managerId: 2
      });
    }, 500);
  });
};

// Fonction fictive pour récupérer les départements
const fetchDepartments = async (): Promise<Department[]> => {
  // Simuler un appel API
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve([
        { id: 1, name: 'Informatique' },
        { id: 2, name: 'Ressources Humaines' },
        { id: 3, name: 'Finance' },
        { id: 4, name: 'Marketing' }
      ]);
    }, 300);
  });
};

// Fonction fictive pour récupérer les postes
const fetchPositions = async (): Promise<Position[]> => {
  // Simuler un appel API
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve([
        { id: 1, name: 'Développeur Senior' },
        { id: 2, name: 'Responsable RH' },
        { id: 3, name: 'Comptable' },
        { id: 4, name: 'Développeur' },
        { id: 5, name: 'Responsable Marketing' }
      ]);
    }, 300);
  });
};

// Fonction fictive pour récupérer les managers
const fetchManagers = async (): Promise<Manager[]> => {
  // Simuler un appel API
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve([
        { id: 1, firstName: 'Jean', lastName: 'Dupont' },
        { id: 2, firstName: 'Marie', lastName: 'Martin' },
        { id: 3, firstName: 'Pierre', lastName: 'Durand' }
      ]);
    }, 300);
  });
};

/**
 * Page de formulaire d'employé (création/édition)
 */
const EmployeeForm = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const isEditMode = !!id;

  // Récupération des données
  const { data: employee, isLoading: isLoadingEmployee } = useQuery({
    queryKey: ['employee', id],
    queryFn: () => fetchEmployee(id || '0'),
    enabled: isEditMode
  });

  const { data: departments = [] } = useQuery({
    queryKey: ['departments'],
    queryFn: fetchDepartments
  });

  const { data: positions = [] } = useQuery({
    queryKey: ['positions'],
    queryFn: fetchPositions
  });

  const { data: managers = [] } = useQuery({
    queryKey: ['managers'],
    queryFn: fetchManagers
  });

  // Initialisation du formulaire
  const form = useForm<z.infer<typeof employeeSchema>>({
    resolver: zodResolver(employeeSchema),
    defaultValues: {
      firstName: '',
      lastName: '',
      email: '',
      phone: '',
      employeeNumber: '',
      hireDate: '',
      endDate: '',
      birthDate: '',
      gender: undefined,
      status: 'active',
      address: '',
      city: '',
      state: '',
      postalCode: '',
      country: '',
      bankName: '',
      bankAccountNumber: '',
      bankRoutingNumber: '',
      notes: '',
      departmentId: '',
      positionId: '',
      managerId: ''
    }
  });

  // Mise à jour des valeurs du formulaire lorsque les données de l'employé sont chargées
  useEffect(() => {
    if (employee && isEditMode) {
      form.reset({
        firstName: employee.firstName,
        lastName: employee.lastName,
        email: employee.email,
        phone: employee.phone || '',
        employeeNumber: employee.employeeNumber || '',
        hireDate: employee.hireDate || '',
        endDate: employee.endDate || '',
        birthDate: employee.birthDate || '',
        gender: employee.gender as any,
        status: employee.status,
        address: employee.address || '',
        city: employee.city || '',
        state: employee.state || '',
        postalCode: employee.postalCode || '',
        country: employee.country || '',
        bankName: employee.bankName || '',
        bankAccountNumber: employee.bankAccountNumber || '',
        bankRoutingNumber: employee.bankRoutingNumber || '',
        notes: employee.notes || '',
        departmentId: employee.departmentId?.toString() || '',
        positionId: employee.positionId?.toString() || '',
        managerId: employee.managerId?.toString() || ''
      });
    }
  }, [employee, isEditMode, form]);

  // Soumission du formulaire
  const onSubmit = (data: z.infer<typeof employeeSchema>) => {
    console.log('Données soumises:', data);
    // Ici, vous feriez un appel API pour créer ou mettre à jour l'employé

    // Redirection vers la page de détail ou la liste
    if (isEditMode) {
      navigate(`/hr/employees/${id}`);
    } else {
      navigate('/hr/employees');
    }
  };

  // Navigation vers la liste des employés
  const handleBack = () => {
    navigate(isEditMode ? `/hr/employees/${id}` : '/hr/employees');
  };

  return (
    <div className="container mx-auto py-6">
      <div className="flex items-center mb-6">
        <Button variant="outline" size="icon" onClick={handleBack} className="mr-4">
          <ArrowLeftIcon className="h-4 w-4" />
        </Button>
        <div className="flex-1">
          <h1 className="text-3xl font-bold tracking-tight">
            {isEditMode ? 'Modifier un employé' : 'Nouvel employé'}
          </h1>
          <p className="text-muted-foreground">
            {isEditMode ? 'Modifier les informations de l\'employé' : 'Créer un nouvel employé'}
          </p>
        </div>
      </div>

      {isEditMode && isLoadingEmployee ? (
        <div className="flex justify-center items-center h-40">
          <p>Chargement des informations de l'employé...</p>
        </div>
      ) : (
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)}>
            <Tabs defaultValue="basic" className="space-y-4">
              <TabsList>
                <TabsTrigger value="basic">Informations de base</TabsTrigger>
                <TabsTrigger value="personal">Informations personnelles</TabsTrigger>
                <TabsTrigger value="employment">Emploi</TabsTrigger>
                <TabsTrigger value="banking">Informations bancaires</TabsTrigger>
              </TabsList>

              <TabsContent value="basic" className="space-y-4">
                <Card>
                  <CardHeader>
                    <CardTitle>Informations de base</CardTitle>
                    <CardDescription>
                      Informations principales de l'employé
                    </CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <FormField
                        control={form.control}
                        name="firstName"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Prénom</FormLabel>
                            <FormControl>
                              <Input placeholder="Prénom" {...field} />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />

                      <FormField
                        control={form.control}
                        name="lastName"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Nom</FormLabel>
                            <FormControl>
                              <Input placeholder="Nom" {...field} />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />

                      <FormField
                        control={form.control}
                        name="email"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Email</FormLabel>
                            <FormControl>
                              <Input type="email" placeholder="Email" {...field} />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />

                      <FormField
                        control={form.control}
                        name="phone"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Téléphone</FormLabel>
                            <FormControl>
                              <Input placeholder="Téléphone" {...field} />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />

                      <FormField
                        control={form.control}
                        name="employeeNumber"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Numéro d'employé</FormLabel>
                            <FormControl>
                              <Input placeholder="Numéro d'employé" {...field} />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />

                      <FormField
                        control={form.control}
                        name="status"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Statut</FormLabel>
                            <Select
                              onValueChange={field.onChange}
                              defaultValue={field.value}
                            >
                              <FormControl>
                                <SelectTrigger>
                                  <SelectValue placeholder="Sélectionner un statut" />
                                </SelectTrigger>
                              </FormControl>
                              <SelectContent>
                                <SelectItem value="active">Actif</SelectItem>
                                <SelectItem value="inactive">Inactif</SelectItem>
                                <SelectItem value="on_leave">En congé</SelectItem>
                                <SelectItem value="terminated">Terminé</SelectItem>
                              </SelectContent>
                            </Select>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                    </div>
                  </CardContent>
                </Card>
              </TabsContent>

              <TabsContent value="personal" className="space-y-4">
                <Card>
                  <CardHeader>
                    <CardTitle>Informations personnelles</CardTitle>
                    <CardDescription>
                      Informations personnelles de l'employé
                    </CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <FormField
                        control={form.control}
                        name="birthDate"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Date de naissance</FormLabel>
                            <FormControl>
                              <Input type="date" {...field} />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />

                      <FormField
                        control={form.control}
                        name="gender"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Genre</FormLabel>
                            <Select
                              onValueChange={field.onChange}
                              defaultValue={field.value}
                            >
                              <FormControl>
                                <SelectTrigger>
                                  <SelectValue placeholder="Sélectionner un genre" />
                                </SelectTrigger>
                              </FormControl>
                              <SelectContent>
                                <SelectItem value="male">Homme</SelectItem>
                                <SelectItem value="female">Femme</SelectItem>
                                <SelectItem value="other">Autre</SelectItem>
                              </SelectContent>
                            </Select>
                            <FormMessage />
                          </FormItem>
                        )}
                      />

                      <FormField
                        control={form.control}
                        name="address"
                        render={({ field }) => (
                          <FormItem className="md:col-span-2">
                            <FormLabel>Adresse</FormLabel>
                            <FormControl>
                              <Input placeholder="Adresse" {...field} />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />

                      <FormField
                        control={form.control}
                        name="city"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Ville</FormLabel>
                            <FormControl>
                              <Input placeholder="Ville" {...field} />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />

                      <FormField
                        control={form.control}
                        name="postalCode"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Code postal</FormLabel>
                            <FormControl>
                              <Input placeholder="Code postal" {...field} />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />

                      <FormField
                        control={form.control}
                        name="state"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>État/Région</FormLabel>
                            <FormControl>
                              <Input placeholder="État/Région" {...field} />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />

                      <FormField
                        control={form.control}
                        name="country"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Pays</FormLabel>
                            <FormControl>
                              <Input placeholder="Pays" {...field} />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                    </div>
                  </CardContent>
                </Card>
              </TabsContent>

              <TabsContent value="employment" className="space-y-4">
                <Card>
                  <CardHeader>
                    <CardTitle>Informations d'emploi</CardTitle>
                    <CardDescription>
                      Informations relatives à l'emploi
                    </CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <FormField
                        control={form.control}
                        name="hireDate"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Date d'embauche</FormLabel>
                            <FormControl>
                              <Input type="date" {...field} />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />

                      <FormField
                        control={form.control}
                        name="endDate"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Date de fin (si applicable)</FormLabel>
                            <FormControl>
                              <Input type="date" {...field} />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />

                      <FormField
                        control={form.control}
                        name="departmentId"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Département</FormLabel>
                            <Select
                              onValueChange={field.onChange}
                              defaultValue={field.value}
                            >
                              <FormControl>
                                <SelectTrigger>
                                  <SelectValue placeholder="Sélectionner un département" />
                                </SelectTrigger>
                              </FormControl>
                              <SelectContent>
                                {departments.map((dept) => (
                                  <SelectItem key={dept.id} value={dept.id.toString()}>
                                    {dept.name}
                                  </SelectItem>
                                ))}
                              </SelectContent>
                            </Select>
                            <FormMessage />
                          </FormItem>
                        )}
                      />

                      <FormField
                        control={form.control}
                        name="positionId"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Poste</FormLabel>
                            <Select
                              onValueChange={field.onChange}
                              defaultValue={field.value}
                            >
                              <FormControl>
                                <SelectTrigger>
                                  <SelectValue placeholder="Sélectionner un poste" />
                                </SelectTrigger>
                              </FormControl>
                              <SelectContent>
                                {positions.map((pos) => (
                                  <SelectItem key={pos.id} value={pos.id.toString()}>
                                    {pos.name}
                                  </SelectItem>
                                ))}
                              </SelectContent>
                            </Select>
                            <FormMessage />
                          </FormItem>
                        )}
                      />

                      <FormField
                        control={form.control}
                        name="managerId"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Manager</FormLabel>
                            <Select
                              onValueChange={field.onChange}
                              defaultValue={field.value}
                            >
                              <FormControl>
                                <SelectTrigger>
                                  <SelectValue placeholder="Sélectionner un manager" />
                                </SelectTrigger>
                              </FormControl>
                              <SelectContent>
                                {managers.map((mgr) => (
                                  <SelectItem key={mgr.id} value={mgr.id.toString()}>
                                    {mgr.firstName} {mgr.lastName}
                                  </SelectItem>
                                ))}
                              </SelectContent>
                            </Select>
                            <FormMessage />
                          </FormItem>
                        )}
                      />

                      <FormField
                        control={form.control}
                        name="notes"
                        render={({ field }) => (
                          <FormItem className="md:col-span-2">
                            <FormLabel>Notes</FormLabel>
                            <FormControl>
                              <Textarea
                                placeholder="Notes sur l'employé"
                                className="min-h-[100px]"
                                {...field}
                              />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                    </div>
                  </CardContent>
                </Card>
              </TabsContent>

              <TabsContent value="banking" className="space-y-4">
                <Card>
                  <CardHeader>
                    <CardTitle>Informations bancaires</CardTitle>
                    <CardDescription>
                      Informations bancaires de l'employé
                    </CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <FormField
                        control={form.control}
                        name="bankName"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Nom de la banque</FormLabel>
                            <FormControl>
                              <Input placeholder="Nom de la banque" {...field} />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />

                      <FormField
                        control={form.control}
                        name="bankAccountNumber"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Numéro de compte</FormLabel>
                            <FormControl>
                              <Input placeholder="Numéro de compte" {...field} />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />

                      <FormField
                        control={form.control}
                        name="bankRoutingNumber"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Code guichet/routing</FormLabel>
                            <FormControl>
                              <Input placeholder="Code guichet/routing" {...field} />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                    </div>
                  </CardContent>
                </Card>
              </TabsContent>
            </Tabs>

            <div className="mt-6 flex justify-end space-x-4">
              <Button variant="outline" type="button" onClick={handleBack}>
                Annuler
              </Button>
              <Button type="submit">
                <SaveIcon className="mr-2 h-4 w-4" />
                {isEditMode ? 'Mettre à jour' : 'Créer'}
              </Button>
            </div>
          </form>
        </Form>
      )}
    </div>
  );
};

export default EmployeeForm;
