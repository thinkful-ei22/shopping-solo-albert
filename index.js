'use strict';

const STORE = [
  {id: cuid(), name: 'apples', checked: false },
  {id: cuid(), name: 'oranges', checked: false },
  {id: cuid(), name: 'milk', checked: true },
  {id: cuid(), name: 'bread', checked: false }
];

// Separate object that would adjust the state
let State = {
  showCheckedOnly: false,
  searchString: '',
}

// Object destructuring to update the state
function setState(newState) {
   State = { ...State, ...newState }
  // State = { showCheckedOnly: true, searchString: 'asd', showCheckedOnly: false };
  renderShoppingList()
}



// Add a property to STORE array that would adjust the state.

function generateItemElement(item, itemIndex) {
  return `
    <li class="js-item-index-element" data-item-index="${itemIndex}" data-item-id="${item.id}">
       <input type="text" class="shopping-item js-edit-item js-shopping-item ${item.checked ? 'shopping-item__checked' : ''}" value= "${item.name}"/> 
      <div class="shopping-item-controls">
        <button class="shopping-item-toggle js-item-toggle">
            <span class="button-label">Check</span>
        </button>
        <button class="shopping-item-delete js-item-delete">
            <span class="button-label">Delete</span>
        </button>
        <button class="shopping-item-edit-title js-item-edit-title">
            <span class="button-label">Edit</span>
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


   let filteredStore = STORE;
// Filter for Checked/Unchecked item
   if(State.showCheckedOnly){
    filteredStore = STORE.filter(item => item.checked === State.showCheckedOnly)
   }

  // Filter for search Query

  if (State.searchString.trim()) {
    filteredStore = filteredStore.filter(item => item.name.includes(State.searchString))
  }

  const shoppingListItemsString = generateShoppingItemsString(filteredStore);

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
  STORE[itemIndex].checked = !STORE[itemIndex].checked;
}

// toggle the checkbox using the State object
function toggleDisplayCheckedItems(){
 //  console.log('`toggleDisplayCheckedItems` ran');
  $('#js-hidden-checkbox-toggle').on('click',  event => {
    const element = event.currentTarget;
    const checked = element.checked;
    setState({ showCheckedOnly: checked })

  });
  renderShoppingList();
}



// return the item index from the DOM
function getItemIndexFromElement(item) {
  const itemIndexString = $(item)
    .closest('.js-item-index-element')
    .attr('data-item-index');
  return parseInt(itemIndexString, 10);
}

// return the item id
function getItemIdFromElement(item) {
  const itemIdString = $(item)
    .closest('.js-item-index-element')
    .attr('data-item-id');
  return itemIdString;
}

function handleItemCheckClicked() {
  $('.js-shopping-list').on('click', '.js-item-toggle', event => {
    console.log('`handleItemCheckClicked` ran');
    const itemIndex = getItemIndexFromElement(event.currentTarget);

    toggleCheckedForListItem(itemIndex);
    renderShoppingList();
  });
}

// helper function to delete item from array by id
function deleteListItem(id) {
  const listItemIndex = STORE.findIndex(item => item.id === id);
  STORE.splice(listItemIndex, 1);
  console.log(`deleting item from ${id}`);
}


// delete item from the DOM using id instead of index
function handleDeleteItemClicked() {
  $('.js-shopping-list').on('click', '.js-item-delete', function(event) {
    const itemId =  getItemIdFromElement(event.currentTarget);
    deleteListItem(itemId);
    renderShoppingList();
    //As a user, I can delete an item from the list
    console.log('`handleDeleteItemClicked` ran');
  });
}



  function editShoppingListTitles() {
    $('.js-shopping-list').on('submit', '.js-edit-item', event => {
      event.preventDefault();
      const id = getItemIdFromElement(event.currentTarget);
      const itemName = $(event.currentTarget).find('.shopping-item').val();
      STORE.push({name: itemName, checked: false});
     renderShoppingList();
    });
  }



// function to filter search
function handleSearchType() {
  $('.js-shopping-filter').on('keyup', event => {
    console.log('User typed', event.currentTarget.value);
    setState({searchString: event.currentTarget.value})
  });

}



function handleShoppingList() {
  renderShoppingList();
  handleNewItemSubmit();
  handleItemCheckClicked();
  handleDeleteItemClicked();
  toggleDisplayCheckedItems();
  editShoppingListTitles(); 
  handleSearchType();
  
}

// when the page loads, call `handleShoppingList`
$(handleShoppingList);
