require('@babel/polyfill');

import Axios from 'axios';
import Search from './model/search';
import { elements, renderLoader, clearLoader } from './view/base';
import * as searchView from './view/searchView';

/*
* Web app state
* - Хайлтын query, үр дүн
* - Тухайн үзүүлж байгаа жор
* - Лайкалсан жорууд
* - Захиалж байгаа жорын найрлагууд
*/

const state = {};

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