var cat_1 = document.getElementById('cat-picture1');
var cat_2 = document.getElementById('cat-picture2');
var cat_name_1 = 'Miezekatze';
var cat_name_2 = 'Kiezematze';
var counter_1 = document.getElementById('click-counter1');
var counter_2 = document.getElementById('click-counter2');
var clicks_1 = 0;
var clicks_2 = 0;
counter_1.textContent = clicks_1 + ' clicks';
counter_2.textContent = clicks_2 + ' clicks';

document.getElementById('cat-name1').textContent = cat_name_1;
document.getElementById('cat-name2').textContent = cat_name_2;

cat_1.addEventListener('click', function() {
  clicks_1++;
  counter_1.textContent = clicks_1 + ' clicks';
}, false);
cat_2.addEventListener('click', function() {
  clicks_2++;
  counter_2.textContent = clicks_2 + ' clicks';
}, false);
