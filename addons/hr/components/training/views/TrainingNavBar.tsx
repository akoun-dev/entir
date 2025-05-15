
import React from 'react';
import { NavLink } from 'react-router-dom';
import { Book, Calendar, CalendarClock, User } from 'lucide-react';

const TrainingNavBar: React.FC = () => {
  return (
    <div className="bg-background border rounded-md mb-6">
      <nav className="flex flex-col md:flex-row">
        <NavLink 
          to="/hr/training/courses" 
          className={({ isActive }) => 
            `flex items-center gap-2 py-3 px-6 border-b md:border-b-0 md:border-r transition-colors
            ${isActive ? 'text-primary font-medium bg-accent/30' : 'hover:bg-accent/20'}`
          }
        >
          <Book className="h-4 w-4" />
          <span>Catalogue</span>
        </NavLink>
        
        <NavLink 
          to="/hr/training/sessions" 
          className={({ isActive }) => 
            `flex items-center gap-2 py-3 px-6 border-b md:border-b-0 md:border-r transition-colors
            ${isActive ? 'text-primary font-medium bg-accent/30' : 'hover:bg-accent/20'}`
          }
        >
          <CalendarClock className="h-4 w-4" />
          <span>Sessions à venir</span>
        </NavLink>
        
        <NavLink 
          to="/hr/training/calendar" 
          className={({ isActive }) => 
            `flex items-center gap-2 py-3 px-6 border-b md:border-b-0 md:border-r transition-colors
            ${isActive ? 'text-primary font-medium bg-accent/30' : 'hover:bg-accent/20'}`
          }
        >
          <Calendar className="h-4 w-4" />
          <span>Calendrier</span>
        </NavLink>
        
        <NavLink 
          to="/hr/training/enrollments" 
          className={({ isActive }) => 
            `flex items-center gap-2 py-3 px-6 transition-colors
            ${isActive ? 'text-primary font-medium bg-accent/30' : 'hover:bg-accent/20'}`
          }
        >
          <User className="h-4 w-4" />
          <span>Inscriptions</span>
        </NavLink>
      </nav>
    </div>
  );
};

export default TrainingNavBar;
