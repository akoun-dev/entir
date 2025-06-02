import React from 'react';
import { Book, Calendar, CalendarClock, User } from 'lucide-react';

/**
 * Éléments de sous-navigation standardisés pour le module de formation
 * Permet de réutiliser les mêmes éléments dans toutes les vues du module
 */
export const getTrainingSubNavItems = () => [
  { path: "/hr/training/courses", label: "Catalogue", icon: <Book className="h-4 w-4" /> },
  { path: "/hr/training/sessions", label: "Sessions à venir", icon: <CalendarClock className="h-4 w-4" /> },
  { path: "/hr/training/calendar", label: "Calendrier", icon: <Calendar className="h-4 w-4" /> },
  { path: "/hr/training/enrollments", label: "Inscriptions", icon: <User className="h-4 w-4" /> }
];

export default getTrainingSubNavItems;
