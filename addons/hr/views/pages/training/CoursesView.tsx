
import React, { useState } from 'react';
import { HrLayout, HrSubNavigation, HrBreadcrumb } from '../../components';
import { useTraining } from '../../../hooks/useTraining';
import { TrainingHeader, CourseTabContent } from '../../../components/training/views';
import { TrainingStats, getTrainingSubNavItems } from '../../../components/training';

const CoursesView: React.FC = () => {
  // Filter states
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [selectedLevel, setSelectedLevel] = useState('all');

  // Get data from hooks
  const {
    courses,
    categories,
    getCategories,
    getCategoryById,
    getSessionsByCourse,
    getEnrollmentsBySession,
    getTrainingStats
  } = useTraining();

  const stats = getTrainingStats();

  // Filtering
  const filteredCourses = courses.filter(course => {
    // Filter by search query
    const matchesSearch = searchQuery === '' ||
      course.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      course.description.toLowerCase().includes(searchQuery.toLowerCase());

    // Filter by category
    const matchesCategory = selectedCategory === 'all' || course.category_id === selectedCategory;

    // Filter by level
    const matchesLevel = selectedLevel === 'all' || course.level === selectedLevel;

    return matchesSearch && matchesCategory && matchesLevel;
  });

  // Extract unique levels from courses
  const availableLevels = Array.from(new Set(courses.map(course => course.level)));

  // Utilisation des éléments de sous-navigation standardisés
  const subNavItems = getTrainingSubNavItems();

  return (
    <HrLayout>
      <div>
        {/* Fil d'Ariane */}
        <HrBreadcrumb
          items={[
            { label: 'Formation', path: '/hr/training' },
            { label: 'Catalogue de cours' }
          ]}
        />

        {/* En-tête avec fil d'Ariane */}
        <TrainingHeader />

        {/* Navigation standardisée */}
        <HrSubNavigation items={subNavItems} />

        {/* Statistiques */}
        <TrainingStats stats={stats} categories={categories} />

        {/* Courses content */}
        <CourseTabContent />
      </div>
    </HrLayout>
  );
};

export default CoursesView;
