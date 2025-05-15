
import React from 'react';
import { Button } from '../../../../../src/components/ui/button';
import { RotateCcw } from 'lucide-react';

interface ConfigCardFooterProps {
  onReset: () => void;
  onClose?: () => void;
}

const ConfigCardFooter: React.FC<ConfigCardFooterProps> = ({ onReset, onClose }) => {
  return (
    <div className="flex justify-end mt-6 gap-2">
      <Button 
        variant="outline" 
        size="sm"
        onClick={onReset}
        className="flex items-center gap-1"
      >
        <RotateCcw className="h-3.5 w-3.5" />
        Réinitialiser
      </Button>
      {onClose && (
        <Button size="sm" onClick={onClose}>
          Fermer
        </Button>
      )}
    </div>
  );
};

export default ConfigCardFooter;
