import React, { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '../../components/ui/card';
import { Button } from '../../components/ui/button';
import { Input } from '../../components/ui/input';
import { Switch } from '../../components/ui/switch';
import { Badge } from '../../components/ui/badge';
import { Label } from '../../components/ui/label';
import { Calendar, Clock, Globe, CalendarDays, CalendarCheck, Plus } from 'lucide-react';

interface Holiday {
  id: string;
  name: string;
  date: string;
  country: string;
  recurring: boolean;
}

const CalendarSettings: React.FC = () => {
  const [timezone, setTimezone] = useState('Europe/Paris');
  const [workHours, setWorkHours] = useState({ start: '08:00', end: '18:00' });
  const [weekStart, setWeekStart] = useState('monday');
  const [holidays, setHolidays] = useState<Holiday[]>([
    { id: '1', name: 'Nouvel An', date: '2023-01-01', country: 'France', recurring: true },
    { id: '2', name: 'Fête du Travail', date: '2023-05-01', country: 'France', recurring: true },
    { id: '3', name: 'Noël', date: '2023-12-25', country: 'France', recurring: true }
  ]);

  return (
    <div className="p-6">
      <div className="flex items-center gap-3 mb-6">
        <Calendar className="h-8 w-8 text-ivory-orange" />
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Calendrier</h1>
          <p className="text-muted-foreground mt-1">Configuration du système de calendrier</p>
        </div>
      </div>

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
                        {holiday.date} • {holiday.country}
                      </div>
                    </div>
                  </div>
                  <Badge variant={holiday.recurring ? 'default' : 'outline'}>
                    {holiday.recurring ? 'Récurrent' : 'Ponctuel'}
                  </Badge>
                </div>
              ))}
            </div>

            <Button className="mt-4 bg-ivory-orange hover:bg-ivory-orange/90">
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
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default CalendarSettings;