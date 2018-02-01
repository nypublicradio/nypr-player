import { moduleForComponent, test } from 'ember-qunit';
import hbs from 'htmlbars-inline-precompile';

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
