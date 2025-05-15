
import React from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';
import { Form, FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import { Calendar } from "@/components/ui/calendar";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { format } from 'date-fns';
import { fr } from 'date-fns/locale';
import { LeaveType, LeaveRequest } from '../../types';
import { Calendar as CalendarIcon } from "lucide-react";
import { cn } from '@/lib/utils';

interface LeaveRequestFormProps {
  leaveTypes: LeaveType[];
  employeeId: string;
  onSubmit: (data: LeaveRequest) => void;
  isLoading?: boolean;
}

// Schéma de validation pour le formulaire
const formSchema = z.object({
  type: z.string({
    required_error: "Vous devez sélectionner un type de congé",
  }),
  date_from: z.date({
    required_error: "Vous devez sélectionner une date de début",
  }),
  date_to: z.date({
    required_error: "Vous devez sélectionner une date de fin",
  }).refine(date => date >= new Date(), {
    message: "La date de fin ne peut pas être antérieure à aujourd'hui",
  }),
  description: z.string().optional(),
});

const LeaveRequestForm: React.FC<LeaveRequestFormProps> = ({ 
  leaveTypes, 
  employeeId, 
  onSubmit, 
  isLoading = false 
}) => {
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      type: '',
      description: '',
    },
  });
  
  const handleSubmit = (values: z.infer<typeof formSchema>) => {
    const leaveRequest: LeaveRequest = {
      employee_id: employeeId,
      date_from: format(values.date_from, 'yyyy-MM-dd'),
      date_to: format(values.date_to, 'yyyy-MM-dd'),
      type: values.type,
      description: values.description,
    };
    
    onSubmit(leaveRequest);
  };

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(handleSubmit)} className="space-y-6">
        <FormField
          control={form.control}
          name="type"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Type de congé</FormLabel>
              <Select onValueChange={field.onChange} defaultValue={field.value}>
                <FormControl>
                  <SelectTrigger>
                    <SelectValue placeholder="Sélectionner un type de congé" />
                  </SelectTrigger>
                </FormControl>
                <SelectContent>
                  {leaveTypes.map((type) => (
                    <SelectItem key={type.id} value={type.id}>
                      <div className="flex items-center">
                        <div 
                          className="w-3 h-3 rounded-full mr-2" 
                          style={{ backgroundColor: type.color }}
                        ></div>
                        {type.name}
                      </div>
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
              <FormMessage />
            </FormItem>
          )}
        />
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <FormField
            control={form.control}
            name="date_from"
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
                      disabled={(date) => date < new Date()}
                      initialFocus
                    />
                  </PopoverContent>
                </Popover>
                <FormMessage />
              </FormItem>
            )}
          />
          
          <FormField
            control={form.control}
            name="date_to"
            render={({ field }) => (
              <FormItem className="flex flex-col">
                <FormLabel>Date de fin</FormLabel>
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
                        date < new Date() || 
                        (form.getValues('date_from') && date < form.getValues('date_from'))
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
        
        <FormField
          control={form.control}
          name="description"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Motif (optionnel)</FormLabel>
              <FormControl>
                <Textarea
                  placeholder="Précisez le motif de votre demande..."
                  className="resize-none"
                  {...field}
                />
              </FormControl>
              <FormDescription>
                Cette information sera visible par votre responsable.
              </FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />
        
        <div className="flex justify-end">
          <Button type="submit" disabled={isLoading}>
            {isLoading ? "Traitement en cours..." : "Soumettre la demande"}
          </Button>
        </div>
      </form>
    </Form>
  );
};

export default LeaveRequestForm;
