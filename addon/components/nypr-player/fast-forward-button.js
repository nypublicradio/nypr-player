import Component from '@ember/component';
import layout from '../../templates/components/nypr-player/fast-forward-button';

export default Component.extend({
  layout,
  tagName: 'button',
  classNames: ['nypr-player-button', 'mod-fastforward', 'gtm__click-tracking'],
  attributeBindings: ['aria-text', 'aria-labelledby', 'data-action'],
  'aria-text': "skip forward 15 seconds",
  'aria-labelledby': 'fastforward-label',
  'data-action': 'Clicked Skip Forward: persistent-player'
});
