import React from 'react';
import { Button } from '../../../../src/components/ui/button';
import { ArrowLeft } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

/**
 * Propriétés du composant HrPageHeader
 */
interface HrPageHeaderProps {
  title: string;
  subtitle?: string;
  icon?: React.ReactNode;
  accentColor?: string;
  backLink?: string;
  actions?: React.ReactNode;
}

/**
 * Composant d'en-tête standardisé pour les pages du module HR
 * Permet d'afficher un en-tête cohérent dans toutes les vues
 */
export const HrPageHeader: React.FC<HrPageHeaderProps> = ({
  title,
  subtitle,
  icon,
  accentColor = 'bg-amber-500',
  backLink,
  actions
}) => {
  const navigate = useNavigate();
  
  const handleBack = () => {
    if (backLink) {
      navigate(backLink);
    } else {
      navigate(-1);
    }
  };

  return (
    <div className="mb-6">
      <div className="flex items-center gap-3 mt-4">
        <div className={`h-6 w-1.5 ${accentColor} rounded-full`}></div>
        {icon && <span className={`h-6 w-6 text-${accentColor.replace('bg-', '')}`}>{icon}</span>}
        <h1 className="text-2xl font-bold">{title}</h1>
      </div>
      
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center mt-4 gap-4">
        {subtitle && (
          <p className="text-muted-foreground">
            {subtitle}
          </p>
        )}
        
        <div className="flex items-center gap-3">
          {backLink && (
            <Button variant="outline" size="sm" className="flex items-center gap-2" onClick={handleBack}>
              <ArrowLeft size={16} />
              Retour
            </Button>
          )}
          
          {actions}
        </div>
      </div>
    </div>
  );
};

export default HrPageHeader;
