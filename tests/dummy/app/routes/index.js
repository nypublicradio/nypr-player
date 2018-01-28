import Route from '@ember/routing/route';
import { inject as service } from '@ember/service';

export default Route.extend({
  hifi: service(),

  beforeModel() {
    // this.get('hifi').load(silence, {useConnections: 'NativeAudio'});
  },
  model() {
    return {
      sound: '/audio/audio.mp3',
      metadata: {
        title:    'Story Title',
        url:      'http://example.com/story',
        imageURL: '/assets/kitty.jpeg'
      }
    };
  }
});
