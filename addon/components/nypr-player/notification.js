import Ember from 'ember';
import layout from '../../templates/components/nypr-player/notification';
import get from 'ember-metal/get';

export default Ember.Component.extend({
  layout,
  didAnimate: false,
  classNames: ['notification', 'notification-active'],
  actions   : {
    dismiss() {
      get(this, 'dismissNotification')();
    }
  }
});
