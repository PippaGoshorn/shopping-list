const sainsItemInput = document.getElementById('sainsItemInput');
const aldiItemInput = document.getElementById('aldiItemInput');
const addSainsItemButton = document.getElementById('addSainsItemButton');
const addAldiItemButton = document.getElementById('addAldiItemButton');
const sainsShoppingList = document.getElementById('sainsShoppingList');
const aldiShoppingList = document.getElementById('aldiShoppingList');
const clearSainsList = document.getElementById('clearSainsList');
const clearAldiList = document.getElementById('clearAldiList');

addSainsItemButton.addEventListener('click', addSainsItem);
addAldiItemButton.addEventListener('click', addAldiItem);
sainsItemInput.addEventListener('keydown', function (e) {
    if (e.keyCode === 13) {
        e.preventDefault();
        addSainsItemButton.click();
    }
});
aldiItemInput.addEventListener('keydown', function (e) {
    if (e.keyCode === 13) {
        e.preventDefault();
        addAldiItemButton.click();
    }
});

function addSainsItem() {
    const sainsItemText = sainsItemInput.value.trim();
    if (sainsItemText !== '') {
        const sainsListItem = document.createElement('li');
        sainsListItem.innerHTML = `
            ${sainsItemText}
            <button class="removeSainsItemButton"><i class="fa-solid fa-trash-can"></i></button>
        `;

    const removeSainsButton = sainsListItem.querySelector('.removeSainsItemButton');
    removeSainsButton.addEventListener('click', () => {
        sainsShoppingList.removeChild(sainsListItem);
    });

    sainsShoppingList.appendChild(sainsListItem);
    sainsItemInput.value = '';
    }
}

function addAldiItem() {
    const aldiItemText = aldiItemInput.value.trim();
    if (aldiItemText !== '') {
        const aldiListItem = document.createElement('li');
        aldiListItem.innerHTML = `
            ${aldiItemText}
            <button class="removeAldiItemButton"><i class="fa-solid fa-trash-can"></i></button>
        `;

    const removeAldiButton = aldiListItem.querySelector('.removeAldiItemButton');
    removeAldiButton.addEventListener('click', () => {
        aldiShoppingList.removeChild(aldiListItem);
    });

    aldiShoppingList.appendChild(aldiListItem);
    aldiItemInput.value = '';
    }
}

clearSainsList.addEventListener('click', function (e) {
    e.preventDefault();
    sainsShoppingList.innerHTML = '';
})
clearAldiList.addEventListener('click', function (e) {
    e.preventDefault();
    aldiShoppingList.innerHTML = '';
})