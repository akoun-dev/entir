import React, { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '../../components/ui/card';
import { Button } from '../../components/ui/button';
import { Label } from '../../components/ui/label';
import { Palette, Moon, Sun, Eye, TextCursor, LayoutDashboard } from 'lucide-react';
import { useTheme } from '../../components/providers/theme-provider';
import { Switch } from '../../components/ui/switch';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '../../components/ui/select';

const AppearanceSettings: React.FC = () => {
  const { theme, setTheme } = useTheme();
  const [primaryColor, setPrimaryColor] = useState('#3b82f6');
  const [density, setDensity] = useState('normal');
  const [fontSize, setFontSize] = useState('medium');
  const [dashboardLayout, setDashboardLayout] = useState('default');

  const colorOptions = [
    { value: '#3b82f6', name: 'Bleu' },
    { value: '#ef4444', name: 'Rouge' },
    { value: '#10b981', name: 'Vert' },
    { value: '#f59e0b', name: 'Jaune' },
    { value: '#8b5cf6', name: 'Violet' }
  ];

  return (
    <div className="p-6">
      <div className="flex items-center gap-3 mb-6">
        <Palette className="h-8 w-8 text-ivory-orange" />
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Apparence</h1>
          <p className="text-muted-foreground mt-1">Personnalisation de l'interface utilisateur</p>
        </div>
      </div>

      <div className="space-y-6">
        {/* Thème */}
        <Card>
          <CardHeader>
            <CardTitle>Thème</CardTitle>
            <CardDescription>Personnalisez l'apparence de l'application</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                {theme === 'dark' ? <Moon className="h-5 w-5" /> : <Sun className="h-5 w-5" />}
                <Label>Mode {theme === 'dark' ? 'Sombre' : 'Clair'}</Label>
              </div>
              <Switch
                checked={theme === 'dark'}
                onCheckedChange={(checked) => setTheme(checked ? 'dark' : 'light')}
              />
            </div>

            <div>
              <Label>Couleur principale</Label>
              <div className="flex gap-2 mt-2">
                {colorOptions.map((color) => (
                  <button
                    key={color.value}
                    className={`h-8 w-8 rounded-full ${primaryColor === color.value ? 'ring-2 ring-offset-2 ring-gray-400' : ''}`}
                    style={{ backgroundColor: color.value }}
                    onClick={() => setPrimaryColor(color.value)}
                    title={color.name}
                  />
                ))}
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Accessibilité */}
        <Card>
          <CardHeader>
            <CardTitle>Accessibilité</CardTitle>
            <CardDescription>Paramètres pour améliorer la lisibilité</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div>
              <Label htmlFor="density">Densité d'affichage</Label>
              <Select value={density} onValueChange={setDensity}>
                <SelectTrigger id="density" className="mt-2">
                  <SelectValue placeholder="Sélectionnez une densité" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="compact">Compact</SelectItem>
                  <SelectItem value="normal">Normal</SelectItem>
                  <SelectItem value="comfortable">Confortable</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div>
              <Label htmlFor="font-size">Taille de police</Label>
              <Select value={fontSize} onValueChange={setFontSize}>
                <SelectTrigger id="font-size" className="mt-2">
                  <SelectValue placeholder="Sélectionnez une taille" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="small">Petite</SelectItem>
                  <SelectItem value="medium">Moyenne</SelectItem>
                  <SelectItem value="large">Grande</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </CardContent>
        </Card>

        {/* Tableau de bord */}
        <Card>
          <CardHeader>
            <CardTitle>Tableau de bord</CardTitle>
            <CardDescription>Personnalisation du tableau de bord par défaut</CardDescription>
          </CardHeader>
          <CardContent>
            <div>
              <Label htmlFor="layout">Disposition</Label>
              <Select value={dashboardLayout} onValueChange={setDashboardLayout}>
                <SelectTrigger id="layout" className="mt-2">
                  <SelectValue placeholder="Sélectionnez une disposition" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="default">Par défaut</SelectItem>
                  <SelectItem value="minimal">Minimaliste</SelectItem>
                  <SelectItem value="detailed">Détaillé</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div className="mt-6 flex justify-end">
              <Button className="bg-ivory-orange hover:bg-ivory-orange/90">
                Enregistrer les préférences
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default AppearanceSettings;