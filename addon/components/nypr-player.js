import Component from '@ember/component';
import { inject as service } from '@ember/service';
import { get, computed } from '@ember/object';
import { reads } from '@ember/object/computed';
import { debounce } from 'ember-runloop';
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

  keyboardCommands: {
    volumeUp:    [38], //up
    volumeDown:  [40], //down
    rewind:      [37], //left
    fastForward: [39], //right
  },

  onKeyDown: {
    volumeUp() {
      let volumeIncrement = 6;
      let currentVolume = get(this, 'hifi.volume');
      this.send('setVolume', currentVolume + volumeIncrement);
      this._activate('.nypr-player-volume-control');
    },
    volumeDown() {
      let volumeIncrement = 6;
      let currentVolume = get(this, 'hifi.volume');
      this.send('setVolume', currentVolume - volumeIncrement);
      this._activate('.nypr-player-volume-control');
    },
    rewind() {
      this.send('rewind');
      this._activate('.mod-rewind');
    },
    fastForward() {
      this.send('fastForward');
      this._activate('.mod-fastforward');
    }
  },
  onKeyUp: {
    volumeUp() {
      debounce(this, this._deactivate, '.nypr-player-volume-control', 1000);
    },
    volumeDown() {
      debounce(this, this._deactivate, '.nypr-player-volume-control', 1000);
    },
    rewind() {
      this._deactivate('.mod-rewind');
    },
    fastForward() {
      this._deactivate('.mod-fastforward');
    }
  },

  keyDown(e) {
    if (this._mapKeyEventToAction(this, e, get(this, 'keyboardCommands'), get(this, 'onKeyDown'))) {
      e.preventDefault();
      e.stopPropagation();
    }
  },
  keyUp(e) {
    this._mapKeyEventToAction(this, e, get(this, 'keyboardCommands'), get(this, 'onKeyUp'));
  },

  _mapKeyEventToAction(context, event, commands, actions) {
    let modifierPressed = event.ctrlKey || event.altKey || event.metaKey || event.shiftKey;
    for (let command in commands) {
      let commandIsOwnProperty = commands.hasOwnProperty(command);
      let keyMatchesCommand = commands[command].includes(event.which);
      let commandFunction = get(actions, command);
      if (!modifierPressed && commandIsOwnProperty && keyMatchesCommand && commandFunction) {
        commandFunction.call(context);
        return true; //handled
      }
    }
  },

  _activate(selector) {
    this.$(selector).addClass('active');
  },
  _deactivate(selector) {
    this.$(selector).removeClass('active');
  }
});
