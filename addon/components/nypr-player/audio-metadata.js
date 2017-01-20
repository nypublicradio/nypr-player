import Ember from 'ember';
import layout from '../../templates/components/nypr-player/audio-metadata';

export default Ember.Component.extend({
  layout,
  tagName       : '',

  showTitle     : null,
  showUrl       : null,
  showUrlTarget : '',

  storyTitle    : null,
  storyUrl      : null,
  storyUrlTarget: '',

  audioId       : null,
  songDetails   : null,

  watch         : Ember.computed('songDetails', 'showTitle', 'storyTitle', function() {
    return this.get('songDetails') + this.get('showTitle') + this.get('storyTitle');
  })
});
