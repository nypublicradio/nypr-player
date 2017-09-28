import Ember from 'ember';
import layout from '../../templates/components/nypr-player/share-button';
import get from 'ember-metal/get';

export default Ember.Component.extend({
  layout,
  tagName           : 'button',
  classNames        : ['nypr-player-share-button nypr-player-button'],
  classNameBindings : ['isShareOpen:is-open'],
  openShareBar      : null,
  closeShareBar     : null,
  isShareOpen       : false,
  isFloating        : false,

  click() {
    if (get(this, 'isShareOpen')) {
      get(this, 'closeShareBar')();
    } else {
      get(this, 'openShareBar')();
    }
  }
});
