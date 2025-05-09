import React, { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '../../components/ui/card';
import { Button } from '../../components/ui/button';
import { Input } from '../../components/ui/input';
import { Label } from '../../components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '../../components/ui/select';
import { Switch } from '../../components/ui/switch';
import { FileText, Filter, HardDrive, Clock } from 'lucide-react';

const LoggingSettings: React.FC = () => {
  const [logConfig, setLogConfig] = useState({
    level: 'info',
    retentionDays: 30,
    maxSize: 100,
    compress: true,
    consoleOutput: false
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setLogConfig(prev => ({
      ...prev,
      [name]: name === 'retentionDays' || name === 'maxSize' ? Number(value) : value
    }));
  };

  const handleSelectChange = (name: string, value: string) => {
    setLogConfig(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleToggle = (name: string) => {
    setLogConfig(prev => ({
      ...prev,
      [name]: !prev[name as keyof typeof logConfig]
    }));
  };

  const handleSave = () => {
    // TODO: Implémenter la sauvegarde des paramètres
    console.log('Save log config:', logConfig);
  };

  return (
    <div className="p-6">
      {/* En-tête */}
      <div className="flex items-center gap-3 mb-6">
        <FileText className="h-8 w-8 text-ivory-orange" />
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Journalisation</h1>
          <p className="text-muted-foreground mt-1">Configurez les paramètres de journalisation de l'application</p>
        </div>
      </div>

      {/* Carte principale */}
      <Card>
        <CardHeader>
          <CardTitle>Configuration des logs</CardTitle>
          <CardDescription>Personnalisez le comportement de la journalisation</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid gap-6">
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="level" className="text-right">
                <div className="flex items-center gap-2">
                  <Filter className="h-4 w-4" />
                  Niveau de log
                </div>
              </Label>
              <Select
                value={logConfig.level}
                onValueChange={(value) => handleSelectChange('level', value)}
              >
                <SelectTrigger className="col-span-3">
                  <SelectValue placeholder="Sélectionnez un niveau" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="error">Error</SelectItem>
                  <SelectItem value="warn">Warn</SelectItem>
                  <SelectItem value="info">Info</SelectItem>
                  <SelectItem value="debug">Debug</SelectItem>
                  <SelectItem value="trace">Trace</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="retentionDays" className="text-right">
                <div className="flex items-center gap-2">
                  <Clock className="h-4 w-4" />
                  Rétention (jours)
                </div>
              </Label>
              <Input
                id="retentionDays"
                name="retentionDays"
                type="number"
                min="1"
                max="365"
                value={logConfig.retentionDays}
                onChange={handleChange}
                className="col-span-3"
              />
            </div>

            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="maxSize" className="text-right">
                <div className="flex items-center gap-2">
                  <HardDrive className="h-4 w-4" />
                  Taille max (MB)
                </div>
              </Label>
              <Input
                id="maxSize"
                name="maxSize"
                type="number"
                min="10"
                max="1000"
                value={logConfig.maxSize}
                onChange={handleChange}
                className="col-span-3"
              />
            </div>

            <div className="flex items-center justify-between">
              <Label htmlFor="compress">Compression des logs</Label>
              <Switch
                id="compress"
                checked={logConfig.compress}
                onCheckedChange={() => handleToggle('compress')}
              />
            </div>

            <div className="flex items-center justify-between">
              <Label htmlFor="consoleOutput">Sortie console</Label>
              <Switch
                id="consoleOutput"
                checked={logConfig.consoleOutput}
                onCheckedChange={() => handleToggle('consoleOutput')}
              />
            </div>
          </div>

          <div className="flex justify-end gap-2 mt-6">
            <Button className="bg-ivory-orange hover:bg-ivory-orange/90" onClick={handleSave}>
              Sauvegarder
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default LoggingSettings;
