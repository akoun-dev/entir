
import React, { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { HrLayout } from '../components';
import { Button } from '../../../../src/components/ui/button';
import { 
  Card, 
  CardContent, 
  CardHeader,
  CardTitle, 
  CardFooter 
} from '../../../../src/components/ui/card';
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '../../../../src/components/ui/form';
import { Input } from '../../../../src/components/ui/input';
import { Textarea } from '../../../../src/components/ui/textarea';
import { 
  Select, 
  SelectContent, 
  SelectItem, 
  SelectTrigger, 
  SelectValue 
} from '../../../../src/components/ui/select';
import { ArrowLeft, Briefcase, Plus, Save, X } from 'lucide-react';
import { useRecruitment } from '../../hooks';
import { useForm } from 'react-hook-form';
import { z } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import { JobOffer } from '../../types/recruitment';
import { useToast } from '../../../../src/hooks/use-toast';

// Form validation schema
const formSchema = z.object({
  title: z.string().min(1, 'Le titre est requis'),
  department_id: z.string().min(1, 'Le département est requis'),
  job_description: z.string().min(1, 'La description est requise'),
  requirements: z.array(z.string()).min(1, 'Au moins un prérequis est requis'),
  start_date: z.string().min(1, 'La date de début est requise'),
  end_date: z.string().min(1, 'La date de fin est requise'),
  status: z.enum(['draft', 'published', 'closed']),
  location: z.string().min(1, 'Le lieu est requis'),
  salary_range: z.string().optional(),
  employment_type: z.enum(['full_time', 'part_time', 'contract', 'internship']),
});

const JobOfferFormView: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const { toast } = useToast();
  const isEditMode = !!id;
  
  const { 
    getJobOfferById, 
    createJobOffer, 
    updateJobOffer 
  } = useRecruitment();
  
  // Get the job offer if in edit mode
  const jobOffer = isEditMode ? getJobOfferById(id) : null;
  
  // For managing requirements as they can be added/removed
  const [requirements, setRequirements] = useState<string[]>([]);
  const [newRequirement, setNewRequirement] = useState('');

  // React Hook Form setup
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      title: '',
      department_id: '',
      job_description: '',
      requirements: [],
      start_date: '',
      end_date: '',
      status: 'draft' as const,
      location: '',
      salary_range: '',
      employment_type: 'full_time' as const,
    },
  });

  // Initialize form with job offer data if editing
  useEffect(() => {
    if (jobOffer) {
      form.reset({
        title: jobOffer.title,
        department_id: jobOffer.department_id,
        job_description: jobOffer.job_description,
        requirements: jobOffer.requirements,
        start_date: jobOffer.start_date,
        end_date: jobOffer.end_date,
        status: jobOffer.status,
        location: jobOffer.location,
        salary_range: jobOffer.salary_range || '',
        employment_type: jobOffer.employment_type,
      });
      
      setRequirements(jobOffer.requirements);
    }
  }, [jobOffer, form]);

  // Handle form submission
  const onSubmit = (values: z.infer<typeof formSchema>) => {
    // Make sure all required properties are provided
    const formData = {
      ...values,
      requirements,
      department_name: 'Département', // In a real app, get this from department service
      title: values.title || '', // Ensure title is always provided
      department_id: values.department_id || '', // Ensure department_id is always provided
      job_description: values.job_description || '', // Ensure job_description is always provided
      location: values.location || '', // Ensure location is always provided
      status: values.status || 'draft', // Ensure status is always provided
      start_date: values.start_date || '', // Ensure start_date is always provided
      end_date: values.end_date || '', // Ensure end_date is always provided
      employment_type: values.employment_type || 'full_time', // Ensure employment_type is always provided
    };
    
    if (isEditMode && jobOffer) {
      updateJobOffer(jobOffer.id, formData);
      toast({
        title: "Offre mise à jour",
        description: "L'offre d'emploi a été mise à jour avec succès.",
      });
      navigate(`/hr/recruitment/offers/${jobOffer.id}`);
    } else {
      const newOffer = createJobOffer(formData);
      toast({
        title: "Offre créée",
        description: "L'offre d'emploi a été créée avec succès.",
      });
      navigate(`/hr/recruitment/offers/${newOffer.id}`);
    }
  };

  // Add a new requirement
  const addRequirement = () => {
    if (newRequirement.trim()) {
      setRequirements([...requirements, newRequirement.trim()]);
      setNewRequirement('');
    }
  };

  // Remove a requirement
  const removeRequirement = (index: number) => {
    setRequirements(requirements.filter((_, i) => i !== index));
  };

  // If trying to edit a non-existent job offer
  if (isEditMode && !jobOffer) {
    return (
      <HrLayout>
        <div className="p-8 text-center">
          <h2 className="text-2xl font-bold mb-4">Offre non trouvée</h2>
          <p className="mb-6">L'offre d'emploi que vous cherchez à modifier n'existe pas ou a été supprimée.</p>
          <Button onClick={() => navigate('/hr/recruitment')}>
            <ArrowLeft className="h-4 w-4 mr-2" />
            Retour
          </Button>
        </div>
      </HrLayout>
    );
  }

  return (
    <HrLayout>
      <div className="space-y-6">
        {/* Header */}
        <div>
          <div className="flex items-center gap-2 mb-4">
            <Button variant="outline" size="icon" onClick={() => navigate(-1)}>
              <ArrowLeft className="h-4 w-4" />
            </Button>
            <div className="flex items-center gap-3">
              <div className="h-6 w-1.5 bg-amber-500 rounded-full"></div>
              <Briefcase className="h-6 w-6 text-amber-500" />
              <h1 className="text-2xl font-bold">
                {isEditMode ? `Modifier l'offre: ${jobOffer?.title}` : 'Nouvelle offre d\'emploi'}
              </h1>
            </div>
          </div>
        </div>

        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
            <Card>
              <CardHeader>
                <CardTitle>Informations générales</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <FormField
                    control={form.control}
                    name="title"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Titre du poste</FormLabel>
                        <FormControl>
                          <Input placeholder="ex: Développeur Frontend" {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  
                  <FormField
                    control={form.control}
                    name="department_id"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Département</FormLabel>
                        <FormControl>
                          <Select 
                            onValueChange={field.onChange} 
                            defaultValue={field.value}
                          >
                            <SelectTrigger>
                              <SelectValue placeholder="Sélectionner un département" />
                            </SelectTrigger>
                            <SelectContent>
                              <SelectItem value="dept001">Technologie</SelectItem>
                              <SelectItem value="dept002">Marketing</SelectItem>
                              <SelectItem value="dept003">RH</SelectItem>
                              <SelectItem value="dept004">Finance</SelectItem>
                            </SelectContent>
                          </Select>
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </div>
                
                <FormField
                  control={form.control}
                  name="job_description"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Description du poste</FormLabel>
                      <FormControl>
                        <Textarea 
                          placeholder="Décrivez les responsabilités et le contexte du poste..." 
                          className="min-h-32" 
                          {...field} 
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                
                <div className="space-y-3">
                  <FormLabel>Prérequis</FormLabel>
                  
                  <div className="flex items-center gap-2">
                    <Input 
                      placeholder="Ajouter un prérequis" 
                      value={newRequirement}
                      onChange={e => setNewRequirement(e.target.value)}
                      onKeyPress={(e) => e.key === 'Enter' && (e.preventDefault(), addRequirement())}
                    />
                    <Button type="button" onClick={addRequirement}>
                      <Plus className="h-4 w-4" />
                    </Button>
                  </div>
                  
                  <div className="space-y-2 mt-2">
                    {requirements.length === 0 ? (
                      <p className="text-sm text-muted-foreground">
                        Aucun prérequis ajouté. Ajoutez au moins un prérequis.
                      </p>
                    ) : (
                      requirements.map((req, index) => (
                        <div key={index} className="flex items-center justify-between p-2 border rounded-md">
                          <span>{req}</span>
                          <Button 
                            type="button" 
                            variant="ghost" 
                            size="icon" 
                            onClick={() => removeRequirement(index)}
                          >
                            <X className="h-4 w-4" />
                          </Button>
                        </div>
                      ))
                    )}
                  </div>
                  
                  {requirements.length === 0 && form.formState.isSubmitted && (
                    <p className="text-sm text-red-500">
                      Au moins un prérequis est requis
                    </p>
                  )}
                </div>
              </CardContent>
            </Card>
            
            <Card>
              <CardHeader>
                <CardTitle>Détails</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <FormField
                    control={form.control}
                    name="location"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Lieu</FormLabel>
                        <FormControl>
                          <Input placeholder="ex: Abidjan, Côte d'Ivoire" {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  
                  <FormField
                    control={form.control}
                    name="employment_type"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Type d'emploi</FormLabel>
                        <FormControl>
                          <Select 
                            onValueChange={field.onChange} 
                            defaultValue={field.value}
                          >
                            <SelectTrigger>
                              <SelectValue placeholder="Type d'emploi" />
                            </SelectTrigger>
                            <SelectContent>
                              <SelectItem value="full_time">Temps plein</SelectItem>
                              <SelectItem value="part_time">Temps partiel</SelectItem>
                              <SelectItem value="contract">Contrat</SelectItem>
                              <SelectItem value="internship">Stage</SelectItem>
                            </SelectContent>
                          </Select>
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  
                  <FormField
                    control={form.control}
                    name="salary_range"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Fourchette de salaire (optionnel)</FormLabel>
                        <FormControl>
                          <Input placeholder="ex: 1 500 000 - 2 000 000 FCFA" {...field} />
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
                        <FormControl>
                          <Select 
                            onValueChange={field.onChange} 
                            defaultValue={field.value}
                          >
                            <SelectTrigger>
                              <SelectValue placeholder="Statut" />
                            </SelectTrigger>
                            <SelectContent>
                              <SelectItem value="draft">Brouillon</SelectItem>
                              <SelectItem value="published">Publié</SelectItem>
                              <SelectItem value="closed">Fermé</SelectItem>
                            </SelectContent>
                          </Select>
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </div>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <FormField
                    control={form.control}
                    name="start_date"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Date de début</FormLabel>
                        <FormControl>
                          <Input type="date" {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  
                  <FormField
                    control={form.control}
                    name="end_date"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Date de fin</FormLabel>
                        <FormControl>
                          <Input type="date" {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </div>
              </CardContent>
              
              <CardFooter className="flex justify-between">
                <Button 
                  type="button" 
                  variant="outline"
                  onClick={() => navigate(-1)}
                >
                  Annuler
                </Button>
                <Button type="submit">
                  <Save className="h-4 w-4 mr-2" />
                  {isEditMode ? "Mettre à jour" : "Créer l'offre"}
                </Button>
              </CardFooter>
            </Card>
          </form>
        </Form>
      </div>
    </HrLayout>
  );
};

export default JobOfferFormView;
