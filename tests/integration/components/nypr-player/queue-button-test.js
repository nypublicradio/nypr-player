import { moduleForComponent, test } from 'ember-qunit';
import hbs from 'htmlbars-inline-precompile';

moduleForComponent('nypr-player/queue-button', 'Integration | Component | nypr player/queue button', {
  integration: true
});

test('it renders', function(assert) {
  this.render(hbs`{{nypr-player/queue-button}}`);
  const expected = 'Queue';
  let actual = this.$().text().trim();
  assert.equal(actual, expected);
});

test('it calls the external showModal action', function(assert) {
  function externalAction() {
    assert.ok('it was called');
  }

  this.set('externalAction', externalAction);
  this.render(hbs`{{nypr-player/queue-button showModal=externalAction}}`);
  this.$('.nypr-player-queue-button').click();
});

test('it calls the external closeModal action', function(assert) {
  function externalAction() {
    assert.ok('it was called');
  }

  this.set('externalAction', externalAction);
  this.set('isOpenModal', true);
  this.render(hbs`{{nypr-player/queue-button isOpenModal=isOpenModal closeModal=externalAction}}`);
  this.$('.nypr-player-queue-button').click();
});

test('it adds an animate class if the queuelength is increased', function(assert) {
  this.set('queueLength', 0);
  this.render(hbs`{{nypr-player/queue-button queueLength=queueLength}}`);
  assert.notOk(this.$('.nypr-player-queue-button').hasClass('animate'), 'no animate class at start');
  this.set('queueLength', 1);
  assert.ok(this.$('.nypr-player-queue-button').hasClass('animate'), 'animate class is added');
});
