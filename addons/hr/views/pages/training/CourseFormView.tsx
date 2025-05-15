import React, { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { HrLayout } from '../../components';
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
  FormDescription,
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
import { ArrowLeft, GraduationCap, Plus, Save, X, Award } from 'lucide-react';
import { useTraining } from '../../../hooks/useTraining';
import { useForm } from 'react-hook-form';
import { z } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import { TrainingCourse } from '../../../types';
import { useToast } from '@/hooks/use-toast';
import { Switch } from '@/components/ui/switch';
import { Badge } from '@/components/ui/badge';

// Form validation schema
const formSchema = z.object({
  title: z.string().min(1, 'Le titre est requis'),
  description: z.string().min(1, 'La description est requise'),
  category_id: z.string().min(1, 'La catégorie est requise'),
  duration: z.coerce.number().min(1, 'La durée doit être d\'au moins 1 heure'),
  level: z.string().min(1, 'Le niveau est requis'),
  objectives: z.array(z.string()).min(1, 'Au moins un objectif est requis'),
  prerequisites: z.array(z.string()).optional(),
  trainers: z.array(z.string()).min(1, 'Au moins un formateur est requis'),
  status: z.enum(['draft', 'published', 'archived']),
  certification: z.boolean().default(false),
  imageUrl: z.string().optional(),
});

/**
 * Vue de création/édition d'un cours de formation
 */
const CourseFormView: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const { toast } = useToast();
  const isEditMode = !!id;
  
  const { 
    getCourseById, 
    createCourse, 
    updateCourse,
    categories,
    trainers
  } = useTraining();
  
  // Get the course if in edit mode
  const course = isEditMode ? getCourseById(id) : null;
  
  // For managing objectives and prerequisites as they can be added/removed
  const [objectives, setObjectives] = useState<string[]>([]);
  const [newObjective, setNewObjective] = useState('');
  const [prerequisites, setPrerequisites] = useState<string[]>([]);
  const [newPrerequisite, setNewPrerequisite] = useState('');

  // React Hook Form setup
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      title: '',
      description: '',
      category_id: '',
      duration: 0,
      level: 'débutant',
      objectives: [],
      prerequisites: [],
      trainers: [],
      status: 'draft' as const,
      certification: false,
      imageUrl: '',
    },
  });
  
  // Load course data if in edit mode
  useEffect(() => {
    if (isEditMode && course) {
      form.reset({
        title: course.title,
        description: course.description || '',
        category_id: course.category_id,
        duration: course.duration,
        level: course.level,
        objectives: course.objectives,
        prerequisites: course.prerequisites || [],
        trainers: course.trainers,
        status: course.status as any,
        certification: !!course.certification,
        imageUrl: course.imageUrl || '',
      });
      
      setObjectives(course.objectives);
      setPrerequisites(course.prerequisites || []);
    }
  }, [isEditMode, course, form]);
  
  // Handle adding a new objective
  const handleAddObjective = () => {
    if (newObjective.trim()) {
      const updatedObjectives = [...objectives, newObjective.trim()];
      setObjectives(updatedObjectives);
      form.setValue('objectives', updatedObjectives);
      setNewObjective('');
    }
  };
  
  // Handle removing an objective
  const handleRemoveObjective = (index: number) => {
    const updatedObjectives = objectives.filter((_, i) => i !== index);
    setObjectives(updatedObjectives);
    form.setValue('objectives', updatedObjectives);
  };
  
  // Handle adding a new prerequisite
  const handleAddPrerequisite = () => {
    if (newPrerequisite.trim()) {
      const updatedPrerequisites = [...prerequisites, newPrerequisite.trim()];
      setPrerequisites(updatedPrerequisites);
      form.setValue('prerequisites', updatedPrerequisites);
      setNewPrerequisite('');
    }
  };
  
  // Handle removing a prerequisite
  const handleRemovePrerequisite = (index: number) => {
    const updatedPrerequisites = prerequisites.filter((_, i) => i !== index);
    setPrerequisites(updatedPrerequisites);
    form.setValue('prerequisites', updatedPrerequisites);
  };
  
  // Handle form submission
  const onSubmit = (values: z.infer<typeof formSchema>) => {
    // Prepare form data
    const formData: Partial<TrainingCourse> = {
      title: values.title,
      description: values.description,
      category_id: values.category_id,
      duration: values.duration,
      level: values.level,
      objectives: values.objectives,
      prerequisites: values.prerequisites,
      trainers: values.trainers,
      status: values.status,
      certification: values.certification,
      imageUrl: values.imageUrl,
    };
    
    if (isEditMode && course) {
      updateCourse(course.id, formData);
      toast({
        title: "Cours mis à jour",
        description: "Le cours a été mis à jour avec succès.",
      });
      navigate(`/hr/training/courses`);
    } else {
      const newCourse = createCourse(formData as any);
      toast({
        title: "Cours créé",
        description: "Le cours a été créé avec succès.",
      });
      navigate(`/hr/training/courses`);
    }
  };
  
  return (
    <HrLayout>
      <div className="w-full space-y-6">
        {/* Header */}
        <div>
          <div className="flex items-center gap-2 mb-4">
            <Button variant="outline" size="icon" onClick={() => navigate(-1)}>
              <ArrowLeft className="h-4 w-4" />
            </Button>
            <div className="flex items-center gap-3">
              <div className="h-6 w-1.5 bg-amber-500 rounded-full"></div>
              <GraduationCap className="h-6 w-6 text-amber-500" />
              <h1 className="text-2xl font-bold">
                {isEditMode ? `Modifier le cours: ${course?.title}` : 'Nouveau cours de formation'}
              </h1>
            </div>
          </div>
        </div>

        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8 w-full">
            <Card className="w-full">
              <CardHeader>
                <CardTitle>Informations générales</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  {/* Titre du cours */}
                  <FormField
                    control={form.control}
                    name="title"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Titre du cours</FormLabel>
                        <FormControl>
                          <Input placeholder="ex: Leadership et Management d'équipe" {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  
                  {/* Catégorie */}
                  <FormField
                    control={form.control}
                    name="category_id"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Catégorie</FormLabel>
                        <Select 
                          onValueChange={field.onChange} 
                          defaultValue={field.value}
                          value={field.value}
                        >
                          <FormControl>
                            <SelectTrigger>
                              <SelectValue placeholder="Sélectionner une catégorie" />
                            </SelectTrigger>
                          </FormControl>
                          <SelectContent>
                            {categories.map(category => (
                              <SelectItem key={category.id} value={category.id}>
                                {category.name}
                              </SelectItem>
                            ))}
                          </SelectContent>
                        </Select>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </div>
                
                {/* Description */}
                <FormField
                  control={form.control}
                  name="description"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Description</FormLabel>
                      <FormControl>
                        <Textarea 
                          placeholder="Description détaillée du cours..." 
                          className="min-h-[100px]" 
                          {...field} 
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                  {/* Durée */}
                  <FormField
                    control={form.control}
                    name="duration"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Durée (heures)</FormLabel>
                        <FormControl>
                          <Input type="number" min="1" {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  
                  {/* Niveau */}
                  <FormField
                    control={form.control}
                    name="level"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Niveau</FormLabel>
                        <Select 
                          onValueChange={field.onChange} 
                          defaultValue={field.value}
                          value={field.value}
                        >
                          <FormControl>
                            <SelectTrigger>
                              <SelectValue placeholder="Sélectionner un niveau" />
                            </SelectTrigger>
                          </FormControl>
                          <SelectContent>
                            <SelectItem value="débutant">Débutant</SelectItem>
                            <SelectItem value="intermédiaire">Intermédiaire</SelectItem>
                            <SelectItem value="avancé">Avancé</SelectItem>
                            <SelectItem value="expert">Expert</SelectItem>
                          </SelectContent>
                        </Select>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  
                  {/* Certification */}
                  <FormField
                    control={form.control}
                    name="certification"
                    render={({ field }) => (
                      <FormItem className="flex flex-row items-center justify-between rounded-lg border p-3 shadow-sm">
                        <div className="space-y-0.5">
                          <FormLabel>Certification</FormLabel>
                          <FormDescription>
                            Ce cours offre-t-il une certification?
                          </FormDescription>
                        </div>
                        <FormControl>
                          <Switch
                            checked={field.value}
                            onCheckedChange={field.onChange}
                          />
                        </FormControl>
                      </FormItem>
                    )}
                  />
                </div>
              </CardContent>
              <CardFooter className="flex justify-between">
                <Button 
                  type="button" 
                  variant="outline"
                  onClick={() => navigate('/hr/training/courses')}
                >
                  Annuler
                </Button>
                <Button type="submit">
                  <Save className="h-4 w-4 mr-2" />
                  {isEditMode ? "Mettre à jour" : "Créer le cours"}
                </Button>
              </CardFooter>
            </Card>
          </form>
        </Form>
      </div>
    </HrLayout>
  );
};

export default CourseFormView;
