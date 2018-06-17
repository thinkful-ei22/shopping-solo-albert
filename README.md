# Shopping List App

### The following updated features will be added to the new version of the shopping list app. Which will require a more complex store object:

* User can press a switch/checkbox to toggle between displaying all items or displaying only items that are unchecked
* User can type in a search term and the displayed list will be filtered by item names only containing that search term
* User can edit the title of an item

I accomplish this using the state management pattern. >>> Update the store; run the render function. Do not directly update the DOM.