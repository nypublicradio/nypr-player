import Component from '@ember/component';
import layout from '../../templates/components/nypr-player/listen-button';
import { inject as service } from '@ember/service';
import { computed, get, set } from '@ember/object';
import { readOnly, not } from '@ember/object/computed';

export default Component.extend({
  layout,
  hifi                : service(),
  disabled            : not('ready'),
  'aria-label'        : readOnly('title'),
  'data-test-selector': 'listen-button',

  tagName             : 'button',
  classNames          : ['nypr-player-button', 'mod-listen'],
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
