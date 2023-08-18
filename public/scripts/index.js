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




  loadItems()
  postBikeForm()
  loadFavourites()




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
 * Show Post Bike Form
 */

const postBikeForm = function() {
  const button = document.querySelector(".post-bike");
  const dropdownForm = document.querySelector(".dropdown-form");
  console.log('button', button)

  button.addEventListener("click", function() {
    if (dropdownForm.style.display === "none") {
      dropdownForm.style.display = "flex"
    } else {
      dropdownForm.style.display = "none"
    }
  });
}


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

      <div class='icon-bar'>
        <i class="fa-solid fa-envelope"></i>
        <i class="fa-solid fa-star"></i>
      </div>
    </footer>
  </span>
</article>`;

  return element;
};

/**
 * addimage listener
 */
const

//takes in a list of database items and renders each with createItemElement
const renderItems = function(items) {
  const container = $('.listing-container');
  console.log(items[1])
  for (const item of items) {
    const element = createItemElement(item);
    container.append(element);

  }
}

  /**
 * Load Favourites
 * (how to add event listeners for things that don't exist yet??)
 */

  const loadFavourites = function(items) {
    const favouritesButton = document.querySelector(".fa-star");
    console.log(favouritesButton)
    favouritesButton.addEventListener("click", function() {
      console.log('in loadFavourites')

      //   .then(data => {
      //     // if (data.items) belongs user cookie
      //     renderItems(data.items);
      //   });

    });

  };

  /**
* Load User Listings
*/

  const loadMyListings = function(items) {
    const element = document.getElementByClassName("my-listings");
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


