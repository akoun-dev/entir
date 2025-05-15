
import { useState, useCallback } from 'react';
import { v4 as uuidv4 } from 'uuid';
import { TrainingCourse } from '../../types';
import { trainingCourses } from '../../data/trainings';
import { useToast } from '../../../../src/hooks/use-toast';

export const useCourses = () => {
  const [courses, setCourses] = useState<TrainingCourse[]>(trainingCourses);
  const { toast } = useToast();

  const getCourses = useCallback(() => {
    return courses;
  }, [courses]);

  const getCourseById = useCallback((id: string) => {
    return courses.find(course => course.id === id);
  }, [courses]);

  const createCourse = useCallback((course: Omit<TrainingCourse, 'id' | 'created_at' | 'status'>) => {
    const newCourse: TrainingCourse = {
      ...course,
      id: uuidv4(),
      created_at: new Date().toISOString(),
      status: 'draft'
    };
    setCourses(prev => [...prev, newCourse]);
    toast({
      title: "Formation créée",
      description: `La formation "${newCourse.title}" a été créée avec succès.`
    });
    return newCourse;
  }, [toast]);

  const updateCourse = useCallback((id: string, updates: Partial<TrainingCourse>) => {
    let updated = false;
    setCourses(prev => {
      const newCourses = prev.map(course => {
        if (course.id === id) {
          updated = true;
          return {
            ...course,
            ...updates,
            updated_at: new Date().toISOString()
          };
        }
        return course;
      });
      return newCourses;
    });

    if (updated) {
      toast({
        title: "Formation mise à jour",
        description: "Les informations de la formation ont été mises à jour."
      });
      return true;
    }

    toast({
      title: "Erreur",
      description: "La formation n'a pas été trouvée.",
      variant: "destructive"
    });
    return false;
  }, [toast]);

  const deleteCourse = useCallback((id: string, sessions: any[]) => {
    // Check if there are sessions for this course
    const hasSessions = sessions.some(session => session.course_id === id);
    if (hasSessions) {
      toast({
        title: "Suppression impossible",
        description: "Des sessions sont planifiées pour cette formation.",
        variant: "destructive"
      });
      return false;
    }

    setCourses(prev => prev.filter(course => course.id !== id));
    toast({
      title: "Formation supprimée",
      description: "La formation a été supprimée avec succès."
    });
    return true;
  }, [toast]);

  return {
    courses,
    getCourses,
    getCourseById,
    createCourse,
    updateCourse,
    deleteCourse
  };
};
