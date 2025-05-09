
import { useState } from 'react';
import { departments } from '../data/departments';
import { managers } from '../data/managers';
import { employmentTypes } from '../data/employmentTypes';
import { useToast } from '../../../src/hooks/use-toast';
import { useNavigate } from 'react-router-dom';

/**
 * Hook pour gérer l'état et les actions du formulaire d'employé
 */
export const useEmployeeForm = (employeeId?: string) => {
  const { toast } = useToast();
  const navigate = useNavigate();
  const isNewEmployee = !employeeId;
  
  // État pour l'employé
  const [employee, setEmployee] = useState({
    id: employeeId || '',
    name: '',
    job_title: '',
    department_id: '',
    work_email: '',
    work_phone: '',
    mobile_phone: '',
    address: '',
    birth_date: '',
    hire_date: '',
    employment_type: '',
    manager_id: '',
    notes: '',
    is_active: true,
  });

  // Chargement des données de l'employé par ID
  const loadEmployeeData = async (id: string) => {
    try {
      // Simulation de chargement des données
      if (id === '1') {
        // Exemple de données pour l'employé avec ID 1
        setEmployee({
          id: '1',
          name: 'Kouamé Konan',
          job_title: 'Développeur Web',
          department_id: '7',
          work_email: 'kouame.konan@example.com',
          work_phone: '+225 07 12 34 56',
          mobile_phone: '+225 05 12 34 56',
          address: 'Abidjan, Cocody',
          birth_date: '1990-05-15',
          hire_date: '2021-10-01',
          employment_type: 'full-time',
          manager_id: '3',
          notes: 'Expert en JavaScript et React',
          is_active: true
        });
      } else {
        // Données génériques pour les autres IDs
        setEmployee({
          id,
          name: 'Employé ' + id,
          job_title: 'Poste indéfini',
          department_id: '',
          work_email: 'employee' + id + '@example.com',
          work_phone: '',
          mobile_phone: '',
          address: '',
          birth_date: '',
          hire_date: '',
          employment_type: '',
          manager_id: '',
          notes: '',
          is_active: true
        });
      }
    } catch (error) {
      toast({
        title: 'Erreur',
        description: 'Impossible de charger les données de l\'employé',
        variant: 'destructive'
      });
    }
  };

  // Gestion de la soumission du formulaire
  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    
    try {
      // Simulation d'un délai de sauvegarde
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      toast({
        title: isNewEmployee ? 'Employé créé' : 'Employé mis à jour',
        description: `Les informations de ${employee.name} ont été enregistrées avec succès.`
      });
      
      // Redirection vers la liste des employés
      navigate('/hr/employees');
    } catch (error) {
      toast({
        title: 'Erreur',
        description: 'Une erreur est survenue lors de l\'enregistrement',
        variant: 'destructive'
      });
    }
  };

  // Fonction pour gérer les changements dans les champs du formulaire
  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement> | { name: string; value: string }) => {
    const name = 'target' in e ? e.target.name : e.name;
    const value = 'target' in e ? e.target.value : e.value;
    setEmployee(prev => ({ ...prev, [name]: value }));
  };

  // Fonction pour gérer le changement de statut actif/inactif
  const handleStatusChange = (checked: boolean) => {
    setEmployee(prev => ({ ...prev, is_active: checked }));
  };

  // Fonction pour gérer la suppression
  const handleDelete = () => {
    if (window.confirm('Êtes-vous sûr de vouloir supprimer cet employé ?')) {
      toast({
        title: 'Suppression',
        description: `L'employé ${employee.name} a été supprimé.`
      });
      navigate('/hr/employees');
    }
  };

  return {
    employee,
    departments,
    managers,
    employmentTypes,
    isNewEmployee,
    handleSubmit,
    handleChange,
    handleStatusChange,
    handleDelete,
    loadEmployeeData
  };
};
