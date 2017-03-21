import Route from 'ember-route';
import service from 'ember-service/inject';

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
