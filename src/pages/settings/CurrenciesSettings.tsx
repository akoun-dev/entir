import React, { useState, useEffect } from 'react';
import { 
  DollarSign, Search, Plus, MoreHorizontal, 
  Edit, Trash2, Save, Check, X, ArrowUpDown
} from 'lucide-react';
import { Button } from '../../components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle, CardFooter } from '../../components/ui/card';
import { Input } from '../../components/ui/input';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '../../components/ui/table';
import { Badge } from '../../components/ui/badge';
import { Switch } from '../../components/ui/switch';
import { Label } from '../../components/ui/label';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger
} from '../../components/ui/dropdown-menu';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '../../components/ui/dialog';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '../../components/ui/select';

/**
 * Page de gestion des devises
 * Cette page permet de gérer les devises utilisées dans l'application
 */
const CurrenciesSettings: React.FC = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [isAddCurrencyDialogOpen, setIsAddCurrencyDialogOpen] = useState(false);
  const [editingCurrency, setEditingCurrency] = useState<string | null>(null);
  
  // État pour le formulaire d'ajout de devise
  const [newCurrency, setNewCurrency] = useState({
    name: '',
    symbol: '',
    code: '',
    rate: '1.0',
    position: 'after',
    decimal_places: '2',
    rounding: '0.01',
    active: true
  });
  
  // Données simulées pour les devises (basées sur Odoo)
  const [currencies, setCurrencies] = useState([
    { 
      id: '1', 
      name: 'Euro', 
      symbol: '€', 
      code: 'EUR',
      rate: 1.0,
      position: 'after',
      decimal_places: 2,
      rounding: 0.01,
      active: true
    },
    { 
      id: '2', 
      name: 'Dollar américain', 
      symbol: '$', 
      code: 'USD',
      rate: 1.08,
      position: 'before',
      decimal_places: 2,
      rounding: 0.01,
      active: true
    },
    { 
      id: '3', 
      name: 'Livre sterling', 
      symbol: '£', 
      code: 'GBP',
      rate: 0.85,
      position: 'before',
      decimal_places: 2,
      rounding: 0.01,
      active: true
    },
    { 
      id: '4', 
      name: 'Franc suisse', 
      symbol: 'CHF', 
      code: 'CHF',
      rate: 0.96,
      position: 'after',
      decimal_places: 2,
      rounding: 0.01,
      active: true
    },
    { 
      id: '5', 
      name: 'Yen japonais', 
      symbol: '¥', 
      code: 'JPY',
      rate: 160.45,
      position: 'before',
      decimal_places: 0,
      rounding: 1.0,
      active: false
    }
  ]);
  
  // Filtrer les devises en fonction du terme de recherche
  const filteredCurrencies = currencies.filter(currency => 
    currency.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    currency.code.toLowerCase().includes(searchTerm.toLowerCase()) ||
    currency.symbol.toLowerCase().includes(searchTerm.toLowerCase())
  );
  
  // Gérer les changements dans le formulaire d'ajout de devise
  const handleNewCurrencyChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setNewCurrency(prev => ({ ...prev, [name]: value }));
  };
  
  // Gérer les changements de select dans le formulaire d'ajout de devise
  const handleNewCurrencySelectChange = (name: string, value: string) => {
    setNewCurrency(prev => ({ ...prev, [name]: value }));
  };
  
  // Gérer les changements de switch dans le formulaire d'ajout de devise
  const handleNewCurrencySwitchChange = (name: string, checked: boolean) => {
    setNewCurrency(prev => ({ ...prev, [name]: checked }));
  };
  
  // Ajouter une nouvelle devise
  const handleAddCurrency = () => {
    const newId = (currencies.length + 1).toString();
    const newCurrencyWithId = {
      id: newId,
      name: newCurrency.name,
      symbol: newCurrency.symbol,
      code: newCurrency.code,
      rate: parseFloat(newCurrency.rate),
      position: newCurrency.position,
      decimal_places: parseInt(newCurrency.decimal_places),
      rounding: parseFloat(newCurrency.rounding),
      active: newCurrency.active
    };
    
    setCurrencies([...currencies, newCurrencyWithId]);
    setNewCurrency({
      name: '',
      symbol: '',
      code: '',
      rate: '1.0',
      position: 'after',
      decimal_places: '2',
      rounding: '0.01',
      active: true
    });
    setIsAddCurrencyDialogOpen(false);
  };
  
  // Activer/désactiver une devise
  const toggleCurrencyStatus = (currencyId: string) => {
    setCurrencies(currencies.map(currency => 
      currency.id === currencyId ? { ...currency, active: !currency.active } : currency
    ));
  };
  
  // Supprimer une devise
  const deleteCurrency = (currencyId: string) => {
    if (window.confirm('Êtes-vous sûr de vouloir supprimer cette devise ?')) {
      setCurrencies(currencies.filter(currency => currency.id !== currencyId));
    }
  };
  
  // Commencer l'édition d'une devise
  const startEditingCurrency = (currencyId: string) => {
    setEditingCurrency(currencyId);
  };
  
  // Terminer l'édition d'une devise
  const finishEditingCurrency = () => {
    setEditingCurrency(null);
  };
  
  // Mettre à jour une devise en cours d'édition
  const updateCurrency = (currencyId: string, field: string, value: string | number | boolean) => {
    setCurrencies(currencies.map(currency => 
      currency.id === currencyId ? { ...currency, [field]: value } : currency
    ));
  };
  
  return (
    <div className="container mx-auto px-4 py-6">
      {/* En-tête */}
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-8 gap-4">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Devises</h1>
          <p className="text-muted-foreground mt-1">Gestion des devises utilisées dans l'application</p>
        </div>
        <Dialog open={isAddCurrencyDialogOpen} onOpenChange={setIsAddCurrencyDialogOpen}>
          <DialogTrigger asChild>
            <Button size="sm" className="flex items-center gap-2">
              <Plus size={16} />
              Nouvelle devise
            </Button>
          </DialogTrigger>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>Ajouter une nouvelle devise</DialogTitle>
              <DialogDescription>
                Créez une nouvelle devise pour l'utiliser dans l'application.
              </DialogDescription>
            </DialogHeader>
            <div className="space-y-4 py-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="name">Nom <span className="text-destructive">*</span></Label>
                  <Input
                    id="name"
                    name="name"
                    value={newCurrency.name}
                    onChange={handleNewCurrencyChange}
                    placeholder="Euro"
                    required
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="code">Code <span className="text-destructive">*</span></Label>
                  <Input
                    id="code"
                    name="code"
                    value={newCurrency.code}
                    onChange={handleNewCurrencyChange}
                    placeholder="EUR"
                    required
                  />
                </div>
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="symbol">Symbole <span className="text-destructive">*</span></Label>
                  <Input
                    id="symbol"
                    name="symbol"
                    value={newCurrency.symbol}
                    onChange={handleNewCurrencyChange}
                    placeholder="€"
                    required
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="rate">Taux de change <span className="text-destructive">*</span></Label>
                  <Input
                    id="rate"
                    name="rate"
                    type="number"
                    step="0.000001"
                    value={newCurrency.rate}
                    onChange={handleNewCurrencyChange}
                    placeholder="1.0"
                    required
                  />
                </div>
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="decimal_places">Décimales</Label>
                  <Input
                    id="decimal_places"
                    name="decimal_places"
                    type="number"
                    min="0"
                    max="6"
                    value={newCurrency.decimal_places}
                    onChange={handleNewCurrencyChange}
                    placeholder="2"
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="rounding">Arrondi</Label>
                  <Input
                    id="rounding"
                    name="rounding"
                    type="number"
                    step="0.01"
                    value={newCurrency.rounding}
                    onChange={handleNewCurrencyChange}
                    placeholder="0.01"
                  />
                </div>
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="position">Position du symbole</Label>
                <Select
                  value={newCurrency.position}
                  onValueChange={(value) => handleNewCurrencySelectChange('position', value)}
                >
                  <SelectTrigger>
                    <SelectValue placeholder="Sélectionner une position" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="before">Avant le montant ($ 100)</SelectItem>
                    <SelectItem value="after">Après le montant (100 €)</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              
              <div className="flex items-center space-x-2">
                <Switch
                  id="active"
                  checked={newCurrency.active}
                  onCheckedChange={(checked) => handleNewCurrencySwitchChange('active', checked)}
                />
                <Label htmlFor="active">Devise active</Label>
              </div>
            </div>
            <DialogFooter>
              <Button variant="outline" onClick={() => setIsAddCurrencyDialogOpen(false)}>
                Annuler
              </Button>
              <Button onClick={handleAddCurrency}>
                Ajouter
              </Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>
      </div>

      {/* Contenu principal */}
      <Card>
        <CardHeader>
          <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
            <div>
              <CardTitle>Devises</CardTitle>
              <CardDescription>Liste des devises disponibles dans l'application</CardDescription>
            </div>
            <div className="relative w-full md:w-64">
              <Search className="absolute left-2 top-2.5 h-4 w-4 text-muted-foreground" />
              <Input
                placeholder="Rechercher..."
                className="pl-8"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </div>
          </div>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Nom</TableHead>
                <TableHead>Code</TableHead>
                <TableHead>Symbole</TableHead>
                <TableHead>
                  <div className="flex items-center">
                    Taux
                    <ArrowUpDown className="ml-1 h-4 w-4" />
                  </div>
                </TableHead>
                <TableHead>Position</TableHead>
                <TableHead>Décimales</TableHead>
                <TableHead>Statut</TableHead>
                <TableHead className="text-right">Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {filteredCurrencies.length > 0 ? (
                filteredCurrencies.map(currency => (
                  <TableRow key={currency.id}>
                    <TableCell className="font-medium">
                      {editingCurrency === currency.id ? (
                        <Input
                          value={currency.name}
                          onChange={(e) => updateCurrency(currency.id, 'name', e.target.value)}
                          className="w-full"
                        />
                      ) : (
                        currency.name
                      )}
                    </TableCell>
                    <TableCell>
                      {editingCurrency === currency.id ? (
                        <Input
                          value={currency.code}
                          onChange={(e) => updateCurrency(currency.id, 'code', e.target.value)}
                          className="w-full"
                        />
                      ) : (
                        currency.code
                      )}
                    </TableCell>
                    <TableCell>
                      {editingCurrency === currency.id ? (
                        <Input
                          value={currency.symbol}
                          onChange={(e) => updateCurrency(currency.id, 'symbol', e.target.value)}
                          className="w-full"
                        />
                      ) : (
                        currency.symbol
                      )}
                    </TableCell>
                    <TableCell>
                      {editingCurrency === currency.id ? (
                        <Input
                          type="number"
                          step="0.000001"
                          value={currency.rate}
                          onChange={(e) => updateCurrency(currency.id, 'rate', parseFloat(e.target.value))}
                          className="w-full"
                        />
                      ) : (
                        currency.rate
                      )}
                    </TableCell>
                    <TableCell>
                      {editingCurrency === currency.id ? (
                        <Select
                          value={currency.position}
                          onValueChange={(value) => updateCurrency(currency.id, 'position', value)}
                        >
                          <SelectTrigger>
                            <SelectValue />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="before">Avant</SelectItem>
                            <SelectItem value="after">Après</SelectItem>
                          </SelectContent>
                        </Select>
                      ) : (
                        currency.position === 'before' ? 'Avant' : 'Après'
                      )}
                    </TableCell>
                    <TableCell>
                      {editingCurrency === currency.id ? (
                        <Input
                          type="number"
                          min="0"
                          max="6"
                          value={currency.decimal_places}
                          onChange={(e) => updateCurrency(currency.id, 'decimal_places', parseInt(e.target.value))}
                          className="w-full"
                        />
                      ) : (
                        currency.decimal_places
                      )}
                    </TableCell>
                    <TableCell>
                      <Badge variant={currency.active ? "default" : "outline"} className={currency.active ? "bg-green-500" : ""}>
                        {currency.active ? "Active" : "Inactive"}
                      </Badge>
                    </TableCell>
                    <TableCell className="text-right">
                      {editingCurrency === currency.id ? (
                        <div className="flex justify-end gap-2">
                          <Button variant="ghost" size="sm" onClick={finishEditingCurrency}>
                            <X className="h-4 w-4" />
                          </Button>
                          <Button variant="ghost" size="sm" onClick={finishEditingCurrency}>
                            <Check className="h-4 w-4" />
                          </Button>
                        </div>
                      ) : (
                        <DropdownMenu>
                          <DropdownMenuTrigger asChild>
                            <Button variant="ghost" size="sm">
                              <MoreHorizontal className="h-4 w-4" />
                              <span className="sr-only">Menu</span>
                            </Button>
                          </DropdownMenuTrigger>
                          <DropdownMenuContent align="end">
                            <DropdownMenuLabel>Actions</DropdownMenuLabel>
                            <DropdownMenuItem className="flex items-center gap-2" onClick={() => startEditingCurrency(currency.id)}>
                              <Edit className="h-4 w-4" />
                              <span>Modifier</span>
                            </DropdownMenuItem>
                            <DropdownMenuSeparator />
                            <DropdownMenuItem
                              className="flex items-center gap-2"
                              onClick={() => toggleCurrencyStatus(currency.id)}
                            >
                              {currency.active ? (
                                <>
                                  <X className="h-4 w-4" />
                                  <span>Désactiver</span>
                                </>
                              ) : (
                                <>
                                  <Check className="h-4 w-4" />
                                  <span>Activer</span>
                                </>
                              )}
                            </DropdownMenuItem>
                            <DropdownMenuSeparator />
                            <DropdownMenuItem
                              className="flex items-center gap-2 text-destructive focus:text-destructive"
                              onClick={() => deleteCurrency(currency.id)}
                            >
                              <Trash2 className="h-4 w-4" />
                              <span>Supprimer</span>
                            </DropdownMenuItem>
                          </DropdownMenuContent>
                        </DropdownMenu>
                      )}
                    </TableCell>
                  </TableRow>
                ))
              ) : (
                <TableRow>
                  <TableCell colSpan={8} className="text-center py-4 text-muted-foreground">
                    Aucune devise trouvée
                  </TableCell>
                </TableRow>
              )}
            </TableBody>
          </Table>
        </CardContent>
        <CardFooter className="flex justify-between items-center">
          <div className="text-sm text-muted-foreground">
            {filteredCurrencies.length} devise{filteredCurrencies.length !== 1 ? 's' : ''} au total
          </div>
        </CardFooter>
      </Card>
    </div>
  );
};

export default CurrenciesSettings;
