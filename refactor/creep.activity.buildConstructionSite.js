'use strict';

function find(creep) {
  return creep.pos.findClosestByPath(FIND_CONSTRUCTION_SITES);
}

function run(creep) {
  var constructionSite;
  if (!creep.memory.constructionSite ||
      !(constructionSite = Game.getObjectById(creep.memory.constructionSite))) {
    constructionSite = find(creep);
  }
  if (!constructionSite) {
    delete creep.memory.constructionSite;
    return true;
  }
  creep.memory.constructionSite = constructionSite.id;
  if (creep.build(constructionSite) === ERR_NOT_IN_RANGE) {
    creep.moveTo(constructionSite);
  } else {
    if (creep.carry.energy === 0) {
      delete creep.memory.constructionSite;
      return true;
    }
  }
}

module.exports = (next, harvest) => {
  return {
    buildConstructionSite: {
      run,
      next: creep => {
        if (creep.carry.energy) {
          return next;
        }
        return harvest;
      }
    }
  };
};
