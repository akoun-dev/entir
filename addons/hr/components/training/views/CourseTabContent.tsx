
import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Button } from '../../../../../src/components/ui/button';
import { Input } from '../../../../../src/components/ui/input';
import {
  Search,
  Plus,
  Filter,
  FileText,
  Printer
} from 'lucide-react';
import { useTraining } from '../../../hooks/useTraining';
import TrainingCourseCard from '../TrainingCourseCard';
import { TrainingFilters } from '..';

const CourseTabContent: React.FC = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [showFilters, setShowFilters] = useState(false);
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);

  const { courses, categories } = useTraining();

  // Filter courses based on search query and category
  const filteredCourses = courses.filter(course => {
    const matchesSearch = !searchQuery ||
      course.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      course.description?.toLowerCase().includes(searchQuery.toLowerCase());

    const matchesCategory = !selectedCategory || course.category_id === selectedCategory;

    return matchesSearch && matchesCategory;
  });

  return (
    <div className="space-y-6">
      {/* Search and filters */}
      <div className="flex flex-col sm:flex-row gap-4 items-center">
        <div className="relative flex-1">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
          <Input
            placeholder="Rechercher une formation..."
            className="pl-10"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
        </div>
        <div className="flex gap-2 self-end">
          <Button
            variant="outline"
            size="sm"
            onClick={() => setShowFilters(!showFilters)}
          >
            <Filter className="h-4 w-4 mr-2" />
            Filtres
          </Button>
          <Button size="sm" asChild>
            <Link to="/hr/training/courses/new">
              <Plus className="h-4 w-4 mr-2" />
              Créer
            </Link>
          </Button>
        </div>
      </div>

      {/* Filters */}
      {showFilters && (
        <TrainingFilters
          categories={categories}
          selectedCategory={selectedCategory}
          onCategoryChange={setSelectedCategory}
        />
      )}

      {/* Course list */}
      <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-4">
        {filteredCourses.map(course => {
          // Find category name from category_id
          const categoryName = categories.find(cat => cat.id === course.category_id)?.name || 'Non catégorisé';

          return (
            <TrainingCourseCard
              key={course.id}
              course={course}
              category={categoryName}
              actions={
                <Link to={`/hr/training/document/course/${course.id}`} className="block mt-2">
                  <Button variant="outline" size="sm" className="w-full">
                    <Printer className="h-4 w-4 mr-2" />
                    Imprimer
                  </Button>
                </Link>
              }
            />
          );
        })}

        {filteredCourses.length === 0 && (
          <div className="col-span-full text-center py-10">
            <FileText className="w-12 h-12 mx-auto text-muted-foreground" />
            <h3 className="mt-4 text-lg font-medium">Aucune formation trouvée</h3>
            <p className="text-sm text-muted-foreground">
              {searchQuery ? "Essayez de modifier vos critères de recherche." : "Aucune formation n'a été ajoutée."}
            </p>
          </div>
        )}
      </div>
    </div>
  );
};

export default CourseTabContent;
