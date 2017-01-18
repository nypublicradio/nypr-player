import { moduleForComponent, test } from 'ember-qunit';
import hbs from 'htmlbars-inline-precompile';

moduleForComponent('nypr-player/rewind-button', 'Integration | Component | nypr player/rewind button', {
  integration: true
});

test('it renders', function(assert) {

  // Set any properties with this.set('myProperty', 'value');
  // Handle any actions with this.on('myAction', function(val) { ... });

  this.render(hbs`{{nypr-player/rewind-button}}`);

  assert.equal(this.$().text().trim(), '');

  // Template block usage:
  this.render(hbs`
    {{#nypr-player/rewind-button}}
      template block text
    {{/nypr-player/rewind-button}}
  `);

  assert.equal(this.$().text().trim(), 'template block text');
});
