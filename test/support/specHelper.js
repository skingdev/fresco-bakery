mocha.setup('bdd');
mocha.globals([
  '_',
  'LiveReload',
  'backbone',
  'jQuery*'
]);

mocha.timeout(3000);

window.expect = chai.expect;

jQuery(function() {
  if (window.__html__) {
    jQuery('body').append(window.__html__['test/templates/mocha.html']);
  } else {
    mocha.run();
  }
});
