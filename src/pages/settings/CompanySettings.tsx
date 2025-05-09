import React from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '../../components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '../../components/ui/tabs';
import { Input } from '../../components/ui/input';
import { Label } from '../../components/ui/label';
import { Textarea } from '../../components/ui/textarea';
import { Button } from '../../components/ui/button';
import { Building2, MapPin, Phone, Mail, Globe, FileText, Upload } from 'lucide-react';

/**
 * Page des paramètres de la société
 * Permet de configurer les informations de l'entreprise
 */
const CompanySettings: React.FC = () => {
  return (
    <div className="p-6">
      {/* En-tête */}
      <div className="flex items-center gap-3 mb-6">
        <Building2 className="h-8 w-8 text-ivory-orange" />
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Paramètres de la société</h1>
          <p className="text-muted-foreground mt-1">Configurez les informations de votre entreprise</p>
        </div>
      </div>

      {/* Onglets */}
      <Tabs defaultValue="general" className="space-y-6">
        <TabsList>
          <TabsTrigger value="general">Général</TabsTrigger>
          <TabsTrigger value="contact">Contact</TabsTrigger>
          <TabsTrigger value="legal">Informations légales</TabsTrigger>
          <TabsTrigger value="visual">Identité visuelle</TabsTrigger>
        </TabsList>

        {/* Onglet Général */}
        <TabsContent value="general" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Informations générales</CardTitle>
              <CardDescription>Informations de base sur votre entreprise</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="company-name">Nom de l'entreprise</Label>
                  <Input id="company-name" placeholder="Entrez le nom de votre entreprise" />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="trading-name">Nom commercial</Label>
                  <Input id="trading-name" placeholder="Nom commercial (si différent)" />
                </div>
              </div>
              <div className="space-y-2">
                <Label htmlFor="company-description">Description</Label>
                <Textarea
                  id="company-description"
                  placeholder="Brève description de votre entreprise"
                  className="min-h-[100px]"
                />
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="industry">Secteur d'activité</Label>
                  <Input id="industry" placeholder="Ex: Technologie, Santé, etc." />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="foundation-date">Date de création</Label>
                  <Input id="foundation-date" type="date" />
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        {/* Onglet Contact */}
        <TabsContent value="contact" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Coordonnées</CardTitle>
              <CardDescription>Adresse et informations de contact</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="address">Adresse</Label>
                <Textarea
                  id="address"
                  placeholder="Adresse complète"
                  className="min-h-[80px]"
                />
              </div>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="postal-code">Code postal</Label>
                  <Input id="postal-code" placeholder="Code postal" />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="city">Ville</Label>
                  <Input id="city" placeholder="Ville" />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="country">Pays</Label>
                  <Input id="country" placeholder="Pays" />
                </div>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="phone">Téléphone</Label>
                  <Input id="phone" placeholder="Numéro de téléphone" />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="email">Email</Label>
                  <Input id="email" type="email" placeholder="Email de contact" />
                </div>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="website">Site web</Label>
                  <Input id="website" placeholder="https://www.example.com" />
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        {/* Boutons d'action */}
        <div className="flex justify-end gap-3 mt-6">
          <Button variant="outline">Annuler</Button>
          <Button className="bg-ivory-orange hover:bg-ivory-orange/90">Enregistrer</Button>
        </div>
      </Tabs>
    </div>
  );
};

export default CompanySettings;
