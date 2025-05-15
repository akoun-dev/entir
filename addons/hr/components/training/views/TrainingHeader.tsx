
import React from 'react';
import { GraduationCap, Plus } from 'lucide-react';
import { Button } from '../../../../../src/components/ui/button';
import { Link } from 'react-router-dom';

const TrainingHeader: React.FC = () => {
  return (
    <div className="mb-6">
      <div className="flex items-center gap-3 mt-4">
        <div className="h-6 w-1.5 bg-amber-500 rounded-full"></div>
        <GraduationCap className="h-6 w-6 text-amber-500" />
        <h1 className="text-2xl font-bold">Gestion des Formations</h1>
      </div>
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center mt-4 gap-4">
        <p className="text-muted-foreground">
          Planifiez, gérez et suivez les formations des employés
        </p>
        <div className="flex gap-2">
          <Button size="sm" variant="outline" asChild>
            <Link to="/hr/training/sessions">
              Voir toutes les sessions
            </Link>
          </Button>
          <Button size="sm" asChild>
            <Link to="/hr/training/courses/new">
              <Plus className="h-4 w-4 mr-1" />
              Nouvelle formation
            </Link>
          </Button>
        </div>
      </div>
    </div>
  );
};

export default TrainingHeader;
