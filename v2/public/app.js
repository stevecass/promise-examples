function stevensAjax(method, url) {

  var executor = function(resolve, reject) {
    var xhr  = new XMLHttpRequest();
    xhr.onerror = function() {
      reject(this.statusText);
    };
    xhr.onload = function() {
      if (this.status >= 200 && this.status <= 300) {
        resolve(this.response);
      } else {
        reject(this.statusText);
      }
    };
    xhr.open(method, url);
    xhr.send();
  };

  var promise = new Promise(executor);
  return promise;
}

//Use bind to create a new fn with method set to GET
var ajaxGet = stevensAjax.bind(null, 'GET');

document.addEventListener('DOMContentLoaded', function(){
  ajaxGet('/word/n')
  .then(function(arg){
    return arg + ' H. ' ;
  }).then(function(arg){
    // here we'll return a promise contingent on another server call
    return stevensAjax('get', '/word/y').then(function(response){ return arg + response; })
  }).then(function(arg){
    document.getElementById('output').innerHTML = arg;
  });
})
/*
Each then call returns a new promise object. We can rewrite the above as below
*/

document.addEventListener('DOMContentLoaded', function(){
  var p1 = ajaxGet('/word/n');
  var p2 = 
  p1.then(function(arg){
    return arg + ' H. ' ;
  });
  var p3 = p2.then(function(arg){
    // here we'll return a promise contingent on another server call
    return stevensAjax('get', '/word/y').then(function(response){ return arg + response; })
  });
  var p4 = p3.then(function(arg){
    document.getElementById('output2').innerHTML = arg;
  });
  /* Attach promises to the window so that we can inspect them in the console */
  window.promises = [p1, p2, p3, p4]
  console.log('promises',  promises);


})
