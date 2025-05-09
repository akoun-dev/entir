import React, { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '../../components/ui/card';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '../../components/ui/table';
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
import { Shield, Clock, AlertTriangle, FileText, Search, Plus } from 'lucide-react';

type LogLevel = 'minimal' | 'normal' | 'verbose';

interface AuditLog {
  id: string;
  date: string;
  user: string;
  action: string;
  target: string;
  details: string;
  severity: 'low' | 'medium' | 'high';
}

interface AuditConfig {
  retentionDays: number;
  logLevel: LogLevel;
  monitoredEvents: string[];
  alertEnabled: boolean;
  alertThreshold: number;
}

const AuditSettings: React.FC = () => {
  const [config, setConfig] = useState<AuditConfig>({
    retentionDays: 90,
    logLevel: 'normal',
    monitoredEvents: ['login', 'data_change', 'permission_change'],
    alertEnabled: true,
    alertThreshold: 5
  });

  const [logs, setLogs] = useState<AuditLog[]>([
    { id: '1', date: '2023-06-15 14:30', user: 'admin@example.com', action: 'login', target: 'Système', details: 'Connexion réussie', severity: 'low' },
    { id: '2', date: '2023-06-15 10:15', user: 'user@example.com', action: 'data_change', target: 'Utilisateur #123', details: 'Modification du profil', severity: 'medium' },
    { id: '3', date: '2023-06-14 16:45', user: 'admin@example.com', action: 'permission_change', target: 'Utilisateur #456', details: 'Changement de rôle', severity: 'high' }
  ]);

  const [searchTerm, setSearchTerm] = useState('');

  const filteredLogs = logs.filter(log => 
    log.user.toLowerCase().includes(searchTerm.toLowerCase()) || 
    log.action.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const handleLogLevelChange = (value: LogLevel) => {
    setConfig({...config, logLevel: value});
  };

  return (
    <div className="p-6">
      <div className="flex items-center gap-3 mb-6">
        <Shield className="h-8 w-8 text-ivory-orange" />
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Audit & Traçabilité</h1>
          <p className="text-muted-foreground mt-1">Configuration du suivi des activités et de la conformité</p>
        </div>
      </div>

      <div className="space-y-6">
        {/* Configuration */}
        <Card>
          <CardHeader>
            <CardTitle>Configuration d'audit</CardTitle>
            <CardDescription>Paramètres généraux du système d'audit</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="grid grid-cols-2 gap-4">
              <div>
                <Label htmlFor="retention-days">Durée de conservation (jours)</Label>
                <Input 
                  id="retention-days"
                  type="number" 
                  value={config.retentionDays}
                  onChange={(e) => setConfig({...config, retentionDays: parseInt(e.target.value)})}
                />
              </div>
              <div>
                <Label htmlFor="log-level">Niveau de journalisation</Label>
                <Select
                  value={config.logLevel}
                  onValueChange={handleLogLevelChange}
                >
                  <SelectTrigger id="log-level">
                    <SelectValue placeholder="Sélectionnez un niveau" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="minimal">Minimal</SelectItem>
                    <SelectItem value="normal">Normal</SelectItem>
                    <SelectItem value="verbose">Verbose</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>

            <div className="flex items-center space-x-2">
              <Switch 
                id="alert-enabled" 
                checked={config.alertEnabled}
                onCheckedChange={(checked) => setConfig({...config, alertEnabled: checked})}
              />
              <Label htmlFor="alert-enabled">Activer les alertes de sécurité</Label>
            </div>

            {config.alertEnabled && (
              <div>
                <Label htmlFor="alert-threshold">Seuil d'alerte (événements par heure)</Label>
                <Input 
                  id="alert-threshold"
                  type="number" 
                  value={config.alertThreshold}
                  onChange={(e) => setConfig({...config, alertThreshold: parseInt(e.target.value)})}
                />
              </div>
            )}
          </CardContent>
        </Card>

        {/* Journaux d'audit */}
        <Card>
          <CardHeader>
            <CardTitle>Journaux d'audit</CardTitle>
            <CardDescription>Historique des activités surveillées</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="relative mb-4">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
              <Input
                placeholder="Rechercher dans les journaux..."
                className="pl-10"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </div>

            <div className="rounded-md border">
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Date</TableHead>
                    <TableHead>Utilisateur</TableHead>
                    <TableHead>Action</TableHead>
                    <TableHead>Cible</TableHead>
                    <TableHead>Détails</TableHead>
                    <TableHead>Sévérité</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {filteredLogs.map((log) => (
                    <TableRow key={log.id}>
                      <TableCell>{log.date}</TableCell>
                      <TableCell>{log.user}</TableCell>
                      <TableCell>
                        <Badge variant="outline">{log.action}</Badge>
                      </TableCell>
                      <TableCell>{log.target}</TableCell>
                      <TableCell>{log.details}</TableCell>
                      <TableCell>
                        <Badge 
                          variant={log.severity === 'high' ? 'destructive' : log.severity === 'medium' ? 'default' : 'secondary'}
                        >
                          {log.severity}
                        </Badge>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default AuditSettings;