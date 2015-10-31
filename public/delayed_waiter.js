function delayHatingWaiter() {

  var delay = Math.floor((Math.random() * 10000) + 1);
  var value =  Math.floor((Math.random() * 100) + 1);

  return new Promise(function(resolve, reject){
    setTimeout(function(){ 
      if (delay > 3000) {
        resolve(value);
      } else {
        reject('I am in a bad mood. Delay was ' + delay);
      }
    }, delay  );
  });
}

var a = delayHatingWaiter();
a
.then(function(data) { console.log('Hello. I am in the then chain'); return data; })
.then(function(data) { console.log('Argument was ' + data); return data + 'abc';})
.then(function(data) { console.log('Argument was ' + data); return data;})
.catch(function(data){ console.log('Catch called ' + data); });
