import React, { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '../../components/ui/card';
import { Button } from '../../components/ui/button';
import { Input } from '../../components/ui/input';
import { Switch } from '../../components/ui/switch';
import { Badge } from '../../components/ui/badge';
import { Label } from '../../components/ui/label';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '../../components/ui/select';
import { Database, HardDrive, Cloud, Lock, Clock, Calendar, RefreshCw } from 'lucide-react';

interface BackupConfig {
  frequency: 'daily' | 'weekly' | 'monthly';
  retention: number;
  storageType: 'local' | 'cloud' | 'both';
  encryption: boolean;
  lastBackup?: string;
  nextBackup?: string;
}

const BackupSettings: React.FC = () => {
  const [config, setConfig] = useState<BackupConfig>({
    frequency: 'daily',
    retention: 30,
    storageType: 'both',
    encryption: true,
    lastBackup: '2023-06-15 02:00',
    nextBackup: '2023-06-16 02:00'
  });

  const handleFrequencyChange = (value: 'daily' | 'weekly' | 'monthly') => {
    setConfig({...config, frequency: value});
  };

  const handleStorageChange = (value: 'local' | 'cloud' | 'both') => {
    setConfig({...config, storageType: value});
  };

  return (
    <div className="p-6">
      <div className="flex items-center gap-3 mb-6">
        <Database className="h-8 w-8 text-ivory-orange" />
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Sauvegarde & Restauration</h1>
          <p className="text-muted-foreground mt-1">Configuration des sauvegardes et restauration des données</p>
        </div>
      </div>

      <div className="space-y-6">
        {/* Configuration des sauvegardes */}
        <Card>
          <CardHeader>
            <CardTitle>Configuration des sauvegardes</CardTitle>
            <CardDescription>Planification et paramètres des sauvegardes automatiques</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="grid grid-cols-2 gap-4">
              <div>
                <Label htmlFor="backup-frequency">Fréquence</Label>
                <Select
                  value={config.frequency}
                  onValueChange={handleFrequencyChange}
                >
                  <SelectTrigger id="backup-frequency">
                    <SelectValue placeholder="Sélectionnez une fréquence" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="daily">Quotidienne</SelectItem>
                    <SelectItem value="weekly">Hebdomadaire</SelectItem>
                    <SelectItem value="monthly">Mensuelle</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div>
                <Label htmlFor="retention-days">Rétention (jours)</Label>
                <Input 
                  id="retention-days"
                  type="number" 
                  value={config.retention}
                  onChange={(e) => setConfig({...config, retention: parseInt(e.target.value)})}
                />
              </div>
            </div>

            <div>
              <Label htmlFor="storage-type">Type de stockage</Label>
              <Select
                value={config.storageType}
                onValueChange={handleStorageChange}
              >
                <SelectTrigger id="storage-type">
                  <SelectValue placeholder="Sélectionnez un type de stockage" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="local">
                    <div className="flex items-center gap-2">
                      <HardDrive className="h-4 w-4" />
                      Local
                    </div>
                  </SelectItem>
                  <SelectItem value="cloud">
                    <div className="flex items-center gap-2">
                      <Cloud className="h-4 w-4" />
                      Cloud
                    </div>
                  </SelectItem>
                  <SelectItem value="both">
                    <div className="flex items-center gap-2">
                      <HardDrive className="h-4 w-4" />
                      <Cloud className="h-4 w-4" />
                      Les deux
                    </div>
                  </SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div className="flex items-center space-x-2">
              <Switch 
                id="encryption" 
                checked={config.encryption}
                onCheckedChange={(checked) => setConfig({...config, encryption: checked})}
              />
              <Label htmlFor="encryption">Chiffrement des sauvegardes</Label>
            </div>
          </CardContent>
        </Card>

        {/* Statut des sauvegardes */}
        <Card>
          <CardHeader>
            <CardTitle>Statut des sauvegardes</CardTitle>
            <CardDescription>Informations sur les dernières sauvegardes</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-3 gap-4">
              <div className="border rounded-lg p-4">
                <div className="flex items-center gap-2 text-muted-foreground">
                  <Clock className="h-4 w-4" />
                  <span className="text-sm">Dernière sauvegarde</span>
                </div>
                <div className="mt-2 font-medium">
                  {config.lastBackup || 'Jamais effectuée'}
                </div>
              </div>
              <div className="border rounded-lg p-4">
                <div className="flex items-center gap-2 text-muted-foreground">
                  <Calendar className="h-4 w-4" />
                  <span className="text-sm">Prochaine sauvegarde</span>
                </div>
                <div className="mt-2 font-medium">
                  {config.nextBackup || 'Non planifiée'}
                </div>
              </div>
              <div className="border rounded-lg p-4">
                <div className="flex items-center gap-2 text-muted-foreground">
                  <RefreshCw className="h-4 w-4" />
                  <span className="text-sm">Fréquence</span>
                </div>
                <div className="mt-2 font-medium">
                  {config.frequency === 'daily' ? 'Quotidienne' : 
                   config.frequency === 'weekly' ? 'Hebdomadaire' : 'Mensuelle'}
                </div>
              </div>
            </div>

            <div className="mt-6 flex justify-end gap-2">
              <Button variant="outline">
                Sauvegarder maintenant
              </Button>
              <Button className="bg-ivory-orange hover:bg-ivory-orange/90">
                Restaurer
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default BackupSettings;