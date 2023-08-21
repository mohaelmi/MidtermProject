$(document).ready(function() {

  loadItems()
  showBikeForm()
  addImageButton();
  postBikeButton();
  toggleBarButtons();
  searchBarButton();
  //loadFavourites() uncomment when we figure out adding
  loadMyListings();

  $('.listing-container').on('click', '.item-favourite', toggleFavourite);

});

const toggleFavourite = function() {
  const article = $(this).closest('article.listing');
  const item = article.data('item');
  item.favourite = !item.favourite;

  $.post(`/api/favourites/${item.id}`)
  .then(res => {
    $(this).toggleClass('red', item.favourite);
  })
}

/**
 * Load All Items/Bikes onto landing page
 */
const loadItems = function() {

  console.log('in loadItems')
  $.get('/api/items')
    .then( data => {
      console.log('it worked!')
      renderItems(data.items)
    })
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

  const element = $(`<article class="listing">
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
        <i class="fa-solid fa-star item-favourite"></i>
      </div>
    </footer>
  </span>
</article>`);
  element.data('item', data);
  return element;
};

//takes in a list of database items and renders each with createItemElement
const renderItems = function(items) {
  const container = $('.listing-container');
  console.log(items[1])
  for (const item of items) {
    const element = createItemElement(item);
    container.prepend(element);

  }
}


/* --------------- EVENT LISTENERS ----------------------*/

/**
 * Show Post Bike Form
 */
const showBikeForm = function() {
  const button = document.querySelector(".post-bike");
  const dropdownForm = document.querySelector(".dropdown-form");

  button.addEventListener("click", function() {
    if (dropdownForm.style.display === "none") {
      dropdownForm.style.display = "flex"
    } else {
      dropdownForm.style.display = "none"
    }
  });
}

//add image button listener
const addImageButton = function() {
  $('.image-button').click(() => {
    alert('image button clicked!');
  })
}

//post new bike button listener
const postBikeButton = function () {

  const $button = $('.post-button');
  $button.on('click', function(e) {
    e.preventDefault();
    const title = $('#new-listing_title').val();
    const price = $('#new-listing_price').val();
    const city = $('#new-listing_city').val();
    const size = $('#new-listing_size option:checked').val();
    const type = $('#new-listing_type option:checked').val();
    const description = $('#new-listing_description').val();
    const bike = {
      title, 
      price, 
      city, 
      size, 
      type, 
      description 
    }
    console.log(bike);
  })

  
  // $('.post-button').click(() => {
  //   alert('post form button clicked!');
  // })
}

//togglebar listener
const toggleBarButtons = function() {
  $('.toggle-bar').on('click', '*', () => {
    alert('toggle bar option clicked!')
  })
}

//searchbar listener
const searchBarButton = function () {
  $('.search-button').on('click', (e) => {
    e.preventDefault();
    const minPrice = $('#min-price').val()
    const maxPrice = $('#max-price').val()
    const data = {
      minPrice,
      maxPrice
    }
    //console.log(data);
    $.post("/search", data, (data) => {
      $('.listing-container').empty()
      renderItems(data.data)
      console.log(data);

    })
    .catch(err => err.message)
   // alert('Seach bar clicked!')
  })
}

//send Message listener

const sendMessage = function () {

  $("fa-solid fa-envelope").click(function() {
     alert("message seller")
  })

}

  /**
 * Load Favourites
 * (how to add event listeners for things that don't exist yet??)
 */
const loadFavourites = function(items) {
  const favouritesButton = document.querySelector(".favourites");

  favouritesButton.addEventListener("click", function() {
    console.log(items)

    $.get('/api/items')
    .then( data => {

        renderItems(data.items)
    })

  });

  };

  /**
* Load User Listings / NOT YET WORKING
*/
  const loadMyListings = function() {
    const myListings = document.getElementsByClassName("my-listings");
    myListings.addEventListener("click", function() {

      console.log('in loadItems');
      $.get('/api/items')
        .then(data => {
          data.items.forEach(item => {
            if(data.items[seller_id] === "2") {
              renderItems(data.items);
            }
          })
        });

    });
  };

  /**
   * Delete Bike
   */

  const deleteBike = function(item) {
    //if bike item belongs to user cookie delete
  };


