import Component from '@ember/component';
import { inject as service } from '@ember/service';
import layout from '../templates/components/play-button';

// BEGIN-SNIPPET basic-play-button
export default Component.extend({
  layout,
  tagName: '',
  hifi: service(),

  actions: {
    play(url) {
      this.get('hifi').play(url);
      this.onPlay();
    }
  }
});
// END-SNIPPET
