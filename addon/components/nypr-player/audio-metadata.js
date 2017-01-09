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
});
