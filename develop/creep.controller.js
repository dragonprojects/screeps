'use strict';

module.exports = roles => creep => {
  if (!roles[creep.memory.role]) {
    //TODO: what should happen if the role of a creep is not anymore known?
    return;
  }

  var activities = roles[creep.memory.role].activities;

  if (creep.memory.activity && !activities[creep.memory.activity]) {
    delete creep.memory.activity;
  }
  if (!creep.memory.activity) {
    creep.memory.activity = _.keys(activities)[0];
  }

  var activity = activities[creep.memory.activity];
  if (activity.do(creep)) {
    if (typeof activity.next === 'function') {
      creep.memory.activity = activity.next(creep);
    } else {
      creep.memory.activity = activity.next;
    }
  }
};
