
import { useCallback } from 'react';
import { TrainingStats, TrainingCourse, TrainingSession, TrainingEnrollment, TrainingCategory } from '../../types';

export const useTrainingStats = (
  courses: TrainingCourse[],
  sessions: TrainingSession[],
  enrollments: TrainingEnrollment[],
  categories: TrainingCategory[]
) => {
  const getTrainingStats = useCallback((): TrainingStats => {
    const thisMonth = new Date().getMonth();
    const thisYear = new Date().getFullYear();
    
    const activeSessions = sessions.filter(
      session => session.status === 'scheduled' || session.status === 'in_progress'
    ).length;
    
    const enrollmentsThisMonth = enrollments.filter(enrollment => {
      const enrollDate = new Date(enrollment.enrollment_date);
      return enrollDate.getMonth() === thisMonth && enrollDate.getFullYear() === thisYear;
    }).length;

    // Count enrollments by category
    const byCategory = categories.map(category => ({
      category_id: category.id,
      count: (() => {
        const coursesInCategory = courses.filter(course => course.category_id === category.id);
        const sessionIds = sessions.filter(
          session => coursesInCategory.some(course => course.id === session.course_id)
        ).map(session => session.id);
        return enrollments.filter(
          enrollment => sessionIds.includes(enrollment.session_id)
        ).length;
      })()
    }));

    // Calculate completion rate
    const completedEnrollments = enrollments.filter(
      enrollment => enrollment.status === 'completed'
    ).length;
    
    const completionRate = enrollments.length > 0 
      ? (completedEnrollments / enrollments.length) * 100 
      : 0;

    // Calculate average rating
    const coursesWithRating = courses.filter(course => course.rating !== undefined);
    const averageRating = coursesWithRating.length > 0
      ? coursesWithRating.reduce((sum, course) => sum + (course.rating || 0), 0) / coursesWithRating.length
      : 0;

    return {
      total_courses: courses.length,
      active_sessions: activeSessions,
      total_enrollments: enrollments.length,
      enrollments_this_month: enrollmentsThisMonth,
      by_category: byCategory,
      completion_rate: completionRate,
      average_rating: averageRating
    };
  }, [courses, sessions, enrollments, categories]);

  return { getTrainingStats };
};
