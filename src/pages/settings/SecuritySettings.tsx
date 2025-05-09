import React, { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '../../components/ui/card';
import { Button } from '../../components/ui/button';
import { Input } from '../../components/ui/input';
import { Label } from '../../components/ui/label';
import { Switch } from '../../components/ui/switch';
import { Lock, Shield, Key, Eye, EyeOff } from 'lucide-react';

const SecuritySettings: React.FC = () => {
  const [securityConfig, setSecurityConfig] = useState({
    passwordComplexity: true,
    twoFactorAuth: false,
    failedAttempts: 5,
    lockoutDuration: 30,
    sessionTimeout: 60
  });

  const handleToggle = (name: string) => {
    setSecurityConfig(prev => ({
      ...prev,
      [name]: !prev[name as keyof typeof securityConfig]
    }));
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setSecurityConfig(prev => ({
      ...prev,
      [name]: Number(value)
    }));
  };

  const handleSave = () => {
    // TODO: Implémenter la sauvegarde des paramètres
    console.log('Save security config:', securityConfig);
  };

  return (
    <div className="p-6">
      {/* En-tête */}
      <div className="flex items-center gap-3 mb-6">
        <Shield className="h-8 w-8 text-ivory-orange" />
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Sécurité</h1>
          <p className="text-muted-foreground mt-1">Configurez les paramètres de sécurité de l'application</p>
        </div>
      </div>

      {/* Carte principale */}
      <Card>
        <CardHeader>
          <CardTitle>Paramètres de sécurité</CardTitle>
          <CardDescription>Configurez les options de sécurité pour protéger votre application</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid gap-6">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                <Key className="h-5 w-5 text-muted-foreground" />
                <Label htmlFor="passwordComplexity">Complexité des mots de passe</Label>
              </div>
              <Switch
                id="passwordComplexity"
                checked={securityConfig.passwordComplexity}
                onCheckedChange={() => handleToggle('passwordComplexity')}
              />
            </div>

            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                <Lock className="h-5 w-5 text-muted-foreground" />
                <Label htmlFor="twoFactorAuth">Authentification à deux facteurs</Label>
              </div>
              <Switch
                id="twoFactorAuth"
                checked={securityConfig.twoFactorAuth}
                onCheckedChange={() => handleToggle('twoFactorAuth')}
              />
            </div>

            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="failedAttempts" className="text-right">
                Tentatives échouées avant blocage
              </Label>
              <Input
                id="failedAttempts"
                name="failedAttempts"
                type="number"
                min="1"
                max="10"
                value={securityConfig.failedAttempts}
                onChange={handleChange}
                className="col-span-3"
              />
            </div>

            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="lockoutDuration" className="text-right">
                Durée de blocage (minutes)
              </Label>
              <Input
                id="lockoutDuration"
                name="lockoutDuration"
                type="number"
                min="1"
                max="1440"
                value={securityConfig.lockoutDuration}
                onChange={handleChange}
                className="col-span-3"
              />
            </div>

            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="sessionTimeout" className="text-right">
                Délai d'inactivité (minutes)
              </Label>
              <Input
                id="sessionTimeout"
                name="sessionTimeout"
                type="number"
                min="1"
                max="1440"
                value={securityConfig.sessionTimeout}
                onChange={handleChange}
                className="col-span-3"
              />
            </div>
          </div>

          <div className="flex justify-end gap-2 mt-6">
            <Button className="bg-ivory-orange hover:bg-ivory-orange/90" onClick={handleSave}>
              <Shield className="h-4 w-4 mr-2" />
              Sauvegarder
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default SecuritySettings;
