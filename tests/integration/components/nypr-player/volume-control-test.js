import { moduleForComponent, test } from 'ember-qunit';
import hbs from 'htmlbars-inline-precompile';

moduleForComponent('nypr-player/volume-control', 'Integration | Component | nypr player/volume control', {
  integration: true
});

test('it renders', function(assert) {
  this.render(hbs`{{nypr-player/volume-control}}`);

  assert.equal(this.$().text().trim(), 'Toggle Mute');
});
