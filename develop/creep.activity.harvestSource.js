'use strict';

const harvestSourcePositions = require('./memory.harvestSourcePositions');

function find(creep) {
  let sources = creep.room.find(FIND_SOURCES);
  if (sources.length === 0) {
    creep.error('missing source');
    return;
  }
  sources = _.sortBy(sources,
    source => {
      const creeps = creep.room.find(FIND_MY_CREEPS, {
        filter: creep => creep.memory.harvestSource === source.id
      });
      return creeps.length / harvestSourcePositions.getAmountBySource(source);
    }
  );
  return sources[0];
}

module.exports = (full, next) => creep => {
  const harvestAmount = creep.getActiveBodyparts(WORK) * HARVEST_POWER;
  if (creep.isFull({ restCapacity: harvestAmount })) {
    return full;
  }
  const source = creep.getMemoryObject('harvestSource', find);
  if (!source || source.isEmpty()) {
    return next;
  }
  creep.moveToAnd('harvest', source);
};
