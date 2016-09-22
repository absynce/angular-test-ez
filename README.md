# angular-test-ez
Easy-to-use test helper for AngularJS

## Install

    bower install angular-test-ez

## Usage

### Include

    bower_components/angular-test-ez/dist/angular-test-ez.js

### Code

In app:

    angular.module('yourModule', ['testez']);

In tests:

    beforeEach(module('testez'));
