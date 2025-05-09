import React, { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '../../components/ui/card';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '../../components/ui/table';
import { Button } from '../../components/ui/button';
import { Input } from '../../components/ui/input';
import { Badge } from '../../components/ui/badge';
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from '../../components/ui/dialog';
import { Label } from '../../components/ui/label';
import { Textarea } from '../../components/ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '../../components/ui/select';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '../../components/ui/tabs';
import { Languages, Search, Plus, Pencil, Trash2, Save, Download, Upload, RefreshCw } from 'lucide-react';

// Types pour les traductions
interface Translation {
  id: string;
  key: string;
  module: string;
  context: string;
  translations: Record<string, string>;
}

// Types pour les modules
interface Module {
  id: string;
  name: string;
  translationCount: number;
}

/**
 * Page des paramètres des traductions
 * Permet de gérer les traductions de l'application
 */
const TranslationsSettings: React.FC = () => {
  // Langues disponibles
  const languages = [
    { code: 'fr_FR', name: 'Français' },
    { code: 'en_US', name: 'Anglais (US)' },
    { code: 'es_ES', name: 'Espagnol' },
    { code: 'de_DE', name: 'Allemand' }
  ];

  // Modules disponibles
  const [modules, setModules] = useState<Module[]>([
    { id: 'core', name: 'Core', translationCount: 245 },
    { id: 'hr', name: 'Ressources Humaines', translationCount: 178 },
    { id: 'crm', name: 'CRM', translationCount: 156 },
    { id: 'finance', name: 'Finance', translationCount: 203 },
    { id: 'inventory', name: 'Inventaire', translationCount: 134 },
    { id: 'project', name: 'Projets', translationCount: 112 }
  ]);

  // État pour les traductions
  const [translations, setTranslations] = useState<Translation[]>([
    {
      id: '1',
      key: 'app.welcome',
      module: 'core',
      context: 'Page d\'accueil',
      translations: {
        'fr_FR': 'Bienvenue sur ENTIDR',
        'en_US': 'Welcome to ENTIDR',
        'es_ES': 'Bienvenido a ENTIDR',
        'de_DE': 'Willkommen bei ENTIDR'
      }
    },
    {
      id: '2',
      key: 'app.login',
      module: 'core',
      context: 'Page de connexion',
      translations: {
        'fr_FR': 'Connexion',
        'en_US': 'Login',
        'es_ES': 'Iniciar sesión',
        'de_DE': 'Anmelden'
      }
    },
    {
      id: '3',
      key: 'app.logout',
      module: 'core',
      context: 'Menu utilisateur',
      translations: {
        'fr_FR': 'Déconnexion',
        'en_US': 'Logout',
        'es_ES': 'Cerrar sesión',
        'de_DE': 'Abmelden'
      }
    },
    {
      id: '4',
      key: 'hr.employee_list',
      module: 'hr',
      context: 'Liste des employés',
      translations: {
        'fr_FR': 'Liste des employés',
        'en_US': 'Employee List',
        'es_ES': 'Lista de empleados',
        'de_DE': 'Mitarbeiterliste'
      }
    },
    {
      id: '5',
      key: 'hr.add_employee',
      module: 'hr',
      context: 'Formulaire employé',
      translations: {
        'fr_FR': 'Ajouter un employé',
        'en_US': 'Add Employee',
        'es_ES': 'Añadir empleado',
        'de_DE': 'Mitarbeiter hinzufügen'
      }
    },
    {
      id: '6',
      key: 'finance.invoice',
      module: 'finance',
      context: 'Factures',
      translations: {
        'fr_FR': 'Facture',
        'en_US': 'Invoice',
        'es_ES': 'Factura',
        'de_DE': 'Rechnung'
      }
    }
  ]);

  // État pour la recherche et les filtres
  const [searchTerm, setSearchTerm] = useState('');
  const [moduleFilter, setModuleFilter] = useState<string>('');
  const [selectedLanguage, setSelectedLanguage] = useState<string>('fr_FR');

  // État pour la traduction en cours d'édition
  const [editingTranslation, setEditingTranslation] = useState<Translation | null>(null);
  const [isDialogOpen, setIsDialogOpen] = useState(false);

  // Filtrer les traductions en fonction du terme de recherche et du filtre de module
  const filteredTranslations = translations.filter(translation => {
    const matchesSearch =
      translation.key.toLowerCase().includes(searchTerm.toLowerCase()) ||
      translation.translations[selectedLanguage]?.toLowerCase().includes(searchTerm.toLowerCase()) ||
      translation.context.toLowerCase().includes(searchTerm.toLowerCase());

    const matchesModule = moduleFilter && moduleFilter !== 'all' ? translation.module === moduleFilter : true;

    return matchesSearch && matchesModule;
  });

  // Gérer l'ajout ou la modification d'une traduction
  const handleSaveTranslation = (translation: Translation) => {
    if (editingTranslation) {
      // Mise à jour d'une traduction existante
      setTranslations(translations.map(t => t.id === translation.id ? translation : t));
    } else {
      // Ajout d'une nouvelle traduction
      setTranslations([...translations, { ...translation, id: String(translations.length + 1) }]);
    }
    setIsDialogOpen(false);
    setEditingTranslation(null);
  };

  // Gérer la suppression d'une traduction
  const handleDeleteTranslation = (id: string) => {
    setTranslations(translations.filter(t => t.id !== id));
  };

  // Gérer l'exportation des traductions
  const handleExportTranslations = () => {
    alert('Exportation des traductions...');
    // Logique d'exportation à implémenter
  };

  // Gérer l'importation des traductions
  const handleImportTranslations = () => {
    alert('Importation des traductions...');
    // Logique d'importation à implémenter
  };

  // Gérer la synchronisation des traductions
  const handleSyncTranslations = () => {
    alert('Synchronisation des traductions...');
    // Logique de synchronisation à implémenter
  };

  return (
    <div className="p-6">
      {/* En-tête */}
      <div className="flex items-center gap-3 mb-6">
        <Languages className="h-8 w-8 text-ivory-orange" />
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Traductions</h1>
          <p className="text-muted-foreground mt-1">Gérez les traductions de l'application</p>
        </div>
      </div>

      {/* Actions */}
      <div className="flex flex-wrap gap-2 mb-6">
        <Button variant="outline" onClick={handleExportTranslations}>
          <Download className="h-4 w-4 mr-2" />
          Exporter
        </Button>
        <Button variant="outline" onClick={handleImportTranslations}>
          <Upload className="h-4 w-4 mr-2" />
          Importer
        </Button>
        <Button variant="outline" onClick={handleSyncTranslations}>
          <RefreshCw className="h-4 w-4 mr-2" />
          Synchroniser
        </Button>
      </div>

      {/* Carte principale */}
      <Card>
        <CardHeader className="flex flex-row items-center justify-between">
          <div>
            <CardTitle>Traductions</CardTitle>
            <CardDescription>Gérez les traductions de l'interface utilisateur</CardDescription>
          </div>
          <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
            <DialogTrigger asChild>
              <Button
                className="bg-ivory-orange hover:bg-ivory-orange/90"
                onClick={() => setEditingTranslation(null)}
              >
                <Plus className="h-4 w-4 mr-2" />
                Ajouter une traduction
              </Button>
            </DialogTrigger>
            <DialogContent className="max-w-3xl">
              <DialogHeader>
                <DialogTitle>{editingTranslation ? 'Modifier la traduction' : 'Ajouter une traduction'}</DialogTitle>
                <DialogDescription>
                  {editingTranslation
                    ? 'Modifiez les informations de la traduction'
                    : 'Remplissez les informations pour ajouter une nouvelle traduction'}
                </DialogDescription>
              </DialogHeader>
              <TranslationForm
                translation={editingTranslation || {
                  id: '',
                  key: '',
                  module: 'core',
                  context: '',
                  translations: languages.reduce((acc, lang) => ({...acc, [lang.code]: ''}), {})
                }}
                modules={modules}
                languages={languages}
                onSave={handleSaveTranslation}
                onCancel={() => setIsDialogOpen(false)}
              />
            </DialogContent>
          </Dialog>
        </CardHeader>
        <CardContent>
          {/* Filtres */}
          <div className="flex flex-col md:flex-row gap-4 mb-4">
            <div className="relative flex-1">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
              <Input
                placeholder="Rechercher une traduction..."
                className="pl-10"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </div>
            <div className="w-full md:w-64">
              <Select value={moduleFilter} onValueChange={setModuleFilter}>
                <SelectTrigger>
                  <SelectValue placeholder="Filtrer par module" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">Tous les modules</SelectItem>
                  {modules.map(module => (
                    <SelectItem key={module.id} value={module.id}>{module.name}</SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
            <div className="w-full md:w-64">
              <Select value={selectedLanguage} onValueChange={setSelectedLanguage}>
                <SelectTrigger>
                  <SelectValue placeholder="Langue" />
                </SelectTrigger>
                <SelectContent>
                  {languages.map(language => (
                    <SelectItem key={language.code} value={language.code}>{language.name}</SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
          </div>

          {/* Tableau des traductions */}
          <div className="rounded-md border">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Clé</TableHead>
                  <TableHead>Module</TableHead>
                  <TableHead>Contexte</TableHead>
                  <TableHead>Traduction ({languages.find(l => l.code === selectedLanguage)?.name})</TableHead>
                  <TableHead className="text-right">Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {filteredTranslations.map((translation) => (
                  <TableRow key={translation.id}>
                    <TableCell className="font-medium">{translation.key}</TableCell>
                    <TableCell>
                      <Badge variant="outline">
                        {modules.find(m => m.id === translation.module)?.name || translation.module}
                      </Badge>
                    </TableCell>
                    <TableCell>{translation.context}</TableCell>
                    <TableCell>{translation.translations[selectedLanguage] || '-'}</TableCell>
                    <TableCell className="text-right">
                      <div className="flex justify-end gap-2">
                        <Button
                          variant="ghost"
                          size="icon"
                          onClick={() => {
                            setEditingTranslation(translation);
                            setIsDialogOpen(true);
                          }}
                        >
                          <Pencil className="h-4 w-4" />
                        </Button>
                        <Button
                          variant="ghost"
                          size="icon"
                          onClick={() => handleDeleteTranslation(translation.id)}
                        >
                          <Trash2 className="h-4 w-4" />
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

// Composant de formulaire pour ajouter/modifier une traduction
interface TranslationFormProps {
  translation: Translation;
  modules: Module[];
  languages: { code: string; name: string }[];
  onSave: (translation: Translation) => void;
  onCancel: () => void;
}

const TranslationForm: React.FC<TranslationFormProps> = ({ translation, modules, languages, onSave, onCancel }) => {
  const [formData, setFormData] = useState<Translation>(translation);
  const [activeTab, setActiveTab] = useState('details');

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value
    });
  };

  const handleModuleChange = (value: string) => {
    setFormData({
      ...formData,
      module: value
    });
  };

  const handleTranslationChange = (langCode: string, value: string) => {
    setFormData({
      ...formData,
      translations: {
        ...formData.translations,
        [langCode]: value
      }
    });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSave(formData);
  };

  return (
    <form onSubmit={handleSubmit}>
      <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
        <TabsList className="grid w-full grid-cols-2">
          <TabsTrigger value="details">Détails</TabsTrigger>
          <TabsTrigger value="translations">Traductions</TabsTrigger>
        </TabsList>

        <TabsContent value="details" className="space-y-4 py-4">
          <div className="grid grid-cols-4 items-center gap-4">
            <Label htmlFor="key" className="text-right">Clé</Label>
            <Input
              id="key"
              name="key"
              value={formData.key}
              onChange={handleChange}
              className="col-span-3"
              placeholder="app.welcome"
              required
            />
          </div>
          <div className="grid grid-cols-4 items-center gap-4">
            <Label htmlFor="module" className="text-right">Module</Label>
            <Select
              value={formData.module}
              onValueChange={handleModuleChange}
            >
              <SelectTrigger className="col-span-3">
                <SelectValue placeholder="Sélectionnez un module" />
              </SelectTrigger>
              <SelectContent>
                {modules.map(module => (
                  <SelectItem key={module.id} value={module.id}>{module.name}</SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
          <div className="grid grid-cols-4 items-start gap-4">
            <Label htmlFor="context" className="text-right pt-2">Contexte</Label>
            <Textarea
              id="context"
              name="context"
              value={formData.context}
              onChange={handleChange}
              className="col-span-3"
              placeholder="Page d'accueil"
              rows={2}
            />
          </div>
        </TabsContent>

        <TabsContent value="translations" className="py-4">
          <div className="space-y-4">
            {languages.map(language => (
              <div key={language.code} className="grid grid-cols-4 items-start gap-4">
                <Label htmlFor={`translation-${language.code}`} className="text-right pt-2">
                  {language.name}
                </Label>
                <Textarea
                  id={`translation-${language.code}`}
                  value={formData.translations[language.code] || ''}
                  onChange={(e) => handleTranslationChange(language.code, e.target.value)}
                  className="col-span-3"
                  placeholder={`Traduction en ${language.name}`}
                  rows={2}
                />
              </div>
            ))}
          </div>
        </TabsContent>
      </Tabs>

      <DialogFooter className="mt-4">
        <Button type="button" variant="outline" onClick={onCancel}>
          Annuler
        </Button>
        <Button type="submit" className="bg-ivory-orange hover:bg-ivory-orange/90">
          Enregistrer
        </Button>
      </DialogFooter>
    </form>
  );
};

export default TranslationsSettings;
