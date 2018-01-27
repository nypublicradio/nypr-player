import Component from '@ember/component';
import { inject as service } from '@ember/service';
import { get, computed } from '@ember/object';
import { reads } from '@ember/object/computed';
import layout from '../templates/components/nypr-player';

export default Component.extend({
  layout,
  hifi                  : service(),
  classNames            : ['nypr-player'],
  classNameBindings     : ['isAudiostream'],

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
  }
});
