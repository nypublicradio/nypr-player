import Route from '@ember/routing/route';
import { inject as service } from '@ember/service';

const silence = '/assets/silence.mp3';

export default Route.extend({
  hifi: service(),

  beforeModel() {
    // this.get('hifi').load(silence, {useConnections: 'NativeAudio'});
  },
  model() {
    return {sound: silence};
  }
});
