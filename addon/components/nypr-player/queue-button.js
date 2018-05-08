import Component from '@ember/component';
import layout from '../../templates/components/nypr-player/queue-button';
import { get, set } from '@ember/object';

export default Component.extend({
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
