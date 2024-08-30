
getRandomMeal();


document.querySelector('.main-generate-button').addEventListener('click', () => {
    document.body.classList.add('loading'); // add the loading class
    getRandomMeal();
})


function getRandomMeal(){
    fetch('https://www.themealdb.com/api/json/v1/1/random.php')
        .then(res => res.json())
        .then(data => applyData(data.meals[0]))
        .catch(console.error)
}

function applyData(meal_data){
    const meal_datas = meal_data

    console.log(meal_data)

    document.querySelector('.dish-img').src = meal_datas['strMealThumb']
    document.querySelector('.dish-title').textContent = meal_datas['strMeal']
    document.querySelector('.dish-description').textContent = meal_datas['strInstructions']

    SideInfo(meal_datas)

    const youtubeEmbedUrl = meal_datas.strYoutube.replace('watch?v=', 'embed/');
    document.querySelector('.video').src = youtubeEmbedUrl;

    IngredientsList(meal_datas)

    document.body.classList.remove('loading'); // remove the loading class

}


function SideInfo(meal_data){
    document.querySelector('.dish-labeling').innerHTML = `<li class="dish-items"><strong>Category</strong>: ${meal_data.strCategory}</li>
                        <li class="dish-items"><strong>Area</strong>:  ${meal_data.strArea}</li>
                        <li class="dish-items"><strong>Tags</strong>: ${meal_data.strTags ? meal_data.strTags.split(',').join(', ') : 'None'}</li>
`
}

function IngredientsList(meal_data) {
    const ingredients = document.querySelector('.items-info');
    ingredients.innerHTML = "";

    for (let i = 1; i <= 20; i++) {
        const ingredient = `${meal_data[`strIngredient${i}`]} ${meal_data[`strMeasure${i}`]}`;
        if ( ingredient.trim().length > 1 && typeof ingredient !== 'undefined' && ingredient !== null) {
            const li = document.createElement('li');
            li.classList.add('items-ingredients');
            li.textContent = ingredient;
            ingredients.appendChild(li);
        } else {
            break;
        }
    }
}

