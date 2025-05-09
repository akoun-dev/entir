import React, { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '../../components/ui/card';
import { Button } from '../../components/ui/button';
import { Input } from '../../components/ui/input';
import { Switch } from '../../components/ui/switch';
import { Badge } from '../../components/ui/badge';
import { Label } from '../../components/ui/label';
import { Shield, Lock, UserCheck, FileText, Calendar, Trash2, Plus } from 'lucide-react';

interface CompliancePolicy {
  id: string;
  name: string;
  description: string;
  retentionPeriod: number;
  active: boolean;
  lastReview: string;
}

const ComplianceSettings: React.FC = () => {
  const [policies, setPolicies] = useState<CompliancePolicy[]>([
    {
      id: '1',
      name: 'RGPD',
      description: 'Politique de conformité au règlement général sur la protection des données',
      retentionPeriod: 365,
      active: true,
      lastReview: '2023-05-15'
    },
    {
      id: '2',
      name: 'PCI-DSS',
      description: 'Norme de sécurité des données pour l\'industrie des cartes de paiement',
      retentionPeriod: 180,
      active: true,
      lastReview: '2023-04-01'
    }
  ]);

  const [searchTerm, setSearchTerm] = useState('');

  const filteredPolicies = policies.filter(policy => 
    policy.name.toLowerCase().includes(searchTerm.toLowerCase()) || 
    policy.description.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="p-6">
      <div className="flex items-center gap-3 mb-6">
        <Shield className="h-8 w-8 text-ivory-orange" />
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Conformité</h1>
          <p className="text-muted-foreground mt-1">Gestion de la conformité réglementaire</p>
        </div>
      </div>

      <div className="space-y-6">
        {/* Politiques de conformité */}
        <Card>
          <CardHeader>
            <CardTitle>Politiques de conformité</CardTitle>
            <CardDescription>Configurations des politiques de conformité applicables</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="relative mb-4">
              <Input
                placeholder="Rechercher une politique..."
                className="pl-10"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </div>

            <div className="space-y-4">
              {filteredPolicies.map((policy) => (
                <div key={policy.id} className="border rounded-lg p-4">
                  <div className="flex items-start justify-between">
                    <div>
                      <div className="flex items-center gap-2">
                        <h3 className="font-medium">{policy.name}</h3>
                        <Badge variant={policy.active ? 'default' : 'secondary'}>
                          {policy.active ? 'Actif' : 'Inactif'}
                        </Badge>
                      </div>
                      <p className="text-sm text-muted-foreground mt-1">{policy.description}</p>
                      
                      <div className="flex gap-4 mt-3">
                        <div className="flex items-center gap-2 text-sm">
                          <Lock className="h-4 w-4 text-muted-foreground" />
                          <span>Conservation: {policy.retentionPeriod} jours</span>
                        </div>
                        <div className="flex items-center gap-2 text-sm">
                          <Calendar className="h-4 w-4 text-muted-foreground" />
                          <span>Dernière revue: {policy.lastReview}</span>
                        </div>
                      </div>
                    </div>
                    <Button variant="ghost" size="icon">
                      <Trash2 className="h-4 w-4" />
                    </Button>
                  </div>
                </div>
              ))}
            </div>

            <Button className="mt-4 bg-ivory-orange hover:bg-ivory-orange/90">
              <Plus className="h-4 w-4 mr-2" />
              Ajouter une politique
            </Button>
          </CardContent>
        </Card>

        {/* Outils de conformité */}
        <Card>
          <CardHeader>
            <CardTitle>Outils de conformité</CardTitle>
            <CardDescription>Fonctionnalités pour gérer la conformité</CardDescription>
          </CardHeader>
          <CardContent className="grid grid-cols-3 gap-4">
            <Button variant="outline" className="flex flex-col items-center gap-2 h-full py-6">
              <UserCheck className="h-6 w-6" />
              <span>Gestion des consentements</span>
            </Button>
            <Button variant="outline" className="flex flex-col items-center gap-2 h-full py-6">
              <FileText className="h-6 w-6" />
              <span>Demandes d'accès</span>
            </Button>
            <Button variant="outline" className="flex flex-col items-center gap-2 h-full py-6">
              <Trash2 className="h-6 w-6" />
              <span>Demandes de suppression</span>
            </Button>
          </CardContent>
        </Card>

        {/* Journal des accès */}
        <Card>
          <CardHeader>
            <CardTitle>Journal des accès</CardTitle>
            <CardDescription>Historique des accès aux données sensibles</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="flex items-center justify-between mb-4">
              <div className="text-sm text-muted-foreground">
                Affichage des 50 derniers accès
              </div>
              <Button variant="outline">
                Exporter le journal
              </Button>
            </div>
            
            <div className="border rounded-lg p-4">
              <div className="grid grid-cols-5 gap-4 text-sm font-medium text-muted-foreground pb-2 border-b">
                <div>Date</div>
                <div>Utilisateur</div>
                <div>Type d'accès</div>
                <div>Ressource</div>
                <div>Adresse IP</div>
              </div>
              
              <div className="space-y-2 mt-2">
                <div className="grid grid-cols-5 gap-4 py-2 text-sm">
                  <div>2023-06-15 14:30</div>
                  <div>admin@example.com</div>
                  <div>Lecture</div>
                  <div>Données clients</div>
                  <div>192.168.1.1</div>
                </div>
                <div className="grid grid-cols-5 gap-4 py-2 text-sm">
                  <div>2023-06-15 10:15</div>
                  <div>user@example.com</div>
                  <div>Modification</div>
                  <div>Profil utilisateur</div>
                  <div>192.168.1.2</div>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default ComplianceSettings;