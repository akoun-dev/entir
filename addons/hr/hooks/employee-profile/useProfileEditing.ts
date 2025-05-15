
import { useState, useEffect } from 'react';
import { useToast } from '../../../../src/hooks/use-toast';
import { Employee } from '../../types/employee';
import { UseProfileEditingReturn } from './types';

interface UseProfileEditingProps {
  employeeId?: string;
}

export const useProfileEditing = ({ employeeId }: UseProfileEditingProps): UseProfileEditingReturn => {
  const { toast } = useToast();
  const [isEditing, setIsEditing] = useState(false);
  const [employee, setEmployee] = useState<Partial<Employee>>({});
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [initialEmployee, setInitialEmployee] = useState<Partial<Employee>>({});

  // Load employee data
  useEffect(() => {
    if (!employeeId) {
      setLoading(false);
      return;
    }
    
    // Simulated API call - would use the real API in production
    const fetchEmployee = async () => {
      try {
        // For demo, loading mock data
        // This would be replaced by a real API call
        const mockData: Partial<Employee> = {
          id: employeeId,
          name: "Jean Dupont",
          job_title: "Développeur Frontend",
          department_id: "1",
          department_name: "Informatique",
          work_email: "jean.dupont@example.com",
          work_phone: "+225 07 12 34 56",
          manager_id: "2",
          manager_name: "Marie Martin",
          is_active: true,
          photo: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-1.2.1&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80",
        };
        
        setEmployee(mockData);
        setInitialEmployee(mockData);
        setLoading(false);
      } catch (error) {
        console.error("Error fetching employee:", error);
        toast({
          title: "Erreur",
          description: "Impossible de charger les données de l'employé",
          variant: "destructive"
        });
        setLoading(false);
      }
    };
    
    fetchEmployee();
  }, [employeeId, toast]);

  // Save employee data
  const saveEmployee = async () => {
    if (!employeeId) return;
    
    setSaving(true);
    try {
      // This would be a real API call in production
      // await updateEmployee(Number(employeeId), employee);
      
      // For demo purposes, simulate API call
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      setInitialEmployee({...employee});
      setIsEditing(false);
      toast({
        title: "Modifications enregistrées",
        description: "Les modifications ont été enregistrées avec succès"
      });
    } catch (error) {
      console.error("Error saving employee:", error);
      toast({
        title: "Erreur",
        description: "Impossible d'enregistrer les modifications",
        variant: "destructive"
      });
    } finally {
      setSaving(false);
    }
  };

  // Cancel editing
  const cancelEditing = () => {
    setEmployee({...initialEmployee});
    setIsEditing(false);
  };

  // Update employee field
  const updateField = (field: string, value: any) => {
    setEmployee(prev => ({ ...prev, [field]: value }));
  };

  // Generate profile URL for QR code
  const getProfileUrl = () => {
    const baseUrl = window.location.origin;
    return `${baseUrl}/hr/employees/${employeeId}`;
  };

  return {
    employee,
    loading,
    saving,
    isEditing,
    setIsEditing,
    saveEmployee,
    cancelEditing,
    updateField,
    getProfileUrl
  };
};
