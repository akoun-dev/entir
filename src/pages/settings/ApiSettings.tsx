import React, { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '../../components/ui/card';
import { Button } from '../../components/ui/button';
import { Input } from '../../components/ui/input';
import { Label } from '../../components/ui/label';
import { Switch } from '../../components/ui/switch';
import { Badge } from '../../components/ui/badge';
import { Code, Key, RefreshCw, Plus } from 'lucide-react';

interface ApiKey {
  id: string;
  name: string;
  key: string;
  permissions: string[];
  active: boolean;
  createdAt: string;
}

const ApiSettings: React.FC = () => {
  const [apiKeys, setApiKeys] = useState<ApiKey[]>([
    {
      id: '1',
      name: 'Application mobile',
      key: 'sk_live_*****1234',
      permissions: ['read', 'write'],
      active: true,
      createdAt: '2023-05-15'
    },
    {
      id: '2',
      name: 'Intégration CRM',
      key: 'sk_test_*****5678',
      permissions: ['read'],
      active: false,
      createdAt: '2023-06-20'
    }
  ]);

  const [newKeyName, setNewKeyName] = useState('');

  const handleToggleKey = (id: string) => {
    setApiKeys(apiKeys.map(key => 
      key.id === id ? { ...key, active: !key.active } : key
    ));
  };

  const handleGenerateKey = () => {
    if (!newKeyName) return;
    
    const newKey: ApiKey = {
      id: String(apiKeys.length + 1),
      name: newKeyName,
      key: 'sk_new_' + Math.random().toString(36).substring(2, 10),
      permissions: ['read'],
      active: true,
      createdAt: new Date().toISOString().split('T')[0]
    };

    setApiKeys([...apiKeys, newKey]);
    setNewKeyName('');
  };

  return (
    <div className="p-6">
      {/* En-tête */}
      <div className="flex items-center gap-3 mb-6">
        <Code className="h-8 w-8 text-ivory-orange" />
        <div>
          <h1 className="text-3xl font-bold tracking-tight">API & Intégrations</h1>
          <p className="text-muted-foreground mt-1">Gérez les clés API et les intégrations externes</p>
        </div>
      </div>

      {/* Carte pour générer de nouvelles clés */}
      <Card className="mb-6">
        <CardHeader>
          <CardTitle>Générer une nouvelle clé API</CardTitle>
          <CardDescription>Créez des clés pour autoriser l'accès à votre API</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="flex gap-4">
            <div className="flex-1">
              <Input
                placeholder="Nom de la clé (ex: Application mobile)"
                value={newKeyName}
                onChange={(e) => setNewKeyName(e.target.value)}
              />
            </div>
            <Button 
              className="bg-ivory-orange hover:bg-ivory-orange/90"
              onClick={handleGenerateKey}
              disabled={!newKeyName}
            >
              <Key className="h-4 w-4 mr-2" />
              Générer
            </Button>
          </div>
        </CardContent>
      </Card>

      {/* Carte pour la liste des clés */}
      <Card>
        <CardHeader>
          <CardTitle>Clés API existantes</CardTitle>
          <CardDescription>Gérez les clés existantes et leurs permissions</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {apiKeys.map((key) => (
              <div key={key.id} className="flex items-center justify-between p-4 border rounded-lg">
                <div>
                  <div className="font-medium">{key.name}</div>
                  <div className="text-sm text-muted-foreground">{key.key}</div>
                  <div className="flex gap-2 mt-2">
                    {key.permissions.map((perm, i) => (
                      <Badge key={i} variant="outline">{perm}</Badge>
                    ))}
                  </div>
                </div>
                <div className="flex items-center gap-4">
                  <div className="flex items-center gap-2">
                    <Switch
                      checked={key.active}
                      onCheckedChange={() => handleToggleKey(key.id)}
                    />
                    <span className="text-sm">
                      {key.active ? 'Active' : 'Inactive'}
                    </span>
                  </div>
                  <Button variant="ghost" size="icon">
                    <RefreshCw className="h-4 w-4" />
                  </Button>
                  <Button variant="ghost" size="icon">
                    <Plus className="h-4 w-4" />
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

export default ApiSettings;
