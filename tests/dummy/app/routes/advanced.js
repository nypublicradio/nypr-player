import Route from '@ember/routing/route';

// BEGIN-SNIPPET advanced
export default Route.extend({
  model() {
    return {
      sound:      '/audio/audio.mp3',
      title:      'Story Title',
      url:        'http://example.com/story',
      imageURL:   '/assets/kitty.jpeg',
      streamInfo: 'Live Now on WNYC FM'
    };
  }
});
// END-SNIPPET
