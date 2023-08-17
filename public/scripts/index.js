$(document).ready(function() {

  /* stretch */
  //implement header collapsing into nav bar upon scroll
//   $(window).scroll(function(){
//     if($(document).scrollTop() > 0) {
//         $('nav').removeClass('big');
//         console.log('scrolling!')
//     } else {
//         $('nav').addClass('big');
//         console.log('back to top!')
//     }
// });

  console.log('working')
  loadItems()

});

/**
 * Load All Items/Bikes
 */

const loadItems = function() {
  console.log('in loadItems')
  $.get('/api/items')
    .then( data => {
      console.log('it worked!')
      renderItems(data.items)
    })
}

/**
 * Post New Bike
 */

const createItemElement = function(data) {

  //extract item info from data
  const itemTitle = data.title;
  const itemPrice = data.price;
  const itemLocation = data.city;
  const itemCondition = data.condition;
  const itemDescription = data.description;
  const itemSize = data.size;
  const postDate = data.created_at;

  // to do: figure out timeAgo
  // const postDate = data.created_at;
  // const timeAgo = timeago.format(postDate);

  const element = `<article class="listing">
  <span class="image">
    url img goes here
  </span>
  <span class="listing-overview">
    <header>
      $${itemPrice} - ${itemTitle}
    </header>
    <p> Size: ${itemSize}, Condition: ${itemCondition} </p>
    <p> ${itemDescription} </p>

    <footer>
      <span>${itemLocation} - ${postDate}</span>
      <span></span>
    </footer>
  </span>
</article>`;

  return element;
};



const renderItems = function(items) {
  const container = $('.listing-container');
  console.log(items[1])
  for (const item of items) {
    const element = createItemElement(item);
    container.append(element);

  }
}

  /**
 * Load WishList
 */

  const loadWishlist = function(items) {
    const element = document.getElementById("");
    element.addEventListener("click", function() {

      console.log('in loadItems');
      $.get('/api/items')
        .then(data => {
          // if (data.items) belongs user cookie
          renderItems(data.items);
        });

    });

  };

  /**
* Load User Listings
*/

  const loadMyListings = function(items) {
    const element = document.getElementById("");
    element.addEventListener("click", function() {

      console.log('in loadItems');
      $.get('/api/items')
        .then(data => {
          // if (data.items) belongs user cookie
          renderItems(data.items);
        });

    });
  };

  /**
   * Delete Bike
   */

  const deleteBike = function(item) {
    //if bike item belongs to user cookie delete
  };


