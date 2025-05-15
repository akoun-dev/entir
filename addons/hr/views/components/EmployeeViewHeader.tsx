
import React from 'react';
import { Link } from 'react-router-dom';
import { Download, Plus, Users } from 'lucide-react';
import { Button } from '../../../../src/components/ui/button';

export const EmployeeViewHeader: React.FC = () => {
  return (
    <div className="mb-6">
      {/* Titre avec icône */}
      <div className="flex items-center gap-3 mt-4">
        <div className="h-6 w-1.5 bg-amber-500 rounded-full"></div>
        <Users className="h-6 w-6 text-amber-500" />
        <h1 className="text-2xl font-bold">Gestion des Employés</h1>
      </div>

      {/* Description et boutons d'action */}
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center mt-4 gap-4">
        <p className="text-muted-foreground">
          Créez et gérez les fiches des employés
        </p>
        <div className="flex items-center gap-3">
          <Button variant="outline" size="sm" className="flex items-center gap-2">
            <Download size={16} />
            Exporter
          </Button>
          <Button size="sm" className="flex items-center gap-2 bg-ivory-orange hover:bg-ivory-orange/90" asChild>
            <Link to="/hr/employees/new">
              <Plus size={16} />
              Nouvel employé
            </Link>
          </Button>
        </div>
      </div>
    </div>
  );
};

export default EmployeeViewHeader;
