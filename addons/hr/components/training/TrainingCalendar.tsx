
import React, { useState } from 'react';
import { Calendar } from '../../../../src/components/ui/calendar';
import { Card, CardContent, CardHeader, CardTitle } from '../../../../src/components/ui/card';
import { TrainingSession, TrainingCourse } from '../../types';
import { format, isSameDay, isWithinInterval, parseISO } from 'date-fns';
import { fr } from 'date-fns/locale';

interface TrainingCalendarProps {
  sessions: TrainingSession[];
  courses: TrainingCourse[];
  onSessionSelect?: (sessionId: string) => void;
}

interface CalendarDay {
  date: Date;
  sessions: Array<{
    id: string;
    title: string;
    location: string;
  }>;
}

const TrainingCalendar: React.FC<TrainingCalendarProps> = ({ sessions, courses, onSessionSelect }) => {
  const [selectedDate, setSelectedDate] = useState<Date | undefined>(new Date());
  const [selectedDay, setSelectedDay] = useState<CalendarDay | null>(null);
  
  // Helper to get course title
  const getCourseTitle = (courseId: string) => {
    const course = courses.find(c => c.id === courseId);
    return course?.title || 'Cours inconnu';
  };
  
  // Mark dates with sessions
  const getSessionsForDate = (date: Date): string[] => {
    return sessions
      .filter(session => {
        const start = parseISO(session.start_date);
        const end = parseISO(session.end_date);
        return isWithinInterval(date, { start, end }) || 
               isSameDay(date, start) || 
               isSameDay(date, end);
      })
      .map(session => session.id);
  };

  const handleDateSelect = (date: Date | undefined) => {
    if (!date) return;
    
    setSelectedDate(date);
    
    // Find sessions for this date
    const sessionsForDay = sessions.filter(session => {
      const start = parseISO(session.start_date);
      const end = parseISO(session.end_date);
      return isWithinInterval(date, { start, end }) || 
             isSameDay(date, start) || 
             isSameDay(date, end);
    });
    
    if (sessionsForDay.length > 0) {
      setSelectedDay({
        date,
        sessions: sessionsForDay.map(session => ({
          id: session.id,
          title: getCourseTitle(session.course_id),
          location: session.location
        }))
      });
    } else {
      setSelectedDay(null);
    }
  };

  const handleSessionClick = (sessionId: string) => {
    if (onSessionSelect) {
      onSessionSelect(sessionId);
    }
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle>Calendrier des formations</CardTitle>
      </CardHeader>
      <CardContent className="flex flex-col md:flex-row gap-6">
        <div className="flex-1">
          <Calendar
            mode="single"
            selected={selectedDate}
            onSelect={handleDateSelect}
            className="rounded-md border"
            locale={fr}
            modifiers={{
              hasSession: (date) => getSessionsForDate(date).length > 0
            }}
            modifiersClassNames={{
              hasSession: "bg-primary/20 font-medium text-primary"
            }}
          />
        </div>
        
        <div className="flex-1">
          {selectedDay ? (
            <div>
              <h3 className="font-medium mb-3">
                Sessions du {format(selectedDay.date, 'dd MMMM yyyy', { locale: fr })}
              </h3>
              
              <div className="space-y-3">
                {selectedDay.sessions.map((session) => (
                  <div 
                    key={session.id} 
                    className="p-3 border rounded-md hover:bg-muted/50 cursor-pointer"
                    onClick={() => handleSessionClick(session.id)}
                  >
                    <div className="font-medium">{session.title}</div>
                    <div className="text-sm text-muted-foreground">{session.location}</div>
                  </div>
                ))}
              </div>
            </div>
          ) : (
            <div className="text-center py-8 text-muted-foreground">
              {selectedDate ? (
                <>
                  <p>Aucune session ce jour</p>
                  <p className="text-sm mt-1">
                    {format(selectedDate, 'dd MMMM yyyy', { locale: fr })}
                  </p>
                </>
              ) : (
                <p>Veuillez sélectionner une date</p>
              )}
            </div>
          )}
        </div>
      </CardContent>
    </Card>
  );
};

export default TrainingCalendar;
