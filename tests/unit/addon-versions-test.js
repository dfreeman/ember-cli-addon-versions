import { module, test } from 'qunit';
import Ember from 'ember';

module('Unit | addon-versions');

test('addons are registered with Ember.libraries', function(assert) {
  let thisAddon = Ember.libraries._registry.find(addon => addon.name === 'ember-cli-addon-versions');
  assert.ok(thisAddon, 'ember-cli-addon-versions was registered');
});
