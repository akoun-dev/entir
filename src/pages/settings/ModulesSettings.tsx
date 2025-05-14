import React, { useState, useEffect } from 'react';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import moduleService from '../../services/moduleService';
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from '../../components/ui/card';
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '../../components/ui/table';
import { Button } from '../../components/ui/button';
import { Switch } from '../../components/ui/switch';
import { Badge } from '../../components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '../../components/ui/tabs';
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle } from '../../components/ui/dialog';
import { Loader2, Trash2, Power, RefreshCw } from 'lucide-react';
import { Module } from '../../types/module';

// Utiliser moduleService au lieu de l'URL directe

/**
 * Composant pour la gestion des modules
 */
const ModulesSettings: React.FC = () => {
  const [activeTab, setActiveTab] = useState('installed');
  const [modules, setModules] = useState<Module[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  // États pour les popups de confirmation
  const [showToggleDialog, setShowToggleDialog] = useState(false);
  const [showInstallDialog, setShowInstallDialog] = useState(false);
  const [showUninstallDialog, setShowUninstallDialog] = useState(false);
  const [selectedModule, setSelectedModule] = useState<Module | null>(null);
  const [processingModule, setProcessingModule] = useState<string | null>(null);

  // Charger les modules au chargement du composant
  useEffect(() => {
    const fetchModules = async () => {
      try {
        setLoading(true);
        const modules = await moduleService.getAllModules();
        setModules(modules);
        setError(null);
      } catch (err: any) {
        console.error('Erreur lors du chargement des modules:', err);
        const errorMessage = err.response?.data?.message ||
                           'Erreur lors du chargement des modules. Veuillez réessayer plus tard.';
        setError(errorMessage);
      } finally {
        setLoading(false);
      }
    };

    fetchModules();
  }, []);

  // Filtrer les modules en fonction de l'onglet actif
  const filteredModules = modules.filter(module => {
    if (activeTab === 'installed') return module.installed;
    if (activeTab === 'available') return !module.installed && module.installable;
    return true; // Onglet 'all'
  });

  // Ouvrir la boîte de dialogue de confirmation pour l'activation/désactivation
  const openToggleDialog = (module: Module) => {
    setSelectedModule(module);
    setShowToggleDialog(true);
  };

  // Gérer l'activation/désactivation d'un module
  const handleToggleModule = async () => {
    if (!selectedModule) return;

    setProcessingModule(selectedModule.name);

    try {
      // Utiliser moduleService au lieu d'axios directement
      await moduleService.toggleModuleStatus(selectedModule.name, !selectedModule.active);

      // Recharger tous les modules pour avoir les données à jour
      const modules = await moduleService.getAllModules();
      setModules(modules);
      setError(null);

      // Afficher un message de confirmation
      toast.success(`Le module ${selectedModule.displayName} a été ${!selectedModule.active ? 'activé' : 'désactivé'} avec succès.`);

      // Fermer la boîte de dialogue
      setShowToggleDialog(false);

      // Recharger la page pour appliquer les changements
      window.location.reload();
    } catch (err: any) {
      console.error(`Erreur lors de la modification du statut du module ${selectedModule.name}:`, err);

      // Afficher un message d'erreur plus détaillé si disponible
      const errorMessage = err.response?.data?.message ||
                          `Erreur lors de la modification du statut du module ${selectedModule.displayName}.`;

      setError(errorMessage);
      toast.error(errorMessage);
    } finally {
      setProcessingModule(null);
    }
  };

  // Ouvrir la boîte de dialogue de confirmation pour l'installation
  const openInstallDialog = (module: Module) => {
    setSelectedModule(module);
    setShowInstallDialog(true);
  };

  // Gérer l'installation d'un module
  const handleInstallModule = async () => {
    if (!selectedModule) return;

    setProcessingModule(selectedModule.name);

    try {
      // Utiliser moduleService au lieu d'axios directement
      await moduleService.installModule(selectedModule.name);

      // Recharger tous les modules pour avoir les données à jour
      const modules = await moduleService.getAllModules();
      setModules(modules);
      setError(null);

      // Afficher un message de confirmation
      toast.success(`Le module ${selectedModule.displayName} a été installé avec succès.`);

      // Fermer la boîte de dialogue
      setShowInstallDialog(false);

      // Recharger la page pour appliquer les changements
      window.location.reload();
    } catch (err: any) {
      console.error(`Erreur lors de l'installation du module ${selectedModule.name}:`, err);

      // Afficher un message d'erreur plus détaillé si disponible
      const errorMessage = err.response?.data?.message ||
                          `Erreur lors de l'installation du module ${selectedModule.displayName}.`;

      setError(errorMessage);
      toast.error(errorMessage);
    } finally {
      setProcessingModule(null);
    }
  };

  // Ouvrir la boîte de dialogue de confirmation pour la désinstallation
  const openUninstallDialog = (module: Module) => {
    setSelectedModule(module);
    setShowUninstallDialog(true);
  };

  // Gérer la désinstallation d'un module
  const handleUninstallModule = async () => {
    if (!selectedModule) return;

    setProcessingModule(selectedModule.name);

    try {
      // Utiliser moduleService au lieu d'axios directement
      await moduleService.uninstallModule(selectedModule.name);

      // Recharger tous les modules pour avoir les données à jour
      const modules = await moduleService.getAllModules();
      setModules(modules);
      setError(null);

      // Afficher un message de confirmation
      toast.success(`Le module ${selectedModule.displayName} a été désinstallé et désactivé avec succès.`);

      // Fermer la boîte de dialogue
      setShowUninstallDialog(false);

      // Recharger la page pour appliquer les changements
      window.location.reload();
    } catch (err: any) {
      console.error(`Erreur lors de la désinstallation du module ${selectedModule.name}:`, err);

      // Afficher un message d'erreur plus détaillé si disponible
      const errorMessage = err.response?.data?.message ||
                          `Erreur lors de la désinstallation du module ${selectedModule.displayName}.`;

      setError(errorMessage);
      toast.error(errorMessage);
    } finally {
      setProcessingModule(null);
    }
  };

  return (
    <Card className="w-full">
      <CardHeader>
        <CardTitle>Gestion des modules</CardTitle>
        <CardDescription>
          Gérez les modules de l'application. Activez, désactivez, installez ou désinstallez des modules.
        </CardDescription>
      </CardHeader>
      <CardContent>
        {error ? (
          <div className="p-4 bg-red-50 text-red-800 rounded-md mb-4">
            <p className="font-medium">Erreur</p>
            <p>{error}</p>
          </div>
        ) : null}

        <ToastContainer position="top-right" autoClose={3000} hideProgressBar={false} newestOnTop closeOnClick rtl={false} pauseOnFocusLoss draggable pauseOnHover />

        <Tabs defaultValue="installed" value={activeTab} onValueChange={setActiveTab}>
          <TabsList className="mb-4">
            <TabsTrigger value="installed">Installés</TabsTrigger>
            <TabsTrigger value="available">Disponibles</TabsTrigger>
            <TabsTrigger value="all">Tous</TabsTrigger>
          </TabsList>

          <TabsContent value={activeTab}>
            {loading ? (
              <div className="p-8 text-center">
                <p>Chargement des modules...</p>
              </div>
            ) : (
              <Table>
                <TableCaption>Liste des modules {activeTab === 'installed' ? 'installés' : activeTab === 'available' ? 'disponibles' : ''}</TableCaption>
                <TableHeader>
                  <TableRow>
                    <TableHead>Nom</TableHead>
                    <TableHead>Version</TableHead>
                    <TableHead>Description</TableHead>
                    <TableHead>État</TableHead>
                    <TableHead>Actions</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {filteredModules.length === 0 ? (
                    <TableRow>
                      <TableCell colSpan={5} className="text-center">
                        Aucun module {activeTab === 'installed' ? 'installé' : activeTab === 'available' ? 'disponible' : 'trouvé'}
                      </TableCell>
                    </TableRow>
                  ) : (
                    filteredModules.map(module => (
                      <TableRow key={module.name}>
                        <TableCell className="font-medium">{module.displayName}</TableCell>
                        <TableCell>{module.version}</TableCell>
                        <TableCell>{module.summary || module.description}</TableCell>
                        <TableCell>
                          {module.installed ? (
                            <Badge variant={module.active ? "default" : "secondary"} className={module.active ? "bg-green-500" : ""}>
                              {module.active ? 'Actif' : 'Inactif'}
                            </Badge>
                          ) : (
                            <Badge variant="outline">Non installé</Badge>
                          )}
                        </TableCell>
                        <TableCell>
                          {module.installed ? (
                            <div className="flex items-center gap-2">
                              <Switch
                                checked={module.active}
                                onCheckedChange={() => openToggleDialog(module)}
                              />
                              <Button
                                variant="outline"
                                size="sm"
                                onClick={() => openUninstallDialog(module)}
                              >
                                Désinstaller
                              </Button>
                            </div>
                          ) : (
                            <Button
                              variant="outline"
                              size="sm"
                              onClick={() => openInstallDialog(module)}
                              disabled={!module.installable}
                            >
                              Installer
                            </Button>
                          )}
                        </TableCell>
                      </TableRow>
                    ))
                  )}
                </TableBody>
              </Table>
            )}
          </TabsContent>
        </Tabs>
      </CardContent>
      <CardFooter className="flex justify-between">
        <div className="text-sm text-muted-foreground">
          {modules.length} modules au total, {modules.filter(m => m.installed).length} installés
        </div>
        <Button
          variant="outline"
          onClick={async () => {
            setLoading(true);
            try {
              // Sauvegarder la liste actuelle des modules pour comparaison
              const previousModules = [...modules];

              // Appeler la méthode scanModules pour scanner les modules dans le dossier addons
              // et mettre à jour la base de données
              const result = await moduleService.scanModules();
              const updatedModules = result.modules;

              // Afficher des informations de débogage dans la console
              console.log('Modules précédents:', previousModules);
              console.log('Modules mis à jour:', updatedModules);
              console.log('Résumé du scan:', result.summary);

              // Utiliser les informations du résumé pour déterminer les changements
              const modulesInAddonsDir = result.summary?.modulesInAddonsDir || [];
              const validModulesList = result.summary?.validModulesList || [];
              const processedModulesList = result.summary?.processedModulesList || [];

              console.log('Modules dans le dossier addons:', modulesInAddonsDir);
              console.log('Modules valides:', validModulesList);
              console.log('Modules traités:', processedModulesList);

              // Comparer les listes pour déterminer les changements
              const added = updatedModules.filter(
                m => !previousModules.some(pm => pm.name === m.name)
              );
              console.log('Modules ajoutés:', added);

              const removed = previousModules.filter(
                pm => !updatedModules.some(m => m.name === pm.name)
              );
              console.log('Modules supprimés:', removed);

              // Vérifier les changements de statut (installable, installed, active)
              const statusChanged = updatedModules.filter(
                m => {
                  const prev = previousModules.find(pm => pm.name === m.name);
                  return prev && (
                    prev.installable !== m.installable ||
                    prev.installed !== m.installed ||
                    prev.active !== m.active
                  );
                }
              );
              console.log('Modules avec changement de statut:', statusChanged);

              // Vérifier les changements de version ou de métadonnées
              const metadataChanged = updatedModules.filter(
                m => {
                  const prev = previousModules.find(pm => pm.name === m.name);
                  return prev && (
                    prev.version !== m.version ||
                    prev.displayName !== m.displayName ||
                    prev.summary !== m.summary ||
                    prev.description !== m.description
                  );
                }
              );
              console.log('Modules avec changement de métadonnées:', metadataChanged);

              // Combiner tous les changements
              const allChanges = [...added, ...removed, ...statusChanged, ...metadataChanged];
              const uniqueChanges = Array.from(new Set(allChanges.map(m => m.name)))
                .map(name => allChanges.find(m => m.name === name));

              console.log('Tous les changements (uniques):', uniqueChanges);

              // Mettre à jour l'état avec les nouveaux modules
              setModules(updatedModules);
              setError(null);

              // Utiliser le message renvoyé par le serveur
              if (result.message) {
                toast.success(result.message);
              } else if (uniqueChanges.length > 0) {
                // Fallback si le serveur ne renvoie pas de message
                let message = 'Les modules ont été scannés et mis à jour avec succès.';

                if (added.length > 0) {
                  message += ` ${added.length} module(s) ajouté(s).`;
                }

                if (removed.length > 0) {
                  message += ` ${removed.length} module(s) supprimé(s).`;
                }

                if (statusChanged.length > 0) {
                  message += ` ${statusChanged.length} module(s) avec statut modifié.`;
                }

                if (metadataChanged.length > 0) {
                  message += ` ${metadataChanged.length} module(s) avec métadonnées modifiées.`;
                }

                toast.success(message);
              } else {
                // Vérifier les informations du résumé
                if (result.summary) {
                  const { modulesInAddonsDir, validModulesList, processedModulesList } = result.summary;

                  if (modulesInAddonsDir && modulesInAddonsDir.length > 0) {
                    // Afficher des informations sur les modules trouvés dans le dossier addons
                    toast.info(`${modulesInAddonsDir.length} dossier(s) trouvé(s) dans le dossier addons: ${modulesInAddonsDir.join(', ')}`);
                  }

                  if (validModulesList && validModulesList.length > 0) {
                    // Afficher des informations sur les modules valides
                    toast.info(`${validModulesList.length} module(s) valide(s) trouvé(s): ${validModulesList.join(', ')}`);
                  }

                  if (processedModulesList && processedModulesList.length > 0) {
                    // Afficher des informations sur les modules traités
                    toast.info(`${processedModulesList.length} module(s) traité(s): ${processedModulesList.join(', ')}`);
                  }

                  // Vérifier les modules non installables
                  const nonInstallableModules = updatedModules.filter(m => !m.installable);

                  if (nonInstallableModules.length > 0) {
                    const names = nonInstallableModules.map(m => m.displayName || m.name).join(', ');
                    toast.warning(`${nonInstallableModules.length} module(s) marqué(s) comme non installable(s): ${names}`);

                    // Afficher un message pour chaque module non installable
                    nonInstallableModules.forEach(m => {
                      const status = result.summary?.updatedStatuses?.find((s: { name: string, status: string }) => s.name === m.name)?.status;
                      if (status) {
                        toast.warning(`Le module ${m.displayName || m.name} est ${status}`);
                      }
                    });
                  }
                } else {
                  // Fallback si aucune information n'est disponible
                  toast.success('Les modules ont été scannés. Aucun changement détecté.');
                }
              }
            } catch (err: any) {
              console.error('Erreur lors du scan des modules:', err);
              const errorMessage = err.response?.data?.message ||
                                'Erreur lors du scan des modules.';
              setError(errorMessage);
              // Afficher un message d'erreur
              toast.error(errorMessage);
            } finally {
              setLoading(false);
            }
          }}
          disabled={loading}
        >
          {loading ? (
            <>
              <Loader2 className="h-4 w-4 mr-2 animate-spin" />
              Scan en cours...
            </>
          ) : (
            <>
              <RefreshCw className="h-4 w-4 mr-2" />
              Rafraîchir
            </>
          )}
        </Button>
      </CardFooter>

      {/* Boîte de dialogue de confirmation pour l'activation/désactivation */}
      <Dialog open={showToggleDialog} onOpenChange={setShowToggleDialog}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>{selectedModule?.active ? 'Désactiver' : 'Activer'} le module</DialogTitle>
            <DialogDescription>
              Êtes-vous sûr de vouloir {selectedModule?.active ? 'désactiver' : 'activer'} le module {selectedModule?.displayName} ?
            </DialogDescription>
          </DialogHeader>
          {selectedModule && (
            <div className="py-4">
              <p className="font-medium">{selectedModule.displayName}</p>
              <p className="text-sm text-muted-foreground">Version: {selectedModule.version}</p>
            </div>
          )}
          <DialogFooter>
            <Button
              variant="outline"
              onClick={() => setShowToggleDialog(false)}
            >
              Annuler
            </Button>
            <Button
              variant={selectedModule?.active ? "destructive" : "default"}
              onClick={handleToggleModule}
              disabled={processingModule !== null}
            >
              {processingModule !== null ? (
                <>
                  <Loader2 className="h-4 w-4 mr-2 animate-spin" />
                  Traitement...
                </>
              ) : (
                <>
                  <Power className="h-4 w-4 mr-2" />
                  {selectedModule?.active ? 'Désactiver' : 'Activer'}
                </>
              )}
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* Boîte de dialogue de confirmation pour l'installation */}
      <Dialog open={showInstallDialog} onOpenChange={setShowInstallDialog}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Installer le module</DialogTitle>
            <DialogDescription>
              Êtes-vous sûr de vouloir installer le module {selectedModule?.displayName} ?
            </DialogDescription>
          </DialogHeader>
          {selectedModule && (
            <div className="py-4">
              <p className="font-medium">{selectedModule.displayName}</p>
              <p className="text-sm text-muted-foreground">Version: {selectedModule.version}</p>
              <p className="text-sm text-muted-foreground">{selectedModule.summary || selectedModule.description}</p>
            </div>
          )}
          <DialogFooter>
            <Button
              variant="outline"
              onClick={() => setShowInstallDialog(false)}
            >
              Annuler
            </Button>
            <Button
              variant="default"
              onClick={handleInstallModule}
              disabled={processingModule !== null}
            >
              {processingModule !== null ? (
                <>
                  <Loader2 className="h-4 w-4 mr-2 animate-spin" />
                  Installation...
                </>
              ) : (
                <>
                  <RefreshCw className="h-4 w-4 mr-2" />
                  Installer
                </>
              )}
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* Boîte de dialogue de confirmation pour la désinstallation */}
      <Dialog open={showUninstallDialog} onOpenChange={setShowUninstallDialog}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Désinstaller le module</DialogTitle>
            <DialogDescription>
              Êtes-vous sûr de vouloir désinstaller le module {selectedModule?.displayName} ? Cette action est irréversible.
            </DialogDescription>
          </DialogHeader>
          {selectedModule && (
            <div className="py-4">
              <p className="font-medium">{selectedModule.displayName}</p>
              <p className="text-sm text-muted-foreground">Version: {selectedModule.version}</p>
            </div>
          )}
          <DialogFooter>
            <Button
              variant="outline"
              onClick={() => setShowUninstallDialog(false)}
            >
              Annuler
            </Button>
            <Button
              variant="destructive"
              onClick={handleUninstallModule}
              disabled={processingModule !== null}
            >
              {processingModule !== null ? (
                <>
                  <Loader2 className="h-4 w-4 mr-2 animate-spin" />
                  Désinstallation...
                </>
              ) : (
                <>
                  <Trash2 className="h-4 w-4 mr-2" />
                  Désinstaller
                </>
              )}
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </Card>
  );
};

export default ModulesSettings;