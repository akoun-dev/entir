
import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Button } from '../../../../../src/components/ui/button';
import { Input } from '../../../../../src/components/ui/input';
import { Search, Plus, Filter, Calendar, Printer } from 'lucide-react';
import { useTraining } from '../../../hooks/useTraining';
import TrainingSessionCard from '../TrainingSessionCard';

const SessionTabContent: React.FC = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const { sessions, courses } = useTraining();
  
  // Filter sessions based on search query
  const filteredSessions = sessions.filter(session => {
    if (!searchQuery) return true;
    
    // Get associated course
    const course = courses.find(c => c.id === session.course_id);
    
    return (
      course?.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      session.location?.toLowerCase().includes(searchQuery.toLowerCase())
    );
  });

  return (
    <div className="space-y-6">
      {/* Search and filters */}
      <div className="flex flex-col sm:flex-row gap-4 items-center">
        <div className="relative flex-1">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
          <Input
            placeholder="Rechercher une session..."
            className="pl-10"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
        </div>
        <div className="flex gap-2 self-end">
          <Button variant="outline" size="sm">
            <Filter className="h-4 w-4 mr-2" />
            Filtres
          </Button>
          <Link to="/hr/training/calendar">
            <Button variant="outline" size="sm">
              <Calendar className="h-4 w-4 mr-2" />
              Calendrier
            </Button>
          </Link>
          <Button size="sm">
            <Plus className="h-4 w-4 mr-2" />
            Créer
          </Button>
        </div>
      </div>

      {/* Sessions list */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
        {filteredSessions.map(session => {
          // Find the course for this session
          const course = courses.find(c => c.id === session.course_id);
          // Convert status to compatible format (changing 'cancelled' to 'canceled')
          const compatibleStatus = session.status === 'cancelled' ? 'canceled' : session.status;
          
          return (
            <TrainingSessionCard 
              key={session.id} 
              session={{
                ...session,
                status: compatibleStatus,
                // Use course title as name since session doesn't have a name
                name: course?.title || 'Session sans titre'
              }}
              courseName={course?.title || 'Formation inconnue'}
              actions={
                <Link to={`/hr/training/document/session/${session.id}`} className="block mt-2">
                  <Button variant="outline" size="sm" className="w-full">
                    <Printer className="h-4 w-4 mr-2" />
                    Imprimer
                  </Button>
                </Link>
              }
            />
          );
        })}
        
        {filteredSessions.length === 0 && (
          <div className="col-span-full text-center py-10">
            <Calendar className="w-12 h-12 mx-auto text-muted-foreground" />
            <h3 className="mt-4 text-lg font-medium">Aucune session trouvée</h3>
            <p className="text-sm text-muted-foreground">
              {searchQuery ? "Essayez de modifier vos critères de recherche." : "Aucune session n'a été planifiée."}
            </p>
          </div>
        )}
      </div>
    </div>
  );
};

export default SessionTabContent;
