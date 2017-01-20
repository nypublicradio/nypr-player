import { moduleForComponent, test } from 'ember-qunit';
import hbs from 'htmlbars-inline-precompile';

moduleForComponent('nypr-player/fast-forward-button', 'Integration | Component | nypr player/fast forward button', {
  integration: true
});

test('it renders', function(assert) {
  this.render(hbs`{{nypr-player/fast-forward-button}}`);
  assert.equal(this.$().text().trim(), 'Skip ahead 15 seconds');
});
