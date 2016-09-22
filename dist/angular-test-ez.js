angular.module('testez', []);

(function (module) {
  "use strict";

  var isFunction = function isFunction(value) { return typeof value == 'function'; };
  var isPromiseLike = function isPromiseLike(obj) { return obj && isFunction(obj.then); };

  module.service('testEzService', function testEzService() {
    return {
      isFunction: isFunction,
      isPromiseLike: isPromiseLike
    };
  });

})(angular.module('testez'));
