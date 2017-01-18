import Ember from 'ember';
import layout from '../../templates/components/nypr-player/rewind-button';

export default Ember.Component.extend({
  layout,
  tagName: 'button',
  classNames:['nypr-player-skip-button'],
  'aria-text': "rewind 15 seconds",
  'aria-labelled-by': "rewind-label"
});
