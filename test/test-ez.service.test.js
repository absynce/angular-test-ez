describe('testEzService', function testTestEzService() {

  beforeEach(module('testez'));

  describe('isFunction', function testIsFunction() {

    it('should be a function', inject(function testIsFunctionShouldBeAFunction(testEzService) {
      expect(typeof testEzService.isFunction == 'function');
    }));

    describe('when passed a function', function testIsFunctionPassedAFunction() {

      it('should return true', inject(function testIsFunctionPassedAFunctionReturnsTrue(testEzService) {
        var add = function add(x, y) {
          return x + y;
        };

        var isAddAFunction = testEzService.isFunction(add);

        expect(isAddAFunction).toBe(true);
      }));
    });

    describe('when passed an integer', function testIsFunctionPassedAnInteger() {
      it('should return false', inject(function testIsFunctionPassedAnIntegerReturnsFalse(testEzService) {

        var isThreeAFunction = testEzService.isFunction(3);

        expect(isThreeAFunction).toBe(false);
      }));
    });

    describe('when passed nothing', function testIsFunctionPassedNothing() {
      it('should return false', inject(function testIsFunctionPassedNothingReturnsFalse(testEzService) {
        var isNothingAFunction = testEzService.isFunction();

        expect(isNothingAFunction).toBe(false);
      }));
    });
  });

  describe('isPromiseLike', function testIsPromiseLike() {

    it('should be a function', inject(function testIsPromiseLikeShouldBeAFunction(testEzService) {
      expect(typeof testEzService.isPromiseLike == 'function');
    }));

    describe('when passed a promise', function testIsPromiseLikePassedPromise() {
      var $q;

      beforeEach(inject(function injectDependencies(
        _$q_
      ) {
        $q = _$q_;
      }));

      it('should return true', inject(function testIsPromiseLikePassedPromiseReturnsTrue(testEzService) {
        var promise = $q.defer().promise;

        expect(testEzService.isPromiseLike(promise)).toBe(true);
      }));
    });

    describe('when passed an object with a "then" function', function testIsPromiseLikePassedObjectWithThenFunction() {
      it('should return true', inject(function testIsPromiseLikePassedObjectWithThenFunctionReturns(testEzService) {
        var someObject = {
          apple: "red",
          value: 42,
          funk: function funk() {
            return "get funk-y";
          },
          then: function then() {
            return "I promise.";
          }
        };

        expect(testEzService.isPromiseLike(someObject)).toBe(true);
      }));
    });

    describe('when passed an object without a "then" function', function testIsPromiseLikePassedObjectWithoutThenFunction() {
      it('should return false', inject(function testIsPromiseLikePassedObjectWithoutThenFunctionReturnsFalse(testEzService) {
        var someObject = {
          apple: "red",
          value: 42,
          funk: function funk() {
            return "get funk-y";
          }
        };

        expect(testEzService.isPromiseLike(someObject)).toBe(false);
      }));
    });
  });
});
