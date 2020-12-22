import {elements} from './base';

// private function
const renderRecipe = recipe => {
    const markup = `<li>
    <a class="results__link" href="#${recipe.recipe_id}">
        <figure class="results__fig">
            <img src="${recipe.image_url}" alt="Test">
                </figure>
                    <div class="results__data">
                        <h4 class="results__name">${recipe.title}</h4>
                        <p class="results__author">${recipe.publisher}</p>
             </div>
        </a>
    </li>`;
// ul рүүгээ нэмнэ
    elements.searchResultList.insertAdjacentHTML('beforeend', markup);
}

export const clearSearchQuery = () => {
    elements.searchInput.value = "";
}

export const clearSearchResult = () => {
    elements.searchResultList.innerHTML = "";
    elements.pageButton.innerHTML = "";
}

export const getInput = () => elements.searchInput.value;

export const renderRecipes = (recipes, currentPage = 1, resPerPage = 10) => {

    // Хайотын үр дүнг хуудаслаж үзүүлэх эхний хэсэг 
    // page = 2, start = 10, end = 20
    const start = (currentPage-1) * resPerPage;
    const end = currentPage * resPerPage;

    // undefined 
    recipes.slice(start, end).forEach(renderRecipe);

    // Хууласлалтын товчыг гаргаж ирэх
    const totalPages = Math.ceil(recipes.length / resPerPage);
    renderButtons(currentPage, totalPages);
}


// type ===> pervious, next
const createButton = (page, type, dir) => `<button class="btn-inline results__btn--${type}" data-goto=${page}>
<svg class="search__icon">
    <use href="img/icons.svg#icon-triangle-${dir}"></use>
</svg>
<span>Хуудас ${page}</span>
</button>`;

const renderButtons = (currentPage, totalPages) => {
    let button;
    
    if(currentPage == 1 && totalPages > 1) {

        button = createButton(2, "next", "right");
        // 1-р хуудас дээр байна, 2-р хуудас гэдэг товчийг гарга
    } else if(currentPage < totalPages) {
        button = createButton(currentPage-1, "prev", "left");
        button += createButton(currentPage+1, "next", "right");
        // Өмнөх болон дараачийн хуудас руу шилжих товчнуудыг үзүүл
    } else if(currentPage === totalPages) {
        // Хамгийн сүүлийн хуудас дээр байна, өмнөх рүү шилжүүлэх товчийш л үзүүлнэ
        button = createButton(currentPage-1, "prev", "left");
    }



    elements.pageButton.insertAdjacentHTML('afterbegin', button);
}
