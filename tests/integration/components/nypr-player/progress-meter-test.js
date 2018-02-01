import { moduleForComponent, test } from 'ember-qunit';
import hbs from 'htmlbars-inline-precompile';

moduleForComponent('nypr-player/progress-meter', 'Integration | Component | nypr player/progress meter', {
  integration: true
});

test('it renders', function(assert) {
  this.render(hbs`{{nypr-player/progress-meter}}`);
  assert.equal(this.$().text().trim(), '');
});
