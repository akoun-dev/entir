import { Department } from './types';

/**
 * Classe modèle pour les départements
 */
export class DepartmentModel {
  /**
   * Valide un objet département
   * @param department Le département à valider
   * @returns Un objet contenant les erreurs de validation ou null si valide
   */
  static validate(department: Partial<Department>): Record<string, string> | null {
    const errors: Record<string, string> = {};
    
    // Validation du nom
    if (!department.name || department.name.trim() === '') {
      errors.name = 'Le nom est obligatoire';
    }
    
    return Object.keys(errors).length > 0 ? errors : null;
  }
  
  /**
   * Crée un nouvel objet département avec des valeurs par défaut
   * @returns Un nouvel objet département
   */
  static createEmpty(): Partial<Department> {
    return {
      name: '',
      active: true
    };
  }
}
