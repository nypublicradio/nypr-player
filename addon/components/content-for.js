import Component from '@ember/component';
import { computed } from '@ember/object';
import layout from '../templates/components/content-for';

let ContentFor = Component.extend({
  layout,
  tagName: '',

  hasContentForYield: computed('contentName', 'yieldName', function() {
    return (this.get('contentName') === this.get('yieldName'));
  }),

  yieldContent: computed('hasContentForYield', 'yieldArguments', function() {
    if (this.get('hasContentForYield')) {
      return this.get('yieldArguments');
    }
  })
});

ContentFor.reopenClass({
  positionalParams: ['contentName']
});

export default ContentFor;
