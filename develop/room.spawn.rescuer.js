'use strict';

var body = require('./util.body');

module.exports.conditions = room => {
  return room.controller.level >= 1
         &&
         room.find(FIND_MY_CREEPS).length === 0;
};

module.exports.bodies = {
  'rescuer': body({ carry: 1, move: 1, work: 2 })
};

module.exports.priorities = [
  {
    role: 'rescuer',
    amount: 1
  }
];
