import Component from '@ember/component';
import layout from '../../templates/components/nypr-player/rewind-button';

export default Component.extend({
  layout,
  tagName: 'button',
  classNames: ['nypr-player-button', 'mod-rewind', 'gtm__click-tracking'],
  attributeBindings: ['aria-text', 'aria-labelled-by', 'data-action'],
  'aria-text': "rewind 15 seconds",
  'aria-labelled-by': "rewind-label",
  'data-action': 'Clicked Skip Backward: persistent-player'
});
