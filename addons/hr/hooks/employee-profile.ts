import { useState, useEffect, useCallback } from 'react';
import { Employee, Contract, Leave } from '../types';
import { employeeService, contractService, leaveService } from '../services';

/**
 * Interface pour les données de retour du hook useEmployeeProfile
 */
interface UseEmployeeProfileReturn {
  employee: Employee | null;
  contracts: Contract[];
  leaves: Leave[];
  loading: boolean;
  error: string | null;
  updateEmployee: (data: Partial<Employee>) => Promise<Employee | null>;
  updateProfilePicture: (file: File) => Promise<string | null>;
  generateQRCode: () => string;
  exportProfile: (format: 'pdf' | 'docx') => Promise<string>;
}

/**
 * Hook pour gérer le profil d'un employé
 * 
 * Ce hook fournit des fonctionnalités pour afficher et modifier le profil d'un employé,
 * y compris ses contrats et ses congés.
 * 
 * @param employeeId ID de l'employé
 */
export const useEmployeeProfile = (employeeId?: string): UseEmployeeProfileReturn => {
  // États pour les données
  const [employee, setEmployee] = useState<Employee | null>(null);
  const [contracts, setContracts] = useState<Contract[]>([]);
  const [leaves, setLeaves] = useState<Leave[]>([]);
  
  // États pour le chargement et les erreurs
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  
  /**
   * Charge les données de l'employé
   */
  const loadEmployee = useCallback(async () => {
    if (!employeeId) return null;
    
    try {
      setLoading(true);
      setError(null);
      
      const employeeData = await employeeService.getEmployeeById(employeeId);
      setEmployee(employeeData);
      
      return employeeData;
    } catch (err) {
      console.error(`Erreur lors du chargement de l'employé ${employeeId}:`, err);
      setError(`Impossible de charger les données de l'employé.`);
      return null;
    } finally {
      setLoading(false);
    }
  }, [employeeId]);
  
  /**
   * Charge les contrats de l'employé
   */
  const loadContracts = useCallback(async () => {
    if (!employeeId) return [];
    
    try {
      setLoading(true);
      
      // Utiliser le service de contrats pour récupérer les contrats de l'employé
      // Si le service n'est pas disponible, utiliser des données simulées
      try {
        const contractsData = await contractService.getByEmployee(employeeId);
        setContracts(contractsData);
        return contractsData;
      } catch (err) {
        console.warn(`Service de contrats non disponible, utilisation de données simulées:`, err);
        
        // Données simulées pour les contrats
        const mockContracts: Contract[] = [
          {
            id: "1",
            employee_id: employeeId,
            type: "CDI",
            start_date: "2020-01-15",
            end_date: null,
            job_title: "Développeur Full Stack",
            department_id: "3",
            salary: 45000,
            status: "running",
            created_at: "2020-01-10T10:00:00Z",
            updated_at: "2020-01-10T10:00:00Z"
          }
        ];
        
        setContracts(mockContracts);
        return mockContracts;
      }
    } catch (err) {
      console.error(`Erreur lors du chargement des contrats de l'employé ${employeeId}:`, err);
      return [];
    } finally {
      setLoading(false);
    }
  }, [employeeId]);
  
  /**
   * Charge les congés de l'employé
   */
  const loadLeaves = useCallback(async () => {
    if (!employeeId) return [];
    
    try {
      setLoading(true);
      
      // Utiliser le service de congés pour récupérer les congés de l'employé
      // Si le service n'est pas disponible, utiliser des données simulées
      try {
        const leavesData = await leaveService.getByEmployee(employeeId);
        setLeaves(leavesData);
        return leavesData;
      } catch (err) {
        console.warn(`Service de congés non disponible, utilisation de données simulées:`, err);
        
        // Données simulées pour les congés
        const mockLeaves: Leave[] = [
          {
            id: "1",
            employee_id: employeeId,
            employee_name: employee?.name || "Employé",
            date_from: "2023-07-15",
            date_to: "2023-07-30",
            number_of_days: 10,
            state: "approved",
            type: "1",
            type_name: "Congés payés",
            description: "Vacances d'été",
            created_at: "2023-06-01T10:00:00Z",
            updated_at: "2023-06-05T14:30:00Z"
          },
          {
            id: "2",
            employee_id: employeeId,
            employee_name: employee?.name || "Employé",
            date_from: "2023-12-24",
            date_to: "2023-12-31",
            number_of_days: 5,
            state: "approved",
            type: "1",
            type_name: "Congés payés",
            description: "Vacances de fin d'année",
            created_at: "2023-11-15T09:00:00Z",
            updated_at: "2023-11-20T11:45:00Z"
          }
        ];
        
        setLeaves(mockLeaves);
        return mockLeaves;
      }
    } catch (err) {
      console.error(`Erreur lors du chargement des congés de l'employé ${employeeId}:`, err);
      return [];
    } finally {
      setLoading(false);
    }
  }, [employeeId, employee?.name]);
  
  /**
   * Met à jour les données de l'employé
   * @param data Données à mettre à jour
   */
  const updateEmployee = useCallback(async (data: Partial<Employee>) => {
    if (!employeeId || !employee) return null;
    
    try {
      setLoading(true);
      setError(null);
      
      const updatedEmployee = await employeeService.updateEmployee(employeeId, data);
      setEmployee(updatedEmployee);
      
      return updatedEmployee;
    } catch (err) {
      console.error(`Erreur lors de la mise à jour de l'employé ${employeeId}:`, err);
      setError(`Impossible de mettre à jour les données de l'employé.`);
      return null;
    } finally {
      setLoading(false);
    }
  }, [employeeId, employee]);
  
  /**
   * Met à jour la photo de profil de l'employé
   * @param file Fichier image
   */
  const updateProfilePicture = useCallback(async (file: File) => {
    if (!employeeId || !employee) return null;
    
    try {
      setLoading(true);
      setError(null);
      
      // Simuler le téléchargement de la photo de profil
      // Dans une implémentation réelle, il faudrait utiliser un service pour télécharger le fichier
      return new Promise<string>((resolve) => {
        const reader = new FileReader();
        reader.onload = () => {
          const dataUrl = reader.result as string;
          
          // Mettre à jour l'employé avec la nouvelle photo
          updateEmployee({ photo: dataUrl })
            .then(() => resolve(dataUrl))
            .catch(() => resolve(null));
        };
        reader.readAsDataURL(file);
      });
    } catch (err) {
      console.error(`Erreur lors de la mise à jour de la photo de profil de l'employé ${employeeId}:`, err);
      setError(`Impossible de mettre à jour la photo de profil.`);
      return null;
    } finally {
      setLoading(false);
    }
  }, [employeeId, employee, updateEmployee]);
  
  /**
   * Génère un QR code pour le profil de l'employé
   */
  const generateQRCode = useCallback(() => {
    if (!employee) return '';
    
    // Simuler la génération d'un QR code
    // Dans une implémentation réelle, il faudrait utiliser une bibliothèque comme qrcode.react
    const employeeData = {
      id: employee.id,
      name: employee.name,
      email: employee.work_email,
      phone: employee.work_phone,
      position: employee.job_title
    };
    
    // Retourner une URL de QR code simulée
    return `https://api.qrserver.com/v1/create-qr-code/?size=200x200&data=${encodeURIComponent(JSON.stringify(employeeData))}`;
  }, [employee]);
  
  /**
   * Exporte le profil de l'employé au format demandé
   * @param format Format d'exportation (pdf, docx)
   */
  const exportProfile = useCallback(async (format: 'pdf' | 'docx') => {
    if (!employee) return '';
    
    try {
      setLoading(true);
      
      // Simuler l'exportation du profil
      // Dans une implémentation réelle, il faudrait utiliser un service pour générer le document
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      // Retourner une URL de téléchargement simulée
      return `/api/hr/employees/${employee.id}/export/${format}`;
    } catch (err) {
      console.error(`Erreur lors de l'exportation du profil de l'employé ${employee.id}:`, err);
      setError(`Impossible d'exporter le profil au format ${format}.`);
      return '';
    } finally {
      setLoading(false);
    }
  }, [employee]);
  
  // Charger les données au montage du composant
  useEffect(() => {
    if (employeeId) {
      loadEmployee();
      loadContracts();
      loadLeaves();
    }
  }, [employeeId, loadEmployee, loadContracts, loadLeaves]);
  
  return {
    employee,
    contracts,
    leaves,
    loading,
    error,
    updateEmployee,
    updateProfilePicture,
    generateQRCode,
    exportProfile
  };
};

export default useEmployeeProfile;
