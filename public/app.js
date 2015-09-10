function randomNumberService() {
  var deferred = $.get('/some_random_number');
  return deferred
};

function multiplicationService(a, b) {
  var url = '/mult/' + a + '/' + b;
  var deferred = $.get(url);
  deferred.then(function(response){
    return Number(response);
  });
  return deferred;
}

function multiplyTheNumbersAndAddTen(x, y) {
  var product = multiplicationService(x, y);
  return product.then(function(abc){
    return 10 + Number(abc);
  });
}

function multiplyRandomNumbers() {
  var n1 = randomNumberService();
  var n2 = randomNumberService();
  return Promise.all([n1, n2]).then(function(values){
    console.log('random numbers', values);
    var product = multiplicationService(values[0], values[1]);
    return product;
  });
}

$(document).ready(function(){
  $('#multiplier').on('click', function(){
    var x = $('#x').val();
    var y = $('#y').val();
    var finalRes = multiplyTheNumbersAndAddTen(x, y);
    finalRes.then(function(res){
      $('h1').html(res);
    });
  });

  $('#mult_random').on('click', function(){
    var randomProduct = multiplyRandomNumbers();
    randomProduct.then(function(result){
      $('#random_product').html(result);
    });
  });

});

