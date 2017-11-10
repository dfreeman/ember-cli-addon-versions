/* eslint-env node, es6 */
'use strict';

const FileCreator = require('broccoli-file-creator');

module.exports = {
  name: 'ember-cli-addon-versions',

  included() {
    this._super.included.apply(this, arguments);
    this.import('vendor/ember-cli-addon-versions.js');
  },

  treeForVendor() {
    let addons = this._crawlAddonVersions(new Map(), this.project);
    let output = [];

    for (let name of addons.keys()) {
      for (let version of (addons.get(name))) {
        output.push(`Ember.libraries.register(${JSON.stringify(name)}, ${JSON.stringify(version)});`);
      }
    }

    return new FileCreator('ember-cli-addon-versions.js', output.join('\n'));
  },

  _crawlAddonVersions(addons, node) {
    for (let addon of node.addons) {
      if (IGNORE.has(addon.name) || !addon.pkg.version) { continue; }

      let versions = addons.get(addon.name);
      if (!versions) {
        addons.set(addon.name, versions = new Set());
      }
      versions.add(addon.pkg.version);

      this._crawlAddonVersions(addons, addon);
    }
    return addons;
  }
};

// Packages that will show up on their own
const IGNORE = new Set([
  'ember-source',
  'ember-data'
]);
