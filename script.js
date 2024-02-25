document.addEventListener('DOMContentLoaded', () => {
    loadRecipes();
});

function saveRecipe() {
    const name = document.getElementById('recipe-name').value;
    const ingredients = document.getElementById('ingredients').value;
    const imageUrl = document.getElementById('image-url').value;

    if (name && ingredients) {
        const recipe = { name, ingredients, imageUrl };
        let recipes = JSON.parse(localStorage.getItem('recipes')) || [];
        recipes.push(recipe);
        localStorage.setItem('recipes', JSON.stringify(recipes));

        clearForm();
        loadRecipes();
    } else {
        alert('Please enter recipe name and ingredients.');
    }
}

function loadRecipes() {
    const recipes = JSON.parse(localStorage.getItem('recipes')) || [];
    const recipesList = document.getElementById('recipes');

    // Clear existing list
    recipesList.innerHTML = '';

    // Populate the list with saved recipes
    recipes.forEach((recipe, index) => {
        const listItem = document.createElement('li');
        listItem.innerHTML = `
            <strong>${recipe.name}</strong>
            <p>${recipe.ingredients}</p>
            <img src="${recipe.imageUrl}" alt="${recipe.name}" width="230" height="150">
            <br>
            <button onclick="editRecipe(${index})" style="margin:10px;border-radius:6px;background-color:green;color:white;font-size:20px;padding="5px">Edit</button>
            <button onclick="deleteRecipe(${index})"style="margin:10px;border-radius:6px;background-color:green;color:white;font-size:20px;padding="5px">Delete</button>
        `;
        recipesList.appendChild(listItem);
    });
}

function editRecipe(index) {
    const recipes = JSON.parse(localStorage.getItem('recipes')) || [];
    const recipe = recipes[index];

    // Populate the form with the selected recipe
    document.getElementById('recipe-name').value = recipe.name;
    document.getElementById('ingredients').value = recipe.ingredients;
    document.getElementById('image-url').value = recipe.imageUrl;

    // Remove the selected recipe from the local storage
    recipes.splice(index, 1);
    localStorage.setItem('recipes', JSON.stringify(recipes));

    loadRecipes();
}

function deleteRecipe(index) {
    const recipes = JSON.parse(localStorage.getItem('recipes')) || [];
    recipes.splice(index, 1);
    localStorage.setItem('recipes', JSON.stringify(recipes));

    loadRecipes();
}

function clearForm() {
    document.getElementById('recipe-name').value = '';
    document.getElementById('ingredients').value = '';
    document.getElementById('image-url').value = '';
}