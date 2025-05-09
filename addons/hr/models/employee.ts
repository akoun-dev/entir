import { Employee } from './types';

/**
 * Classe modèle pour les employés
 */
export class EmployeeModel {
  /**
   * Valide un objet employé
   * @param employee L'employé à valider
   * @returns Un objet contenant les erreurs de validation ou null si valide
   */
  static validate(employee: Partial<Employee>): Record<string, string> | null {
    const errors: Record<string, string> = {};
    
    // Validation du nom
    if (!employee.name || employee.name.trim() === '') {
      errors.name = 'Le nom est obligatoire';
    }
    
    // Validation de l'email
    if (employee.work_email && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(employee.work_email)) {
      errors.work_email = 'Format d\'email invalide';
    }
    
    // Validation du téléphone
    if (employee.work_phone && !/^[0-9+\-\s()]*$/.test(employee.work_phone)) {
      errors.work_phone = 'Format de téléphone invalide';
    }
    
    return Object.keys(errors).length > 0 ? errors : null;
  }
  
  /**
   * Crée un nouvel objet employé avec des valeurs par défaut
   * @returns Un nouvel objet employé
   */
  static createEmpty(): Partial<Employee> {
    return {
      name: '',
      job_title: '',
      work_email: '',
      work_phone: '',
      active: true
    };
  }
}
