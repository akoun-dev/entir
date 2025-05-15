
import React from 'react';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '../../../../src/components/ui/select';
import { Input } from '../../../../src/components/ui/input';
import { TrainingCategory } from '../../types';
import { Search } from 'lucide-react';

interface TrainingFiltersProps {
  categories: TrainingCategory[];
  selectedCategory: string | null;
  onCategoryChange: (value: string) => void;
  searchQuery?: string;
  onSearchChange?: (value: string) => void;
  levels?: string[];
  selectedLevel?: string;
  onLevelChange?: (value: string) => void;
}

const TrainingFilters: React.FC<TrainingFiltersProps> = ({
  categories,
  selectedCategory,
  onCategoryChange,
  searchQuery,
  onSearchChange,
  levels,
  selectedLevel,
  onLevelChange
}) => {
  return (
    <div className="flex flex-col md:flex-row gap-4">
      {searchQuery !== undefined && onSearchChange && (
        <div className="relative flex-grow">
          <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
          <Input
            placeholder="Rechercher des formations..."
            className="pl-9"
            value={searchQuery}
            onChange={(e) => onSearchChange(e.target.value)}
          />
        </div>
      )}
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 md:flex">
        <Select value={selectedCategory || ''} onValueChange={onCategoryChange}>
          <SelectTrigger className="w-full md:w-[180px]">
            <SelectValue placeholder="Catégorie" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="">Toutes les catégories</SelectItem>
            {categories.map((category) => (
              <SelectItem key={category.id} value={category.id}>
                {category.name}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
        
        {levels && selectedLevel !== undefined && onLevelChange && (
          <Select value={selectedLevel} onValueChange={onLevelChange}>
            <SelectTrigger className="w-full md:w-[180px]">
              <SelectValue placeholder="Niveau" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">Tous les niveaux</SelectItem>
              {levels.map((level) => (
                <SelectItem key={level} value={level}>
                  {level.charAt(0).toUpperCase() + level.slice(1)}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        )}
      </div>
    </div>
  );
};

export default TrainingFilters;
