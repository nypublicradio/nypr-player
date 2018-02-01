import Component from '@ember/component';
import layout from '../templates/components/nypr-player-dummy-integration';

export default Component.extend({
  layout,

  storyTitle           : "Story Title",
  storyUrl             : "http://storyurl",

  showTitle            : "Show Title",
  showUrl              : "http://showurl",

  songDetails          : "",

  streamName           : "Stream Name",
  streamScheduleUrl    : "http://scheduleurl",
  streamPlaylistUrl    : "http://playlisturl",
  streamIndexUrl       : '/streams',

  backdropImageUrl     : "",

  queueLength          : 0,
  showQueue            : false,

  actions: {
    onPlay() {

    },
    onPause() {

    }
  }


});
