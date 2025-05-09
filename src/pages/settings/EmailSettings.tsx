import React, { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '../../components/ui/card';
import { Button } from '../../components/ui/button';
import { Input } from '../../components/ui/input';
import { Label } from '../../components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '../../components/ui/select';
import { Mail, Send, Server, TestTube2 } from 'lucide-react';

const EmailSettings: React.FC = () => {
  const [emailConfig, setEmailConfig] = useState({
    protocol: 'smtp',
    host: 'smtp.example.com',
    port: '587',
    username: '',
    password: '',
    encryption: 'tls',
    fromEmail: 'noreply@example.com',
    fromName: 'ERP System'
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setEmailConfig(prev => ({ ...prev, [name]: value }));
  };

  const handleSelectChange = (name: string, value: string) => {
    setEmailConfig(prev => ({ ...prev, [name]: value }));
  };

  const handleTestConnection = () => {
    // TODO: Implémenter le test de connexion SMTP
    console.log('Test SMTP:', emailConfig);
  };

  const handleSave = () => {
    // TODO: Implémenter la sauvegarde des paramètres
    console.log('Save email config:', emailConfig);
  };

  return (
    <div className="p-6">
      {/* En-tête */}
      <div className="flex items-center gap-3 mb-6">
        <Mail className="h-8 w-8 text-ivory-orange" />
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Serveurs de messagerie</h1>
          <p className="text-muted-foreground mt-1">Configurez les paramètres d'envoi d'emails</p>
        </div>
      </div>

      {/* Carte principale */}
      <Card>
        <CardHeader>
          <CardTitle>Configuration SMTP</CardTitle>
          <CardDescription>Paramètres du serveur d'envoi d'emails</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid gap-4">
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="protocol" className="text-right">Protocole</Label>
              <Select
                value={emailConfig.protocol}
                onValueChange={(value) => handleSelectChange('protocol', value)}
              >
                <SelectTrigger className="col-span-3">
                  <SelectValue placeholder="Sélectionnez un protocole" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="smtp">SMTP</SelectItem>
                  <SelectItem value="sendmail">Sendmail</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="host" className="text-right">Serveur SMTP</Label>
              <Input
                id="host"
                name="host"
                value={emailConfig.host}
                onChange={handleChange}
                className="col-span-3"
              />
            </div>

            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="port" className="text-right">Port</Label>
              <Input
                id="port"
                name="port"
                value={emailConfig.port}
                onChange={handleChange}
                className="col-span-3"
              />
            </div>

            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="username" className="text-right">Identifiant</Label>
              <Input
                id="username"
                name="username"
                value={emailConfig.username}
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
                value={emailConfig.password}
                onChange={handleChange}
                className="col-span-3"
              />
            </div>

            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="encryption" className="text-right">Chiffrement</Label>
              <Select
                value={emailConfig.encryption}
                onValueChange={(value) => handleSelectChange('encryption', value)}
              >
                <SelectTrigger className="col-span-3">
                  <SelectValue placeholder="Sélectionnez un chiffrement" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="tls">TLS</SelectItem>
                  <SelectItem value="ssl">SSL</SelectItem>
                  <SelectItem value="none">Aucun</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="fromEmail" className="text-right">Email d'expédition</Label>
              <Input
                id="fromEmail"
                name="fromEmail"
                type="email"
                value={emailConfig.fromEmail}
                onChange={handleChange}
                className="col-span-3"
              />
            </div>

            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="fromName" className="text-right">Nom d'expédition</Label>
              <Input
                id="fromName"
                name="fromName"
                value={emailConfig.fromName}
                onChange={handleChange}
                className="col-span-3"
              />
            </div>
          </div>

          <div className="flex justify-end gap-2 mt-6">
            <Button variant="outline" onClick={handleTestConnection}>
              <TestTube2 className="h-4 w-4 mr-2" />
              Tester la configuration
            </Button>
            <Button className="bg-ivory-orange hover:bg-ivory-orange/90" onClick={handleSave}>
              <Send className="h-4 w-4 mr-2" />
              Sauvegarder
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default EmailSettings;
