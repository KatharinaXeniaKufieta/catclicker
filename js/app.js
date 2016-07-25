/* ======= Model ======= */

var model = {
  cats: [
    {
      id: 0,
      name: "Miezekatze",
      image: "http://placekitten.com/200/300",
      clicks: 0
    }, {
      id: 1,
      name: "Kietzematze",
      image: "http://placekitten.com/300/300",
      clicks: 0
    }, {
      id: 2,
      name: "Sparrow",
      image: "http://placekitten.com/300/200",
      clicks: 0
    }, {
      id: 3,
      name: "Ninja",
      image: "http://placekitten.com/400/400",
      clicks: 0
    }, {
      id: 4,
      name: "Deadpool",
      image: "http://placekitten.com/300/400",
      clicks: 0
    }, {
      id: 5,
      name: "Daredevil",
      image: "http://placekitten.com/400/500",
      clicks: 0
    }, {
      id: 6,
      name: "Mauzen",
      image: "http://placekitten.com/200/400",
      clicks: 0
    }
  ],

  adminAreaVisible: false,
  currentCat: null
};

/* ======= Octopus ======= */

var octopus = {
  getCats: function() {
    return model.cats;
  },

  getCat: function(catID) {
    return model.cats[catID];
  },

  getCurrentCat: function() {
    return model.cats[currentCat.catID];
  },

  getAdminAreaVisible: function() {
    return model.adminAreaVisible;
  },

  toggleAdminAreaVisible: function() {
    if (model.adminAreaVisible === false) {
      model.adminAreaVisible = true;
    } else {
      model.adminAreaVisible = false;
    }
  },

  updateCat: function(newName, newURL, newClicks) {
    var currentCatId = model.currentCat.id;
    console.log('currentCatId: ' + currentCatId);
    // Update current cat
    model.cats[currentCatId].name = newName;
    model.cats[currentCatId].image = newURL;
    model.cats[currentCatId].clicks = newClicks;
    this.updateDisplay(currentCatId);
    viewCatList.render(model.cats);
  },

  updateDisplay: function(catID) {
    model.currentCat = this.getCat(catID);
    viewCatDisplay.render(model.currentCat);
  },

  updateClickCounter: function(catID) {
    model.cats[catID].clicks++;
    viewCatDisplay.renderClicks(this.getCat(catID));
  },

  init: function() {
    // Get the cat data from the model
    var cats = this.getCats();
    // Set the current cat to the first cat in the list
    model.currentCat = cats[0];
    // Initialize the cat list
    viewCatList.init(cats);
    // Initialize the display with the first cat in the list
    viewCatDisplay.init(model.currentCat);
    // Initialize the admin area, attaches event listeners to buttons
    viewAdmin.init();
  }
};

/* ======= View ======= */

var viewCatList = {
  init: function(cats) {
    this.render(cats);
  },

  render: function(cats) {
    // Grab the cat-list element from the DOM
    var catList = document.getElementById('cat-list');
    // Loop through all cats, create a text node and attach it to the
    // cat-list. 
    catList.innerHTML = '';
    cats.forEach(function(cat) {
      var listElement = document.createElement('p');
      listElement.appendChild(document.createTextNode(cat.name));
      listElement.id = 'cat-' + cat.id;
      catList.appendChild(listElement);
      // Add a click event listener to each elemnt in the list.
      listElement.addEventListener('click', (function(cat) {
        return function() {
          octopus.updateDisplay(cat.id);
        }
      })(cat));
    });
  }

};

var viewCatDisplay = {
  init: function(cat) {
    this.render(cat);
  },

  render: function(cat) {
    var name = document.getElementById('cat-display-name');
    var imgDiv = document.getElementById('cat-display-image');
    var clicks = document.getElementById('cat-display-clicks');

    // Clear image
    imgDiv.innerHTML = '';

    // Create an image
    var catImage = new Image();
    catImage.src = cat.image;

    // Attach a click event listener to the image
    catImage.addEventListener('click', (function(cat) {
      return function() {
        octopus.updateClickCounter(cat.id);
      }
    })(cat));

    // Append elements to DOM
    name.textContent = cat.name;
    imgDiv.appendChild(catImage);
    clicks.textContent = 'Clicks: ' + cat.clicks;

  },

  renderClicks: function(cat) {
    var clicks = document.getElementById('cat-display-clicks');
    clicks.textContent = "Clicks: " + cat.clicks;
  }
};

var viewAdmin = {

  save: function() {
    var newName = document.getElementById("cat-input-name").value;
    var newURL = document.getElementById("cat-input-url").value;
    var newClicks = document.getElementById("cat-input-clicks").value;
    console.log('newName: ' + newName);
    console.log('newURL: ' + newURL);
    console.log('newClicks: ' + newClicks);
    octopus.updateCat(newName, newURL, newClicks);
    this.toggleAdminArea();
  },

  toggleAdminArea: function() {
    var adminAreaVisible = octopus.getAdminAreaVisible();
    if (adminAreaVisible === true) {
      document.getElementById("admin-edit").style.visibility = 'hidden';
      octopus.toggleAdminAreaVisible();
    } else {
      document.getElementById("admin-edit").style.visibility = 'visible';
      octopus.toggleAdminAreaVisible();
    }
  },

  // Attach event listeners to admin buttons
  init: function() {
    var admin = document.getElementById("admin");
    var cancel = document.getElementById("cancel");
    var save = document.getElementById("save");

    // Show or hide the admin area when pressing the Admin button
    admin.addEventListener('click', function() {
      return viewAdmin.toggleAdminArea();
    });

    // Hide the admin area when pressing the Cancel button
    cancel.addEventListener('click', function() {
      return viewAdmin.toggleAdminArea();
    });
    // Validate and save the data when pressing the Save button
    save.addEventListener('click', function() {
      return viewAdmin.save();
    });
  }
};

octopus.init();
