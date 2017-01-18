import Ember from 'ember';
import layout from '../../templates/components/nypr-player/queue-button';
import get from 'ember-metal/get';

export default Ember.Component.extend({
  layout,
  tagName           : 'button',
  classNames        : ['nypr-player-queue-button'],
  classNameBindings : ['isOpenModal', 'isFloating'],
  queueLength       : null,
  showModal         : null,
  closeModal        : null,
  isOpenModal       : false,
  isFloating        : false,

  click() {
    if (get(this, 'isOpenModal')) {
      get(this, 'closeModal')();
    } else {
      get(this, 'showModal')('queue-history');
    }
  },
  didUpdateAttrs({oldAttrs}) {
    this._super(...arguments);
    let newLength = get(this, 'queueLength');
    let oldLength = oldAttrs ? oldAttrs.queueLength.value : 0;

    if (newLength <= oldLength) {
      return;
    }

    this.$().addClass('animate')
      .one('animationend', () => this.$().removeClass('animate'));
  }
});
