import Component from '@ember/component';
import { inject as service } from '@ember/service';
import { get, computed } from '@ember/object';
import { reads } from '@ember/object/computed';
import { debounce } from 'ember-runloop';
import layout from '../templates/components/nypr-player';
import KeyboardCommandMixin from '../mixins/keyboard-command-mixin';

export default Component.extend(KeyboardCommandMixin, {
  layout,
  hifi                  : service(),
  classNames            : ['nypr-player'],
  classNameBindings     : ['isAudiostream', 'freestanding:nypr-player__freestanding'],
  attributeBindings     : ['tabindex', 'aria-label'],
  tabindex              : 0,
  "aria-label"          : computed('currentTitle', function() {
    let currentTitle = get(this, 'currentTitle');
    if (currentTitle) {
      return `Audio Player - Now playing: ${currentTitle}`
    } else {
      return 'Audio Player'
    }
  }),

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

  keyboardKeys: {
    volumeUp:    ['ArrowUp'],
    volumeDown:  ['ArrowDown'],
    rewind:      ['ArrowLeft'],
    fastForward: ['ArrowRight'],
  },

  keyboardCommands: {
    volumeUp: {
      keydown() {
        this.send('setVolume', get(this, 'hifi.volume') + 6);
        this.set('isChangingVolume', true);
      },
      keyup() {
        debounce(this, this.set, 'isChangingVolume', false, 1000);
      }
    },
    volumeDown: {
      keydown() {
        this.send('setVolume', get(this, 'hifi.volume') - 6);
        this.set('isChangingVolume', true);
      },
      keyup() {
        debounce(this, this.set, 'isChangingVolume', false, 1000);
      }
    },
    rewind: {
      keydown() {
        this.send('rewind');
        this.set('isRewinding', true);
      },
      keyup() {
        this.set('isRewinding', false);
      },
    },
    fastForward: {
      keydown() {
        this.send('fastForward');
        this.set('isFastForwarding', true);
      },
      keyup() {
        this.set('isFastForwarding', false);
      }
    }
  }
});
