import React, { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '../../components/ui/card';
import { Button } from '../../components/ui/button';
import { Input } from '../../components/ui/input';
import { Switch } from '../../components/ui/switch';
import { Badge } from '../../components/ui/badge';
import { Label } from '../../components/ui/label';
import { Gauge, Database, Clock, Server, Activity } from 'lucide-react';

const PerformanceSettings: React.FC = () => {
  const [cacheEnabled, setCacheEnabled] = useState(true);
  const [cacheSize, setCacheSize] = useState(500);
  const [pageSize, setPageSize] = useState(25);
  const [queryOptimization, setQueryOptimization] = useState(true);

  return (
    <div className="p-6">
      <div className="flex items-center gap-3 mb-6">
        <Gauge className="h-8 w-8 text-ivory-orange" />
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Performance</h1>
          <p className="text-muted-foreground mt-1">Optimisation des performances du système</p>
        </div>
      </div>

      <div className="space-y-6">
        {/* Configuration du cache */}
        <Card>
          <CardHeader>
            <CardTitle>Configuration du cache</CardTitle>
            <CardDescription>Gestion du cache système pour améliorer les performances</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                <Database className="h-5 w-5 text-muted-foreground" />
                <Label>Activer le cache</Label>
              </div>
              <Switch 
                checked={cacheEnabled}
                onCheckedChange={setCacheEnabled}
              />
            </div>

            {cacheEnabled && (
              <div>
                <Label htmlFor="cache-size">Taille maximale du cache (MB)</Label>
                <Input
                  id="cache-size"
                  type="number"
                  value={cacheSize}
                  onChange={(e) => setCacheSize(parseInt(e.target.value))}
                  className="mt-2"
                />
              </div>
            )}
          </CardContent>
        </Card>

        {/* Paramètres d'affichage */}
        <Card>
          <CardHeader>
            <CardTitle>Paramètres d'affichage</CardTitle>
            <CardDescription>Configuration des performances d'affichage</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div>
              <Label htmlFor="page-size">Taille de page par défaut</Label>
              <Input
                id="page-size"
                type="number"
                value={pageSize}
                onChange={(e) => setPageSize(parseInt(e.target.value))}
                className="mt-2"
              />
              <p className="text-sm text-muted-foreground mt-1">
                Nombre d'éléments affichés par page dans les listes
              </p>
            </div>
          </CardContent>
        </Card>

        {/* Optimisation des requêtes */}
        <Card>
          <CardHeader>
            <CardTitle>Optimisation des requêtes</CardTitle>
            <CardDescription>Paramètres avancés pour les requêtes de base de données</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                <Activity className="h-5 w-5 text-muted-foreground" />
                <Label>Optimisation automatique des requêtes</Label>
              </div>
              <Switch 
                checked={queryOptimization}
                onCheckedChange={setQueryOptimization}
              />
            </div>
          </CardContent>
        </Card>

        {/* Surveillance des performances */}
        <Card>
          <CardHeader>
            <CardTitle>Surveillance des performances</CardTitle>
            <CardDescription>Statistiques et métriques système</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-3 gap-4">
              <div className="border rounded-lg p-4">
                <div className="flex items-center gap-2 text-muted-foreground">
                  <Server className="h-4 w-4" />
                  <span className="text-sm">Utilisation CPU</span>
                </div>
                <div className="mt-2 font-medium text-2xl">
                  24%
                </div>
              </div>
              <div className="border rounded-lg p-4">
                <div className="flex items-center gap-2 text-muted-foreground">
                  <Database className="h-4 w-4" />
                  <span className="text-sm">Mémoire utilisée</span>
                </div>
                <div className="mt-2 font-medium text-2xl">
                  1.2GB
                </div>
              </div>
              <div className="border rounded-lg p-4">
                <div className="flex items-center gap-2 text-muted-foreground">
                  <Clock className="h-4 w-4" />
                  <span className="text-sm">Temps de réponse</span>
                </div>
                <div className="mt-2 font-medium text-2xl">
                  120ms
                </div>
              </div>
            </div>

            <div className="mt-6 flex justify-end">
              <Button className="bg-ivory-orange hover:bg-ivory-orange/90">
                <Activity className="h-4 w-4 mr-2" />
                Lancer un diagnostic
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default PerformanceSettings;