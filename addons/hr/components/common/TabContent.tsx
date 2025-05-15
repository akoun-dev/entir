
import React, { ReactNode } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '../../../../src/components/ui/card';
import { LucideIcon } from 'lucide-react';

interface TabContentProps {
  icon?: LucideIcon;
  title: string;
  description?: string;
  children: ReactNode;
  className?: string;
  headerAction?: React.ReactNode;
}

/**
 * Composant réutilisable pour le contenu des onglets
 * Peut être utilisé dans les formulaires d'employé, de département, etc.
 */
const TabContent: React.FC<TabContentProps> = ({
  icon: Icon,
  title,
  description,
  children,
  className = '',
  headerAction,
}) => {
  return (
    <Card className={`${className} border-ivory-orange/20 shadow-md hover:shadow-lg transition-shadow`}>
      <CardHeader className="bg-secondary/20 border-b border-border/50">
        <div className="flex items-center justify-between">
          <div>
            <CardTitle className="flex items-center gap-2 text-xl">
              {Icon && <Icon className="h-5 w-5 text-ivory-orange" />}
              {title}
            </CardTitle>
            {description && <CardDescription className="text-sm">{description}</CardDescription>}
          </div>
          {headerAction && <div>{headerAction}</div>}
        </div>
      </CardHeader>
      <CardContent className="p-6 space-y-6">
        {children}
      </CardContent>
    </Card>
  );
};

export default TabContent;
