import React, { useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { useChatter } from '@/hooks/use-chatter';

/**
 * Page d'exemple qui montre comment utiliser le chatter
 *
 * Cette page démontre comment intégrer le chatter dans une vue spécifique.
 * Elle utilise le hook useChatter pour afficher automatiquement le chatter
 * lorsque la page est chargée, et le masquer lorsqu'elle est déchargée.
 *
 * Le chatter est associé à un employé fictif avec l'ID 123.
 */
const ExamplePage: React.FC = () => {
  // Utiliser le hook pour accéder au contexte du chatter
  const { showChatter, hideChatter, isVisible, modelName, modelId } = useChatter();

  // Simuler un modèle et un ID pour cet exemple
  const currentModelName = 'employee';
  const currentModelId = 123;

  // Afficher automatiquement le chatter lorsque la page est chargée
  useEffect(() => {
    // Afficher le chatter pour cet employé
    showChatter(currentModelName, currentModelId);

    // Nettoyer en masquant le chatter lorsque la page est déchargée
    return () => {
      hideChatter();
    };
  }, [showChatter, hideChatter]);

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h1 className="text-2xl font-bold">Fiche Employé</h1>
        <div className="flex gap-2">
          <Button variant="outline">Modifier</Button>
          <Button>Enregistrer</Button>
        </div>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>John Doe</CardTitle>
          <CardDescription>Développeur Senior</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <h3 className="font-medium mb-2">Informations personnelles</h3>
              <div className="space-y-2">
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Email:</span>
                  <span>john.doe@example.com</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Téléphone:</span>
                  <span>+225 07 12 34 56 78</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Date d'embauche:</span>
                  <span>01/01/2022</span>
                </div>
              </div>
            </div>
            <div>
              <h3 className="font-medium mb-2">Informations professionnelles</h3>
              <div className="space-y-2">
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Département:</span>
                  <span>Technologie</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Manager:</span>
                  <span>Jane Smith</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Statut:</span>
                  <span className="bg-green-100 text-green-800 px-2 py-0.5 rounded-full text-xs">Actif</span>
                </div>
              </div>
            </div>
          </div>
        </CardContent>
        <CardFooter className="flex justify-between">
          <div className="text-sm text-muted-foreground">
            Dernière modification: 15/06/2023
          </div>
          <div>
            <Button
              variant="outline"
              onClick={() => showChatter(currentModelName, currentModelId)}
              disabled={isVisible && modelName === currentModelName && modelId === currentModelId}
            >
              Afficher les messages
            </Button>
          </div>
        </CardFooter>
      </Card>

      {/* Le chatter sera affiché automatiquement en dessous grâce au ChatterContainer dans le MainLayout */}
    </div>
  );
};

export default ExamplePage;
