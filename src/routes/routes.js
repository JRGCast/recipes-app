import React from 'react';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import { DrinkDetails, DrinkInProgress, Drinks } from '../pages/Drinks';
import {
  Explorer,
  ExplorerDrink,
  ExplorerDrinksIngredients,
  ExplorerFood,
  ExplorerFoodsIngredients,
  ExplorerFoodsRegion
} from '../pages/Explorer';
import { FoodDetails, FoodInProgress, Foods } from '../pages/Foods';
import Login from '../pages/Login';
import NotFound from '../pages/NotFound';
import { DoneRecipes, FavRecipes, Profile } from '../pages/Profile';

function routes() {
  return (
    <BrowserRouter>
      <Switch>
        <Route path="/recipes-app/comidas" component={ Foods } />
        <Route path="/recipes-app/bebidas" component={ Drinks } />
        <Route path="/recipes-app/comidas/:id" component={ FoodDetails } />
        <Route path="/recipes-app/bebidas/:id" component={ DrinkDetails } />
        <Route path="/recipes-app/comidas/:id/in-progress" component={ FoodInProgress } />
        <Route path="/recipes-app/bebidas/:id/in-progress" component={ DrinkInProgress } />
        <Route path="/recipes-app/explorar" component={ Explorer } />
        <Route path="/recipes-app/explorar/comidas" component={ ExplorerFood } />
        <Route path="/recipes-app/explorar/bebidas" component={ ExplorerDrink } />
        <Route
          path="/recipes-app/explorar/comidas/ingredientes"
          component={ ExplorerFoodsIngredients }
        />
        <Route
          path="/recipes-app/explorar/bebidas/ingredientes"
          component={ ExplorerDrinksIngredients }
        />
        <Route path="/recipes-app/explorar/comidas/area" component={ ExplorerFoodsRegion } />
        <Route path="/recipes-app/perfil" component={ Profile } />
        <Route path="/recipes-app/receitas-feitas" component={ DoneRecipes } />
        <Route path="/recipes-app/receitas-favoritas" component={ FavRecipes } />
        <Route exact path="/recipes-app" component={ Login } />
        <Route component={ NotFound } />
      </Switch>
    </BrowserRouter>
  );
}

export default routes;
