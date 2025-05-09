import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '../../components/ui/card';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '../../components/ui/table';
import { Button } from '../../components/ui/button';
import { Input } from '../../components/ui/input';
import { Switch } from '../../components/ui/switch';
import { Badge } from '../../components/ui/badge';
import { Layers, Search, Info, RefreshCw, Download, ExternalLink } from 'lucide-react';
import AddonManager from '../../core/AddonManager';

// Types pour les modules
interface Module {
  id: string;
  name: string;
  description: string;
  version: string;
  author: string;
  status: 'active' | 'inactive' | 'error';
  isCore: boolean;
  lastUpdated: string;
}

/**
 * Page des paramètres des modules
 * Permet de gérer les modules installés dans l'application
 */
const ModulesListSettings: React.FC = () => {
  // État pour les modules
  const [modules, setModules] = useState<Module[]>([
    {
      id: 'hr',
      name: 'Ressources Humaines',
      description: 'Gestion des employés, contrats, congés et recrutement',
      version: '1.0.0',
      author: 'ENTIDR Team',
      status: 'active',
      isCore: false,
      lastUpdated: '2023-05-15'
    },
    {
      id: 'crm',
      name: 'CRM',
      description: 'Gestion de la relation client',
      version: '1.0.0',
      author: 'ENTIDR Team',
      status: 'active',
      isCore: false,
      lastUpdated: '2023-05-10'
    },
    {
      id: 'finance',
      name: 'Finance',
      description: 'Gestion financière et comptabilité',
      version: '1.0.0',
      author: 'ENTIDR Team',
      status: 'active',
      isCore: false,
      lastUpdated: '2023-05-12'
    },
    {
      id: 'projects',
      name: 'Projets',
      description: 'Gestion de projets et tâches',
      version: '1.0.0',
      author: 'ENTIDR Team',
      status: 'active',
      isCore: false,
      lastUpdated: '2023-05-14'
    },
    {
      id: 'inventory',
      name: 'Inventaire',
      description: 'Gestion des stocks et inventaire',
      version: '1.0.0',
      author: 'ENTIDR Team',
      status: 'active',
      isCore: false,
      lastUpdated: '2023-05-11'
    },
    {
      id: 'core',
      name: 'Core',
      description: 'Fonctionnalités de base de l\'application',
      version: '1.0.0',
      author: 'ENTIDR Team',
      status: 'active',
      isCore: true,
      lastUpdated: '2023-05-01'
    }
  ]);

  // État pour la recherche
  const [searchTerm, setSearchTerm] = useState('');

  // Effet pour charger les modules depuis l'AddonManager
  useEffect(() => {
    const addonManager = AddonManager.getInstance();
    const addons = addonManager.getAllAddons();

    console.log('Modules chargés:', addons);

    // Mettre à jour l'état avec les modules chargés
    if (addons && addons.length > 0) {
      const mappedModules = addons.map(addon => ({
        id: addon.manifest.id,
        name: addon.manifest.name,
        description: addon.manifest.description || 'Aucune description',
        version: addon.manifest.version || '1.0.0',
        author: addon.manifest.author || 'ENTIDR Team',
        status: 'active' as const,
        isCore: addon.manifest.isCore || false,
        lastUpdated: addon.manifest.lastUpdated || new Date().toISOString().split('T')[0]
      }));

      setModules(prevModules => {
        // Fusionner les modules existants avec les nouveaux modules
        const existingModuleIds = new Set(prevModules.map(m => m.id));
        const newModules = mappedModules.filter(m => !existingModuleIds.has(m.id));
        return [...prevModules, ...newModules];
      });
    }
  }, []);

  // Filtrer les modules en fonction du terme de recherche
  const filteredModules = modules.filter(module =>
    module.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    module.description.toLowerCase().includes(searchTerm.toLowerCase())
  );

  // Gérer l'activation/désactivation d'un module
  const handleToggleModuleStatus = (id: string) => {
    setModules(modules.map(module =>
      module.id === id
        ? { ...module, status: module.status === 'active' ? 'inactive' : 'active' }
        : module
    ));
  };

  return (
    <div className="p-6">
      {/* En-tête */}
      <div className="flex items-center gap-3 mb-6">
        <Layers className="h-8 w-8 text-ivory-orange" />
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Modules installés</h1>
          <p className="text-muted-foreground mt-1">Gérez les modules de votre application</p>
        </div>
      </div>

      {/* Carte principale */}
      <Card>
        <CardHeader className="flex flex-row items-center justify-between">
          <div>
            <CardTitle>Liste des modules</CardTitle>
            <CardDescription>Activez ou désactivez les modules installés</CardDescription>
          </div>
          <div className="flex gap-2">
            <Button variant="outline" className="flex items-center gap-2">
              <RefreshCw className="h-4 w-4" />
              Actualiser
            </Button>
            <Button variant="outline" className="flex items-center gap-2">
              <Download className="h-4 w-4" />
              Installer
            </Button>
          </div>
        </CardHeader>
        <CardContent>
          {/* Barre de recherche */}
          <div className="relative mb-4">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
            <Input
              placeholder="Rechercher un module..."
              className="pl-10"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>

          {/* Tableau des modules */}
          <div className="rounded-md border">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Nom</TableHead>
                  <TableHead>Description</TableHead>
                  <TableHead>Version</TableHead>
                  <TableHead>Auteur</TableHead>
                  <TableHead>Statut</TableHead>
                  <TableHead>Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {filteredModules.map((module) => (
                  <TableRow key={module.id}>
                    <TableCell className="font-medium">
                      {module.name}
                      {module.isCore && (
                        <Badge variant="outline" className="ml-2">Core</Badge>
                      )}
                    </TableCell>
                    <TableCell>{module.description}</TableCell>
                    <TableCell>{module.version}</TableCell>
                    <TableCell>{module.author}</TableCell>
                    <TableCell>
                      <div className="flex items-center gap-2">
                        <Switch
                          checked={module.status === 'active'}
                          onCheckedChange={() => handleToggleModuleStatus(module.id)}
                          disabled={module.isCore}
                        />
                        <span className={`px-2 py-1 rounded-full text-xs ${
                          module.status === 'active'
                            ? 'bg-green-100 text-green-800'
                            : module.status === 'error'
                              ? 'bg-red-100 text-red-800'
                              : 'bg-gray-100 text-gray-800'
                        }`}>
                          {module.status === 'active' ? 'Actif' : module.status === 'error' ? 'Erreur' : 'Inactif'}
                        </span>
                      </div>
                    </TableCell>
                    <TableCell>
                      <div className="flex gap-2">
                        <Button variant="ghost" size="icon">
                          <Info className="h-4 w-4" />
                        </Button>
                        <Button variant="ghost" size="icon">
                          <ExternalLink className="h-4 w-4" />
                        </Button>
                      </div>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default ModulesListSettings;
