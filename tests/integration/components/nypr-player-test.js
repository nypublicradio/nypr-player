import { moduleForComponent, test } from 'ember-qunit';
import hbs from 'htmlbars-inline-precompile';
import { find } from 'ember-native-dom-helpers';

moduleForComponent('nypr-player', 'Integration | Component | nypr player', {
  integration: true
});

test('can pass in story and show title to player', function(assert) {

  this.render(hbs`
    {{nypr-player storyTitle='story foo' showTitle='show bar'}}
  `);

  assert.equal(this.$('.nypr-player-button.mod-listen').attr('data-story'), 'story foo');
  assert.equal(this.$('.nypr-player-button.mod-listen').attr('data-show'), 'show bar');
});

test('it renders', function(assert) {
  this.render(hbs`{{nypr-player}}`);
  assert.ok(find('.nypr-player'));
});

test('can specify content blocks', function(assert) {
  const TITLE = 'foo';
  const AUX = 'auxillary area';

  this.set('title', TITLE);
  this.set('aux', AUX);
  this.render(hbs`{{#nypr-player as |content|}}
    {{#content.for 'trackInfo'}}
      {{title}}
    {{/content.for}}

    {{#content.for 'aux'}}
      {{aux}}
    {{/content.for}}
  {{/nypr-player}}`);

  assert.equal(find('.nypr-player-track-info').textContent.trim(), TITLE);
  assert.ok(find('.ember-holygrail-right > .nypr-player-controls').textContent.match(AUX));
});
