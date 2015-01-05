describe("the transform", function() {

  it("should do nothing if there is not a valid url in place", function() {
    var transformedText = transform("url foo.png", "/vendor/leaflet.draw/leaflet.draw.css", "/vendor/vendor.css");
    expect(transformedText).to.eql("url foo.png");

    transformedText = transform("url \"foo.png", "/vendor/leaflet.draw/leaflet.draw.css", "/vendor/vendor.css");
    expect(transformedText).to.eql("url \"foo.png");

    transformedText = transform("url(foo.png", "/vendor/leaflet.draw/leaflet.draw.css", "/vendor/vendor.css");
    expect(transformedText).to.eql("url(foo.png");
  });

  it('should ignore VML urls', function() {
    var transformedText = transform('url(#default#VML)', '/vendor/leaflet.draw/leaflet.draw.css');
    expect(transformedText).to.eql('url(#default#VML)');
  });

  it('should ignore data uri urls', function() {
    var transformedText = transform('url(data:image/gif;base64,R0lGODlhGAAYACIiIiM)', '/vendor/foo/style.css');
    expect(transformedText).to.eql('url(data:image/gif;base64,R0lGODlhGAAYACIiIiM)');
  });

  describe("should handle different formats for urls", function() {

    it("including quoted urls", function() {
      var transformedText = transform("url('foo.png')", "/vendor/leaflet.draw/leaflet.draw.css", "/vendor/vendor.css");
      expect(transformedText).to.eql("url(leaflet.draw/foo.png)");
    });

    it("including double quoted urls", function() {
      var transformedText = transform("url(\"foo.png\")", "/vendor/leaflet.draw/leaflet.draw.css", "/vendor/vendor.css");
      expect(transformedText).to.eql("url(leaflet.draw/foo.png)");
    });

    it("including non-quoted urls", function() {
      var transformedText = transform("url(foo.png)", "/vendor/leaflet.draw/leaflet.draw.css", "/vendor/vendor.css");
      expect(transformedText).to.eql("url(leaflet.draw/foo.png)");
    });

    // more formats?

  });

  describe("should handle varying number of urls in the same text, including", function() {

    it("two urls on the same line", function() {
      var transformedText = transform("url('foo.png');url('bar.png')", "/vendor/leaflet.draw/leaflet.draw.css", "/vendor/vendor.css");
      expect(transformedText).to.eql("url(leaflet.draw/foo.png);url(leaflet.draw/bar.png)");
    });

    it("two urls on the same line with different formats", function() {
      var transformedText = transform("url('foo.png');url(\"bar.png\")", "/vendor/leaflet.draw/leaflet.draw.css", "/vendor/vendor.css");
      expect(transformedText).to.eql("url(leaflet.draw/foo.png);url(leaflet.draw/bar.png)");
    });

    it("three urls on the same line with different formats", function() {
      var transformedText = transform("url('foo.png');url(\"bar.png\");url(baz.png)", "/vendor/leaflet.draw/leaflet.draw.css", "/vendor/vendor.css");
      expect(transformedText).to.eql("url(leaflet.draw/foo.png);url(leaflet.draw/bar.png);url(leaflet.draw/baz.png)");
    });

    it("three urls on different lines with different formats", function() {
      var transformedText = transform("url('foo.png');\nurl(\"bar.png\");\nurl(baz.png)", "/vendor/leaflet.draw/leaflet.draw.css", "/vendor/vendor.css");
      expect(transformedText).to.eql("url(leaflet.draw/foo.png);\nurl(leaflet.draw/bar.png);\nurl(leaflet.draw/baz.png)");
    });
  });

});