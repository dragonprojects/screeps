'use strict';

module.exports = creep => {
  var constructionSite = creep.pos.findClosestByPath(FIND_CONSTRUCTION_SITES);
  if (constructionSite) {
    return true;
  }
  creep.memory.target = 'constructionSite';
  creep.memory.constructionSite = _.sample(constructionSites).id;
  return true;
};
