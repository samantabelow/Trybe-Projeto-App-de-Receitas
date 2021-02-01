import React, { useState, useContext, useEffect, useCallback } from 'react';
import PropTypes from 'prop-types';
import Header from './components/Header';
import RecipeAppContext from '../context/index';
import RecipeCard from './components/RecipeCard';

function TelaPrincipal(props) {
  const { recipeType } = props;
  const [isLoading, setIsLoading] = useState(true);
  const [categories, setCategories] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState('');
  const [filterIsSelected, setFilterIsSelected] = useState(false);

  const {
    recipes,
    recipesCards,
    setSearchType,
  } = useContext(RecipeAppContext);

  useEffect(() => {
    if (recipeType === 'Comidas') {
      setSearchType('Comidas');
    }
    if (recipeType === 'Bebidas') {
      setSearchType('Bebidas');
    }
  }, [setSearchType, recipeType, props]);

  const showInitialCards = useCallback(
    async () => {
      let data = {};
      if (recipeType === 'Comidas') {
        const response = await fetch('https://www.themealdb.com/api/json/v1/1/search.php?s=');
        if (selectedCategory === '' || filterIsSelected === false) {
          const result = await response.json();
          data = result.meals;
        } else {
          console.log(selectedCategory);
          const api = await fetch(`https://www.themealdb.com/api/json/v1/1/filter.php?c=${selectedCategory}`);
          const result = await api.json();
          data = result.meals;
        }
      } else if (recipeType === 'Bebidas') {
        const response = await fetch('https://www.thecocktaildb.com/api/json/v1/1/search.php?s=');
        if (selectedCategory === '' || filterIsSelected === false) {
          const result = await response.json();
          data = result.drinks;
        } else {
          const api = await fetch(`https://www.thecocktaildb.com/api/json/v1/1/filter.php?c=${selectedCategory}`);
          const result = await api.json();
          data = result.drinks;
        }
      }
      recipesCards(data);
    }, [recipesCards, recipeType, selectedCategory, filterIsSelected],
  );

  useEffect(() => {
    showInitialCards();
  }, [showInitialCards]);

  const categoryButtonAPIRequest = useCallback(
    async () => {
      setIsLoading(true);
      let data = [];
      const allCategories = [];
      if (recipeType === 'Comidas') {
        const response = await fetch('https://www.themealdb.com/api/json/v1/1/list.php?c=list');
        data = await response.json();
        data.meals.map((meal) => {
          allCategories.push(meal.strCategory);
          return allCategories;
        });
      } else if (recipeType === 'Bebidas') {
        const response = await fetch('https://www.thecocktaildb.com/api/json/v1/1/list.php?c=list');
        data = await response.json();
        data.drinks.map((drink) => {
          allCategories.push(drink.strCategory);
          return allCategories;
        });
      }
      const fiveCategories = [];
      const five = 5;
      const zero = 0;
      for (let i = zero; i < five; i += 1) {
        fiveCategories.push(allCategories[i]);
      }
      setCategories(fiveCategories);
      setIsLoading(false);
    }, [recipeType],
  );

  useEffect(() => {
    categoryButtonAPIRequest();
  }, [categoryButtonAPIRequest]);

  return (
    <div>
      <Header headerText={ recipeType } showSearchButton="true" />
      {!isLoading && categories.map((category) => (
        <button
          key={ category }
          type="button"
          data-testid={ `${category}-category-filter` }
          onClick={ () => {
            setFilterIsSelected(!filterIsSelected);
            setSelectedCategory(category);
            showInitialCards();
          } }
        >
          { `${category}` }
        </button>
      ))}
      {recipes.map((item, index) => (
        <RecipeCard
          key={ index }
          recipes={ recipes }
          index={ index }
          recipeType={ recipeType }
        />
      ))}
    </div>
  );
}

export default TelaPrincipal;

TelaPrincipal.propTypes = {
  recipeType: PropTypes.string.isRequired,
};
