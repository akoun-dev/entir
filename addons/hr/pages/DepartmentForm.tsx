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
import { Checkbox } from '../../../src/components/ui/checkbox';
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage
} from '../../../src/components/ui/form';
import { ArrowLeftIcon, SaveIcon } from 'lucide-react';
import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import * as z from 'zod';

// Types
interface Department {
  id: number;
  name: string;
  code: string;
  description?: string;
  active: boolean;
  budget?: number;
  costCenter?: string;
  parentId?: number;
  managerId?: number;
}

interface Manager {
  id: number;
  firstName: string;
  lastName: string;
}

interface ParentDepartment {
  id: number;
  name: string;
}

// Schéma de validation Zod
const departmentSchema = z.object({
  name: z.string().min(1, { message: 'Le nom est requis' }),
  code: z.string().min(1, { message: 'Le code est requis' }),
  description: z.string().optional(),
  active: z.boolean().default(true),
  budget: z.string().optional(),
  costCenter: z.string().optional(),
  parentId: z.string().optional(),
  managerId: z.string().optional(),
});

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
        parentId: 1,
        managerId: 4
      });
    }, 500);
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
        { id: 3, firstName: 'Pierre', lastName: 'Durand' },
        { id: 4, firstName: 'Sophie', lastName: 'Petit' },
        { id: 5, firstName: 'Thomas', lastName: 'Leroy' }
      ]);
    }, 300);
  });
};

// Fonction fictive pour récupérer les départements parents possibles
const fetchParentDepartments = async (): Promise<ParentDepartment[]> => {
  // Simuler un appel API
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve([
        { id: 1, name: 'Direction Générale' },
        { id: 2, name: 'Ressources Humaines' },
        { id: 3, name: 'Finance' }
      ]);
    }, 300);
  });
};

/**
 * Page de formulaire de département (création/édition)
 */
