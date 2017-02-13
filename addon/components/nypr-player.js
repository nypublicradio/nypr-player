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

  keyboardControls: {
    "volumeUp":    [38], //up
    "volumeDown":  [40], //down
    "rewind":      [37], //left
    "fastForward": [39], //right
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
    let modifierPressed = e.ctrlKey || e.altKey || e.metaKey || e.shiftKey;
    if (!modifierPressed) {
      let currentVolume = get(this, 'hifi.volume');
      let volumeIncrement = 6;
      let key = e.which;
      if (get(this, 'keyboardControls.rewind').includes(key)) {
        this.send('rewind');
        this._activate('.mod-rewind');
        return false;
      } else if (get(this, 'keyboardControls.fastForward').includes(key)) {
        this.send('fastForward');
        this._activate('.mod-fastforward');
        return false;
      } else if (get(this, 'keyboardControls.volumeUp').includes(key)) {
        this.send('setVolume', currentVolume + volumeIncrement);
        this._activate('.nypr-player-volume-control');
        return false;
      } else if (get(this, 'keyboardControls.volumeDown').includes(key)) {
        this.send('setVolume', currentVolume - volumeIncrement);
        this._activate('.nypr-player-volume-control');
        return false;
      }
    }
  },
  keyUp(e) {
    let key = e.which;
    if (get(this, 'keyboardControls.rewind').includes(key)) {
      this._deactivate('.mod-rewind');
    } else if (get(this, 'keyboardControls.fastForward').includes(key)) {
      this._deactivate('.mod-fastforward');
    } else if (get(this, 'keyboardControls.volumeUp').includes(key)||
               get(this, 'keyboardControls.volumeDown').includes(key)) {
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
