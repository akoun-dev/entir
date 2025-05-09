import React, { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '../../components/ui/card';
import { Button } from '../../components/ui/button';
import { Input } from '../../components/ui/input';
import { Badge } from '../../components/ui/badge';
import { Search, Package, Download, RefreshCw } from 'lucide-react';

interface App {
  id: string;
  name: string;
  description: string;
  version: string;
  installed: boolean;
  rating: number;
  category: string;
}

const AppsStoreSettings: React.FC = () => {
  const [apps, setApps] = useState<App[]>([
    {
      id: '1',
      name: 'Module CRM',
      description: 'Gestion complète de la relation client',
      version: '1.2.0',
      installed: true,
      rating: 4.5,
      category: 'CRM'
    },
    {
      id: '2',
      name: 'Module Comptabilité',
      description: 'Gestion financière et comptable',
      version: '2.1.3',
      installed: false,
      rating: 4.2,
      category: 'Finance'
    },
    {
      id: '3',
      name: 'Module RH',
      description: 'Gestion des ressources humaines',
      version: '1.5.2',
      installed: true,
      rating: 4.7,
      category: 'RH'
    }
  ]);

  const [searchTerm, setSearchTerm] = useState('');

  const handleInstall = (id: string) => {
    setApps(apps.map(app => 
      app.id === id ? { ...app, installed: true } : app
    ));
  };

  const handleUpdate = (id: string) => {
    // TODO: Implémenter la logique de mise à jour
    console.log('Update app:', id);
  };

  const filteredApps = apps.filter(app => 
    app.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    app.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
    app.category.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="p-6">
      {/* En-tête */}
      <div className="flex items-center gap-3 mb-6">
        <Package className="h-8 w-8 text-ivory-orange" />
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Magasin d'applications</h1>
          <p className="text-muted-foreground mt-1">Installez et gérez les modules complémentaires</p>
        </div>
      </div>

      {/* Barre de recherche */}
      <div className="relative mb-6">
        <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
        <Input
          placeholder="Rechercher des applications..."
          className="pl-10"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
      </div>

      {/* Liste des applications */}
      <div className="grid gap-4">
        {filteredApps.map((app) => (
          <Card key={app.id}>
            <CardHeader className="flex flex-row items-start justify-between">
              <div>
                <CardTitle>{app.name}</CardTitle>
                <CardDescription>{app.description}</CardDescription>
              </div>
              <Badge variant="outline">{app.category}</Badge>
            </CardHeader>
            <CardContent>
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-4">
                  <div className="text-sm text-muted-foreground">
                    Version: {app.version}
                  </div>
                  <div className="flex items-center gap-1">
                    {[...Array(5)].map((_, i) => (
                      <span key={i} className={`text-sm ${i < Math.floor(app.rating) ? 'text-yellow-500' : 'text-muted-foreground'}`}>
                        ★
                      </span>
                    ))}
                  </div>
                </div>
                {app.installed ? (
                  <Button variant="outline" onClick={() => handleUpdate(app.id)}>
                    <RefreshCw className="h-4 w-4 mr-2" />
                    Mettre à jour
                  </Button>
                ) : (
                  <Button className="bg-ivory-orange hover:bg-ivory-orange/90" onClick={() => handleInstall(app.id)}>
                    <Download className="h-4 w-4 mr-2" />
                    Installer
                  </Button>
                )}
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
};

export default AppsStoreSettings;
