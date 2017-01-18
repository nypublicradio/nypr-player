import { moduleForComponent, test } from 'ember-qunit';
import hbs from 'htmlbars-inline-precompile';

moduleForComponent('nypr-player/fast-forward-button', 'Integration | Component | nypr player/fast forward button', {
  integration: true
});

test('it renders', function(assert) {

  // Set any properties with this.set('myProperty', 'value');
  // Handle any actions with this.on('myAction', function(val) { ... });

  this.render(hbs`{{nypr-player/fast-forward-button}}`);

  assert.equal(this.$().text().trim(), '');

  // Template block usage:
  this.render(hbs`
    {{#nypr-player/fast-forward-button}}
      template block text
    {{/nypr-player/fast-forward-button}}
  `);

  assert.equal(this.$().text().trim(), 'template block text');
});
