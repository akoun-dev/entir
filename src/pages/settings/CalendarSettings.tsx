import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '../../components/ui/card';
import { Button } from '../../components/ui/button';
import { Input } from '../../components/ui/input';
import { Switch } from '../../components/ui/switch';
import { Badge } from '../../components/ui/badge';
import { Label } from '../../components/ui/label';
import { Calendar, Clock, Globe, CalendarDays, CalendarCheck, Plus, Loader2 } from 'lucide-react';
import axios from 'axios';

interface Holiday {
  id: string;
  name: string;
  date: string;
  country: string;
  recurring: boolean;
  type: string;
  description: string;
  active: boolean;
}

interface CalendarConfig {
  id: string;
  timezone: string;
  workHoursStart: string;
  workHoursEnd: string;
  weekStart: string;
  dateFormat: string;
  timeFormat: string;
  workDays: string[];
  advancedSettings: {
    showWeekNumbers: boolean;
    firstDayOfYear: number;
    minimalDaysInFirstWeek: number;
    workWeekStart: number;
    workWeekEnd: number;
    defaultView: string;
    defaultDuration: number;
    slotDuration: number;
    snapDuration: number;
  };
}

interface CalendarIntegration {
  id: string;
  type: string;
  name: string;
  userId: string | null;
  userName: string | null;
  lastSync: string | null;
  lastSyncStatus: string | null;
  active: boolean;
}

