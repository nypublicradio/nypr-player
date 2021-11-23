import Component from '@ember/component';
import layout from '../../templates/components/nypr-player/volume-control';
import { get, computed } from '@ember/object';
import { isEmpty } from '@ember/utils';
import { htmlSafe } from '@ember/string';
import KeyboardCommandMixin from '../../mixins/keyboard-command-mixin';

export default Component.extend(KeyboardCommandMixin, {
  layout,
  classNames: ['nypr-player-volume'],
  classNameBindings: ['isMuted', 'isChangingVolume:active'],
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

  keyboardKeys: {
    volumeUp: ['ArrowRight'],
    volumeDown: ['ArrowLeft']
  },

  keyboardCommands: {
    volumeUp: {
      keydown() {
        get(this, 'setVolume')(get(this, 'volumeInPercent') + 6);
        return false;
      }
    },
    volumeDown: {
      keydown() {
        get(this, 'setVolume')(get(this, 'volumeInPercent') - 6);
        return false;
      }
    }
  },
});
