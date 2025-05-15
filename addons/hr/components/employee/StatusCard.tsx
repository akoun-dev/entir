
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '../../../../src/components/ui/card';
import { Switch } from '../../../../src/components/ui/switch';
import { Label } from '../../../../src/components/ui/label';

interface StatusCardProps {
  isActive: boolean;
  onStatusChange: (checked: boolean) => void;
}

const StatusCard: React.FC<StatusCardProps> = ({ isActive, onStatusChange }) => {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Statut</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="flex items-center justify-between">
          <Label htmlFor="is_active" className="font-medium">Actif</Label>
          <Switch
            id="is_active"
            checked={isActive}
            onCheckedChange={onStatusChange}
          />
        </div>
      </CardContent>
    </Card>
  );
};

export default StatusCard;