const DepartmentForm = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const isEditMode = !!id;

  // Récupération des données
  const { data: department, isLoading: isLoadingDepartment } = useQuery({
    queryKey: ['department', id],
    queryFn: () => fetchDepartment(id || '0'),
    enabled: isEditMode
  });

  const { data: managers = [] } = useQuery({
    queryKey: ['managers'],
    queryFn: fetchManagers
  });

  const { data: parentDepartments = [] } = useQuery({
    queryKey: ['parentDepartments'],
    queryFn: fetchParentDepartments
  });

  // Initialisation du formulaire
  const form = useForm<z.infer<typeof departmentSchema>>({
    resolver: zodResolver(departmentSchema),
    defaultValues: {
      name: '',
      code: '',
      description: '',
      active: true,
      budget: '',
      costCenter: '',
      parentId: '',
      managerId: ''
    }
  });

  // Mise à jour des valeurs du formulaire lorsque les données du département sont chargées
  useEffect(() => {
    if (department && isEditMode) {
      form.reset({
        name: department.name,
        code: department.code,
        description: department.description || '',
        active: department.active,
        budget: department.budget?.toString() || '',
        costCenter: department.costCenter || '',
        parentId: department.parentId?.toString() || '',
        managerId: department.managerId?.toString() || ''
      });
    }
  }, [department, isEditMode, form]);

  // Soumission du formulaire
  const onSubmit = (data: z.infer<typeof departmentSchema>) => {
    console.log('Données soumises:', data);
    // Ici, vous feriez un appel API pour créer ou mettre à jour le département

    // Redirection vers la page de détail ou la liste
    if (isEditMode) {
      navigate(`/hr/departments/${id}`);
    } else {
      navigate('/hr/departments');
    }
  };

  // Navigation vers la liste des départements
  const handleBack = () => {
    navigate(isEditMode ? `/hr/departments/${id}` : '/hr/departments');
  };

  return (
    <div className="container mx-auto py-6">
      <div className="flex items-center mb-6">
        <Button variant="outline" size="icon" onClick={handleBack} className="mr-4">
          <ArrowLeftIcon className="h-4 w-4" />
        </Button>
        <div className="flex-1">
          <h1 className="text-3xl font-bold tracking-tight">
            {isEditMode ? 'Modifier un département' : 'Nouveau département'}
          </h1>
          <p className="text-muted-foreground">
            {isEditMode ? 'Modifier les informations du département' : 'Créer un nouveau département'}
          </p>
        </div>
      </div>

      {isEditMode && isLoadingDepartment ? (
        <div className="flex justify-center items-center h-40">
          <p>Chargement des informations du département...</p>
        </div>
      ) : (
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)}>
            <div className="space-y-6">
              <Card>
                <CardHeader>
                  <CardTitle>Informations de base</CardTitle>
                  <CardDescription>
                    Informations principales du département
                  </CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <FormField
                      control={form.control}
                      name="name"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Nom</FormLabel>
                          <FormControl>
                            <Input placeholder="Nom du département" {...field} />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />

                    <FormField
                      control={form.control}
                      name="code"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Code</FormLabel>
                          <FormControl>
                            <Input placeholder="Code du département" {...field} />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />

                    <FormField
                      control={form.control}
                      name="description"
                      render={({ field }) => (
                        <FormItem className="md:col-span-2">
                          <FormLabel>Description</FormLabel>
                          <FormControl>
                            <Textarea
                              placeholder="Description du département"
                              className="min-h-[100px]"
                              {...field}
                            />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />

                    <FormField
                      control={form.control}
                      name="active"
                      render={({ field }) => (
                        <FormItem className="flex flex-row items-start space-x-3 space-y-0 rounded-md border p-4">
                          <FormControl>
                            <Checkbox
                              checked={field.value}
                              onCheckedChange={field.onChange}
                            />
                          </FormControl>
                          <div className="space-y-1 leading-none">
                            <FormLabel>Actif</FormLabel>
                            <FormDescription>
                              Ce département est-il actif ?
                            </FormDescription>
                          </div>
                        </FormItem>
                      )}
                    />
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle>Organisation</CardTitle>
                  <CardDescription>
                    Informations organisationnelles du département
                  </CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <FormField
                      control={form.control}
                      name="parentId"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Département parent</FormLabel>
                          <Select
                            onValueChange={field.onChange}
                            defaultValue={field.value}
                          >
                            <FormControl>
                              <SelectTrigger>
                                <SelectValue placeholder="Sélectionner un département parent" />
                              </SelectTrigger>
                            </FormControl>
                            <SelectContent>
                              <SelectItem value="">Aucun (département racine)</SelectItem>
                              {parentDepartments.map((dept) => (
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
                      name="managerId"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Responsable</FormLabel>
                          <Select
                            onValueChange={field.onChange}
                            defaultValue={field.value}
                          >
                            <FormControl>
                              <SelectTrigger>
                                <SelectValue placeholder="Sélectionner un responsable" />
                              </SelectTrigger>
                            </FormControl>
                            <SelectContent>
                              <SelectItem value="">Aucun responsable</SelectItem>
                              {managers.map((manager) => (
                                <SelectItem key={manager.id} value={manager.id.toString()}>
                                  {manager.firstName} {manager.lastName}
                                </SelectItem>
                              ))}
                            </SelectContent>
                          </Select>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle>Informations financières</CardTitle>
                  <CardDescription>
                    Informations budgétaires du département
                  </CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <FormField
                      control={form.control}
                      name="budget"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Budget</FormLabel>
                          <FormControl>
                            <Input
                              type="number"
                              placeholder="Budget du département"
                              {...field}
                            />
                          </FormControl>
                          <FormDescription>
                            Budget annuel en euros
                          </FormDescription>
                          <FormMessage />
                        </FormItem>
                      )}
                    />

                    <FormField
                      control={form.control}
                      name="costCenter"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Centre de coût</FormLabel>
                          <FormControl>
                            <Input placeholder="Centre de coût" {...field} />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                  </div>
                </CardContent>
              </Card>

              <div className="flex justify-end space-x-4">
                <Button variant="outline" type="button" onClick={handleBack}>
                  Annuler
                </Button>
                <Button type="submit">
                  <SaveIcon className="mr-2 h-4 w-4" />
                  {isEditMode ? 'Mettre à jour' : 'Créer'}
                </Button>
              </div>
            </div>
          </form>
        </Form>
      )}
    </div>
  );
};

export default DepartmentForm;
