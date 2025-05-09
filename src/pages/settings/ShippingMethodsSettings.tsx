import React, { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '../../components/ui/card';
import { Button } from '../../components/ui/button';
import { Input } from '../../components/ui/input';
import { Label } from '../../components/ui/label';
import { Switch } from '../../components/ui/switch';
import { Badge } from '../../components/ui/badge';
import { Truck, Plus, Trash2, Package } from 'lucide-react';

interface ShippingMethod {
  id: string;
  name: string;
  carrier: string;
  deliveryTime: string;
  price: string;
  isActive: boolean;
}

const ShippingMethodsSettings: React.FC = () => {
  const [methods, setMethods] = useState<ShippingMethod[]>([
    {
      id: '1',
      name: 'Standard',
      carrier: 'La Poste',
      deliveryTime: '2-5 jours',
      price: '5.99€',
      isActive: true
    },
    {
      id: '2',
      name: 'Express',
      carrier: 'UPS',
      deliveryTime: '24h',
      price: '12.99€',
      isActive: true
    },
    {
      id: '3',
      name: 'Point Relais',
      carrier: 'Mondial Relay',
      deliveryTime: '3-7 jours',
      price: '4.99€',
      isActive: false
    }
  ]);

  const [newMethod, setNewMethod] = useState({
    name: '',
    carrier: '',
    deliveryTime: '',
    price: ''
  });

  const handleAddMethod = () => {
    if (!newMethod.name || !newMethod.carrier || !newMethod.deliveryTime || !newMethod.price) return;
    
    const method: ShippingMethod = {
      id: String(methods.length + 1),
      name: newMethod.name,
      carrier: newMethod.carrier,
      deliveryTime: newMethod.deliveryTime,
      price: newMethod.price,
      isActive: true
    };

    setMethods([...methods, method]);
    setNewMethod({
      name: '',
      carrier: '',
      deliveryTime: '',
      price: ''
    });
  };

  const handleToggleMethod = (id: string) => {
    setMethods(methods.map(method => 
      method.id === id ? { ...method, isActive: !method.isActive } : method
    ));
  };

  const handleDeleteMethod = (id: string) => {
    setMethods(methods.filter(method => method.id !== id));
  };

  return (
    <div className="p-6">
      {/* En-tête */}
      <div className="flex items-center gap-3 mb-6">
        <Truck className="h-8 w-8 text-ivory-orange" />
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Méthodes d'expédition</h1>
          <p className="text-muted-foreground mt-1">Configurez les options de livraison disponibles</p>
        </div>
      </div>

      {/* Formulaire d'ajout */}
      <Card className="mb-6">
        <CardHeader>
          <CardTitle>Ajouter une méthode</CardTitle>
          <CardDescription>Configurez une nouvelle méthode d'expédition</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid gap-4">
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="name" className="text-right">
                Nom
              </Label>
              <Input
                id="name"
                value={newMethod.name}
                onChange={(e) => setNewMethod({...newMethod, name: e.target.value})}
                className="col-span-3"
                placeholder="Ex: Livraison Express"
              />
            </div>

            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="carrier" className="text-right">
                Transporteur
              </Label>
              <Input
                id="carrier"
                value={newMethod.carrier}
                onChange={(e) => setNewMethod({...newMethod, carrier: e.target.value})}
                className="col-span-3"
                placeholder="Ex: UPS, La Poste..."
              />
            </div>

            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="deliveryTime" className="text-right">
                Délai
              </Label>
              <Input
                id="deliveryTime"
                value={newMethod.deliveryTime}
                onChange={(e) => setNewMethod({...newMethod, deliveryTime: e.target.value})}
                className="col-span-3"
                placeholder="Ex: 2-5 jours"
              />
            </div>

            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="price" className="text-right">
                Prix
              </Label>
              <Input
                id="price"
                value={newMethod.price}
                onChange={(e) => setNewMethod({...newMethod, price: e.target.value})}
                className="col-span-3"
                placeholder="Ex: 5.99€"
              />
            </div>

            <div className="flex justify-end">
              <Button 
                className="bg-ivory-orange hover:bg-ivory-orange/90"
                onClick={handleAddMethod}
                disabled={!newMethod.name || !newMethod.carrier || !newMethod.deliveryTime || !newMethod.price}
              >
                <Plus className="h-4 w-4 mr-2" />
                Ajouter la méthode
              </Button>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Liste des méthodes */}
      <Card>
        <CardHeader>
          <CardTitle>Méthodes disponibles</CardTitle>
          <CardDescription>Liste des options d'expédition configurées</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {methods.map((method) => (
              <div key={method.id} className="flex items-center justify-between p-4 border rounded-lg">
                <div className="flex items-center gap-4">
                  <Package className="h-6 w-6 text-muted-foreground" />
                  <div>
                    <div className="font-medium">{method.name}</div>
                    <div className="text-sm text-muted-foreground">
                      {method.carrier} • {method.deliveryTime} • {method.price}
                    </div>
                  </div>
                </div>
                <div className="flex items-center gap-4">
                  <div className="flex items-center gap-2">
                    <Switch
                      checked={method.isActive}
                      onCheckedChange={() => handleToggleMethod(method.id)}
                    />
                    <Badge variant={method.isActive ? 'default' : 'outline'}>
                      {method.isActive ? 'Actif' : 'Inactif'}
                    </Badge>
                  </div>
                  <Button 
                    variant="ghost" 
                    size="icon"
                    onClick={() => handleDeleteMethod(method.id)}
                  >
                    <Trash2 className="h-4 w-4" />
                  </Button>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default ShippingMethodsSettings;
