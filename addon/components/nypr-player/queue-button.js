import Ember from 'ember';
import layout from '../../templates/components/nypr-player/queue-button';
import get from 'ember-metal/get';
import set from 'ember-metal/set';

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
  didUpdateAttrs() {
    this._super(...arguments);
    let newLength = get(this, 'queueLength');
    let oldLength = get(this, '_oldLength') || 0;

    if (newLength <= oldLength) {
      return;
    }
    set(this, '_oldLength', newLength);

    this.$().addClass('animate')
      .one('animationend', () => this.$().removeClass('animate'));
  }
});
