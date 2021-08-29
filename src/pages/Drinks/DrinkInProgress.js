import copy from 'clipboard-copy';
import PropTypes from 'prop-types';
import React, { useEffect, useState } from 'react';
import { useHistory } from 'react-router-dom';
import InProgressCard from '../../components/Card/InProgressCard';
import blackHeartIcon from '../../images/blackHeartIcon.svg';
import shareIcon from '../../images/shareIcon.svg';
import whiteHeartIcon from '../../images/whiteHeartIcon.svg';
import { getDrinkFiltredById } from '../../services/api';
import useDoneRecipesHook from '../hooks/useDoneRecipesHook';
import useFavoritesHook from '../hooks/useFavoritesHook';

function DrinkInProgress(props) {
  const { match: { url, params: { id } } } = props;
  const history = useHistory();
  const [favorites, updateFavorites] = useFavoritesHook();
  const [setDoneRecipes] = useDoneRecipesHook('Drink');
  const [isFavorite, setIsFavorite] = useState(false);
  const [copied, setCopied] = useState(false);
  const [filteredById, setFilteredById] = useState('');
  const [ingredientsAndMeasuresList, setIngredientsAndMeasuresList] = useState([]);
  const isEmpty = (obj) => Object.keys(obj).length === 0; // verifica se o objeto está vazio;

  const { strCategory,
    strDrink, strDrinkThumb, strAlcoholic, strInstructions } = filteredById;

  const copyFunction = () => {
    copy(window.location.href.replace('/in-progress', ''));
    setCopied(!copied);
  };

  function handleDone() {
    const newRecipe = {
      id,
      type: 'bebida',
      area: '',
      category: strCategory,
      alcoholicOrNot: strAlcoholic,
      name: strDrink,
      image: strDrinkThumb,
    };
    setDoneRecipes(newRecipe);
    history.push('/receitas-feitas');
  }

  function handleFavorite() {
    const newRecipe = {
      id,
      type: 'bebida',
      area: '',
      category: strCategory,
      alcoholicOrNot: strAlcoholic,
      name: strDrink,
      image: strDrinkThumb,
    };
    updateFavorites(newRecipe, isFavorite);
    setIsFavorite(!isFavorite);
  }

  useEffect(() => {
    function checkIsFavorite() {
      return favorites
        .find((fav) => fav.id === id)
        ? setIsFavorite(true)
        : setIsFavorite(false);
    }
    checkIsFavorite();
  }, [id, favorites]);

  const buttonsDiv = (
    <div className="icons">
      <button type="button" data-testid="share-btn" onClick={ copyFunction }>
        <img src={ shareIcon } alt="Compartilhar" />
        { copied && 'Link copiado!' }
      </button>
      <button
        type="button"
        onClick={ handleFavorite }
      >
        <img
          data-testid="favorite-btn"
          src={ isFavorite ? blackHeartIcon : whiteHeartIcon }
          alt="Compartilhar"
        />
      </button>
      <button
        type="button"
        data-testid="finish-recipe-btn"
        onClick={ handleDone }
      >
        Finalizar
      </button>
    </div>
  );

  const createIngredientList = (receita) => {
    const ING_INDEX = 15;
    let ingredientList = [];
    let quantitiesList = [];
    for (let i = 1; i <= ING_INDEX; i += 1) {
      ingredientList = [...ingredientList, receita[`strIngredient${i}`]];
      quantitiesList = [...quantitiesList, receita[`strMeasure${i}`]];
    }
    const ingredientAndMeasure = quantitiesList
      .filter((qua) => qua !== null && qua !== '')
      .map((mes, index) => `${mes} ${ingredientList[index]}`);
    return setIngredientsAndMeasuresList(ingredientAndMeasure);
  };

  useEffect(() => {
    const requestingAPI = async () => {
      const fetchById = await getDrinkFiltredById(id);
      setFilteredById(fetchById);
    }; requestingAPI();
  }, [id]);

  useEffect(() => {
    if (!isEmpty(filteredById)) {
      createIngredientList(filteredById);
    }
  }, [filteredById]);

  return (
    <main>
      { !isEmpty(filteredById)
        ? (
          <section style={ {
            display: 'flex',
            flexFlow: 'column wrap'
          } }>
            { buttonsDiv }
            <InProgressCard
              url={ url }
              id={ id }
              category={ strCategory }
              title={ strDrink }
              img={ strDrinkThumb }
              ingredients={ ingredientsAndMeasuresList }
              alcohol={ strAlcoholic }
              instructions={ strInstructions }
            />
          </section>)
        : <h1>Carregando bebida...</h1> }
    </main>
  );
}

DrinkInProgress.propTypes = {
  match: PropTypes.shape({
    url: PropTypes.string,
    params: PropTypes.shape({
      id: PropTypes.string,
    }),
  }).isRequired,
};

export default DrinkInProgress;
