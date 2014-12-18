describe("the transform should output the correct paths", function() {

  it("with one level difference", function() {
    var transformedText = transform(
      "url(foo.png)",
      "/vendor/leaflet.draw/leaflet.draw.css",
      "/vendor/vendor.css");
    expect(transformedText).to.eql("url(leaflet.draw/foo.png)");
  });

  it("with nested image", function() {
    var transformedText = transform(
      "url(images/foo.png)",
      "/vendor/leaflet.draw/leaflet.draw.css",
      "/vendor/vendor.css");
    expect(transformedText).to.eql("url(leaflet.draw/images/foo.png)");
  });

  it("with deeply nested image", function() {
    var transformedText = transform(
      "url(what/huh/yeah/foo.png)",
      "/vendor/leaflet.draw/leaflet.draw.css",
      "/vendor/vendor.css");
    expect(transformedText).to.eql("url(leaflet.draw/what/huh/yeah/foo.png)");
  });

  it("with different directory structure", function() {
    var transformedText = transform(
      "url(foo.png)",
      "/vendor/leaflet.draw/leaflet.draw.css",
      "/somewhere/else/vendor.css");
    expect(transformedText).to.eql("url(../../vendor/leaflet.draw/foo.png)");
  });

  it("with deeper not shallower", function() {
    var transformedText = transform(
      "url(foo.png)",
      "/vendor/leaflet.draw/leaflet.draw.css",
      "/vendor/leaflet.draw/here/vendor.css");
    expect(transformedText).to.eql("url(../foo.png)");
  });

  it("with going back up in the url", function(){
    var transformedText = transform(
      "url(../images/foo.png)",
      "/vendor/leaflet.draw/leaflet.draw.css",
      "/vendor/vendor.css");
    expect(transformedText).to.eql("url(images/foo.png)");
  });

  it("with dot slash", function(){
    var transformedText = transform(
      "url(./images/foo.png)",
      "/vendor/leaflet.draw/leaflet.draw.css",
      "/vendor/vendor.css");
    expect(transformedText).to.eql("url(leaflet.draw/images/foo.png)");
  });

  describe("for windows", function() {
    it("with one level difference", function() {
      var transformedText = transform(
        "url(foo.png)",
        "\\vendor\\leaflet.draw\\leaflet.draw.css",
        "\\vendor\\vendor.css");
      expect(transformedText).to.eql("url(leaflet.draw/foo.png)");
    });

    it("with nested image", function() {
      var transformedText = transform(
        "url(images/foo.png)",
        "\\vendor\\leaflet.draw\\leaflet.draw.css",
        "\\vendor\\vendor.css");
      expect(transformedText).to.eql("url(leaflet.draw/images/foo.png)");
    });

    it("with deeply nested image", function() {
      var transformedText = transform(
        "url(what/huh/yeah/foo.png)",
        "\\vendor\\leaflet.draw\\leaflet.draw.css",
        "\\vendor\\vendor.css");
      expect(transformedText).to.eql("url(leaflet.draw/what/huh/yeah/foo.png)");
    });

    it("with different directory structure", function() {
      var transformedText = transform(
        "url(foo.png)",
        "\\vendor\\leaflet.draw\\leaflet.draw.css",
        "\\somewhere\\else\\vendor.css");
      expect(transformedText).to.eql("url(../../vendor/leaflet.draw/foo.png)");
    });

    it("with deeper not shallower", function() {
      var transformedText = transform(
        "url(foo.png)",
        "\\vendor\\leaflet.draw\\leaflet.draw.css",
        "\\vendor\\leaflet.draw/here/vendor.css");
      expect(transformedText).to.eql("url(../foo.png)");
    });

    it("with going back up in the url", function(){
      var transformedText = transform(
        "url(../images/foo.png)",
        "\\vendor\\leaflet.draw\\leaflet.draw.css",
        "\\vendor\\vendor.css");
      expect(transformedText).to.eql("url(images/foo.png)");
    });

    it("with dot slash", function(){
      var transformedText = transform(
        "url(./images/foo.png)",
        "\\vendor\\leaflet.draw\\leaflet.draw.css",
        "\\vendor\\vendor.css");
      expect(transformedText).to.eql("url(leaflet.draw/images/foo.png)");
    });
  })

});