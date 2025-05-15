import React, { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { HrLayout } from '../components';
import { Button } from '@/components/ui/button';
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  CardFooter
} from '@/components/ui/card';
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue
} from '@/components/ui/select';
import { ArrowLeft, FileText, Save, Calendar as CalendarIcon } from 'lucide-react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';
import { useToast } from '@/hooks/use-toast';
import { Calendar } from '@/components/ui/calendar';
import { format } from 'date-fns';
import { fr } from 'date-fns/locale';
import { cn } from '@/lib/utils';
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from '@/components/ui/popover';

// Schéma de validation pour le formulaire
const formSchema = z.object({
  name: z.string().min(1, "Le nom du contrat est requis"),
  reference: z.string().optional(),
  employee_id: z.string().min(1, "L'employé est requis"),
  type: z.enum(['cdi', 'cdd', 'interim', 'apprenticeship', 'internship', 'other']),
  start_date: z.date(),
  end_date: z.date().optional().nullable(),
  wage: z.coerce.number().min(0, "Le salaire doit être positif"),
  wage_type: z.enum(['hourly', 'monthly', 'annual']).default('monthly'),
  currency: z.string().default('XOF'),
  working_hours: z.coerce.number().min(0).optional(),
  working_time_type: z.enum(['full_time', 'part_time']).default('full_time'),
  trial_period: z.coerce.number().min(0).optional(),
  notes: z.string().optional(),
  status: z.enum(['draft', 'pending', 'running', 'expired', 'terminated']).default('draft'),
});

/**
 * Vue de création/édition d'un contrat
 */
