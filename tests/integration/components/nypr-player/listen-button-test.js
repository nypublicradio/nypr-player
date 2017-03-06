import { moduleForComponent, test } from 'ember-qunit';
import hbs from 'htmlbars-inline-precompile';

moduleForComponent('nypr-player/listen-button', 'Integration | Component | nypr player/listen button', {
  integration: true
});

test('it renders currentTitle as title attribute', function(assert) {
  this.set('currentTitle', 'WNYC FM');
  this.render(hbs`{{nypr-player/listen-button currentTitle=currentTitle}}`);
  assert.equal(this.$('button')[0].title, 'Listen to WNYC FM');
});

test('it sets play state as class name', function(assert) {
  this.set('playState', 'is-playing');
  this.render(hbs`{{nypr-player/listen-button playState=playState}}`);
  assert.equal(this.$('.is-playing').length, 1);

  this.set('playState', 'is-loading');

  assert.equal(this.$('.is-playing').length, 0);
  assert.equal(this.$('.is-loading').length, 1);
});
