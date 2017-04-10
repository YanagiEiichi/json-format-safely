define('jsonFormatSafely', function() {
  return function(data) {
    data += '';
    var protectedNumber = [];
    data = data.replace(/(:?\d(:?[eE][+-]?)?|\.|\\u[a-zA-Z\d]{4})+/g, function($0) {
      return protectedNumber.push($0) - 1;
    });
    data = JSON.stringify(JSON.parse(data), null, 2);
    return data.replace(/\d+/g, function(index) {
      return protectedNumber[index];
    });
  };
});
