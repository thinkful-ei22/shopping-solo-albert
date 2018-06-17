/* eslint-disable */
'use strict';

const STORE = [
  {name: 'apples', checked: false},
  {name: 'oranges', checked: false},
  {name: 'milk', checked: true},
  {name: 'bread', checked: false}
];

// Separate object that would adjust the state.
let State = {
  showCheckedOnly: true,
  searchString: '',
};


// Object destruction to toggle the state
const setState = function (newState) {
  State = { ...State, ...newState };
  renderShoppingList();
};


// Post HTML to the DOM
function generateItemElement(item, itemIndex) {
  return `
    <li class="js-item-index-element" data-item-index="${itemIndex}">
      <span class="shopping-item js-shopping-item ${item.checked ? 'shopping-item__checked' : ''}">${item.name}</span>
      <div class="shopping-item-controls">
        <button class="shopping-item-toggle js-item-toggle">
            <span class="button-label">check</span>
        </button>
        <button class="shopping-item-delete js-item-delete">
            <span class="button-label">delete</span>
        </button>
      </div>
    </li>`;
}



// Parse the string and create a list of strings to be returned
function generateShoppingItemsString(shoppingList) {
  console.log('Generating shopping list element');

  const items = shoppingList.map((item, index) => generateItemElement(item, index));

  return items.join('');
}



  // render the shopping list in the DOM
function renderShoppingList() {
    console.log('`renderShoppingList` ran');

  // Filter for Checked/Unchecked item
  let filteredStore = STORE.filter(item => item.checked === State.showCheckedOnly)
  //Filter for search Query
  if(State.searchString.trim()) {
    filteredStore = STORE.filter(item => item.name.includes(State.searchString))
  }
  const shoppingListItemsString = generateShoppingItemsString(STORE);
    // insert that HTML into the DOM
  $('.js-shopping-list').html(shoppingListItemsString);
}





function addItemToShoppingList(itemName) {
 console.log(`Adding "${itemName}" to shopping list`);
 STORE.push({name: itemName, checked: false});
}




function handleNewItemSubmit() {
  $('#js-shopping-list-form').submit(function(event) {
    event.preventDefault();
    console.log('`handleNewItemSubmit` ran');
    const newItemName = $('.js-shopping-list-entry').val();
    $('.js-shopping-list-entry').val('');
    addItemToShoppingList(newItemName);
    renderShoppingList();
  });
}



function toggleCheckedForListItem(itemIndex) {
//  console.log('Toggling checked property for item at index ' + itemIndex);
// STORE[itemIndex].checked = !STORE[itemIndex].checked;

}

// ******************** NEW SECTION ********************************



// toggle the Checkbox using the State object
function toggleDisplayCheckedItems(){
  console.log('`toggleDisplayCheckedItems` ran');

    $('.js-hidden-checkbox-toggle').on('click', event =>{
      const element = event.currentTarget;
      const checked = element.checked;
      setState({ showCheckedOnly: checked })
    });
  renderShoppingList();
}


// 1. User can press(click)(done) a switch/checkbox(.js-hidden-checkbox)[DONE]
// to toggle(.toggle) between
// DISPLAYING ALL ITEMS OR DISPLAYING ONLY ITEMS THAT ARE UNCHECKED
  // User can type in a search term and the displayed list will be filtered by item names only containing that search term
  // User can edit the title of an item
// You must use the state management pattern. Update the store; run the render function. Do not directly update the DOM.


// **********************************************************


function getItemIndexFromElement(item) {
  const itemIndexString = $(item)
    .closest('.js-item-index-element')
    .attr('data-item-index');
  return parseInt(itemIndexString, 10);
}

function handleItemCheckClicked() {
  $('.js-shopping-list').on('click', '.js-item-toggle', event => {
  //  console.log('`handleItemCheckClicked` ran');
    const itemIndex = getItemIndexFromElement(event.currentTarget);
    toggleCheckedForListItem(itemIndex);
    renderShoppingList();
  });
}

//function to actually delete item from array
function deleteListItem(itemIndex) {
  console.log(`deleting item from index ${itemIndex} from STORE list`);
  STORE.splice(itemIndex, 1);
}

function handleDeleteItemClicked() {
  $('.js-shopping-list').on('click', '.js-item-delete', function(event) {
    const indexDelete =  getItemIndexFromElement(event.currentTarget);
    deleteListItem(indexDelete);
    renderShoppingList();
    //As a user, I can delete an item from the list
    console.log('`handleDeleteItemClicked` ran');
  });

}

// this function will be our callback when the page loads. it's responsible for
// initially rendering the shopping list, and activating our individual functions
// that handle new item submission and user clicks on the "check" and "delete" buttons
// for individual shopping list items.
function handleShoppingList() {
  renderShoppingList();
  handleNewItemSubmit();
  handleItemCheckClicked();
  handleDeleteItemClicked();
  toggleDisplayCheckedItems();
}

// when the page loads, call `handleShoppingList`
$(handleShoppingList);