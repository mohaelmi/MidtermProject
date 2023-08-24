$(document).ready(function() {

  //load all items to landing page
  loadItems();

  /*---------- listing-container listeners ----------*/

  //favouriting button listener
  $('.listing-container').on('click', '.item-favourite', toggleFavourite);

  //message seller button listener
  $('.listing-container').on('click', '.message-seller', messageSeller);

  //admin sold-button listener
  $('.listing-container').on('click', '.mark-sold', markSold);

  $("#message-form").on('submit', messageSubmit);

  $(".popup-close").on("click", $.modal.close);

  // Delete a listing for user
  $('.listing-container').on('click', '.delete-item', deleteItem);

  // Mark as sold
  $('.listing-container').on('click', '.sold-button', markSold);



  /*---------- toggle-bar listeners ----------*/
  //my favourites button listener
  $('.favourites').on('click', viewFavourites);

  $('.my-listings').on('click', viewMyListings);

  $('.all-listings').on('click', () => {
    console.log('all bikes clicked');
    $('.listing-container').empty();
    loadItems();
  });


  /*----------- Post Bike listeners -------------*/

  $('.post-bike').on('click', showBikeForm);
  // $('.post-button').on('click', postBikeButton);
  postBikeButton();
  //these need to be changed to have the listener in the document.ready, as above
  searchBarButton();

});

/*------------------------------ setup landing page -----------------------------*/

/**
 * Load All Items/Bikes onto landing page
 */
const loadItems = function() {
  $.get('/api/items')
    .then(data => {
      console.log(data.items[1]);
      renderItems(data.items);
    })
    .catch(err => console.log(err.message));
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
    $.post("/api/search", data)
    .then(data => {
      $('.listing-container').empty();
      renderItems(data.data);
      console.log(data);

    })
    .catch(err => err.message);
  });
};

/*-------------------------------- navbar buttons -----------------------------------*/

//shows the post new bike form
const showBikeForm = function(e) {
  e.preventDefault();
  console.log("showBikeForm is called")
  const dropdownForm = $(".dropdown-form");

  if (dropdownForm.css("display") === "none") {
      dropdownForm.css("display", "flex");
    } else {
      dropdownForm.css("display", "none");
    }
  };


/*---------------------------------POST NEW BIKE---------------------------------*/

//post new bike button listener
const postBikeButton = function() {

  const button = $('.post-button');

  button.on('click', function(e) {
    console.log("postBikeButton activated");
    e.preventDefault();
    const title = $('#new-listing_title').val();
    const price = $('#new-listing_price').val();
    const city = $('#new-listing_city').val();
    const size = $('#new-listing_size option:checked').val();
    const type = $('#new-listing_type option:checked').val();
    const description = $('#new-listing_description').val();
    const imgUrl = $('#post-image').val();
    const item = {
      title,
      price,
      city,
      size,
      type,
      description,
      imgUrl,
      condition: 'New',
      status: 'AVAILABLE'

    };
    console.log('posting this bike: ', item)
    $.post("/api/items", item, (data) => {
      //empty container
      $('.listing-container').empty();
      loadItems();

      //collapse dropdownForm
      const $dropdownForm = $('.dropdown-form');
      $dropdownForm.css('display', 'none');

      //clear dropdownForm inputs
      $('#new-listing_title').val('');
      $('#new-listing_price').val('');
      $('#new-listing_city').val('');

      //clear selects
      $('#new-listing_size').val('');
      $('#new-listing_type').val('');

      //clear description
      $('#new-listing_description').val('');
    })
      .catch(err => console.log(err.message));
  });

};

/*------------------------- toggle bar buttons -------------------------*/


//view all favourite items for certain id:
const viewFavourites = function() {
  $.get('api/favourites/')
    .then(data => {
      $('.listing-container').empty();
      console.log(items);
      renderItems(data.items);
    });
};


//view only your listings
const viewMyListings = function() {

  $.get('/users/items')
    .then(data => {

      $('.listing-container').empty();  //get rid of current shown listings
      renderItems(data.items, true);
    })
    .catch(err => console.log('error', err.message));
  };


  /*------------------------ FAVOURITES ---------------------------*/

//  //Load Favourites
//   const loadFavourites = function(items) {
//     const favouritesButton = document.querySelector(".favourites");

//     favouritesButton.addEventListener("click", function() {


//       $.get('/api/items')
//         .then(data => {
//           console.log(items);
//           renderItems(data.items);
//         });
//     });
//   };

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
  $.post(`/api/favourites/${item.item_id}`)
    .then(res => {
      console.log('posting!');
      $(this).toggleClass('red', item.favourite);
    });
};


/*--------------------------MESSAGE-------------------------*/

//Message PopUp
const messageSeller = function() {

  $('.message-seller').on('click', function() {
      $("#message-popup").modal();
  });
}

//Send Message
const messageSubmit = function(event) {
  event.preventDefault();
  const data = $(this).serialize()

  console.log("sending", data);

  // $.post("/api/sms", data)
  Promise.resolve()
  .then(() =>{
    $.modal.close();
    //show some pop saying message sent
    console.log("it worked!!");
    $("#message-sent").modal();


  })
  .catch(() => {
    //error modal
    $("#message-error").modal();
  })
}



/*------------------------DELETE/SOLD-----------------------*/

//Mark bike as sold
const markSold = function() {
  const article = $(this).closest('article.listing');
  const item = article.data('item');

  $.get(`/api/items/status/${item.item_id}`)
  .then(() => {
    const $footer = article.children('.listing-overview').children('footer')
    $footer.children('.status').text('SOLD')

    })
    .catch(err => console.log(err.message));
}


//Delete a bike item
const deleteItem = function() {

  const article = $(this).closest('article.listing');
  const item = article.data('item');
  console.log('deleting item:', item, "with item id", item.item_id);
  $.ajax({
    url: `/api/items/${item.item_id}`,
    type: 'DELETE',
    success: function(result) {
      console.log()
      viewMyListings()
    }
});
}


/*---------- html creating/rendering functions ----------*/


//renders a listing for an item for sale
const createItemElement = function(data, isOwner) {

  //extract item info from data
  const itemTitle = data.title;
  const itemURL = data.url
  const itemPrice = data.price;
  const itemLocation = data.city;
  const itemCondition = data.condition;
  const itemDescription = data.description;
  const itemSize = data.size;
  const postDate = timeago.format(data.created_at);
  const status = data.status;


  let element;

  if (!isOwner) {
    element = $(`<article class="listing">
    <span class="image">
    <img src=${itemURL} alt="Bike Image" width="200" height="200">
    </span>
    <span class="listing-overview">
      <header>
        $${itemPrice} - ${itemTitle}
      </header>
      <p> Size: ${itemSize}, Condition: ${itemCondition} </p>
      <p> ${itemDescription} </p>

      <footer>
        <span class = 'status'>${status}</span>
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
      <img src=${itemURL} alt="Bike Image" width="200" height="200">
    </span>
    <span class="listing-overview">
      <header>
        $${itemPrice} - ${itemTitle}
      </header>
      <p> Size: ${itemSize}, Condition: ${itemCondition} </p>
      <p> ${itemDescription} </p>

      <footer>
        <span class = 'status'>${status}</span>
        <span>${itemLocation} - ${postDate}</span>

      <div class='owner'>
        <button class='mark-sold'>Mark Sold</button>
        <button class='delete-item'>Delete Listing</button>
      </div>

      </footer>

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















