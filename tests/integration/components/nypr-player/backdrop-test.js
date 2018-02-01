import { moduleForComponent, test } from 'ember-qunit';
import hbs from 'htmlbars-inline-precompile';

moduleForComponent('nypr-player/backdrop', 'Integration | Component | nypr player/backdrop', {
  integration: true
});

test('it renders image url as svg', function(assert) {

  // Set any properties with this.set('myProperty', 'value');
  // Handle any actions with this.on('myAction', function(val) { ... });

  this.set('backdropUrl', 'http://backdropimageurl');
  this.render(hbs`{{nypr-player/backdrop backdropImageUrl=backdropUrl}}`);

  assert.equal(this.$('svg image')[0].href.baseVal, 'http://backdropimageurl');
});