const CalendarSettings: React.FC = () => {
  const [loading, setLoading] = useState(true);
  const [calendarConfig, setCalendarConfig] = useState<CalendarConfig | null>(null);
  const [holidays, setHolidays] = useState<Holiday[]>([]);
  const [integrations, setIntegrations] = useState<CalendarIntegration[]>([]);

  // États locaux pour l'édition
  const [timezone, setTimezone] = useState('Europe/Paris');
  const [workHours, setWorkHours] = useState({ start: '08:00', end: '18:00' });
  const [weekStart, setWeekStart] = useState('monday');

  // Charger les données depuis l'API
  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);

        // Récupérer la configuration du calendrier
        const configResponse = await axios.get('http://localhost:3001/api/calendarconfig');
        setCalendarConfig(configResponse.data);
        setTimezone(configResponse.data.timezone);
        setWorkHours({
          start: configResponse.data.workHoursStart,
          end: configResponse.data.workHoursEnd
        });
        setWeekStart(configResponse.data.weekStart);

        // Récupérer les jours fériés
        const holidaysResponse = await axios.get('http://localhost:3001/api/holidays');
        setHolidays(holidaysResponse.data);

        // Récupérer les intégrations de calendrier
        const integrationsResponse = await axios.get('http://localhost:3001/api/calendarintegrations');
        setIntegrations(integrationsResponse.data);

        setLoading(false);
      } catch (error) {
        console.error('Erreur lors du chargement des données du calendrier:', error);
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  // Fonction pour sauvegarder les modifications de la configuration
  const saveCalendarConfig = async () => {
    try {
      setLoading(true);

      if (!calendarConfig) return;

      const updatedConfig = {
        ...calendarConfig,
        timezone,
        workHoursStart: workHours.start,
        workHoursEnd: workHours.end,
        weekStart
      };

      await axios.put('http://localhost:3001/api/calendarconfig', updatedConfig);
      setCalendarConfig(updatedConfig);

      setLoading(false);
      alert('Configuration du calendrier enregistrée avec succès');
    } catch (error) {
      console.error('Erreur lors de la sauvegarde de la configuration:', error);
      setLoading(false);
      alert('Erreur lors de la sauvegarde de la configuration');
    }
  };

  // Fonction pour ajouter un jour férié
  const addHoliday = async (holiday: Omit<Holiday, 'id'>) => {
    try {
      setLoading(true);

      const response = await axios.post('http://localhost:3001/api/holidays', holiday);
      setHolidays([...holidays, response.data]);

      setLoading(false);
    } catch (error) {
      console.error('Erreur lors de l\'ajout du jour férié:', error);
      setLoading(false);
      alert('Erreur lors de l\'ajout du jour férié');
    }
  };

  return (
    <div className="p-6">
      <div className="flex items-center gap-3 mb-6">
        <Calendar className="h-8 w-8 text-ivory-orange" />
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Calendrier</h1>
          <p className="text-muted-foreground mt-1">Configuration du système de calendrier</p>
        </div>
      </div>

      {loading ? (
        <div className="flex items-center justify-center h-64">
          <Loader2 className="h-8 w-8 animate-spin text-ivory-orange" />
          <span className="ml-2">Chargement des données...</span>
        </div>
      ) : (
        <div className="space-y-6">
          {/* Paramètres généraux */}
          <Card>
            <CardHeader>
              <CardTitle>Paramètres généraux</CardTitle>
              <CardDescription>Configuration de base du calendrier</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div>
                <Label htmlFor="timezone">Fuseau horaire</Label>
                <Input
                  id="timezone"
                  value={timezone}
                  onChange={(e) => setTimezone(e.target.value)}
                  className="mt-2"
                />
              </div>

            <div className="grid grid-cols-2 gap-4">
              <div>
                <Label htmlFor="work-start">Heure de début</Label>
                <Input
                  id="work-start"
                  type="time"
                  value={workHours.start}
                  onChange={(e) => setWorkHours({...workHours, start: e.target.value})}
                  className="mt-2"
                />
              </div>
              <div>
                <Label htmlFor="work-end">Heure de fin</Label>
                <Input
                  id="work-end"
                  type="time"
                  value={workHours.end}
                  onChange={(e) => setWorkHours({...workHours, end: e.target.value})}
                  className="mt-2"
                />
              </div>
            </div>

            <div>
              <Label>Premier jour de la semaine</Label>
              <div className="flex gap-4 mt-2">
                <Button
                  variant={weekStart === 'monday' ? 'default' : 'outline'}
                  onClick={() => setWeekStart('monday')}
                >
                  Lundi
                </Button>
                <Button
                  variant={weekStart === 'sunday' ? 'default' : 'outline'}
                  onClick={() => setWeekStart('sunday')}
                >
                  Dimanche
                </Button>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Jours fériés */}
        <Card>
          <CardHeader>
            <CardTitle>Jours fériés</CardTitle>
            <CardDescription>Gestion des jours fériés et congés</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {holidays.map((holiday) => (
                <div key={holiday.id} className="flex items-center justify-between p-3 border rounded-lg">
                  <div className="flex items-center gap-3">
                    <CalendarDays className="h-5 w-5 text-muted-foreground" />
                    <div>
                      <div className="font-medium">{holiday.name}</div>
                      <div className="text-sm text-muted-foreground">
                        {holiday.date} • {holiday.country} • {holiday.type}
                      </div>
                      {holiday.description && (
                        <div className="text-xs text-muted-foreground mt-1">
                          {holiday.description}
                        </div>
                      )}
                    </div>
                  </div>
                  <div className="flex items-center gap-2">
                    <Badge variant={holiday.recurring ? 'default' : 'outline'}>
                      {holiday.recurring ? 'Récurrent' : 'Ponctuel'}
                    </Badge>
                    <Badge variant={holiday.active ? 'success' : 'destructive'}>
                      {holiday.active ? 'Actif' : 'Inactif'}
                    </Badge>
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={async () => {
                        if (confirm(`Êtes-vous sûr de vouloir supprimer "${holiday.name}" ?`)) {
                          try {
                            await axios.delete(`http://localhost:3001/api/holidays/${holiday.id}`);
                            setHolidays(holidays.filter(h => h.id !== holiday.id));
                          } catch (error) {
                            console.error('Erreur lors de la suppression:', error);
                            alert('Erreur lors de la suppression du jour férié');
                          }
                        }
                      }}
                    >
                      Supprimer
                    </Button>
                  </div>
                </div>
              ))}
            </div>

            <Button
              className="mt-4 bg-ivory-orange hover:bg-ivory-orange/90"
              onClick={() => {
                const name = prompt('Nom du jour férié:');
                const date = prompt('Date (YYYY-MM-DD):', new Date().toISOString().split('T')[0]);

                if (name && date) {
                  addHoliday({
                    name,
                    date,
                    country: 'France',
                    recurring: confirm('Est-ce un jour férié récurrent chaque année?'),
                    type: 'national',
                    description: prompt('Description (optionnelle):') || '',
                    active: true
                  });
                }
              }}
            >
              <Plus className="h-4 w-4 mr-2" />
              Ajouter un jour férié
            </Button>
          </CardContent>
        </Card>

        {/* Intégrations */}
        <Card>
          <CardHeader>
            <CardTitle>Intégrations</CardTitle>
            <CardDescription>Connexion avec des calendriers externes</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            {integrations.length > 0 ? (
              integrations.map(integration => (
                <div key={integration.id} className="flex items-center justify-between p-3 border rounded-lg">
                  <div className="flex items-center gap-3">
                    <Globe className="h-5 w-5 text-muted-foreground" />
                    <div>
                      <div className="font-medium">{integration.name}</div>
                      <div className="text-sm text-muted-foreground">
                        {integration.userName ? `Connecté à ${integration.userName}` : 'Non connecté'}
                      </div>
                      {integration.lastSync && (
                        <div className="text-xs text-muted-foreground">
                          Dernière synchronisation: {new Date(integration.lastSync).toLocaleString()}
                          {integration.lastSyncStatus && ` (${integration.lastSyncStatus})`}
                        </div>
                      )}
                    </div>
                  </div>
                  <div>
                    <Badge variant={integration.active ? 'success' : 'outline'}>
                      {integration.active ? 'Actif' : 'Inactif'}
                    </Badge>
                    <Button variant="outline" className="ml-2">
                      {integration.userName ? 'Déconnecter' : 'Connecter'}
                    </Button>
                  </div>
                </div>
              ))
            ) : (
              <>
                <div className="flex items-center justify-between p-3 border rounded-lg">
                  <div className="flex items-center gap-3">
                    <Globe className="h-5 w-5 text-muted-foreground" />
                    <div>
                      <div className="font-medium">Google Calendar</div>
                      <div className="text-sm text-muted-foreground">
                        Non connecté
                      </div>
                    </div>
                  </div>
                  <Button variant="outline">
                    Connecter
                  </Button>
                </div>

                <div className="flex items-center justify-between p-3 border rounded-lg">
                  <div className="flex items-center gap-3">
                    <CalendarCheck className="h-5 w-5 text-muted-foreground" />
                    <div>
                      <div className="font-medium">Outlook Calendar</div>
                      <div className="text-sm text-muted-foreground">
                        Non connecté
                      </div>
                    </div>
                  </div>
                  <Button variant="outline">
                    Connecter
                  </Button>
                </div>
              </>
            )}
          </CardContent>
        </Card>

        {/* Bouton de sauvegarde */}
        <div className="flex justify-end mt-6">
          <Button
            className="bg-ivory-orange hover:bg-ivory-orange/90"
            onClick={saveCalendarConfig}
            disabled={loading}
          >
            {loading ? (
              <>
                <Loader2 className="h-4 w-4 mr-2 animate-spin" />
                Enregistrement...
              </>
            ) : (
              'Enregistrer les modifications'
            )}
          </Button>
        </div>
      </div>
      )}
    </div>
  );
};

export default CalendarSettings;