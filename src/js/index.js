require('@babel/polyfill');
import axios from 'axios';

import Search from './model/search';


let search = new Search('pizza');

search.doSearch().then( res => {
    console.log(res);
} )