/**
 * Populate DB with sample data on server start
 * to disable, edit config/environment/index.js, and set `seedDB: false`
 */

'use strict';

var User = require('../api/user/user.model');

User.find({}).remove(function() {
  User.create({
  name: 'Ryan Villanueva',
  provider: 'facebook',
  facebook: { id: '10153420781732667', name: 'Ryan Villanueva' },
  birthday: true,
  hero:
   { name: 'The Daring Avenger',
     power: 'immediately win the affection of my lion of Lannister as if your life depended on it',
     enemy: '10153420781732667' },
  role: 'admin' }, function() {
      console.log('finished populating users');
    }
  );
});