const ContractFormView: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const { toast } = useToast();
  const isEditMode = !!id;

  // État pour stocker les employés (simulé)
  const [employees, setEmployees] = useState<{ id: string, name: string }[]>([
    { id: '1', name: 'Kouamé Konan' },
    { id: '2', name: 'Aminata Touré' },
    { id: '3', name: 'Jean Konaté' },
    { id: '4', name: 'Marie Diallo' },
    { id: '5', name: 'Pascal Ouattara' },
  ]);

  // État pour stocker le contrat en cours d'édition (simulé)
  const [contract, setContract] = useState<any>(null);

  // React Hook Form setup
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: '',
      reference: '',
      employee_id: '',
      type: 'cdi',
      start_date: new Date(),
      end_date: null,
      wage: 0,
      wage_type: 'monthly',
      currency: 'XOF',
      working_hours: 40,
      working_time_type: 'full_time',
      trial_period: 90,
      notes: '',
      status: 'draft',
    },
  });

  // Charger les données du contrat en mode édition
  useEffect(() => {
    if (isEditMode && id) {
      // Simuler le chargement des données du contrat
      const mockContract = {
        id: parseInt(id),
        name: `Contrat-${id}`,
        reference: `REF-${id}`,
        employee_id: '1',
        type: 'cdi',
        start_date: new Date(),
        end_date: null,
        wage: 650000,
        wage_type: 'monthly',
        currency: 'XOF',
        working_hours: 40,
        working_time_type: 'full_time',
        trial_period: 90,
        notes: 'Contrat standard avec période d\'essai de 3 mois',
        status: 'running',
      };

      setContract(mockContract);

      // Mettre à jour le formulaire avec les données du contrat
      form.reset({
        name: mockContract.name,
        reference: mockContract.reference,
        employee_id: mockContract.employee_id,
        type: mockContract.type as any,
        start_date: new Date(mockContract.start_date),
        end_date: mockContract.end_date ? new Date(mockContract.end_date) : null,
        wage: mockContract.wage,
        wage_type: mockContract.wage_type as any,
        currency: mockContract.currency,
        working_hours: mockContract.working_hours,
        working_time_type: mockContract.working_time_type as any,
        trial_period: mockContract.trial_period,
        notes: mockContract.notes,
        status: mockContract.status as any,
      });
    }
  }, [isEditMode, id, form]);

  // Gérer la soumission du formulaire
  const onSubmit = (data: z.infer<typeof formSchema>) => {
    try {
      console.log('Données du formulaire:', data);

      // Simuler l'enregistrement du contrat
      setTimeout(() => {
        toast({
          title: isEditMode ? "Contrat mis à jour" : "Contrat créé",
          description: isEditMode
            ? `Le contrat ${data.name} a été mis à jour avec succès.`
            : `Le contrat ${data.name} a été créé avec succès.`,
        });

        // Rediriger vers la liste des contrats
        navigate('/hr/contracts');
      }, 1000);
    } catch (error) {
      console.error('Erreur lors de la soumission:', error);
      toast({
        title: "Erreur",
        description: "Une erreur s'est produite lors de l'enregistrement du contrat.",
        variant: "destructive",
      });
    }
  };

  return (
    <HrLayout>
      <div className="w-full">
        {/* En-tête */}
        <div className="flex items-center gap-2 mb-6">
          <Button variant="outline" size="icon" onClick={() => navigate(-1)}>
            <ArrowLeft className="h-4 w-4" />
          </Button>
          <div className="flex items-center gap-3">
            <div className="h-6 w-1.5 bg-amber-500 rounded-full"></div>
            <FileText className="h-6 w-6 text-amber-500" />
            <h1 className="text-2xl font-bold">
              {isEditMode ? `Modifier le contrat: ${contract?.name}` : 'Nouveau contrat'}
            </h1>
          </div>
        </div>

        {/* Formulaire */}
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6 w-full">
            <Card className="w-full">
              <CardHeader>
                <CardTitle>Informations du contrat</CardTitle>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  {/* Nom du contrat */}
                  <FormField
                    control={form.control}
                    name="name"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Nom du contrat</FormLabel>
                        <FormControl>
                          <Input placeholder="Ex: CDI-001" {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  {/* Référence */}
                  <FormField
                    control={form.control}
                    name="reference"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Référence</FormLabel>
                        <FormControl>
                          <Input placeholder="Ex: REF-2023-001" {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  {/* Employé */}
                  <FormField
                    control={form.control}
                    name="employee_id"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Employé</FormLabel>
                        <Select
                          onValueChange={field.onChange}
                          defaultValue={field.value}
                          value={field.value}
                        >
                          <FormControl>
                            <SelectTrigger>
                              <SelectValue placeholder="Sélectionner un employé" />
                            </SelectTrigger>
                          </FormControl>
                          <SelectContent>
                            {employees.map(employee => (
                              <SelectItem key={employee.id} value={employee.id}>
                                {employee.name}
                              </SelectItem>
                            ))}
                          </SelectContent>
                        </Select>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  {/* Type de contrat */}
                  <FormField
                    control={form.control}
                    name="type"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Type de contrat</FormLabel>
                        <Select
                          onValueChange={field.onChange}
                          defaultValue={field.value}
                          value={field.value}
                        >
                          <FormControl>
                            <SelectTrigger>
                              <SelectValue placeholder="Sélectionner un type" />
                            </SelectTrigger>
                          </FormControl>
                          <SelectContent>
                            <SelectItem value="cdi">CDI</SelectItem>
                            <SelectItem value="cdd">CDD</SelectItem>
                            <SelectItem value="interim">Intérim</SelectItem>
                            <SelectItem value="apprenticeship">Apprentissage</SelectItem>
                            <SelectItem value="internship">Stage</SelectItem>
                            <SelectItem value="other">Autre</SelectItem>
                          </SelectContent>
                        </Select>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  {/* Date de début */}
                  <FormField
                    control={form.control}
                    name="start_date"
                    render={({ field }) => (
                      <FormItem className="flex flex-col">
                        <FormLabel>Date de début</FormLabel>
                        <Popover>
                          <PopoverTrigger asChild>
                            <FormControl>
                              <Button
                                variant="outline"
                                className={cn(
                                  "w-full pl-3 text-left font-normal",
                                  !field.value && "text-muted-foreground"
                                )}
                              >
                                {field.value ? (
                                  format(field.value, 'P', { locale: fr })
                                ) : (
                                  <span>Choisir une date</span>
                                )}
                                <CalendarIcon className="ml-auto h-4 w-4 opacity-50" />
                              </Button>
                            </FormControl>
                          </PopoverTrigger>
                          <PopoverContent className="w-auto p-0" align="start">
                            <Calendar
                              mode="single"
                              selected={field.value}
                              onSelect={field.onChange}
                              initialFocus
                            />
                          </PopoverContent>
                        </Popover>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  {/* Date de fin */}
                  <FormField
                    control={form.control}
                    name="end_date"
                    render={({ field }) => (
                      <FormItem className="flex flex-col">
                        <FormLabel>Date de fin (optionnel)</FormLabel>
                        <Popover>
                          <PopoverTrigger asChild>
                            <FormControl>
                              <Button
                                variant="outline"
                                className={cn(
                                  "w-full pl-3 text-left font-normal",
                                  !field.value && "text-muted-foreground"
                                )}
                              >
                                {field.value ? (
                                  format(field.value, 'P', { locale: fr })
                                ) : (
                                  <span>Choisir une date</span>
                                )}
                                <CalendarIcon className="ml-auto h-4 w-4 opacity-50" />
                              </Button>
                            </FormControl>
                          </PopoverTrigger>
                          <PopoverContent className="w-auto p-0" align="start">
                            <Calendar
                              mode="single"
                              selected={field.value}
                              onSelect={field.onChange}
                              disabled={(date) =>
                                form.getValues('start_date') && date < form.getValues('start_date')
                              }
                              initialFocus
                            />
                          </PopoverContent>
                        </Popover>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                  {/* Salaire */}
                  <FormField
                    control={form.control}
                    name="wage"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Salaire</FormLabel>
                        <FormControl>
                          <Input type="number" {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  {/* Type de salaire */}
                  <FormField
                    control={form.control}
                    name="wage_type"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Type de salaire</FormLabel>
                        <Select
                          onValueChange={field.onChange}
                          defaultValue={field.value}
                          value={field.value}
                        >
                          <FormControl>
                            <SelectTrigger>
                              <SelectValue placeholder="Sélectionner" />
                            </SelectTrigger>
                          </FormControl>
                          <SelectContent>
                            <SelectItem value="hourly">Horaire</SelectItem>
                            <SelectItem value="monthly">Mensuel</SelectItem>
                            <SelectItem value="annual">Annuel</SelectItem>
                          </SelectContent>
                        </Select>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  {/* Devise */}
                  <FormField
                    control={form.control}
                    name="currency"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Devise</FormLabel>
                        <Select
                          onValueChange={field.onChange}
                          defaultValue={field.value}
                          value={field.value}
                        >
                          <FormControl>
                            <SelectTrigger>
                              <SelectValue placeholder="Sélectionner" />
                            </SelectTrigger>
                          </FormControl>
                          <SelectContent>
                            <SelectItem value="XOF">XOF (FCFA)</SelectItem>
                            <SelectItem value="EUR">EUR (€)</SelectItem>
                            <SelectItem value="USD">USD ($)</SelectItem>
                          </SelectContent>
                        </Select>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </div>

                {/* Notes */}
                <FormField
                  control={form.control}
                  name="notes"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Notes</FormLabel>
                      <FormControl>
                        <Textarea
                          placeholder="Informations complémentaires sur le contrat..."
                          className="min-h-[100px]"
                          {...field}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </CardContent>
              <CardFooter className="flex justify-between">
                <Button
                  type="button"
                  variant="outline"
                  onClick={() => navigate('/hr/contracts')}
                >
                  Annuler
                </Button>
                <Button type="submit">
                  <Save className="h-4 w-4 mr-2" />
                  {isEditMode ? "Mettre à jour" : "Créer le contrat"}
                </Button>
              </CardFooter>
            </Card>
          </form>
        </Form>
      </div>
    </HrLayout>
  );
};

export default ContractFormView;
