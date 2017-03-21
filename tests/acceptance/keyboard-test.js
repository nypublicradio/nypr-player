import { test, skip } from 'qunit';
import moduleForAcceptance from '../../tests/helpers/module-for-acceptance';
import '../../tests/helpers/hifi-acceptance-helper';

moduleForAcceptance('Acceptance | keyboard');

test('visiting /', function(assert) {
  visit('/');

  andThen(function() {
    assert.equal(currentURL(), '/');
  });
});

test('player exists', function(assert) {
  visit('/');

  andThen(function() {
    assert.equal($('.nypr-player').length, 1);
  });
});

test('up arrow activates volume', function(assert) {
  visit('/');

  andThen(() => {
    let keyPress = $.Event('keydown', {which: 38}); //up
    $('.nypr-player').trigger(keyPress);
  });

  andThen(() => {
    assert.equal($('.nypr-player-volume.active').length, 1);
  });
});

test('down arrow activates volume', function(assert) {
  visit('/');

  andThen(() => {
    let keyPress = $.Event('keydown', {which: 40}); //down
    $('.nypr-player').trigger(keyPress);
  });

  andThen(() => {
    assert.equal($('.nypr-player-volume.active').length, 1);
  });
});

test('space activates playpause button', function(assert) {
  visit('/');

  andThen(() => {
    assert.equal($('[data-test-selector=listen-button]').length, 1, 'listen button should be visible');
    assert.equal($('[data-test-selector=listen-button].active').length, 0, 'listen button should not be active');
  });

  andThen(() => {
    let keyPress = $.Event('keydown', {which: 32}); //space
    $('.nypr-player').trigger(keyPress);
  });

  andThen(() => {
    assert.equal($('[data-test-selector=listen-button].active').length, 1, 'listen button should be active');
  });

  andThen(() => {
    let keyPress = $.Event('keyup', {which: 32}); //space
    $('.nypr-player').trigger(keyPress);
  });

  andThen(() => {
    assert.equal($('[data-test-selector=listen-button]').length, 1, 'listen button should be visible');
    assert.equal($('[data-test-selector=listen-button].active').length, 0, 'listen button should not be active');
  });
});

skip('right arrow activates fastforward button', function(assert) {
  visit('/');

  andThen(() => {
    assert.equal($('.mod-fastforward').length, 1);
    assert.equal($('.mod-fastforward.active').length, 0);
  });

  andThen(() => {
    let keyPress = $.Event('keydown', {which: 39}); //right
    $('.nypr-player').trigger(keyPress);
  });

  andThen(() => {
    assert.equal($('.mod-fastforward.active').length, 1);
  });

  andThen(() => {
    let keyPress = $.Event('keyup', {which: 39}); //right
    $('.nypr-player').trigger(keyPress);
  });

  andThen(() => {
    assert.equal($('.mod-fastforward').length, 1);
    assert.equal($('.mod-fastforward.active').length, 0);
  });
});

skip('left arrow activates rewind button', function(assert) {
  visit('/');

  andThen(() => {
    assert.equal($('.mod-rewind').length, 1);
    assert.equal($('.mod-rewind.active').length, 0);
  });

  andThen(() => {
    let keyPress = $.Event('keydown', {which: 37}); //left
    $('.nypr-player').trigger(keyPress);
  });

  andThen(() => {
    assert.equal($('.mod-rewind.active').length, 1);
  });

  andThen(() => {
    let keyPress = $.Event('keyup', {which: 37}); //left
    $('.nypr-player').trigger(keyPress);
  });

  andThen(() => {
    assert.equal($('.mod-rewind').length, 1);
    assert.equal($('.mod-rewind.active').length, 0);
  });
});
