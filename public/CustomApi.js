(function(container) {
  var names = [
    "Adalyn","Snow","Gustavo","Bradley","Mikayla","Freeman","Alicia","Hickman","Jalen","Bryan","Christian","Hobbs","Aria","Cohen","Amya","Sosa","Aydin","Anderson","Catherine","Lester","Damien","Terrell","Parker","Rich"
  ];
  var letters = 'ABCDEFGHIJKLMNOPRSTVWY'.split('');
  var fruits = [
    'blackberries', 'apple', 'orange', 'banana', 'pear', 'watermelon', 'cherries', 'mango',
    'grapes', 'apple', 'orange', 'cantaloupe', 'strawberries', 'kiwi', 'pineapple', 'pomegranate'
  ];

  var api = {
    get: function(callback) {
      var iter = 30 + Math.round(Math.random()*50);

      var fruitIter = 3 + Math.ceil(Math.random()*4);
      var favFruit = genRandomItems(fruitIter);

      var arr = [];
      for (var i=0; i<iter; i++) {
        var randF = Math.floor(Math.random() * names.length);
        var randL = Math.floor(Math.random() * letters.length);
        var randFruit = Math.floor(Math.random() * favFruit.length);
        arr[i] = {
          name: names[randF] + ' ' + letters[randL] + '.',
          favoriteFruit: favFruit[randFruit]
        }
      }
      var timeout = Math.floor(Math.random()*500) + 100;
      setTimeout(function(){
        if (callback) {
          callback(arr);
        }
      }, timeout);
    }
  };

  function genRandomItems(num) {
    var currentItem = [];
    var rerun = true;
    while(rerun) {
      for (var j = 0; j < num; j++) {
        var index = Math.floor(Math.random() * fruits.length);
        currentItem.push(fruits[index]);
      }
      var seen = currentItem[0];
      for (var i = 1; i < currentItem.length; i++) {
        if (currentItem[i] != seen) {
          rerun = false;
        }
      }
    }
    return currentItem;
  }
  container.CustomApi = api;
})(window);
