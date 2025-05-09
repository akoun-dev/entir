
import React from 'react';
import { NavLink } from 'react-router-dom';
import { Users, Building2, FileText, GraduationCap, Briefcase, LayoutDashboard } from 'lucide-react';

/**
 * Composant de navigation pour le module RH
 * Design basé sur le menu du tableau de bord HR
 */
export const HrNavigation: React.FC = () => {
  // Définition des liens du menu
  const menuLinks = [
    { to: "/hr", icon: <LayoutDashboard className="h-4 w-4" />, label: "Tableau de bord", end: true },
    { to: "/hr/employees", icon: <Users className="h-4 w-4" />, label: "Employés" },
    { to: "/hr/departments", icon: <Building2 className="h-4 w-4" />, label: "Départements" },
    { to: "/hr/contracts", icon: <FileText className="h-4 w-4" />, label: "Contrats" },
    { to: "/hr/recruitment", icon: <Briefcase className="h-4 w-4" />, label: "Recrutement" },
    { to: "/hr/training", icon: <GraduationCap className="h-4 w-4" />, label: "Formation" }
  ];

  // Style commun pour les liens
  const getLinkClassName = (isActive: boolean) => `
    flex items-center gap-2 px-3 py-2 rounded-md text-sm font-medium transition-colors
    ${isActive
      ? 'bg-ivory-orange text-white shadow-sm'
      : 'text-muted-foreground hover:text-foreground hover:bg-muted/50'
    }
  `;

  return (
    <div className="mb-8 overflow-x-auto">
      <nav className="flex space-x-1 border border-muted bg-card p-1 rounded-lg shadow-sm min-w-max">
        {menuLinks.map((link, index) => (
          <NavLink
            key={index}
            to={link.to}
            end={link.end}
            className={({ isActive }) => getLinkClassName(isActive)}
          >
            <span className="mr-2">{link.icon}</span>
            {link.label}
          </NavLink>
        ))}
      </nav>
    </div>
  );
};
