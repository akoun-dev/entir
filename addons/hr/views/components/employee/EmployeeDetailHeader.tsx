
import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Button } from '../../../../../src/components/ui/button';
import { ArrowLeft, Edit, Trash2, FileText } from 'lucide-react';

interface EmployeeDetailHeaderProps {
  id: string;
  onDelete?: () => void;
}

const EmployeeDetailHeader: React.FC<EmployeeDetailHeaderProps> = ({ id, onDelete }) => {
  const navigate = useNavigate();
  
  return (
    <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-8 gap-4">
      <div>
        <h1 className="text-3xl font-bold tracking-tight">Fiche employé</h1>
        <p className="text-muted-foreground mt-1">Détails et informations de l'employé</p>
      </div>
      <div className="flex items-center gap-3">
        <Button variant="outline" size="sm" className="flex items-center gap-2" onClick={() => navigate('/hr/employees')}>
          <ArrowLeft size={16} />
          Retour
        </Button>
        <Button variant="outline" size="sm" className="flex items-center gap-2" onClick={() => navigate(`/hr/employees/profile/${id}`)}>
          <FileText size={16} />
          Profil
        </Button>
        <Button variant="outline" size="sm" className="flex items-center gap-2" onClick={() => navigate(`/hr/employees/${id}/edit`)}>
          <Edit size={16} />
          Modifier
        </Button>
        {onDelete && (
          <Button variant="destructive" size="sm" className="flex items-center gap-2" onClick={onDelete}>
            <Trash2 size={16} />
            Supprimer
          </Button>
        )}
      </div>
    </div>
  );
};

export default EmployeeDetailHeader;
