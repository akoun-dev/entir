import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from '../../../../src/components/ui/breadcrumb';

/**
 * Structure d'un élément du fil d'Ariane
 */
interface BreadcrumbItem {
  label: string;
  path?: string;
  icon?: React.ReactNode;
}

/**
 * Propriétés du composant HrBreadcrumb
 */
interface HrBreadcrumbProps {
  items: BreadcrumbItem[];
}

/**
 * Composant de fil d'Ariane standardisé pour le module HR
 * Permet d'afficher un fil d'Ariane cohérent dans toutes les vues
 */
export const HrBreadcrumb: React.FC<HrBreadcrumbProps> = ({ items }) => {
  const location = useLocation();
  
  // Vérifier si nous sommes sur la dernière page du fil d'Ariane
  const isCurrentPage = (path?: string) => {
    if (!path) return false;
    return location.pathname === path;
  };

  return (
    <Breadcrumb className="mb-6">
      <BreadcrumbList>
        {/* Élément racine RH */}
        <BreadcrumbItem>
          <BreadcrumbLink asChild>
            <Link to="/hr">RH</Link>
          </BreadcrumbLink>
        </BreadcrumbItem>
        <BreadcrumbSeparator />
        
        {/* Éléments dynamiques */}
        {items.map((item, index) => (
          <React.Fragment key={index}>
            <BreadcrumbItem>
              {index === items.length - 1 || !item.path ? (
                <BreadcrumbPage>{item.label}</BreadcrumbPage>
              ) : (
                <BreadcrumbLink asChild>
                  <Link to={item.path}>{item.label}</Link>
                </BreadcrumbLink>
              )}
            </BreadcrumbItem>
            {index < items.length - 1 && <BreadcrumbSeparator />}
          </React.Fragment>
        ))}
      </BreadcrumbList>
    </Breadcrumb>
  );
};

export default HrBreadcrumb;
