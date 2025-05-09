import React, { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '../../components/ui/card';
import { Button } from '../../components/ui/button';
import { Input } from '../../components/ui/input';
import { Label } from '../../components/ui/label';
import { Switch } from '../../components/ui/switch';
import { Badge } from '../../components/ui/badge';
import { Globe, Plus, Settings, Trash2 } from 'lucide-react';

interface ExternalService {
  id: string;
  name: string;
  type: string;
  apiKey: string;
  isActive: boolean;
}

const ExternalServicesSettings: React.FC = () => {
  const [services, setServices] = useState<ExternalService[]>([
    {
      id: '1',
      name: 'Google Maps',
      type: 'Cartographie',
      apiKey: '••••••••••••••••',
      isActive: true
    },
    {
      id: '2',
      name: 'SendGrid',
      type: 'Email',
      apiKey: '••••••••••••••••',
      isActive: false
    },
    {
      id: '3',
      name: 'Stripe',
      type: 'Paiement',
      apiKey: '••••••••••••••••',
      isActive: true
    }
  ]);

  const [newService, setNewService] = useState({
    name: '',
    type: '',
    apiKey: ''
  });

  const handleAddService = () => {
    if (!newService.name || !newService.type || !newService.apiKey) return;
    
    const service: ExternalService = {
      id: String(services.length + 1),
      name: newService.name,
      type: newService.type,
      apiKey: newService.apiKey,
      isActive: true
    };

    setServices([...services, service]);
    setNewService({
      name: '',
      type: '',
      apiKey: ''
    });
  };

  const handleToggleService = (id: string) => {
    setServices(services.map(service => 
      service.id === id ? { ...service, isActive: !service.isActive } : service
    ));
  };

  const handleDeleteService = (id: string) => {
    setServices(services.filter(service => service.id !== id));
  };

  return (
    <div className="p-6">
      {/* En-tête */}
      <div className="flex items-center gap-3 mb-6">
        <Globe className="h-8 w-8 text-ivory-orange" />
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Services externes</h1>
          <p className="text-muted-foreground mt-1">Configurez les intégrations avec des services tiers</p>
        </div>
      </div>

      {/* Formulaire d'ajout */}
      <Card className="mb-6">
        <CardHeader>
          <CardTitle>Ajouter un service</CardTitle>
          <CardDescription>Configurez une nouvelle intégration de service externe</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid gap-4">
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="name" className="text-right">
                Nom
              </Label>
              <Input
                id="name"
                value={newService.name}
                onChange={(e) => setNewService({...newService, name: e.target.value})}
                className="col-span-3"
                placeholder="Ex: Google Maps"
              />
            </div>

            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="type" className="text-right">
                Type
              </Label>
              <Input
                id="type"
                value={newService.type}
                onChange={(e) => setNewService({...newService, type: e.target.value})}
                className="col-span-3"
                placeholder="Ex: Cartographie"
              />
            </div>

            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="apiKey" className="text-right">
                Clé API
              </Label>
              <Input
                id="apiKey"
                type="password"
                value={newService.apiKey}
                onChange={(e) => setNewService({...newService, apiKey: e.target.value})}
                className="col-span-3"
                placeholder="Saisissez la clé API"
              />
            </div>

            <div className="flex justify-end">
              <Button 
                className="bg-ivory-orange hover:bg-ivory-orange/90"
                onClick={handleAddService}
                disabled={!newService.name || !newService.type || !newService.apiKey}
              >
                <Plus className="h-4 w-4 mr-2" />
                Ajouter le service
              </Button>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Liste des services */}
      <Card>
        <CardHeader>
          <CardTitle>Services configurés</CardTitle>
          <CardDescription>Liste des intégrations avec des services externes</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {services.map((service) => (
              <div key={service.id} className="flex items-center justify-between p-4 border rounded-lg">
                <div>
                  <div className="font-medium">{service.name}</div>
                  <div className="text-sm text-muted-foreground">
                    <Badge variant="outline">{service.type}</Badge> • Clé API: {service.apiKey}
                  </div>
                </div>
                <div className="flex items-center gap-4">
                  <div className="flex items-center gap-2">
                    <Switch
                      checked={service.isActive}
                      onCheckedChange={() => handleToggleService(service.id)}
                    />
                    <Badge variant={service.isActive ? 'default' : 'outline'}>
                      {service.isActive ? 'Actif' : 'Inactif'}
                    </Badge>
                  </div>
                  <Button variant="ghost" size="icon">
                    <Settings className="h-4 w-4" />
                  </Button>
                  <Button 
                    variant="ghost" 
                    size="icon"
                    onClick={() => handleDeleteService(service.id)}
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

export default ExternalServicesSettings;
