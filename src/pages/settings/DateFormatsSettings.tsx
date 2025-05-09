import React, { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '../../components/ui/card';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '../../components/ui/table';
import { Button } from '../../components/ui/button';
import { Input } from '../../components/ui/input';
import { Switch } from '../../components/ui/switch';
import { Badge } from '../../components/ui/badge';
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from '../../components/ui/dialog';
import { Label } from '../../components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '../../components/ui/select';
import { Calendar, Search, Plus, Pencil, Trash2, Check, Info } from 'lucide-react';
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from '../../components/ui/tooltip';

// Types pour les formats de date
interface DateFormat {
  id: string;
  name: string;
  format: string;
  example: string;
  isDefault: boolean;
  region: string;
}

/**
 * Page des paramètres des formats de date
 * Permet de gérer les formats de date disponibles dans l'application
 */
const DateFormatsSettings: React.FC = () => {
  // Obtenir la date actuelle pour les exemples
  const currentDate = new Date();

  // Fonction pour formater une date selon un format spécifié
  const formatDate = (format: string): string => {
    try {
      // Cette fonction est simplifiée, dans une application réelle,
      // vous utiliseriez une bibliothèque comme date-fns ou moment.js
      const day = currentDate.getDate().toString().padStart(2, '0');
      const month = (currentDate.getMonth() + 1).toString().padStart(2, '0');
      const year = currentDate.getFullYear();

      return format
        .replace('DD', day)
        .replace('MM', month)
        .replace('YYYY', year.toString())
        .replace('YY', year.toString().slice(-2));
    } catch (error) {
      return 'Format invalide';
    }
  };

  // État pour les formats de date
  const [dateFormats, setDateFormats] = useState<DateFormat[]>([
    {
      id: '1',
      name: 'Standard français',
      format: 'DD/MM/YYYY',
      example: formatDate('DD/MM/YYYY'),
      isDefault: true,
      region: 'Europe'
    },
    {
      id: '2',
      name: 'Standard américain',
      format: 'MM/DD/YYYY',
      example: formatDate('MM/DD/YYYY'),
      isDefault: false,
      region: 'Amérique du Nord'
    },
    {
      id: '3',
      name: 'ISO 8601',
      format: 'YYYY-MM-DD',
      example: formatDate('YYYY-MM-DD'),
      isDefault: false,
      region: 'International'
    },
    {
      id: '4',
      name: 'Format britannique',
      format: 'DD.MM.YYYY',
      example: formatDate('DD.MM.YYYY'),
      isDefault: false,
      region: 'Europe'
    },
    {
      id: '5',
      name: 'Format court',
      format: 'DD/MM/YY',
      example: formatDate('DD/MM/YY'),
      isDefault: false,
      region: 'Europe'
    },
    {
      id: '6',
      name: 'Format japonais',
      format: 'YYYY年MM月DD日',
      example: `${currentDate.getFullYear()}年${(currentDate.getMonth() + 1).toString().padStart(2, '0')}月${currentDate.getDate().toString().padStart(2, '0')}日`,
      isDefault: false,
      region: 'Asie'
    }
  ]);

  // Régions disponibles
  const regions = ['Europe', 'Amérique du Nord', 'Amérique du Sud', 'Asie', 'Afrique', 'Océanie', 'International'];

  // État pour la recherche
  const [searchTerm, setSearchTerm] = useState('');
  const [regionFilter, setRegionFilter] = useState<string>('');

  // État pour le format de date en cours d'édition
  const [editingDateFormat, setEditingDateFormat] = useState<DateFormat | null>(null);
  const [isDialogOpen, setIsDialogOpen] = useState(false);

  // Filtrer les formats de date en fonction du terme de recherche et du filtre de région
  const filteredDateFormats = dateFormats.filter(dateFormat => {
    const matchesSearch =
      dateFormat.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      dateFormat.format.toLowerCase().includes(searchTerm.toLowerCase());

    const matchesRegion = regionFilter && regionFilter !== 'all' ? dateFormat.region === regionFilter : true;

    return matchesSearch && matchesRegion;
  });

  // Gérer l'ajout ou la modification d'un format de date
  const handleSaveDateFormat = (dateFormat: DateFormat) => {
    // Si le nouveau format est défini comme par défaut, mettre à jour tous les autres formats
    const updatedDateFormat = {
      ...dateFormat,
      example: formatDate(dateFormat.format)
    };

    if (updatedDateFormat.isDefault) {
      const updatedFormats = dateFormats.map(format => ({
        ...format,
        isDefault: format.id === updatedDateFormat.id
      }));

      if (editingDateFormat) {
        // Mise à jour d'un format existant
        setDateFormats(updatedFormats);
      } else {
        // Ajout d'un nouveau format
        setDateFormats([...updatedFormats, { ...updatedDateFormat, id: String(dateFormats.length + 1) }]);
      }
    } else {
      if (editingDateFormat) {
        // Mise à jour d'un format existant sans changer le statut par défaut des autres
        setDateFormats(dateFormats.map(format =>
          format.id === updatedDateFormat.id ? updatedDateFormat : format
        ));
      } else {
        // Ajout d'un nouveau format
        setDateFormats([...dateFormats, { ...updatedDateFormat, id: String(dateFormats.length + 1) }]);
      }
    }

    setIsDialogOpen(false);
    setEditingDateFormat(null);
  };

  // Gérer la suppression d'un format de date
  const handleDeleteDateFormat = (id: string) => {
    // Vérifier si le format à supprimer est le format par défaut
    const formatToDelete = dateFormats.find(format => format.id === id);

    if (formatToDelete?.isDefault) {
      alert('Vous ne pouvez pas supprimer le format par défaut. Veuillez d\'abord définir un autre format comme format par défaut.');
      return;
    }

    setDateFormats(dateFormats.filter(format => format.id !== id));
  };

  // Gérer le changement de format par défaut
  const handleSetDefaultDateFormat = (id: string) => {
    setDateFormats(dateFormats.map(format => ({
      ...format,
      isDefault: format.id === id
    })));
  };

  return (
    <div className="p-6">
      {/* En-tête */}
      <div className="flex items-center gap-3 mb-6">
        <Calendar className="h-8 w-8 text-ivory-orange" />
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Formats de date</h1>
          <p className="text-muted-foreground mt-1">Gérez les formats de date disponibles dans l'application</p>
        </div>
      </div>

      {/* Carte principale */}
      <Card>
        <CardHeader className="flex flex-row items-center justify-between">
          <div>
            <CardTitle>Liste des formats de date</CardTitle>
            <CardDescription>Configurez les formats de date et leur disponibilité</CardDescription>
          </div>
          <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
            <DialogTrigger asChild>
              <Button
                className="bg-ivory-orange hover:bg-ivory-orange/90"
                onClick={() => setEditingDateFormat(null)}
              >
                <Plus className="h-4 w-4 mr-2" />
                Ajouter un format
              </Button>
            </DialogTrigger>
            <DialogContent>
              <DialogHeader>
                <DialogTitle>{editingDateFormat ? 'Modifier le format de date' : 'Ajouter un format de date'}</DialogTitle>
                <DialogDescription>
                  {editingDateFormat
                    ? 'Modifiez les informations du format de date'
                    : 'Remplissez les informations pour ajouter un nouveau format de date'}
                </DialogDescription>
              </DialogHeader>
              <DateFormatForm
                dateFormat={editingDateFormat || {
                  id: '',
                  name: '',
                  format: '',
                  example: '',
                  isDefault: false,
                  region: 'Europe'
                }}
                regions={regions}
                formatDate={formatDate}
                onSave={handleSaveDateFormat}
                onCancel={() => setIsDialogOpen(false)}
                hasDefaultFormat={dateFormats.some(format => format.isDefault)}
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
                placeholder="Rechercher un format de date..."
                className="pl-10"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </div>
            <div className="w-full md:w-64">
              <Select value={regionFilter} onValueChange={setRegionFilter}>
                <SelectTrigger>
                  <SelectValue placeholder="Filtrer par région" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">Toutes les régions</SelectItem>
                  {regions.map(region => (
                    <SelectItem key={region} value={region}>{region}</SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
          </div>

          {/* Tableau des formats de date */}
          <div className="rounded-md border">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Nom</TableHead>
                  <TableHead>Format</TableHead>
                  <TableHead>Exemple</TableHead>
                  <TableHead>Région</TableHead>
                  <TableHead>Par défaut</TableHead>
                  <TableHead className="text-right">Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {filteredDateFormats.map((dateFormat) => (
                  <TableRow key={dateFormat.id}>
                    <TableCell className="font-medium">{dateFormat.name}</TableCell>
                    <TableCell>
                      <div className="flex items-center gap-2">
                        <code className="bg-muted px-1 py-0.5 rounded text-sm">{dateFormat.format}</code>
                        <TooltipProvider>
                          <Tooltip>
                            <TooltipTrigger asChild>
                              <Info className="h-4 w-4 text-muted-foreground cursor-help" />
                            </TooltipTrigger>
                            <TooltipContent>
                              <p>DD = Jour, MM = Mois, YYYY = Année (4 chiffres), YY = Année (2 chiffres)</p>
                            </TooltipContent>
                          </Tooltip>
                        </TooltipProvider>
                      </div>
                    </TableCell>
                    <TableCell>{dateFormat.example}</TableCell>
                    <TableCell>
                      <Badge variant="outline">{dateFormat.region}</Badge>
                    </TableCell>
                    <TableCell>
                      <div className="flex items-center">
                        <Switch
                          checked={dateFormat.isDefault}
                          onCheckedChange={() => handleSetDefaultDateFormat(dateFormat.id)}
                          disabled={dateFormat.isDefault}
                        />
                        {dateFormat.isDefault && (
                          <Badge variant="secondary" className="ml-2">
                            Par défaut
                          </Badge>
                        )}
                      </div>
                    </TableCell>
                    <TableCell className="text-right">
                      <div className="flex justify-end gap-2">
                        <Button
                          variant="ghost"
                          size="icon"
                          onClick={() => {
                            setEditingDateFormat(dateFormat);
                            setIsDialogOpen(true);
                          }}
                        >
                          <Pencil className="h-4 w-4" />
                        </Button>
                        <Button
                          variant="ghost"
                          size="icon"
                          onClick={() => handleDeleteDateFormat(dateFormat.id)}
                          disabled={dateFormat.isDefault}
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

// Composant de formulaire pour ajouter/modifier un format de date
interface DateFormatFormProps {
  dateFormat: DateFormat;
  regions: string[];
  formatDate: (format: string) => string;
  onSave: (dateFormat: DateFormat) => void;
  onCancel: () => void;
  hasDefaultFormat: boolean;
}

const DateFormatForm: React.FC<DateFormatFormProps> = ({
  dateFormat,
  regions,
  formatDate,
  onSave,
  onCancel,
  hasDefaultFormat
}) => {
  const [formData, setFormData] = useState<DateFormat>(dateFormat);
  const [formatPreview, setFormatPreview] = useState(dateFormat.example || formatDate(dateFormat.format));

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value
    });

    if (name === 'format') {
      setFormatPreview(formatDate(value));
    }
  };

  const handleSelectChange = (name: string, value: string) => {
    setFormData({
      ...formData,
      [name]: value
    });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSave({
      ...formData,
      example: formatPreview
    });
  };

  return (
    <form onSubmit={handleSubmit}>
      <div className="grid gap-4 py-4">
        <div className="grid grid-cols-4 items-center gap-4">
          <Label htmlFor="name" className="text-right">Nom</Label>
          <Input
            id="name"
            name="name"
            value={formData.name}
            onChange={handleChange}
            className="col-span-3"
            placeholder="Standard français"
            required
          />
        </div>
        <div className="grid grid-cols-4 items-center gap-4">
          <Label htmlFor="format" className="text-right">Format</Label>
          <div className="col-span-3 space-y-2">
            <Input
              id="format"
              name="format"
              value={formData.format}
              onChange={handleChange}
              placeholder="DD/MM/YYYY"
              required
            />
            <div className="flex items-center gap-2 text-sm text-muted-foreground">
              <span>Exemple :</span>
              <code className="bg-muted px-1 py-0.5 rounded">{formatPreview}</code>
            </div>
            <p className="text-xs text-muted-foreground">
              Utilisez DD pour le jour, MM pour le mois, YYYY pour l'année (4 chiffres), YY pour l'année (2 chiffres)
            </p>
          </div>
        </div>
        <div className="grid grid-cols-4 items-center gap-4">
          <Label htmlFor="region" className="text-right">Région</Label>
          <Select
            value={formData.region}
            onValueChange={(value) => handleSelectChange('region', value)}
          >
            <SelectTrigger className="col-span-3">
              <SelectValue placeholder="Sélectionnez une région" />
            </SelectTrigger>
            <SelectContent>
              {regions.map(region => (
                <SelectItem key={region} value={region}>{region}</SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>
        <div className="grid grid-cols-4 items-center gap-4">
          <Label htmlFor="isDefault" className="text-right">Par défaut</Label>
          <div className="col-span-3 flex items-center gap-2">
            <Switch
              id="isDefault"
              checked={formData.isDefault}
              onCheckedChange={(checked) => setFormData({...formData, isDefault: checked})}
              disabled={formData.isDefault}
            />
            <span className="text-sm text-muted-foreground">
              {formData.isDefault
                ? 'Ce format est défini comme format par défaut'
                : hasDefaultFormat
                  ? 'Activer pour définir ce format comme format par défaut'
                  : 'Aucun format par défaut n\'est défini. Vous devriez activer cette option.'}
            </span>
          </div>
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

export default DateFormatsSettings;
