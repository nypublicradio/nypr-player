import { moduleForComponent, test } from 'ember-qunit';
import hbs from 'htmlbars-inline-precompile';

moduleForComponent('content-for', 'Integration | Component | content for', {
  integration: true
});

test('it yields nothing without a block', function(assert) {
  this.render(hbs`{{content-for}}`);
  assert.equal(this.$().text().trim(), '', "should have no content");
});

test('it yields nothing if yieldName does not equal contentName', function(assert) {
  this.set('yieldName', 'foo');
  this.set('contentName', 'bar');
  this.render(hbs`
    {{#content-for contentName=contentName yieldName=yieldName}}
      this shouldn't show up
    {{/content-for}}
  `);

  assert.equal(this.$().text().trim(), '', "should have no content");
});

test('it yields content if yieldName equal contentName', function(assert) {
  this.set('yieldName', 'foo');
  this.set('contentName', 'foo');
  this.render(hbs`
    {{#content-for contentName=contentName yieldName=yieldName}}
      sweet content
    {{/content-for}}
  `);

  assert.equal(this.$().text().trim(), 'sweet content', "should have content");
});

test('it passes along yield arguments if yieldName equal contentName', function(assert) {
  this.set('yieldName', 'foo');
  this.set('contentName', 'foo');
  this.render(hbs`
    {{#content-for contentName=contentName yieldName=yieldName yieldArguments=(hash test='ok') as |args|}}
      {{args.test}}
    {{/content-for}}
  `);

  assert.equal(this.$().text().trim(), 'ok', "should have passed along yieldArguments");
});
