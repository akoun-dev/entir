import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '../../components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '../../components/ui/tabs';
import { Input } from '../../components/ui/input';
import { Label } from '../../components/ui/label';
import { Textarea } from '../../components/ui/textarea';
import { Button } from '../../components/ui/button';
import { Building2, MapPin, Phone, Mail, Globe, FileText, Upload, Loader2 } from 'lucide-react';
import { useToast } from '../../components/ui/use-toast';
import { parameterService } from '../../services/api';

/**
 * Page des paramètres de la société
 * Permet de configurer les informations de l'entreprise
 */
const CompanySettings: React.FC = () => {
  // État pour les paramètres de l'entreprise
  const [companyParams, setCompanyParams] = useState({
    company_name: '',
    company_trading_name: '',
    company_description: '',
    company_industry: '',
    company_foundation_date: '',
    company_address: '',
    company_postal_code: '',
    company_city: '',
    company_country: '',
    company_phone: '',
    company_email: '',
    company_website: ''
  });

  // État pour le chargement
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);

  // Toast pour les notifications
  const { toast } = useToast();

  // Charger les paramètres de l'entreprise
  useEffect(() => {
    const fetchCompanyParams = async () => {
      try {
        const params = await parameterService.getByCategory('company');

        // Mettre à jour l'état avec les paramètres récupérés
        const newParams = { ...companyParams };
        params.forEach(param => {
          // @ts-ignore
          if (newParams.hasOwnProperty(param.key)) {
            // @ts-ignore
            newParams[param.key] = param.value;
          }
        });

        setCompanyParams(newParams);
        setLoading(false);
      } catch (error) {
        console.error('Erreur lors du chargement des paramètres:', error);
        toast({
          title: 'Erreur',
          description: 'Impossible de charger les paramètres de l\'entreprise',
          variant: 'destructive'
        });
        setLoading(false);
      }
    };

    fetchCompanyParams();
  }, []);

  // Gérer les changements dans les champs
  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { id, value } = e.target;
    const key = id.replace(/-/g, '_'); // Convertir les tirets en underscores pour correspondre aux clés

    setCompanyParams(prev => ({
      ...prev,
      [key]: value
    }));
  };

  // Enregistrer les paramètres
  const handleSave = async () => {
    setSaving(true);

    try {
      // Préparer les paramètres à mettre à jour
      const paramsToUpdate = Object.entries(companyParams).map(([key, value]) => ({
        key,
        value: value || ''
      }));

      // Mettre à jour les paramètres
      await parameterService.updateBatch(paramsToUpdate);

      toast({
        title: 'Succès',
        description: 'Les paramètres de l\'entreprise ont été enregistrés',
        variant: 'default'
      });
    } catch (error) {
      console.error('Erreur lors de l\'enregistrement des paramètres:', error);
      toast({
        title: 'Erreur',
        description: 'Impossible d\'enregistrer les paramètres de l\'entreprise',
        variant: 'destructive'
      });
    } finally {
      setSaving(false);
    }
  };

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
              {loading ? (
                <div className="flex justify-center items-center py-8">
                  <Loader2 className="h-8 w-8 animate-spin text-ivory-orange" />
                </div>
              ) : (
                <>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label htmlFor="company_name">Nom de l'entreprise</Label>
                      <Input
                        id="company_name"
                        placeholder="Entrez le nom de votre entreprise"
                        value={companyParams.company_name}
                        onChange={handleChange}
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="company_trading_name">Nom commercial</Label>
                      <Input
                        id="company_trading_name"
                        placeholder="Nom commercial (si différent)"
                        value={companyParams.company_trading_name}
                        onChange={handleChange}
                      />
                    </div>
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="company_description">Description</Label>
                    <Textarea
                      id="company_description"
                      placeholder="Brève description de votre entreprise"
                      className="min-h-[100px]"
                      value={companyParams.company_description}
                      onChange={handleChange}
                    />
                  </div>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label htmlFor="company_industry">Secteur d'activité</Label>
                      <Input
                        id="company_industry"
                        placeholder="Ex: Technologie, Santé, etc."
                        value={companyParams.company_industry}
                        onChange={handleChange}
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="company_foundation_date">Date de création</Label>
                      <Input
                        id="company_foundation_date"
                        type="date"
                        value={companyParams.company_foundation_date}
                        onChange={handleChange}
                      />
                    </div>
                  </div>
                </>
              )}
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
              {loading ? (
                <div className="flex justify-center items-center py-8">
                  <Loader2 className="h-8 w-8 animate-spin text-ivory-orange" />
                </div>
              ) : (
                <>
                  <div className="space-y-2">
                    <Label htmlFor="company_address">Adresse</Label>
                    <Textarea
                      id="company_address"
                      placeholder="Adresse complète"
                      className="min-h-[80px]"
                      value={companyParams.company_address}
                      onChange={handleChange}
                    />
                  </div>
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    <div className="space-y-2">
                      <Label htmlFor="company_postal_code">Code postal</Label>
                      <Input
                        id="company_postal_code"
                        placeholder="Code postal"
                        value={companyParams.company_postal_code}
                        onChange={handleChange}
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="company_city">Ville</Label>
                      <Input
                        id="company_city"
                        placeholder="Ville"
                        value={companyParams.company_city}
                        onChange={handleChange}
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="company_country">Pays</Label>
                      <Input
                        id="company_country"
                        placeholder="Pays"
                        value={companyParams.company_country}
                        onChange={handleChange}
                      />
                    </div>
                  </div>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label htmlFor="company_phone">Téléphone</Label>
                      <Input
                        id="company_phone"
                        placeholder="Numéro de téléphone"
                        value={companyParams.company_phone}
                        onChange={handleChange}
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="company_email">Email</Label>
                      <Input
                        id="company_email"
                        type="email"
                        placeholder="Email de contact"
                        value={companyParams.company_email}
                        onChange={handleChange}
                      />
                    </div>
                  </div>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label htmlFor="company_website">Site web</Label>
                      <Input
                        id="company_website"
                        placeholder="https://www.example.com"
                        value={companyParams.company_website}
                        onChange={handleChange}
                      />
                    </div>
                  </div>
                </>
              )}
            </CardContent>
          </Card>
        </TabsContent>

        {/* Boutons d'action */}
        <div className="flex justify-end gap-3 mt-6">
          <Button
            variant="outline"
            disabled={loading || saving}
            onClick={() => window.location.reload()}
          >
            Annuler
          </Button>
          <Button
            className="bg-ivory-orange hover:bg-ivory-orange/90"
            onClick={handleSave}
            disabled={loading || saving}
          >
            {saving ? (
              <>
                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                Enregistrement...
              </>
            ) : (
              'Enregistrer'
            )}
          </Button>
        </div>
      </Tabs>
    </div>
  );
};

export default CompanySettings;
