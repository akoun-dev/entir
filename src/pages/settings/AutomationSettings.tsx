import React, { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '../../components/ui/card';
import { Button } from '../../components/ui/button';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '../../components/ui/table';
import { Badge } from '../../components/ui/badge';
import { Switch } from '../../components/ui/switch';
import { Zap, Plus, Trash2, Pencil } from 'lucide-react';

interface AutomationRule {
  id: string;
  name: string;
  trigger: string;
  action: string;
  enabled: boolean;
}

const AutomationSettings: React.FC = () => {
  const [rules, setRules] = useState<AutomationRule[]>([
    {
      id: '1',
      name: 'Sauvegarde quotidienne',
      trigger: 'Tous les jours à 02:00',
      action: 'Sauvegarde de la base de données',
      enabled: true
    },
    {
      id: '2',
      name: 'Nettoyage des logs',
      trigger: 'Tous les lundis à 03:00',
      action: 'Suppression des logs vieux de 30 jours',
      enabled: true
    },
    {
      id: '3',
      name: 'Notification de fin de mois',
      trigger: 'Dernier jour du mois à 18:00',
      action: 'Envoyer un rapport mensuel',
      enabled: false
    }
  ]);

  const handleToggleRule = (id: string) => {
    setRules(rules.map(rule => 
      rule.id === id ? { ...rule, enabled: !rule.enabled } : rule
    ));
  };

  const handleDeleteRule = (id: string) => {
    setRules(rules.filter(rule => rule.id !== id));
  };

  return (
    <div className="p-6">
      {/* En-tête */}
      <div className="flex items-center gap-3 mb-6">
        <Zap className="h-8 w-8 text-ivory-orange" />
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Actions automatisées</h1>
          <p className="text-muted-foreground mt-1">Configurez les règles d'automatisation de votre application</p>
        </div>
      </div>

      {/* Carte principale */}
      <Card>
        <CardHeader className="flex flex-row items-center justify-between">
          <div>
            <CardTitle>Règles d'automatisation</CardTitle>
            <CardDescription>Créez et gérez les règles qui automatisent vos processus</CardDescription>
          </div>
          <Button className="bg-ivory-orange hover:bg-ivory-orange/90">
            <Plus className="h-4 w-4 mr-2" />
            Ajouter une règle
          </Button>
        </CardHeader>
        <CardContent>
          <div className="rounded-md border">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Nom</TableHead>
                  <TableHead>Déclencheur</TableHead>
                  <TableHead>Action</TableHead>
                  <TableHead>Statut</TableHead>
                  <TableHead className="text-right">Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {rules.map((rule) => (
                  <TableRow key={rule.id}>
                    <TableCell className="font-medium">{rule.name}</TableCell>
                    <TableCell>{rule.trigger}</TableCell>
                    <TableCell>{rule.action}</TableCell>
                    <TableCell>
                      <div className="flex items-center gap-2">
                        <Switch 
                          checked={rule.enabled}
                          onCheckedChange={() => handleToggleRule(rule.id)}
                        />
                        <Badge variant={rule.enabled ? 'default' : 'outline'}>
                          {rule.enabled ? 'Activé' : 'Désactivé'}
                        </Badge>
                      </div>
                    </TableCell>
                    <TableCell className="text-right">
                      <div className="flex justify-end gap-2">
                        <Button variant="ghost" size="icon">
                          <Pencil className="h-4 w-4" />
                        </Button>
                        <Button 
                          variant="ghost" 
                          size="icon"
                          onClick={() => handleDeleteRule(rule.id)}
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

export default AutomationSettings;
