/* global describe, it, expect */
var srcDir = '../src/';

describe('https-redirect', function () {
  var httpsRedirect = require(srcDir + 'https-redirect.js');

  it('should be awesome!', function () {
    expect(httpsRedirect.awesome()).toBe('awesome');
  });
});