var data = {
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
  ]
};

var octopus = {
  getCats: function() {
    return data.cats;
  },

  getCat: function(catID) {
    return data.cats[catID];
  },

  updateDisplay: function(catID) {
    viewCatDisplay.render(this.getCat(catID));
  },

  updateClickCounter: function(catID) {
    data.cats[catID].clicks++;
    viewCatDisplay.renderClicks(this.getCat(catID));
  },

  init: function() {
    // Get the cat data from the model
    var cats = this.getCats();
    // Set the current cat to the first cat in the list
    // Initialize the cat list
    viewCatList.init(cats);
    // Initialize the display with the first cat in the list
    viewCatDisplay.init(cats[0]);
  }
};

var viewCatList = {
  init: function(cats) {
    // Grab the cat-list element from the DOM
    var catList = document.getElementById('cat-list');
    // Loop through all cats, create a text node and attach it to the
    // cat-list. 
    cats.forEach(function(cat) {
      var listElement = document.createElement('p');
      listElement.appendChild(document.createTextNode(cat.name));
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

octopus.init();
