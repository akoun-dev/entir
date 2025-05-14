import axios from 'axios';
import { Module } from '../types/module';

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL || 'http://localhost:3001/api';

/**
 * Service pour interagir avec l'API des modules
 */
const moduleService = {
  /**
   * Récupère tous les modules
   * @returns Promise résolvant vers un tableau de modules
   */
  async getAllModules(): Promise<Module[]> {
    try {
      const response = await axios.get(`${API_BASE_URL}/modules`);
      return response.data;
    } catch (error) {
      console.error('Erreur lors de la récupération des modules:', error);
      throw error;
    }
  },

  /**
   * Récupère un module par son nom
   * @param name Nom du module
   * @returns Promise résolvant vers le module
   */
  async getModuleByName(name: string): Promise<Module> {
    try {
      const response = await axios.get(`${API_BASE_URL}/modules/${name}`);
      return response.data;
    } catch (error) {
      console.error(`Erreur lors de la récupération du module ${name}:`, error);
      throw error;
    }
  },

  /**
   * Active ou désactive un module
   * @param name Nom du module
   * @param active État d'activation du module
   * @returns Promise résolvant vers le module mis à jour
   */
  async toggleModuleStatus(name: string, active: boolean): Promise<Module> {
    try {
      const response = await axios.put(`${API_BASE_URL}/modules/${name}/status`, { active });
      // Vérifier si la réponse contient directement le module ou s'il est encapsulé dans une propriété 'module'
      return response.data.module || response.data;
    } catch (error) {
      console.error(`Erreur lors de la modification du statut du module ${name}:`, error);
      throw error;
    }
  },

  /**
   * Installe un module
   * @param name Nom du module
   * @returns Promise résolvant vers le module installé
   */
  async installModule(name: string): Promise<Module> {
    try {
      const response = await axios.post(`${API_BASE_URL}/modules/${name}/install`);
      // Vérifier si la réponse contient directement le module ou s'il est encapsulé dans une propriété 'module'
      return response.data.module || response.data;
    } catch (error) {
      console.error(`Erreur lors de l'installation du module ${name}:`, error);
      throw error;
    }
  },

  /**
   * Désinstalle un module
   * @param name Nom du module
   * @returns Promise résolvant vers le module désinstallé
   */
  async uninstallModule(name: string): Promise<Module> {
    try {
      const response = await axios.post(`${API_BASE_URL}/modules/${name}/uninstall`);
      // Vérifier si la réponse contient directement le module ou s'il est encapsulé dans une propriété 'module'
      return response.data.module || response.data;
    } catch (error) {
      console.error(`Erreur lors de la désinstallation du module ${name}:`, error);
      throw error;
    }
  },

  /**
   * Scanne les modules dans le dossier addons et met à jour la base de données
   * @returns Promise résolvant vers la liste des modules mise à jour, un résumé des changements et un message
   */
  async scanModules(): Promise<{modules: Module[], summary: any, message: string}> {
    try {
      const response = await axios.post(`${API_BASE_URL}/modules/scan`);
      // Vérifier si la réponse contient la liste des modules, le résumé et le message
      return {
        modules: response.data.modules || [],
        summary: response.data.summary || {},
        message: response.data.message || 'Scan des modules terminé avec succès.'
      };
    } catch (error) {
      console.error('Erreur lors du scan des modules:', error);
      throw error;
    }
  }
};

export default moduleService;
