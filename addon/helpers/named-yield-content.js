import Ember from 'ember';

export function namedYieldContent(params/*, hash*/) {
  return {
    yieldName: params[0],
    yieldArguments: params[1]
  };
}

export default Ember.Helper.helper(namedYieldContent);
