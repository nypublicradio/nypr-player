<<<<<<< HEAD
import Component from '@ember/component';
import { inject as service } from '@ember/service';
import { get, computed } from '@ember/object';
import { reads } from '@ember/object/computed';
=======
import Ember from 'ember';
import service from 'ember-service/inject';
import computed, { reads } from 'ember-computed';
import get from 'ember-metal/get';
import { debounce } from 'ember-runloop';
>>>>>>> Add keyboard controls
import layout from '../templates/components/nypr-player';

export default Component.extend({
  layout,
  hifi                  : service(),
  classNames            : ['nypr-player'],
  classNameBindings     : ['isAudiostream', 'freestanding:nypr-player__freestanding'],
  attributeBindings     : ['tabindex'],
  tabindex              : 0,

  isReady               : reads('hifi.isReady'),
  isPlaying             : reads('hifi.isPlaying'),
  isLoading             : reads('hifi.isLoading'),
  isAudiostream         : reads('hifi.isStream'),

  currentTitle          : null,

  playState             : computed('isPlaying', 'isLoading', function() {
    if (get(this, 'isLoading')) {
      return 'is-loading';
    } else if (get(this, 'isPlaying')) {
      return 'is-playing';
    } else {
      return 'is-paused';
    }
  }),

  // EVENT HANDLERS
  onPlay() {},
  onPause() {},
  onSetPosition() {},
  onRewind() {},
  onFastForward() {},

  init() {
    this._super(...arguments);

    let audioToLoad = this.get('sound');
    if (audioToLoad) {
      let hifi = get(this, 'hifi');
      hifi.load(audioToLoad).then(({sound}) => hifi.setCurrentSound(sound));
    }
  },

  actions: {
    playOrPause() {
      if (get(this, 'isPlaying')) {
        this.onPause();
        get(this, 'hifi').togglePause();
      } else {
        this.onPlay();
        get(this, 'hifi').togglePause();
      }
    },
    setPosition(p) {
      this.onSetPosition();
      get(this, 'hifi').set('position', (p * get(this, 'hifi.currentSound.duration')));
    },
    rewind() {
      this.onRewind();
      get(this, 'hifi').rewind(15000);
    },
    fastForward() {
      this.onFastForward();
      get(this, 'hifi').fastForward(15000);
    },
    setVolume(vol) {
      get(this, 'hifi').set('volume', vol);
    },
    toggleMute() {
      get(this, 'hifi').toggleMute();
    },
  },

  keyDown(e) {
    if (e.ctrlKey || e.altKey || e.metaKey || e.shiftKey) {
      return true;
    }
    let currentVolume = get(this, 'hifi.volume');
    let volumeIncrement = 6;
    let key = e.keyCode;
    if (key === 37) { //left
      this.send('rewind');
      this._activate('.mod-rewind');
    } else if (key === 39) { //right
      this.send('fastForward');
      this._activate('.mod-fastforward');
    } else if (key === 38) { //up
      this.send('setVolume', currentVolume + volumeIncrement);
      this._activate('.nypr-player-volume-control');
      return false;
    } else if (key === 40) { //down
      this.send('setVolume', currentVolume - volumeIncrement);
      this._activate('.nypr-player-volume-control');
      return false;
    }
  },
  keyUp(e) {
    let key = e.keyCode;
    if (key === 37) { //left
      this._deactivate('.mod-rewind');
    } else if (key === 39) { //right
      this._deactivate('.mod-fastforward');
    } else if (key === 38 || key === 40) { //up & down
      debounce(this, this._deactivate, '.nypr-player-volume-control', 1000);
    }
  },

  _activate(selector) {
    this.$(selector).addClass('active');
  },
  _deactivate(selector) {
    this.$(selector).removeClass('active');
  }
});
