import React, { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '../../components/ui/card';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '../../components/ui/table';
import { Button } from '../../components/ui/button';
import { Input } from '../../components/ui/input';
import { Switch } from '../../components/ui/switch';
import { Badge } from '../../components/ui/badge';
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from '../../components/ui/dialog';
import { Label } from '../../components/ui/label';
import { Languages, Search, Plus, Pencil, Trash2, Check, Globe } from 'lucide-react';

// Types pour les langues
interface Language {
  id: string;
  code: string;
  name: string;
  nativeName: string;
  isDefault: boolean;
  isActive: boolean;
  isInstalled: boolean;
  completionPercentage: number;
}

/**
 * Page des paramètres des langues
 * Permet de gérer les langues disponibles dans l'application
 */
const LanguagesSettings: React.FC = () => {
  // État pour les langues
  const [languages, setLanguages] = useState<Language[]>([
    { 
      id: '1', 
      code: 'fr_FR', 
      name: 'Français', 
      nativeName: 'Français',
      isDefault: true, 
      isActive: true,
      isInstalled: true,
      completionPercentage: 100
    },
    { 
      id: '2', 
      code: 'en_US', 
      name: 'Anglais (US)', 
      nativeName: 'English (US)',
      isDefault: false, 
      isActive: true,
      isInstalled: true,
      completionPercentage: 95
    },
    { 
      id: '3', 
      code: 'es_ES', 
      name: 'Espagnol', 
      nativeName: 'Español',
      isDefault: false, 
      isActive: true,
      isInstalled: true,
      completionPercentage: 85
    },
    { 
      id: '4', 
      code: 'de_DE', 
      name: 'Allemand', 
      nativeName: 'Deutsch',
      isDefault: false, 
      isActive: false,
      isInstalled: true,
      completionPercentage: 80
    },
    { 
      id: '5', 
      code: 'it_IT', 
      name: 'Italien', 
      nativeName: 'Italiano',
      isDefault: false, 
      isActive: false,
      isInstalled: true,
      completionPercentage: 75
    },
    { 
      id: '6', 
      code: 'pt_BR', 
      name: 'Portugais (Brésil)', 
      nativeName: 'Português (Brasil)',
      isDefault: false, 
      isActive: false,
      isInstalled: false,
      completionPercentage: 0
    },
    { 
      id: '7', 
      code: 'nl_NL', 
      name: 'Néerlandais', 
      nativeName: 'Nederlands',
      isDefault: false, 
      isActive: false,
      isInstalled: false,
      completionPercentage: 0
    }
  ]);

  // État pour la recherche
  const [searchTerm, setSearchTerm] = useState('');

  // État pour la langue en cours d'édition
  const [editingLanguage, setEditingLanguage] = useState<Language | null>(null);
  const [isDialogOpen, setIsDialogOpen] = useState(false);

  // Filtrer les langues en fonction du terme de recherche
  const filteredLanguages = languages.filter(language => 
    language.name.toLowerCase().includes(searchTerm.toLowerCase()) || 
    language.code.toLowerCase().includes(searchTerm.toLowerCase()) ||
    language.nativeName.toLowerCase().includes(searchTerm.toLowerCase())
  );

  // Gérer l'ajout ou la modification d'une langue
  const handleSaveLanguage = (language: Language) => {
    if (editingLanguage) {
      // Mise à jour d'une langue existante
      setLanguages(languages.map(l => l.id === language.id ? language : l));
    } else {
      // Ajout d'une nouvelle langue
      setLanguages([...languages, { ...language, id: String(languages.length + 1) }]);
    }
    setIsDialogOpen(false);
    setEditingLanguage(null);
  };

  // Gérer la suppression d'une langue
  const handleDeleteLanguage = (id: string) => {
    setLanguages(languages.filter(l => l.id !== id));
  };

  // Gérer l'activation/désactivation d'une langue
  const handleToggleLanguageStatus = (id: string) => {
    setLanguages(languages.map(language => 
      language.id === id 
        ? { ...language, isActive: !language.isActive } 
        : language
    ));
  };

  // Gérer le changement de langue par défaut
  const handleSetDefaultLanguage = (id: string) => {
    setLanguages(languages.map(language => ({
      ...language,
      isDefault: language.id === id
    })));
  };

  // Gérer l'installation d'une langue
  const handleInstallLanguage = (id: string) => {
    setLanguages(languages.map(language => 
      language.id === id 
        ? { ...language, isInstalled: true, completionPercentage: 70 } 
        : language
    ));
  };

  return (
    <div className="p-6">
      {/* En-tête */}
      <div className="flex items-center gap-3 mb-6">
        <Languages className="h-8 w-8 text-ivory-orange" />
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Langues</h1>
          <p className="text-muted-foreground mt-1">Gérez les langues disponibles dans l'application</p>
        </div>
      </div>

      {/* Carte principale */}
      <Card>
        <CardHeader className="flex flex-row items-center justify-between">
          <div>
            <CardTitle>Liste des langues</CardTitle>
            <CardDescription>Configurez les langues et leur disponibilité</CardDescription>
          </div>
          <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
            <DialogTrigger asChild>
              <Button 
                className="bg-ivory-orange hover:bg-ivory-orange/90"
                onClick={() => setEditingLanguage(null)}
              >
                <Plus className="h-4 w-4 mr-2" />
                Ajouter une langue
              </Button>
            </DialogTrigger>
            <DialogContent>
              <DialogHeader>
                <DialogTitle>{editingLanguage ? 'Modifier la langue' : 'Ajouter une langue'}</DialogTitle>
                <DialogDescription>
                  {editingLanguage 
                    ? 'Modifiez les informations de la langue' 
                    : 'Remplissez les informations pour ajouter une nouvelle langue'}
                </DialogDescription>
              </DialogHeader>
              <LanguageForm 
                language={editingLanguage || { 
                  id: '', 
                  code: '', 
                  name: '', 
                  nativeName: '',
                  isDefault: false, 
                  isActive: true,
                  isInstalled: false,
                  completionPercentage: 0
                }}
                onSave={handleSaveLanguage}
                onCancel={() => setIsDialogOpen(false)}
              />
            </DialogContent>
          </Dialog>
        </CardHeader>
        <CardContent>
          {/* Barre de recherche */}
          <div className="relative mb-4">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
            <Input
              placeholder="Rechercher une langue..."
              className="pl-10"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>

          {/* Tableau des langues */}
          <div className="rounded-md border">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Code</TableHead>
                  <TableHead>Nom</TableHead>
                  <TableHead>Nom natif</TableHead>
                  <TableHead>Par défaut</TableHead>
                  <TableHead>Statut</TableHead>
                  <TableHead>Traduction</TableHead>
                  <TableHead className="text-right">Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {filteredLanguages.map((language) => (
                  <TableRow key={language.id}>
                    <TableCell className="font-medium">{language.code}</TableCell>
                    <TableCell>{language.name}</TableCell>
                    <TableCell>{language.nativeName}</TableCell>
                    <TableCell>
                      <Switch 
                        checked={language.isDefault}
                        onCheckedChange={() => handleSetDefaultLanguage(language.id)}
                        disabled={language.isDefault || !language.isInstalled}
                      />
                    </TableCell>
                    <TableCell>
                      <div className="flex items-center gap-2">
                        <Switch 
                          checked={language.isActive}
                          onCheckedChange={() => handleToggleLanguageStatus(language.id)}
                          disabled={!language.isInstalled || language.isDefault}
                        />
                        <span className={`px-2 py-1 rounded-full text-xs ${
                          !language.isInstalled 
                            ? 'bg-gray-100 text-gray-800'
                            : language.isActive 
                              ? 'bg-green-100 text-green-800' 
                              : 'bg-yellow-100 text-yellow-800'
                        }`}>
                          {!language.isInstalled 
                            ? 'Non installé' 
                            : language.isActive 
                              ? 'Actif' 
                              : 'Inactif'}
                        </span>
                      </div>
                    </TableCell>
                    <TableCell>
                      {language.isInstalled ? (
                        <div className="flex items-center gap-2">
                          <div className="w-24 h-2 bg-gray-200 rounded-full overflow-hidden">
                            <div 
                              className="h-full bg-ivory-orange" 
                              style={{ width: `${language.completionPercentage}%` }}
                            ></div>
                          </div>
                          <span className="text-xs">{language.completionPercentage}%</span>
                        </div>
                      ) : (
                        <Button 
                          variant="outline" 
                          size="sm"
                          onClick={() => handleInstallLanguage(language.id)}
                        >
                          <Globe className="h-3 w-3 mr-1" />
                          Installer
                        </Button>
                      )}
                    </TableCell>
                    <TableCell className="text-right">
                      <div className="flex justify-end gap-2">
                        <Button 
                          variant="ghost" 
                          size="icon"
                          onClick={() => {
                            setEditingLanguage(language);
                            setIsDialogOpen(true);
                          }}
                        >
                          <Pencil className="h-4 w-4" />
                        </Button>
                        <Button 
                          variant="ghost" 
                          size="icon"
                          onClick={() => handleDeleteLanguage(language.id)}
                          disabled={language.isDefault || language.isInstalled}
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

// Composant de formulaire pour ajouter/modifier une langue
interface LanguageFormProps {
  language: Language;
  onSave: (language: Language) => void;
  onCancel: () => void;
}

const LanguageForm: React.FC<LanguageFormProps> = ({ language, onSave, onCancel }) => {
  const [formData, setFormData] = useState<Language>(language);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value
    });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSave(formData);
  };

  return (
    <form onSubmit={handleSubmit}>
      <div className="grid gap-4 py-4">
        <div className="grid grid-cols-4 items-center gap-4">
          <Label htmlFor="code" className="text-right">Code</Label>
          <Input
            id="code"
            name="code"
            value={formData.code}
            onChange={handleChange}
            className="col-span-3"
            placeholder="fr_FR"
            required
          />
        </div>
        <div className="grid grid-cols-4 items-center gap-4">
          <Label htmlFor="name" className="text-right">Nom</Label>
          <Input
            id="name"
            name="name"
            value={formData.name}
            onChange={handleChange}
            className="col-span-3"
            placeholder="Français"
            required
          />
        </div>
        <div className="grid grid-cols-4 items-center gap-4">
          <Label htmlFor="nativeName" className="text-right">Nom natif</Label>
          <Input
            id="nativeName"
            name="nativeName"
            value={formData.nativeName}
            onChange={handleChange}
            className="col-span-3"
            placeholder="Français"
            required
          />
        </div>
      </div>
      <DialogFooter>
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

export default LanguagesSettings;
