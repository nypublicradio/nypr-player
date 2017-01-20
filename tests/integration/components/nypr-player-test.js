import { moduleForComponent, test } from 'ember-qunit';
import hbs from 'htmlbars-inline-precompile';

moduleForComponent('nypr-player', 'Integration | Component | nypr player', {
  integration: true
});

test('it does not render notification area when revealNotificationBar is false', function(assert) {
  this.set('revealNotificationBar', false);
  this.render(hbs`{{#nypr-player revealNotificationBar=revealNotificationBar as |content|}}
      {{#content.for 'notification'}}
        NOTIFICATION TEST
      {{/content.for}}
    {{/nypr-player}}
  `);


  let actual = this.$('.notification-message').text().trim().replace(/\s{2,}/gm, ' ');
  assert.equal(actual, "");
});

test('it renders notification area when revealNotificationBar is true', function(assert) {
  this.set('revealNotificationBar', true);
  this.render(hbs`{{#nypr-player revealNotificationBar=revealNotificationBar as |content|}}
      {{#content.for 'notification'}}
        NOTIFICATION TEST
      {{/content.for}}
    {{/nypr-player}}
  `);

  let actual = this.$('.notification-message').text().trim().replace(/\s{2,}/gm, ' ');
  assert.equal(actual, "NOTIFICATION TEST");
});
