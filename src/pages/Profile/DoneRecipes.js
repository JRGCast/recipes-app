import copy from 'clipboard-copy';
import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import Header from '../../components/Header';
import shareIcon from '../../images/shareIcon.svg';
import './DoneRecipes.css';

function DoneRecipes() {
  const [doneRecipesList, setDoneRecipesList] = useState([]);
  const [copied, setCopied] = useState(false);
  const [filteredDoneRecipes, setFilteredDoneRecipes] = useState([]);

  useEffect(() => {
    function checkDoneRecipes() {
      const localData = localStorage.getItem('doneRecipes');
      const doneRecipes = localData ? JSON.parse(localData).allDoneRecipes : [];
      const arrayEveryThing = doneRecipes.doneFoodRecipes
        .concat(doneRecipes.doneDrinkRecipes);
      console.log(arrayEveryThing);
      setDoneRecipesList(arrayEveryThing);
      setFilteredDoneRecipes(arrayEveryThing);
    }
    checkDoneRecipes();
    // console.log('liste de receitas feitas', doneRecipesList);
    // console.log('lista de receitas filtradas', filteredDoneRecipes);
  }, []);

  function copyDetailsPageLink(recipe) {
    copy(`http://localhost:3000/${recipe.type}s/${recipe.id}`);
    setCopied(true);
  }

  function filterDoneRecipes({ target: { innerText: name } }) {
    if (name === 'All') {
      setFilteredDoneRecipes(doneRecipesList);
    }
    if (name === 'Food') {
      const filteredByFood = doneRecipesList
        .filter((rec) => rec.type === 'comida');
      setFilteredDoneRecipes(filteredByFood);
    }
    if (name === 'Drinks') {
      const filteredByDrink = doneRecipesList
        .filter((rec) => rec.type === 'bebida');
      setFilteredDoneRecipes(filteredByDrink);
    }
  }

  function renderRecipe(recipe, index) {
    if (recipe.type === 'comida') {
      return (
        <div key={ recipe.name }>
          <Link to={ `/recipes-app/comidas/${recipe.id}` }>
            <img
              style={ { width: '165px' } }
              alt={ recipe.name }
              src={ recipe.image }
              data-testid={ `${index}-horizontal-image` }
            />
          </Link>
          <Link to={ `/recipes-app/comidas/${recipe.id}` }>
            <h2 data-testid={ `${index}-horizontal-name` }>{ recipe.name }</h2>
          </Link>
          <span
            data-testid={ `${index}-horizontal-top-text` }
          >
            { `${recipe.area} - ${recipe.category}` }
          </span>
          <span
            data-testid={ `${index}-horizontal-done-date` }
          >
            { recipe.doneDate }
          </span>
          {/* { recipe.tags
            .filter((_tag, ind) => ind < 2)
            .map((tag) => (
              <span
                key={ tag }
                data-testid={ `${index}-${tag}-horizontal-tag` }
              >
                { tag }
              </span>
            )) } */}
          <button
            type="button"
            data-testid={ `${index}-horizontal-share-btn` }
            src={ shareIcon }
            onClick={ () => copyDetailsPageLink(recipe) }
          >
            <img src={ shareIcon } alt="compartilhar" />
            { copied && 'Link copiado!' }
          </button>
        </div>);
    }
    if (recipe.type === 'bebida') {
      return (
        <div key={ recipe.name }>
          <Link to={ `/recipes-app/bebidas/${recipe.id}` }>
            <img
              style={ { width: '165px' } }
              alt={ recipe.name }
              src={ recipe.image }
              data-testid={ `${index}-horizontal-image` }
            />
          </Link>
          <Link to={ `/recipes-app/bebidas/${recipe.id}` }>
            <h2 data-testid={ `${index}-horizontal-name` }>{ recipe.name }</h2>
          </Link>
          <span
            data-testid={ `${index}-horizontal-top-text` }
          >
            { `${recipe.category} - ${recipe.alcoholicOrNot}` }
          </span>
          <span>{ recipe.alcoholicOrNot }</span>
          <span>{ recipe.area }</span>
          <span
            data-testid={ `${index}-horizontal-done-date` }
          >
            { recipe.doneDate }
          </span>
          <button
            type="button"
            data-testid={ `${index}-horizontal-share-btn` }
            src={ shareIcon }
            onClick={ () => copyDetailsPageLink(recipe) }
          >
            <img src={ shareIcon } alt="compartilhar" />
            { copied && 'Link copiado!' }
          </button>
          {/* { recipe.tags
            .filter((_tag, ind) => ind < 2)
            .map((tag) => (
              <span
                key={ `${tag}-${index}` }
                data-testid={ `${index}-${tag}-horizontal-tag` }
              >
                { tag }
              </span>
            )) } */}
        </div>
      );
    }
  }

  return (
    <div>
      <Header name="Receitas Feitas" icon="false" />
      <button
        type="button"
        className="filter-btn"
        data-testid="filter-by-all-btn"
        onClick={ (e) => filterDoneRecipes(e) }
      >
        All
      </button>
      <button
        type="button"
        className="filter-btn"
        data-testid="filter-by-food-btn"
        onClick={ (e) => filterDoneRecipes(e) }
      >
        Food
      </button>
      <button
        type="button"
        className="filter-btn"
        data-testid="filter-by-drink-btn"
        onClick={ (e) => filterDoneRecipes(e) }
      >
        Drinks
      </button>

      { filteredDoneRecipes.length > 0 && filteredDoneRecipes
        .map((recipe, index) => (renderRecipe(recipe, index))) }
    </div>
  );
}

export default DoneRecipes;

// const mockDoneRecipes = [{
//   id: 500,
//   type: 'comida',
//   area: 'Brasil',
//   category: 'comida mineira',
//   alcoholicOrNot: '',
//   name: 'Tropeiro',
//   image: 'https://www.google.com/url?sa=i&url=https%3A%2F%2Fwww.soubh.com.br%2Fnoticias%2Fgastronomia%2Fdia-do-feijao-tropeiro-restaurantes-em-bh&psig=AOvVaw0pjipbI3VwLNhdJEIzsBYt&ust=1617306383060000&source=images&cd=vfe&ved=0CAIQjRxqFwoTCKjDhfal2-8CFQAAAAAdAAAAABAD',
//   doneDate: 'hoje',
//   tags: ['deliciosa', 'caseira'],
// }];

// useEffect(() => {
//   localStorage.setItem('doneRecipes', JSON.stringify(mockDoneRecipes));
// }, []);
