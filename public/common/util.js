angular.module('util', [])
.directive('bindUnsafeHtml', ['$compile', function ($compile) {
  return function(scope, element, attrs) {
    scope.$watch(
      function(scope) {
        // watch the 'bindUnsafeHtml' expression for changes
        return scope.$eval(attrs.bindUnsafeHtml);
      },
      function(value) {
        // when the 'bindUnsafeHtml' expression changes
        // assign it into the current DOM
        element.html(value);

        // compile the new DOM and link it to the current
        // scope.
        // NOTE: we only compile .childNodes so that
        // we don't get into infinite loop compiling ourselves
        $compile(element.contents())(scope);
      }
    );
  };
}])
.factory('$data', function($http){

  var baseURL = '/api/';

  return {

    get: (function(url){

      return $http.get(baseURL + url).then(function(results){
        return results.data;
      });

    }),
    post: (function(url, obj){

      return $http.post(baseURL + url, obj).then(function(results){
        return results.data;
      });

    }),
    put: (function(url, obj){

      return $http.post(baseURL + url, obj).then(function(results){
        return results.data;
      });

    }),
    delete: (function(url, obj){

      return $http.post(baseURL + url, obj).then(function(results){
        return results.data;
      });

    })

  }

})
;
