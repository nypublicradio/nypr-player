import Component from '@ember/component';
import layout from '../../templates/components/nypr-player/time-label';

export default Component.extend({
  layout,
  classNames: ['nypr-player-timelabel'],
  tagName   : 'span',
  position  : 0,
  duration  : 0
});
