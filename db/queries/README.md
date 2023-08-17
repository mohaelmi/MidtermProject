# Database midterm Functions Documentation

This documentation outlines the functions available in different files forbuying/selling bikes project. Each file contains specific functions related to user management, item listings, wishlists, and filtering.(the list would be updated...)

| File                     | Function Name                           | Description
|--------------------------|-----------------------------------------|------------------------------------------------|
| users.js                 | `getUsers()`                            | List all users with id, name, and email.
|                          | `getUserById(userId)`                   | Get a user by their user ID.
|--------------------------|-----------------------------------------|------------------------------------------------|
| adminListingFunctions.js | `getAdminListingItems(sellerId)`        | Get all items listed by a seller_id (admin).
|                          | `addAdminListingItem(sellerId,newItem)` | Add a new item  to listing.
|                          | `editAdminListingItem(itemId,newItem)`  | Edit an item's details.
|                          | `markedSoldByAdmin(itemId)`             | Mark an item as SOLD!
|                          | `deleteAdminListingItem(itemId)`        | Delete an item from listing.
|--------------------------|-----------------------------------------|------------------------------------------------|
| filter.js                | `filterItems(filters)`                  | Filter items based on specified criteria.
|--------------------------|-----------------------------------------|------------------------------------------------|
| userWishlistFunction.js  | `getUserWishlist(userId)`               | Get a user's wishlist.
|                          | `addToWishlist(userId, itemId)`         | Add an item to a user's wishlist.
|                          | `removeFromWishlist(userId, itemId)`    | Remove an item from a user's wishlist.
|--------------------------|-----------------------------------------|------------------------------------------------|

