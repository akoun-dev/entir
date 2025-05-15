
import React from 'react';
import { Button } from '../../../../../src/components/ui/button';
import { Label } from '../../../../../src/components/ui/label';
import { Switch } from '../../../../../src/components/ui/switch';
import { Separator } from '../../../../../src/components/ui/separator';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '../../../../../src/components/ui/select';

interface ImportConfig {
  createMissing: boolean;
  updateExisting: boolean;
  identifierField: string;
}

interface ConfigTabProps {
  config: ImportConfig;
  handleConfigChange: (key: keyof ImportConfig, value: boolean | string) => void;
  onGoBack: () => void;
  onStartImport: () => void;
}

const ConfigTab: React.FC<ConfigTabProps> = ({
  config,
  handleConfigChange,
  onGoBack,
  onStartImport,
}) => {
  return (
    <div className="space-y-4">
      <div className="space-y-2">
        <h3 className="text-sm font-medium">Options d'import</h3>
        
        <div className="space-y-3">
          <div className="flex items-center justify-between">
            <div className="space-y-0.5">
              <Label htmlFor="create-missing">Créer les employés manquants</Label>
              <p className="text-xs text-muted-foreground">
                Les employés qui n'existent pas dans le système seront créés
              </p>
            </div>
            <Switch 
              id="create-missing"
              checked={config.createMissing}
              onCheckedChange={(value) => handleConfigChange('createMissing', value)}
            />
          </div>
          
          <div className="flex items-center justify-between">
            <div className="space-y-0.5">
              <Label htmlFor="update-existing">Mettre à jour les employés existants</Label>
              <p className="text-xs text-muted-foreground">
                Les employés qui existent déjà seront mis à jour
              </p>
            </div>
            <Switch 
              id="update-existing"
              checked={config.updateExisting}
              onCheckedChange={(value) => handleConfigChange('updateExisting', value)}
            />
          </div>
        </div>
      </div>

      <Separator />
      
      {config.updateExisting && (
        <div className="space-y-2">
          <h3 className="text-sm font-medium">Champ identifiant</h3>
          <p className="text-xs text-muted-foreground">
            Choisissez le champ qui servira à identifier les employés existants
          </p>
          
          <Select
            value={config.identifierField}
            onValueChange={(value) => handleConfigChange('identifierField', value)}
          >
            <SelectTrigger className="w-full">
              <SelectValue placeholder="Sélectionner un champ" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="email">Email</SelectItem>
              <SelectItem value="name">Nom</SelectItem>
              <SelectItem value="phone">Téléphone</SelectItem>
            </SelectContent>
          </Select>
        </div>
      )}

      <div className="flex justify-end space-x-2 pt-4">
        <Button variant="outline" onClick={onGoBack}>Retour</Button>
        <Button onClick={onStartImport}>Lancer l'import</Button>
      </div>
    </div>
  );
};

export default ConfigTab;
