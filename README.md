# angular-test-ez
Easy-to-use test helper for AngularJS

## Install

    bower install angular-test-ez

## Usage

### Include

    bower_components/angular-test-ez/dist/angular-test-ez.js

### Code

In app:

    angular.module('yourModule', ['testez'])
      .service('yourService', ['testEzService', function yourServiceFactory(testEzService) {
        testEzService.isPromiseLike(someFunction);
      }]);

In tests:

    var testEzService;

    beforeEach(module('testez'));

    beforeEach(inject(function inject(
      _testEzService_
    ) {
      testEzService = _testEzService_
    }));

    it('should be a promise', function () {
      expect(testEzService.isPromiseLike(someFunction)).toBe(true);
    })

### Methods

##### `isFunction(value) // returns boolean`

If the passed parameter is a function, return true.

    testEzService.isFunction(function () {}); // returns true
    testEzService.isFunction(3); // returns false.

##### `isPromiseLike(obj) // returns boolean`

If the passed parameter has a `.then` function, return true. Otherwise, return false.

    testEzService.isPromiseLike($q.defer().promise); // returns true
    testEzService.isPromiseLike(3); // returns false

## Development

### Run tests

    gulp test

### Create release distribution

    gulp build # creates dist/angular-test-ez.js

### Bump version

    gulp bump # prompts for release type/version

### Tag

    gulp tag # prompts to confirm tag
    gulp tag -f # forces tag, i.e. no prompt
    gulp tag -m "Tag message here" # Specify tag annotation message
