import React, { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '../../components/ui/card';
import { Button } from '../../components/ui/button';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '../../components/ui/table';
import { Badge } from '../../components/ui/badge';
import { Switch } from '../../components/ui/switch';
import { CreditCard, Plus, Settings, Trash2 } from 'lucide-react';

interface PaymentProvider {
  id: string;
  name: string;
  type: string;
  isActive: boolean;
  fees: string;
}

const PaymentProvidersSettings: React.FC = () => {
  const [providers, setProviders] = useState<PaymentProvider[]>([
    {
      id: '1',
      name: 'Stripe',
      type: 'Carte bancaire',
      isActive: true,
      fees: '1.4% + 0.25€'
    },
    {
      id: '2',
      name: 'PayPal',
      type: 'Portefeuille électronique',
      isActive: false,
      fees: '2.9% + 0.30€'
    },
    {
      id: '3',
      name: 'Virement bancaire',
      type: 'Virement',
      isActive: true,
      fees: '0%'
    }
  ]);

  const handleToggleProvider = (id: string) => {
    setProviders(providers.map(provider => 
      provider.id === id ? { ...provider, isActive: !provider.isActive } : provider
    ));
  };

  const handleDeleteProvider = (id: string) => {
    setProviders(providers.filter(provider => provider.id !== id));
  };

  return (
    <div className="p-6">
      {/* En-tête */}
      <div className="flex items-center gap-3 mb-6">
        <CreditCard className="h-8 w-8 text-ivory-orange" />
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Fournisseurs de paiement</h1>
          <p className="text-muted-foreground mt-1">Configurez les méthodes de paiement disponibles</p>
        </div>
      </div>

      {/* Carte principale */}
      <Card>
        <CardHeader className="flex flex-row items-center justify-between">
          <div>
            <CardTitle>Fournisseurs configurés</CardTitle>
            <CardDescription>Liste des méthodes de paiement disponibles</CardDescription>
          </div>
          <Button className="bg-ivory-orange hover:bg-ivory-orange/90">
            <Plus className="h-4 w-4 mr-2" />
            Ajouter un fournisseur
          </Button>
        </CardHeader>
        <CardContent>
          <div className="rounded-md border">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Nom</TableHead>
                  <TableHead>Type</TableHead>
                  <TableHead>Frais</TableHead>
                  <TableHead>Statut</TableHead>
                  <TableHead className="text-right">Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {providers.map((provider) => (
                  <TableRow key={provider.id}>
                    <TableCell className="font-medium">{provider.name}</TableCell>
                    <TableCell>
                      <Badge variant="outline">{provider.type}</Badge>
                    </TableCell>
                    <TableCell>{provider.fees}</TableCell>
                    <TableCell>
                      <div className="flex items-center gap-2">
                        <Switch
                          checked={provider.isActive}
                          onCheckedChange={() => handleToggleProvider(provider.id)}
                        />
                        <span className="text-sm">
                          {provider.isActive ? 'Actif' : 'Inactif'}
                        </span>
                      </div>
                    </TableCell>
                    <TableCell className="text-right">
                      <div className="flex justify-end gap-2">
                        <Button variant="ghost" size="icon">
                          <Settings className="h-4 w-4" />
                        </Button>
                        <Button 
                          variant="ghost" 
                          size="icon"
                          onClick={() => handleDeleteProvider(provider.id)}
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

export default PaymentProvidersSettings;
