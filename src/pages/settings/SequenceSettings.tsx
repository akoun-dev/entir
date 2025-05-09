import React, { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '../../components/ui/card';
import { Button } from '../../components/ui/button';
import { Input } from '../../components/ui/input';
import { Badge } from '../../components/ui/badge';
import { Label } from '../../components/ui/label';
import { Hash, FileText, Calendar, Plus } from 'lucide-react';

interface Sequence {
  id: string;
  name: string;
  prefix: string;
  suffix: string;
  nextNumber: number;
  padding: number;
  resetFrequency: 'never' | 'yearly' | 'monthly';
}

const SequenceSettings: React.FC = () => {
  const [sequences, setSequences] = useState<Sequence[]>([
    {
      id: '1',
      name: 'Factures clients',
      prefix: 'FAC-',
      suffix: '',
      nextNumber: 1245,
      padding: 5,
      resetFrequency: 'yearly'
    },
    {
      id: '2',
      name: 'Devis',
      prefix: 'DEV-',
      suffix: '',
      nextNumber: 378,
      padding: 4,
      resetFrequency: 'never'
    },
    {
      id: '3',
      name: 'Commandes',
      prefix: 'CMD-',
      suffix: '-2023',
      nextNumber: 892,
      padding: 6,
      resetFrequency: 'yearly'
    }
  ]);

  const [searchTerm, setSearchTerm] = useState('');

  const filteredSequences = sequences.filter(sequence => 
    sequence.name.toLowerCase().includes(searchTerm.toLowerCase()) || 
    sequence.prefix.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="p-6">
      <div className="flex items-center gap-3 mb-6">
        <Hash className="h-8 w-8 text-ivory-orange" />
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Numération</h1>
          <p className="text-muted-foreground mt-1">Gestion des numéros de séquence pour les documents</p>
        </div>
      </div>

      <div className="space-y-6">
        {/* Liste des séquences */}
        <Card>
          <CardHeader className="flex flex-row items-center justify-between">
            <div>
              <CardTitle>Séquences configurées</CardTitle>
              <CardDescription>Liste des séquences de numérotation disponibles</CardDescription>
            </div>
            <Button className="bg-ivory-orange hover:bg-ivory-orange/90">
              <Plus className="h-4 w-4 mr-2" />
              Nouvelle séquence
            </Button>
          </CardHeader>
          <CardContent>
            <div className="relative mb-4">
              <Input
                placeholder="Rechercher une séquence..."
                className="pl-10"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </div>

            <div className="space-y-4">
              {filteredSequences.map((sequence) => (
                <div key={sequence.id} className="border rounded-lg p-4">
                  <div className="flex items-start justify-between">
                    <div>
                      <div className="flex items-center gap-2">
                        <h3 className="font-medium">{sequence.name}</h3>
                        <Badge variant="outline">
                          {sequence.resetFrequency === 'never' ? 'Jamais' : 
                           sequence.resetFrequency === 'yearly' ? 'Annuel' : 'Mensuel'}
                        </Badge>
                      </div>
                      
                      <div className="mt-3 grid grid-cols-4 gap-4">
                        <div>
                          <Label>Préfixe</Label>
                          <div className="mt-1 font-mono">{sequence.prefix}</div>
                        </div>
                        <div>
                          <Label>Prochain numéro</Label>
                          <div className="mt-1 font-mono">
                            {String(sequence.nextNumber).padStart(sequence.padding, '0')}
                          </div>
                        </div>
                        <div>
                          <Label>Suffixe</Label>
                          <div className="mt-1 font-mono">{sequence.suffix}</div>
                        </div>
                        <div>
                          <Label>Exemple</Label>
                          <div className="mt-1 font-mono">
                            {sequence.prefix}
                            {String(sequence.nextNumber).padStart(sequence.padding, '0')}
                            {sequence.suffix}
                          </div>
                        </div>
                      </div>
                    </div>
                    <Button variant="ghost" size="icon">
                      <FileText className="h-4 w-4" />
                    </Button>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Configuration des séquences */}
        <Card>
          <CardHeader>
            <CardTitle>Configuration des séquences</CardTitle>
            <CardDescription>Paramètres généraux de numérotation</CardDescription>
          </CardHeader>
          <CardContent className="grid grid-cols-2 gap-6">
            <div>
              <Label>Année fiscale</Label>
              <div className="mt-2 flex items-center gap-2">
                <Calendar className="h-4 w-4 text-muted-foreground" />
                <span className="text-sm">Du 01/01/2023 au 31/12/2023</span>
              </div>
            </div>
            <div>
              <Label>Format par défaut</Label>
              <div className="mt-2">
                <Badge variant="outline">Préfixe-Numéro-Année</Badge>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Réinitialisation */}
        <Card>
          <CardHeader>
            <CardTitle>Réinitialisation des compteurs</CardTitle>
            <CardDescription>Gestion des réinitialisations périodiques</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="flex items-center justify-between">
              <div>
                <Label>Réinitialisation annuelle</Label>
                <p className="text-sm text-muted-foreground mt-1">
                  Les compteurs seront réinitialisés au début de chaque année fiscale
                </p>
              </div>
              <Button variant="outline">
                Réinitialiser maintenant
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default SequenceSettings;