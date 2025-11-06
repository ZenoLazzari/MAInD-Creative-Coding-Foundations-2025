
const maxIngredients = 6;


function updateCounter() {
    const count = document.getElementById('chosenIngredients').children.length;
    document.getElementById('ingredientCounter').textContent = `${count}/${maxIngredients} ingredienti scelti`;
}


function addIngredientToBox(name) {
    const ul = document.getElementById('chosenIngredients');

    if (ul.children.length >= maxIngredients) {
        alert('Hai raggiunto il limite di 6 ingredienti!');
        return;
    }

    const li = document.createElement('li');
    li.style.display = "flex";
    li.style.alignItems = "center";
    li.style.justifyContent = "space-between";
    li.style.marginBottom = "5px";
    li.style.padding = "5px 10px";
    li.style.borderRadius = "5px";
    li.style.backgroundColor = "#388e3c";
    li.style.color = "gold";

    const span = document.createElement('span');
    span.textContent = name;
    li.appendChild(span);


    const select = document.createElement('select');
    const options = [
        { text: 'Normale', color: '#388e3c' },
        { text: 'Piccante', color: '#ff0000' },
        { text: 'Vegano', color: '#27e2ba' },
        { text: 'Importante', color: '#178ec5' }
    ];
    options.forEach(opt => {
        const option = document.createElement('option');
        option.value = opt.color;
        option.textContent = opt.text;
        select.appendChild(option);
    });

    select.onchange = () => {
        li.style.backgroundColor = select.value;
    };
    li.appendChild(select);


    const editBtn = document.createElement('button');
    editBtn.textContent = 'Modifica';
    editBtn.onclick = () => {
        const newVal = prompt('Modifica ingrediente:', span.textContent);
        if (newVal) span.textContent = newVal;
    };
    li.appendChild(editBtn);


    const delBtn = document.createElement('button');
    delBtn.textContent = 'Elimina';
    delBtn.onclick = () => {
        li.remove();
        updateCounter();
    };
    li.appendChild(delBtn);

    ul.appendChild(li);


    updateCounter();
}

function addIngredient() {
    const input = document.getElementById('newIngredient');
    const value = input.value.trim();
    if (value === '') return;

    addIngredientToBox(value);
    input.value = '';
}

document.querySelectorAll('#availableIngredients li').forEach(li => {
    li.addEventListener('click', () => {
        addIngredientToBox(li.textContent);
    });
});

updateCounter();

const toggleAvailableBtn = document.getElementById('toggleAvailableView');
const availableList = document.getElementById('availableIngredients');

toggleAvailableBtn.addEventListener('click', () => {
    availableList.classList.toggle('grid-view');

    if (availableList.classList.contains('grid-view')) {
        toggleAvailableBtn.textContent = 'Vista Lista';
    } else {
        toggleAvailableBtn.textContent = 'Vista Griglia';
    }
});