

$(document).ready(function() {
  //load all items to landing page
  loadItems();

  /*---------- new bike form listeners ----------*/
  //add Image button listener
  $('.image-button').on('click', addImageButton);




  /*---------- listing-container listeners ----------*/
  //favouriting button listener
  $('.listing-container').on('click', '.item-favourite', toggleFavourite);

  //message seller button listener{
  $('.listing-container').on('click', '.message-seller', messageSeller);



  /*---------- toggle-bar listeners ----------*/
  //my favourites button listener
  $('.favourites').on('click', viewFavourites);

  $('.my-listings').on('click', viewMyListings);

  $('.all-listings').on('click', () => {
    console.log('all bikes clicked');
    $('.listing-container').empty();
    loadItems();
  });

  /*---------- admin listing listeners -----------*/
  //must implement



  //these need to be changed to have the listener in the document.ready, as above
  showBikeForm();
  postBikeButton();
  searchBarButton();
  //loadMyListings();




});

/*---------- setup landing page ----------*/

/**
 * Load All Items/Bikes onto landing page
 */
const loadItems = function() {
  $.get('/api/items')
    .then(data => {
      //console.log('it worked!')
      renderItems(data.items);
    })
    .catch(err => console.log(err.message));
};


/*---------- navbar buttons ----------*/

//shows the post new bike form
const showBikeForm = function() {
  const button = document.querySelector(".post-bike");
  const dropdownForm = document.querySelector(".dropdown-form");

  button.addEventListener("click", function() {
    if (dropdownForm.style.display === "none") {
      dropdownForm.style.display = "flex";
    } else {
      dropdownForm.style.display = "none";
    }
  });
};


//searchbar listener
const searchBarButton = function() {
  $('.search-button').on('click', (e) => {
    e.preventDefault();
    const minPrice = $('#min-price').val();
    const maxPrice = $('#max-price').val();
    const data = {
      minPrice,
      maxPrice
    };
    //console.log(data);
    $.post("/search", data, (data) => {
      $('.listing-container').empty();
      renderItems(data.data);
      console.log(data);

    })
      .catch(err => err.message);
    // alert('Seach bar clicked!')
  });
};


/*---------- new bike form buttons ----------*/

//needs implementing
//associate image with bike you are posting
const addImageButton = function() {
  alert('you should add an image!');
};


//post new bike button listener
const postBikeButton = function() {

  const $button = $('.post-button');
  $button.on('click', function(e) {
    e.preventDefault();
    const title = $('#new-listing_title').val();
    const price = $('#new-listing_price').val();
    const city = $('#new-listing_city').val();
    const size = $('#new-listing_size option:checked').val();
    const type = $('#new-listing_type option:checked').val();
    const description = $('#new-listing_description').val();
    const item = {
      title,
      price,
      city,
      size,
      type,
      description,
      condition: 'New',
      status: 'Available'
    };
    $.post("/api/items", item, (data) => {
      $('.listing-container').empty();
      loadItems();
      const dropdownForm = document.querySelector(".dropdown-form");
      dropdownForm.style.display = "none";
      console.log(data);

    })
      .catch(err => err.message);
  });

};

/*---------- toggle bar buttons ----------*/

//needs new favourites route to return the whole item, not just id
//view all favourite items for certain id:
const viewFavourites = function() {
  $.get('api/favourites/')
    .then(data => {
      console.log(data.items);
    });
};


/**
 * Load Favourites
 * (how to add event listeners for things that don't exist yet??)
 */
const loadFavourites = function(items) {
  const favouritesButton = document.querySelector(".favourites");

  favouritesButton.addEventListener("click", function() {
    console.log(items);

    $.get('/api/items')
      .then(data => {

        renderItems(data.items);
      });

  });

};


//view only your listings
const viewMyListings = function() {
  $.get('/users/items/2')
    .then(data => {
      $('.listing-container').empty();  //get rid of current shown listings
      renderItems(data.items, true);
    })
    .catch(err => console.log('error', err));
};
/*---------- listing buttons ----------*/

// adds/deletes item to favourites if the button is clicked.
const toggleFavourite = function() {
  //console.log(this)
  const article = $(this).closest('article.listing');
  const item = article.data('item');
  item.favourite = !item.favourite;

  //if removing favourite, delete item:
  if (!item.favourite) {
    $.ajax({
      url: `/api/favourites/${item.id}`,
      type: 'DELETE',
      success: () => {
        console.log('deleting item from favourites!');
        $(this).toggleClass('red', item.favourite);
      }
    });
    return;
  }

  //otherwise, add item to favourites!
  $.post(`/api/favourites/${item.id}`)
    .then(res => {
      console.log('posting!');
      $(this).toggleClass('red', item.favourite);
    });
};

//brings up form to message seller regarding bike. need to implement twilio api call
const messageSeller = function() {
  $('#message-popup').popup();
  alert('message the seller!');
};

/**
 * Delete Bike
 */

const deleteBike = function(item) {
  //if bike item belongs to user cookie delete
};


/*---------- html creating/rendering functions ----------*/

//creates a pop up div to message seller. need to create html to render.
const renderUserMessage = function(data) {
  return 'hello world!';
};

//renders a listing for an item for sale
const createItemElement = function(data, isOwner) {

  //extract item info from data
  const itemTitle = data.title;
  const itemPrice = data.price;
  const itemLocation = data.city;
  const itemCondition = data.condition;
  const itemDescription = data.description;
  const itemSize = data.size;
  const postDate = data.created_at;

  let element;

  if (!isOwner) {
    element = $(`<article class="listing">
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
          <i class="fa-solid fa-envelope message-seller"></i>
          <i class="fa-solid fa-star item-favourite"></i>
        </div>
      </footer>
    </span>
  </article>`);
  }
  //add owner permissions
  else {
    element = $(`<article class="listing">
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
          <i class="fa-solid fa-envelope message-seller"></i>
          <i class="fa-solid fa-star item-favourite"></i>
        </div>
      </footer>
      <div class='owner'>
        <button class='sold-button'>Mark Sold</button>
        <button class='delete-item'>Delete Listing</button>
      </div>
    </span>
  </article>`);
  }
  element.data('item', data);
  return element;
};

//takes in a list of database items and renders each with createItemElement.

const renderItems = function(items, isOwner) {
  const container = $('.listing-container');
  // console.log(isOwner)
  items.reverse().forEach((item, i) => {
    const element = createItemElement(item, isOwner);
    container.prepend(element);
  });
};















