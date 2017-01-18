import Ember from 'ember';
import layout from '../../templates/components/nypr-player/fast-forward-button';

export default Ember.Component.extend({
  layout,
  tagName: 'button',
  classNames: ['nypr-player-skip-button'],
  'aria-text': "skip forward 15 seconds",
  'aria-labelledby': 'fastforward-label'
});
