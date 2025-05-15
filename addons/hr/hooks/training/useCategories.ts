
import { useState, useCallback } from 'react';
import { TrainingCategory } from '../../types';
import { trainingCategories } from '../../data/trainings';

export const useCategories = () => {
  const [categories] = useState<TrainingCategory[]>(trainingCategories);

  const getCategories = useCallback(() => {
    return categories;
  }, [categories]);

  const getCategoryById = useCallback((id: string) => {
    return categories.find(category => category.id === id);
  }, [categories]);

  return {
    categories,
    getCategories,
    getCategoryById
  };
};
