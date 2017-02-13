import Component from '@ember/component';
import layout from '../../templates/components/nypr-player/volume-control';
import { get, computed } from '@ember/object';
import { isEmpty } from '@ember/utils';
import { htmlSafe } from '@ember/string';

export default Component.extend({
  layout,
  classNames: ['nypr-player-volume'],
  classNameBindings: ['isMuted'],
  volumeInPercent: computed('volume', 'isMuted', {
    get() {
      if (get(this, 'isMuted')) {
        return 0;
      }
      return get(this, 'volume');
    },
    set(k, v) {
      return v;
    }
  }),
  keyboardControls: {
    "volumeUp":   [39], //right
    "volumeDown": [37], //left
  },
  trackWidth: computed('volumeInPercent', function() {
    return htmlSafe(`width: ${get(this, 'volumeInPercent')}%;`);
  }),
  handlePosition: computed('volumeInPercent', function() {
    return htmlSafe(`left : ${get(this, 'volumeInPercent')}%;`);
  }),
  click({target, pageX}) {
    this._setVolume(target, pageX);
  },
  mouseDown(e) {
    if (window.getSelection && window.getSelection().removeAllRanges) {
      window.getSelection().removeAllRanges();
    }
    if (e.target.classList.contains('js-volume-slider-handle')) {
      this.$().on('mousemove', '.js-volume-slider', this.click.bind(this));
    }
  },
  mouseUp() {
    this.$().off('mousemove', '.js-volume-slider');
  },
  mouseLeave() {
    this.$().off('mousemove', '.js-volume-slider');
  },
  _setVolume(target, x) {
    if (!isEmpty(this.$(target).closest('.js-volume-slider'))) {
      let $controls = this.$('.js-volume-slider');
      let offset = $controls.offset();
      let leftLimit = offset.left;
      let rightLimit = offset.left + $controls.width();
      let p;
      if (x < leftLimit) {
        p = 0;
      } else if (x > rightLimit) {
        p = 1;
      } else {
        p = (x - leftLimit) / $controls.width();
      }
      get(this, 'setVolume')(p * 100);
    }
  },
  actions: {
    toggleMute() {
      get(this, 'toggleMute')();
    }
  },
  keyDown(e) {
    let modifierPressed = e.ctrlKey || e.altKey || e.metaKey || e.shiftKey;
    if (!modifierPressed) {
      let currentVolume = get(this, 'volumeInPercent');
      let volumeIncrement = 6;
      let key = e.keyCode;
      if (get(this, 'keyboardControls.volumeUp').includes(key)) {
        get(this, 'setVolume')(currentVolume + volumeIncrement);
        return false;
      } else if (get(this, 'keyboardControls.volumeDown').includes(key)) {
        get(this, 'setVolume')(currentVolume - volumeIncrement);
        return false;
      }
    }
  },
});
