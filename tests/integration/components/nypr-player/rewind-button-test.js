import { moduleForComponent, test } from 'ember-qunit';
import hbs from 'htmlbars-inline-precompile';

moduleForComponent('nypr-player/rewind-button', 'Integration | Component | nypr player/rewind button', {
  integration: true
});

test('it renders', function(assert) {
  this.render(hbs`{{nypr-player/rewind-button}}`);
  assert.equal(this.$().text().trim(), 'Rewind 15 seconds');
});
