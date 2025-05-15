
import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Card, CardContent, CardHeader, CardTitle } from '../../../../src/components/ui/card';
import { Button } from '../../../../src/components/ui/button';
import { ArrowLeft, Save, Trash } from 'lucide-react';

interface ActionsCardProps {
  isNewEmployee: boolean;
  onSave: () => void;
  onDelete?: () => void;
}

const ActionsCard: React.FC<ActionsCardProps> = ({ isNewEmployee, onSave, onDelete }) => {
  const navigate = useNavigate();
  
  return (
    <Card>
      <CardHeader>
        <CardTitle>Actions</CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        <Button type="button" onClick={onSave} className="w-full bg-ivory-orange hover:bg-amber-600">
          <Save className="mr-2 h-4 w-4" />
          Enregistrer
        </Button>
        
        <Button type="button" variant="outline" className="w-full" onClick={() => navigate('/hr/employees')}>
          <ArrowLeft className="mr-2 h-4 w-4" />
          Annuler
        </Button>
        
        {!isNewEmployee && (
          <Button type="button" variant="destructive" className="w-full" onClick={onDelete}>
            <Trash className="mr-2 h-4 w-4" />
            Supprimer
          </Button>
        )}
      </CardContent>
    </Card>
  );
};

export default ActionsCard;
