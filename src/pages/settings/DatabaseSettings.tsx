import React, { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '../../components/ui/card';
import { Button } from '../../components/ui/button';
import { Input } from '../../components/ui/input';
import { Label } from '../../components/ui/label';
import { Database, HardDrive, Server, RefreshCw, Archive } from 'lucide-react';

const DatabaseSettings: React.FC = () => {
  const [connection, setConnection] = useState({
    host: 'localhost',
    port: '5432',
    name: 'erp_db',
    user: 'admin',
    password: ''
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setConnection(prev => ({ ...prev, [name]: value }));
  };

  const handleTestConnection = () => {
    // TODO: Implémenter la logique de test de connexion
    console.log('Test connection:', connection);
  };

  const handleSave = () => {
    // TODO: Implémenter la sauvegarde des paramètres
    console.log('Save connection:', connection);
  };

  return (
    <div className="p-6">
      {/* En-tête */}
      <div className="flex items-center gap-3 mb-6">
        <Database className="h-8 w-8 text-ivory-orange" />
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Base de données</h1>
          <p className="text-muted-foreground mt-1">Configurez la connexion à votre base de données</p>
        </div>
      </div>

      {/* Carte principale */}
      <Card>
        <CardHeader>
          <CardTitle>Paramètres de connexion</CardTitle>
          <CardDescription>Configurez les informations de connexion à votre base de données PostgreSQL</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid gap-4">
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="host" className="text-right">Hôte</Label>
              <Input
                id="host"
                name="host"
                value={connection.host}
                onChange={handleChange}
                className="col-span-3"
              />
            </div>
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="port" className="text-right">Port</Label>
              <Input
                id="port"
                name="port"
                value={connection.port}
                onChange={handleChange}
                className="col-span-3"
              />
            </div>
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="name" className="text-right">Nom de la base</Label>
              <Input
                id="name"
                name="name"
                value={connection.name}
                onChange={handleChange}
                className="col-span-3"
              />
            </div>
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="user" className="text-right">Utilisateur</Label>
              <Input
                id="user"
                name="user"
                value={connection.user}
                onChange={handleChange}
                className="col-span-3"
              />
            </div>
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="password" className="text-right">Mot de passe</Label>
              <Input
                id="password"
                name="password"
                type="password"
                value={connection.password}
                onChange={handleChange}
                className="col-span-3"
              />
            </div>
          </div>

          <div className="flex justify-end gap-2 mt-6">
            <Button variant="outline" onClick={handleTestConnection}>
              <Server className="h-4 w-4 mr-2" />
              Tester la connexion
            </Button>
            <Button className="bg-ivory-orange hover:bg-ivory-orange/90" onClick={handleSave}>
              <HardDrive className="h-4 w-4 mr-2" />
              Sauvegarder
            </Button>
          </div>
        </CardContent>
      </Card>

      {/* Carte pour les opérations de base de données */}
      <Card className="mt-6">
        <CardHeader>
          <CardTitle>Opérations</CardTitle>
          <CardDescription>Effectuez des opérations avancées sur la base de données</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="flex gap-4">
            <Button variant="outline">
              <RefreshCw className="h-4 w-4 mr-2" />
              Réinitialiser le cache
            </Button>
            <Button variant="outline">
              <Archive className="h-4 w-4 mr-2" />
              Sauvegarde
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default DatabaseSettings;
