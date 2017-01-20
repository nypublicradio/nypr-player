/*jshint node:true*/
module.exports = {
  description: '',
  normalizeEntityName: function() {},
  // locals: function(options) {
  //   // Return custom template variables here.
  //   return {
  //     foo: options.entity.options.foo
  //   };
  // }

  afterInstall: function() {
    this.addPackageToProject('ember-hifi');
    return this.addPackageToProject('ember-responsive');
  }
};
