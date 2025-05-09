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
import { Globe, Search, Plus, Pencil, Trash2, MapPin } from 'lucide-react';

// Types pour les pays
interface Country {
  id: string;
  code: string;
  name: string;
  phoneCode: string;
  region: string;
  currency: string;
  isActive: boolean;
}

/**
 * Page des paramètres des pays
 * Permet de gérer les pays disponibles dans l'application
 */
const CountriesSettings: React.FC = () => {
  // État pour les pays
  const [countries, setCountries] = useState<Country[]>([
    {
      id: '1',
      code: 'FR',
      name: 'France',
      phoneCode: '+33',
      region: 'Europe',
      currency: 'EUR',
      isActive: true
    },
    {
      id: '2',
      code: 'US',
      name: 'États-Unis',
      phoneCode: '+1',
      region: 'Amérique du Nord',
      currency: 'USD',
      isActive: true
    },
    {
      id: '3',
      code: 'CA',
      name: 'Canada',
      phoneCode: '+1',
      region: 'Amérique du Nord',
      currency: 'CAD',
      isActive: true
    },
    {
      id: '4',
      code: 'GB',
      name: 'Royaume-Uni',
      phoneCode: '+44',
      region: 'Europe',
      currency: 'GBP',
      isActive: true
    },
    {
      id: '5',
      code: 'DE',
      name: 'Allemagne',
      phoneCode: '+49',
      region: 'Europe',
      currency: 'EUR',
      isActive: true
    },
    {
      id: '6',
      code: 'ES',
      name: 'Espagne',
      phoneCode: '+34',
      region: 'Europe',
      currency: 'EUR',
      isActive: true
    },
    {
      id: '7',
      code: 'IT',
      name: 'Italie',
      phoneCode: '+39',
      region: 'Europe',
      currency: 'EUR',
      isActive: true
    },
    {
      id: '8',
      code: 'JP',
      name: 'Japon',
      phoneCode: '+81',
      region: 'Asie',
      currency: 'JPY',
      isActive: false
    },
    {
      id: '9',
      code: 'AU',
      name: 'Australie',
      phoneCode: '+61',
      region: 'Océanie',
      currency: 'AUD',
      isActive: false
    },
    {
      id: '10',
      code: 'BR',
      name: 'Brésil',
      phoneCode: '+55',
      region: 'Amérique du Sud',
      currency: 'BRL',
      isActive: false
    }
  ]);

  // Régions disponibles
  const regions = ['Europe', 'Amérique du Nord', 'Amérique du Sud', 'Asie', 'Afrique', 'Océanie', 'Antarctique'];

  // Devises disponibles
  const currencies = ['EUR', 'USD', 'GBP', 'CAD', 'JPY', 'AUD', 'BRL', 'CNY', 'INR', 'RUB'];

  // État pour la recherche
  const [searchTerm, setSearchTerm] = useState('');
  const [regionFilter, setRegionFilter] = useState<string>('');

  // État pour le pays en cours d'édition
  const [editingCountry, setEditingCountry] = useState<Country | null>(null);
  const [isDialogOpen, setIsDialogOpen] = useState(false);

  // Filtrer les pays en fonction du terme de recherche et du filtre de région
  const filteredCountries = countries.filter(country => {
    const matchesSearch =
      country.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      country.code.toLowerCase().includes(searchTerm.toLowerCase()) ||
      country.phoneCode.includes(searchTerm);

    const matchesRegion = regionFilter && regionFilter !== 'all' ? country.region === regionFilter : true;

    return matchesSearch && matchesRegion;
  });

  // Gérer l'ajout ou la modification d'un pays
  const handleSaveCountry = (country: Country) => {
    if (editingCountry) {
      // Mise à jour d'un pays existant
      setCountries(countries.map(c => c.id === country.id ? country : c));
    } else {
      // Ajout d'un nouveau pays
      setCountries([...countries, { ...country, id: String(countries.length + 1) }]);
    }
    setIsDialogOpen(false);
    setEditingCountry(null);
  };

  // Gérer la suppression d'un pays
  const handleDeleteCountry = (id: string) => {
    setCountries(countries.filter(c => c.id !== id));
  };

  // Gérer l'activation/désactivation d'un pays
  const handleToggleCountryStatus = (id: string) => {
    setCountries(countries.map(country =>
      country.id === id
        ? { ...country, isActive: !country.isActive }
        : country
    ));
  };

  return (
    <div className="p-6">
      {/* En-tête */}
      <div className="flex items-center gap-3 mb-6">
        <Globe className="h-8 w-8 text-ivory-orange" />
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Pays</h1>
          <p className="text-muted-foreground mt-1">Gérez les pays disponibles dans l'application</p>
        </div>
      </div>

      {/* Carte principale */}
      <Card>
        <CardHeader className="flex flex-row items-center justify-between">
          <div>
            <CardTitle>Liste des pays</CardTitle>
            <CardDescription>Configurez les pays et leur disponibilité</CardDescription>
          </div>
          <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
            <DialogTrigger asChild>
              <Button
                className="bg-ivory-orange hover:bg-ivory-orange/90"
                onClick={() => setEditingCountry(null)}
              >
                <Plus className="h-4 w-4 mr-2" />
                Ajouter un pays
              </Button>
            </DialogTrigger>
            <DialogContent>
              <DialogHeader>
                <DialogTitle>{editingCountry ? 'Modifier le pays' : 'Ajouter un pays'}</DialogTitle>
                <DialogDescription>
                  {editingCountry
                    ? 'Modifiez les informations du pays'
                    : 'Remplissez les informations pour ajouter un nouveau pays'}
                </DialogDescription>
              </DialogHeader>
              <CountryForm
                country={editingCountry || {
                  id: '',
                  code: '',
                  name: '',
                  phoneCode: '',
                  region: '',
                  currency: '',
                  isActive: true
                }}
                regions={regions}
                currencies={currencies}
                onSave={handleSaveCountry}
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
                placeholder="Rechercher un pays..."
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

          {/* Tableau des pays */}
          <div className="rounded-md border">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Code</TableHead>
                  <TableHead>Nom</TableHead>
                  <TableHead>Indicatif</TableHead>
                  <TableHead>Région</TableHead>
                  <TableHead>Devise</TableHead>
                  <TableHead>Statut</TableHead>
                  <TableHead className="text-right">Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {filteredCountries.map((country) => (
                  <TableRow key={country.id}>
                    <TableCell className="font-medium">{country.code}</TableCell>
                    <TableCell>{country.name}</TableCell>
                    <TableCell>{country.phoneCode}</TableCell>
                    <TableCell>
                      <Badge variant="outline">{country.region}</Badge>
                    </TableCell>
                    <TableCell>{country.currency}</TableCell>
                    <TableCell>
                      <div className="flex items-center gap-2">
                        <Switch
                          checked={country.isActive}
                          onCheckedChange={() => handleToggleCountryStatus(country.id)}
                        />
                        <span className={`px-2 py-1 rounded-full text-xs ${
                          country.isActive
                            ? 'bg-green-100 text-green-800'
                            : 'bg-gray-100 text-gray-800'
                        }`}>
                          {country.isActive ? 'Actif' : 'Inactif'}
                        </span>
                      </div>
                    </TableCell>
                    <TableCell className="text-right">
                      <div className="flex justify-end gap-2">
                        <Button
                          variant="ghost"
                          size="icon"
                          onClick={() => {
                            setEditingCountry(country);
                            setIsDialogOpen(true);
                          }}
                        >
                          <Pencil className="h-4 w-4" />
                        </Button>
                        <Button
                          variant="ghost"
                          size="icon"
                          onClick={() => handleDeleteCountry(country.id)}
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

// Composant de formulaire pour ajouter/modifier un pays
interface CountryFormProps {
  country: Country;
  regions: string[];
  currencies: string[];
  onSave: (country: Country) => void;
  onCancel: () => void;
}

const CountryForm: React.FC<CountryFormProps> = ({ country, regions, currencies, onSave, onCancel }) => {
  const [formData, setFormData] = useState<Country>(country);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value
    });
  };

  const handleSelectChange = (name: string, value: string) => {
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
            placeholder="FR"
            maxLength={2}
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
            placeholder="France"
            required
          />
        </div>
        <div className="grid grid-cols-4 items-center gap-4">
          <Label htmlFor="phoneCode" className="text-right">Indicatif</Label>
          <Input
            id="phoneCode"
            name="phoneCode"
            value={formData.phoneCode}
            onChange={handleChange}
            className="col-span-3"
            placeholder="+33"
            required
          />
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
          <Label htmlFor="currency" className="text-right">Devise</Label>
          <Select
            value={formData.currency}
            onValueChange={(value) => handleSelectChange('currency', value)}
          >
            <SelectTrigger className="col-span-3">
              <SelectValue placeholder="Sélectionnez une devise" />
            </SelectTrigger>
            <SelectContent>
              {currencies.map(currency => (
                <SelectItem key={currency} value={currency}>{currency}</SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>
        <div className="grid grid-cols-4 items-center gap-4">
          <Label htmlFor="isActive" className="text-right">Actif</Label>
          <div className="col-span-3 flex items-center">
            <Switch
              id="isActive"
              checked={formData.isActive}
              onCheckedChange={(checked) => setFormData({...formData, isActive: checked})}
            />
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

export default CountriesSettings;
