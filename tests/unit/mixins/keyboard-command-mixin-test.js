import Ember from 'ember';
import KeyboardCommandMixinMixin from 'nypr-player/mixins/keyboard-command-mixin';
import { module, test } from 'qunit';

module('Unit | Mixin | keyboard command mixin');

// Replace this with your real tests.
test('it works', function(assert) {
  let KeyboardCommandMixinObject = Ember.Object.extend(KeyboardCommandMixinMixin);
  let subject = KeyboardCommandMixinObject.create();
  assert.ok(subject);
});
