import Component from '@ember/component';
import layout from '../../templates/components/nypr-player/rewind-button';

export default Component.extend({
  layout,
  tagName: 'button',
  classNames: ['nypr-player-button', 'mod-rewind'],
  attributeBindings: ['aria-text', 'aria-labelled-by'],
  'aria-text': "rewind 15 seconds",
  'aria-labelled-by': "rewind-label",
});
