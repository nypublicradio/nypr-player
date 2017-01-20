import Ember from 'ember';
import computed from 'ember-computed';
import layout from '../templates/components/content-for';

let ContentFor = Ember.Component.extend({
  layout,
  tagName: '',
  hasContentForYield: computed('yields', 'contentName', function() {
    return (this.get('yields.yieldName') === this.get('contentName'));
  }),

  content: computed('hasContentForYield', 'yields', function() {
    if (this.get('hasContentForYield')) {
      return this.get('yields.yieldArguments');
    }
    else {
      return {};
    }
  })
});

ContentFor.reopenClass({
  positionalParams: ['contentName', 'yields']
});

export default ContentFor;
