import { useEffect, useState } from 'react';

const useDoneRecipesHook = (foodOrDrink) => {
  const [doneRecipes, setDoneRecipes] = useState([]);
  useEffect(() => {
    const localData = localStorage.getItem('doneRecipes');
    const parsed = localData ? JSON.parse(localData)
      : { allDoneRecipes: { doneFoodRecipes: [], doneDrinkRecipes: [] } };
    setDoneRecipes(parsed);
  }, []);

  useEffect(() => {
    localStorage.setItem('doneRecipes', JSON.stringify(doneRecipes));
  }, [foodOrDrink, doneRecipes]);

  const updateDoneRecipes = (recipe) => {
    const { allDoneRecipes } = doneRecipes;
    const hasBeenDone = allDoneRecipes[`done${foodOrDrink}Recipes`]
      .find((doneRcp) => doneRcp.id === recipe.id);
    console.log('hasBeenDone: ', hasBeenDone);
    const newDoneRecipes = [...allDoneRecipes[`done${foodOrDrink}Recipes`], recipe];
    console.log(newDoneRecipes);
    setDoneRecipes({
      allDoneRecipes:
        { ...allDoneRecipes, [`done${foodOrDrink}Recipes`]: newDoneRecipes },
    });
  };
  return [updateDoneRecipes];
};

export default useDoneRecipesHook;
