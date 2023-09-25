// Version using local storage - issues with removing item from local storage l.45 + creating separate button class for remove buttons L.29.

const sainsItemInput = document.getElementById('sainsItemInput');
const aldiItemInput = document.getElementById('aldiItemInput');
const addSainsItemButton = document.getElementById('addSainsItemButton');
const addAldiItemButton = document.getElementById('addAldiItemButton');
const sainsShoppingList = document.getElementById('sainsShoppingList');
const aldiShoppingList = document.getElementById('aldiShoppingList');

// Initialise shopping lists from local storage or an empty array
let savedSainsburysList = JSON.parse(localStorage.getItem('sainsShoppingList')) || [];
let savedAldiList = JSON.parse(localStorage.getItem('aldiShoppingList')) || [];

// Function to render the shopping lists
function renderSainsburysList() {
    sainsShoppingList.innerHTML = '';
    savedSainsburysList.forEach((item) => {
        createListItem(sainsShoppingList, item, 'sainsShoppingList');
    });
}

function renderAldiList() {
    aldiShoppingList.innerHTML = '';
    savedAldiList.forEach((item) => {
        createListItem(aldiShoppingList, item, 'aldiShoppingList');
    });
}

// Function to create and add list items (ISSUE: same button class for both stores)
function createListItem(parentList, itemText, storageKey) {
    const listItem = document.createElement('li');
    listItem.innerHTML = `
        ${itemText}
        <button class="removeItemButton"><i class="fa-solid fa-trash-can"></i></button>
    `;

    const removeButton = listItem.querySelector('.removeItemButton');
    removeButton.addEventListener('click', () => {
        removeListItem(parentList, listItem, storageKey);
    });

    parentList.appendChild(listItem);
}

// Function to remove a list item (ISSUE: removes from displayed list, but not removing from local storage on page refresh)
function removeListItem(parentList, listItem, storageKey) {
    parentList.removeChild(listItem);
// Determine which shopping list to update based on the storage key
let shoppingListToUpdate;
if (storageKey === 'sainsShoppingList') {
    shoppingListToUpdate = savedSainsburysList;
} else if (storageKey === 'aldiShoppingList') {
    shoppingListToUpdate = savedAldiList;
}

const itemIndex = shoppingListToUpdate.indexOf(listItem.textContent);
if (itemIndex !== -1) {
    shoppingListToUpdate.splice(itemIndex, 1);
    localStorage.setItem(storageKey, JSON.stringify(shoppingListToUpdate));
}
}

// Add item to shopping list
addSainsItemButton.addEventListener('click', function() {
    const newSainsItem = sainsItemInput.value.trim();
    if (newSainsItem !== '') {
        savedSainsburysList.push(newSainsItem);
        localStorage.setItem('sainsShoppingList', JSON.stringify(savedSainsburysList));
        renderSainsburysList();
        sainsItemInput.value = '';
    }
});

addAldiItemButton.addEventListener('click', function() {
    const newAldiItem = aldiItemInput.value.trim();
    if (newAldiItem !== '') {
        savedAldiList.push(newAldiItem);
        localStorage.setItem('aldiShoppingList', JSON.stringify(savedAldiList));
        renderAldiList();
        aldiItemInput.value = '';
    }
});

// Clear shopping list and local storage
function clearShoppingList(parentList, storageKey) {
    parentList.innerHTML = '';
    localStorage.removeItem(storageKey);
    savedSainsburysList = [];
    savedAldiList = [];
}

document.getElementById('clearSainsList').addEventListener('click', function() {
    clearShoppingList(sainsShoppingList, 'sainsShoppingList');
});

document.getElementById('clearAldiList').addEventListener('click', function() {
    clearShoppingList(aldiShoppingList, 'aldiShoppingList');
});

// Initialise shopping lists on page load
renderSainsburysList();
renderAldiList();