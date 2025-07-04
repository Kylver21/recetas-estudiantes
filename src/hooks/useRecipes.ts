import { useContext, useState } from 'react';
import { RecipeContext } from '../context/RecipeContext';

export const useRecipes = () => {
  const context = useContext(RecipeContext);
  const [difficultyFilter, setDifficultyFilter] = useState<string | null>(null);

  if (context === undefined) {
    throw new Error('useRecipes debe ser usado dentro de un RecipeProvider');
  }

  const filterByDifficulty = (difficulty: string) => {
    setDifficultyFilter(difficulty);
    return context.recetas.filter((receta: any) => receta.dificultad === difficulty);
  };


  return {
    ...context,
    difficultyFilter,
    setDifficultyFilter,
    filterByDifficulty,
  };
};