import Ember from 'ember';
import layout from '../../templates/components/nypr-player/listen-button';
import service from 'ember-service/inject';
import computed, { readOnly, not } from 'ember-computed';
import get from 'ember-metal/get';
import set from 'ember-metal/set';

export default Ember.Component.extend({
  layout,
  hifi                : service(),
  disabled            : not('ready'),
  'aria-label'        : readOnly('title'),
  'data-test-selector': 'listen-button',

  tagName             : 'button',
  classNames          : ['nypr-player-button mod-listen'],
  classNameBindings   : ['isHovering', 'playState'],
  attributeBindings   : ['aria-label', 'title', 'disabled', 'data-test-selector'],

  title               : computed('currentTitle', function() {
    if (this.get('currentTitle')) {
      return `Listen to ${get(this, 'currentTitle')}`;
    }
  }),

  mouseLeave() {
    set(this, 'isHovering', false);
  },
  mouseEnter() {
    set(this, 'isHovering', true);
  }
});
