
import { useState, useCallback } from 'react';
import { TrainerProfile } from '../../types';
import { trainers } from '../../data/trainings';

export const useTrainers = () => {
  const [trainersList] = useState<TrainerProfile[]>(trainers);

  const getTrainers = useCallback(() => {
    return trainersList;
  }, [trainersList]);

  const getTrainerById = useCallback((id: string) => {
    return trainersList.find(trainer => trainer.id === id);
  }, [trainersList]);

  return {
    trainers: trainersList,
    getTrainers,
    getTrainerById
  };
};
