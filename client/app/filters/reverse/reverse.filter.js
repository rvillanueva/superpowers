'use strict';

angular.module('birthdayApp')
    .filter('reverse', function() {
      return function(items) {
        return items.slice().reverse();
      };
    });
