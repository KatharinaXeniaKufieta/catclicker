// Cats Object
var cats = {};

cats.names = [
  "Miezekatze",
  "Kietzematze",
  "Sparrow",
  "Ninja",
  "Deadpool",
  "Daredevil",
  "Mauzen"
];

cats.images = [
  "http://placekitten.com/200/300",
  "http://placekitten.com/200/400",
  "http://placekitten.com/300/300",
  "http://placekitten.com/300/200",
  "http://placekitten.com/400/400",
  "http://placekitten.com/300/400",
  "http://placekitten.com/400/500"
];


var createDOM = function() {
  var catList = document.getElementById('cat-list');
  var display = document.getElementById('cat-display');
  var cat,
      catName,
      name,
      image,
      clicks;
  for (var i = 0, max = cats.names.length; i < max; i++) {
    // Make List
    var cat = document.createElement('p');
    catName = document.createTextNode(cats.names[i]);
    cat.appendChild(catName);
    catList.appendChild(cat);
    // Create a new display per cat
    var catDiv = document.createElement('div');
    catDiv.style.visibility = 'hidden';
    catDiv.style.position = 'absolute';
    catDiv.style.top = '20px';
    catDiv.className += 'row';
    // Create a text node with the cats name
    var nameDiv = document.createElement('p');
    name = document.createTextNode(cats.names[i]);
    name.className += 'col-12';
    nameDiv.appendChild(name);
    nameDiv.style.color = '#b93863';
    // Create an image node with the cats image
    var imageDiv = document.createElement('div');
    image = document.createElement('img');
    image.src = cats.images[i];
    imageDiv.className += 'col-12';
    imageDiv.appendChild(image);
    // Create a next node showing the number of clicks
    var clicksCounter = 0;
    var clicksCounterDiv = document.createElement('p');
    clicksCounterDiv.textContent = "Clicks: " + clicksCounter;
    // clicks = document.createTextNode("Clicks: " + clicksCounter);
    clicksCounterDiv.className += 'col-12';
    clicksCounterDiv.style.color = '#b93863';
    // clicksCounterDiv.appendChild(clicks);

    // Append elements to DOM
    catDiv.appendChild(nameDiv);
    catDiv.appendChild(imageDiv);
    catDiv.appendChild(clicksCounterDiv);
    display.appendChild(catDiv);

    // Hover event listener
    cat.addEventListener('mouseover', (function(catDiv, cat) {
      return function() {
        catDiv.style.visibility = 'visible';
        cat.style.fontWeight = 'bold';
        cat.style.color = '#b93863';
      }
    })(catDiv, cat));

    catDiv.addEventListener('mouseover', (function(catDiv, cat) {
      return function() {
        catDiv.style.visibility = 'visible';
        cat.style.fontWeight = 'bold';
        cat.style.color = '#b93863';
      }
    })(catDiv, cat));

    catDiv.addEventListener('mouseout', (function(catDiv, cat) {
      return function() {
        catDiv.style.visibility = 'hidden';
        cat.style.fontWeight = 'normal';
        cat.style.color = '#fe4365';
      }
    })(catDiv, cat));

    // Mouseout event listener
    cat.addEventListener('mouseout', (function(catDiv, cat) {
      return function() {
        catDiv.style.visibility = 'hidden';
        cat.style.fontWeight = 'normal';
        cat.style.color = '#fe4365';
      }
    })(catDiv, cat));

    // Click event listener
    catDiv.addEventListener('click', (function(clicksCounter, clicksCounterDiv) {
      return function() {
        clicksCounter++;
        clicksCounterDiv.textContent = "Clicks: " + clicksCounter;
        console.log(clicksCounter);
      }
    })(clicksCounter, clicksCounterDiv));
  }
}

createDOM();
