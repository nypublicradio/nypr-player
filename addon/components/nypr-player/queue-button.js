import Ember from 'ember';
import layout from '../../templates/components/nypr-player/queue-button';
import get from 'ember-metal/get';

export default Ember.Component.extend({
  layout,
  tagName           : 'button',
  classNames        : ['nypr-player-queue-button'],
  classNameBindings : ['isOpenModal:is-open', 'isFloating'],
  queueLength       : null,
  showModal         : null,
  closeModal        : null,
  isOpenModal       : false,
  isFloating        : false,

  click() {
    if (get(this, 'isOpenModal')) {
      get(this, 'closeModal')();
    } else {
      get(this, 'showModal')();
    }
  },
  didUpdateAttrs({oldAttrs}) {
    this._super(...arguments);
    let newLength = get(this, 'queueLength');
    let oldLength = oldAttrs ? oldAttrs.queueLength.value : 0;

    // guard against users with disabled cookies
    if (typeof oldLength === 'undefined' || newLength <= oldLength) {
      return;
    }

    this.$().addClass('animate')
      .one('animationend', () => this.$().removeClass('animate'));
  }
});
