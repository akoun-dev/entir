
import { useCallback, useState, useEffect } from 'react';
import { OrgChartPerson, OrgChartData } from '../types/organization';
import { useEmployee } from './useEmployee';
import organizationApiService from '../services/organizationApiService';

// Constants for stable data
const DEPARTMENTS_DATA = {
  direction: {
    id: "dept1",
    name: "Direction Générale",
  },
  rh: {
    id: "dept2",
    name: "Ressources Humaines",
  },
  finance: {
    id: "dept3",
    name: "Finance",
  },
  technique: {
    id: "dept4",
    name: "Technique",
  },
  marketing: {
    id: "dept5",
    name: "Marketing",
  }
};

export const useOrgChart = () => {
  const { employees, loadEmployees } = useEmployee();
  const [orgChartData, setOrgChartData] = useState<OrgChartData>({ departments: [] });
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [lastUpdated, setLastUpdated] = useState<Date | null>(null);
  const [isApiMode, setIsApiMode] = useState(false);
  
  // Cache key for localStorage
  const CACHE_KEY = 'orgChartData';
  const CACHE_EXPIRY = 1000 * 60 * 60; // 1 hour in milliseconds

  // Check if cache is valid
  const isCacheValid = useCallback(() => {
    try {
      const cachedData = localStorage.getItem(CACHE_KEY);
      if (!cachedData) return false;
      
      const { timestamp } = JSON.parse(cachedData);
      const now = Date.now();
      
      return timestamp && (now - timestamp) < CACHE_EXPIRY;
    } catch (error) {
      console.error('Error checking cache validity:', error);
      return false;
    }
  }, []);

  // Get data from cache
  const getFromCache = useCallback(() => {
    try {
      const cachedData = localStorage.getItem(CACHE_KEY);
      if (!cachedData) return null;
      
      const { data } = JSON.parse(cachedData);
      return data;
    } catch (error) {
      console.error('Error retrieving from cache:', error);
      return null;
    }
  }, []);

  // Save data to cache
  const saveToCache = useCallback((data: OrgChartData) => {
    try {
      const cacheObject = {
        data,
        timestamp: Date.now()
      };
      localStorage.setItem(CACHE_KEY, JSON.stringify(cacheObject));
    } catch (error) {
      console.error('Error saving to cache:', error);
    }
  }, []);

  // Charger les données depuis l'API
  const loadFromApi = useCallback(async () => {
    try {
      console.log("Loading organization data from API");
      setLoading(true);
      setError(null);

      const apiData = await organizationApiService.getOrgChartData();
      
      setOrgChartData(apiData);
      saveToCache(apiData);
      setIsApiMode(true);
      setLastUpdated(new Date());
      
      console.log("API data loaded successfully:", apiData);
      return true;
    } catch (error) {
      console.error('Error loading data from API:', error);
      setIsApiMode(false);
      
      // En cas d'erreur, on revient aux données de fallback
      return false;
    } finally {
      setLoading(false);
    }
  }, [saveToCache]);

  // Construire les données de l'organigramme à partir des employés de manière stable
  const buildOrgChartData = useCallback(async () => {
    try {
      setLoading(true);
      
      // First try to load from API
      const apiSuccess = await loadFromApi();
      if (apiSuccess) {
        return; // Si réussi, on arrête là
      }
      
      // Si API échoue, vérifier le cache
      if (isCacheValid()) {
        const cachedData = getFromCache();
        if (cachedData) {
          setOrgChartData(cachedData);
          setLastUpdated(new Date());
          setLoading(false);
          return;
        }
      }
      
      // En dernier recours, utiliser les données simulées
      // Simulating API call with a delay
      await new Promise(resolve => setTimeout(resolve, 800));

      // Directeur Général - fixed data, not random
      const rootPerson: OrgChartPerson = {
        id: "1",
        name: "Koné Amadou",
        position: "Directeur Général",
        department: "Direction Générale",
        email: "k.amadou@example.com",
        imageUrl: "/assets/avatars/kone.jpg",
        children: []
      };

      // Directeurs de départements - stable structure
      const directeurs: OrgChartPerson[] = [
        {
          id: "2",
          name: "Bamba Sarah",
          position: "Directrice RH",
          department: "Ressources Humaines",
          email: "b.sarah@example.com",
          children: []
        },
        {
          id: "3",
          name: "Touré Jean",
          position: "Directeur Financier",
          department: "Finance",
          email: "t.jean@example.com",
          children: []
        },
        {
          id: "4",
          name: "Kouamé Paul",
          position: "Directeur Technique",
          department: "Technique",
          email: "k.paul@example.com",
          children: []
        },
        {
          id: "11",
          name: "Konan Michelle",
          position: "Directrice Marketing",
          department: "Marketing",
          email: "m.konan@example.com",
          children: []
        }
      ];

      // Ajouter les directeurs comme enfants du DG
      rootPerson.children = directeurs;

      // Créer la structure des départements - stable structure
      const departments = [
        {
          id: DEPARTMENTS_DATA.direction.id,
          name: DEPARTMENTS_DATA.direction.name,
          manager: rootPerson,
          employees: [rootPerson]
        },
        {
          id: DEPARTMENTS_DATA.rh.id,
          name: DEPARTMENTS_DATA.rh.name,
          manager: directeurs[0],
          employees: [
            directeurs[0],
            {
              id: "5",
              name: "Koménan Blan Gerard",
              position: "Responsable Recrutement",
              department: "Ressources Humaines",
              email: "b.komenan@example.com"
            },
            {
              id: "6",
              name: "Aka Marie",
              position: "Responsable Formation",
              department: "Ressources Humaines",
              email: "a.marie@example.com"
            }
          ]
        },
        {
          id: DEPARTMENTS_DATA.finance.id,
          name: DEPARTMENTS_DATA.finance.name,
          manager: directeurs[1],
          employees: [
            directeurs[1],
            {
              id: "7",
              name: "Aka Alexis",
              position: "Responsable Comptabilité",
              department: "Finance",
              email: "a.alexis@example.com"
            },
            {
              id: "8",
              name: "Traore Doféme",
              position: "Responsable Budget",
              department: "Finance",
              email: "d.traore@example.com"
            }
          ]
        },
        {
          id: DEPARTMENTS_DATA.technique.id,
          name: DEPARTMENTS_DATA.technique.name,
          manager: directeurs[2],
          employees: [
            directeurs[2],
            {
              id: "9",
              name: "Somet Patrick",
              position: "Chef de Projet",
              department: "Technique",
              email: "p.somet@example.com"
            },
            {
              id: "10",
              name: "Yrou Frank",
              position: "Ingénieur Système",
              department: "Technique",
              email: "f.yrou@example.com"
            },
            {
              id: "12",
              name: "Kouadio Eric",
              position: "Développeur Frontend",
              department: "Technique",
              email: "e.kouadio@example.com"
            },
            {
              id: "13",
              name: "Diallo Fatou",
              position: "Développeur Backend",
              department: "Technique",
              email: "f.diallo@example.com"
            }
          ]
        },
        {
          id: DEPARTMENTS_DATA.marketing.id,
          name: DEPARTMENTS_DATA.marketing.name,
          manager: directeurs[3],
          employees: [
            directeurs[3],
            {
              id: "14",
              name: "Bamba Ali",
              position: "Responsable Communication",
              department: "Marketing",
              email: "a.bamba@example.com"
            },
            {
              id: "15",
              name: "Diomande Fanta",
              position: "Responsable Digital",
              department: "Marketing",
              email: "f.diomande@example.com"
            }
          ]
        }
      ];

      const newOrgData = {
        rootPerson,
        departments
      };

      // Save to state and cache
      setOrgChartData(newOrgData);
      saveToCache(newOrgData);
      setLastUpdated(new Date());
      setLoading(false);
    } catch (err) {
      console.error('Erreur lors de la construction de l\'organigramme:', err);
      setError('Erreur lors du chargement des données de l\'organigramme.');
      setLoading(false);
    }
  }, [isCacheValid, getFromCache, saveToCache, loadFromApi]);

  // Expose a function to manually reload org chart data
  const loadOrgChartData = useCallback(async () => {
    await buildOrgChartData();
  }, [buildOrgChartData]);

  // Sauvegarder les données de l'organigramme vers l'API
  const saveOrgChartData = useCallback(async (rootPerson: OrgChartPerson) => {
    try {
      if (isApiMode) {
        // Enregistrer dans l'API
        await organizationApiService.saveOrgChartData(rootPerson);
        
        // Mettre à jour les données locales
        setOrgChartData(prev => ({ ...prev, rootPerson }));
        saveToCache({ ...orgChartData, rootPerson });
        setLastUpdated(new Date());
        
        return true;
      } else {
        // Mode fallback, enregistrer uniquement en local
        setOrgChartData(prev => ({ ...prev, rootPerson }));
        saveToCache({ ...orgChartData, rootPerson });
        setLastUpdated(new Date());
        
        return true;
      }
    } catch (error) {
      console.error('Error saving organization data:', error);
      return false;
    }
  }, [orgChartData, saveToCache, isApiMode]);

  // Charger les données initiales
  useEffect(() => {
    // Charger d'abord les employés si nécessaire
    if (employees.length === 0) {
      loadEmployees().then(() => {
        buildOrgChartData();
      });
    } else {
      buildOrgChartData();
    }
  }, [employees.length, loadEmployees, buildOrgChartData]);

  // Fonction pour rechercher une personne dans l'organigramme
  const searchPerson = useCallback((query: string) => {
    if (!query.trim()) return [];

    const searchResults: OrgChartPerson[] = [];
    const lowerCaseQuery = query.toLowerCase();

    // Fonction récursive pour parcourir l'arbre
    const searchInTree = (person: OrgChartPerson) => {
      if (
        person.name.toLowerCase().includes(lowerCaseQuery) || 
        person.position.toLowerCase().includes(lowerCaseQuery) ||
        person.department.toLowerCase().includes(lowerCaseQuery)
      ) {
        searchResults.push(person);
      }

      if (person.children && person.children.length > 0) {
        person.children.forEach(child => searchInTree(child));
      }
    };

    // Commencer la recherche à la racine
    if (orgChartData.rootPerson) {
      searchInTree(orgChartData.rootPerson);
    }

    return searchResults;
  }, [orgChartData]);

  return {
    orgChartData,
    loading,
    error,
    lastUpdated,
    searchPerson,
    loadOrgChartData,
    saveOrgChartData,
    isApiMode
  };
};
