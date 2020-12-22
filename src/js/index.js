require('@babel/polyfill');

import Axios from 'axios';
import Search from './model/search';
import { elements, renderLoader, clearLoader } from './view/base';
import * as searchView from './view/searchView';
import Recipe from './model/Recipe';
import {renderRecipe, clearRecipe, highlightSelectedRecipe} from './view/recipeView';
import List from './model/List';
import * as listView from './view/listView';

/*
* Web app state
* - Хайлтын query, үр дүн
* - Тухайн үзүүлж байгаа жор
* - Лайкалсан жорууд
* - Захиалж байгаа жорын найрлагууд
*/

const state = {};

/**
 * Хайлтын контроллер
 * 
 */

const controlSearch = async () => {
    // 1. Вебээс хайлтын түлхүүр үгийг гаргаж гаргаж авна
    const query = searchView.getInput();
    
    if(query) {
    // 2. Шинээр хайлтын обьектийг үүсгэж өгнө.
    state.search = new Search(query);


    // 3. Хайлт хийхэд зориулж дэлгэцийг бэлтгэнэ
    searchView.clearSearchQuery();
    searchView.clearSearchResult();
    renderLoader(elements.searchResultDiv);

    // 4. Хайлтыг гүйцэтгэнэ
    await state.search.doSearch();

    // 5. Хайлтын үр дүнг дэлгэцэнд үзүүлнэ
    clearLoader();
    if(state.search.result === undefined) alert('no index...');
    else searchView.renderRecipes(state.search.result);
    } 
}

elements.searchForm.addEventListener('submit', e => {
    e.preventDefault();
    controlSearch();
});

elements.pageButton.addEventListener("click", e => {
    const btn = e.target.closest(".btn-inline");

    if(btn) {
        const gotoPageNumber = parseInt(btn.dataset.goto, 10);
        searchView.clearSearchResult();
        searchView.renderRecipes(state.search.result, gotoPageNumber);
    }
});

/**
 * Жорын контроллер
 */
const controlRecipe = async () => {
    // 1. URL-аас ID-ийг салгах
    const id = window.location.hash.replace('#', '');

// url дээр ID байгаа эсэхийг шалгана
    if(id) {
// 2. Жорын моделийг үүсгэж өгнө
state.recipe = new Recipe(id);


// 3. UI буюу дэлгэцийг бэлтгэнэ
clearRecipe();
renderLoader(elements.recipeDiv);
highlightSelectedRecipe(id);



// 4. Жороо татаж авчирна
await state.recipe.getRecipe();

// 5. Жорыг гүйцэтгэх хугацаа болон орцыг тооцоолно
clearLoader();
state.recipe.calcTime();
state.recipe.calcPorts();

// 6. Жороо дэлгэцэнд гаргана
renderRecipe(state.recipe);
    }
    
}

//  window.addEventListener('hashchange', controlRecipe);
//  window.addEventListener('load', controlRecipe);

 ['hashchange', 'load'].forEach(event => window.addEventListener(event, controlRecipe));

 /**
  * Найрлагын контроллер
  */

  const controlList = () => {
      // Найрлаганы моделыг үүсгэнэ
      state.list = new List();

      //Өмнө харагдаж байсан найрлагуудыг алга болгоно
      listView.clearItems();

      // Уг модел руу одоо харагдаж байгаа жорны бүх найрлагыг авч хийнэ
      state.recipe.ingredients.forEach(n => {
        // Тухайн найрлагыг модел рүү хийнэ
        state.list.addItem(n);
        // list ийг дэлгэцэнд гаргана
        listView.renderItem(n);
      });
}

  elements.recipeDiv.addEventListener("click", e => {
      // recipe_tb
      if(e.target.matches('.recipe__btn, .recipe__btn *')) {
          controlList();
      }
  });