import Ember from 'ember';
import layout from '../../templates/components/nypr-player/stream-metadata';

export default Ember.Component.extend({
  layout,
  tagName                : '',

  streamScheduleUrlTarget: '',
  streamScheduleUrl      : null,

  streamPlaylistUrlTarget: '',
  streamPlaylistUrl      : null,

  streamName             : null,
  streamsIndexUrl        : null,
  streamsIndexUrlTarget  : ''
});
