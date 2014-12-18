describe("the transform", function() {

  it("should handle when passed null for text", function() {
    var transformedText = transform(null, "", "");
    expect(transformedText).to.be.null;
  });

  it("should handle when passed undefined for text", function() {
    var transformedText = transform(undefined, "", "");
    expect(transformedText).to.be.undefined;
  });

  it("should handle when passed empty string for text", function() {
    var transformedText = transform("", "", "");
    expect(transformedText).to.eql("");
  });

  it("should handle when passed null for inputFile", function() {
    var transformedText = transform("url(foo.png)", null, "");
    expect(transformedText).to.eql("url(foo.png)");
  });

  it("should handle when passed undefined for inputFile", function() {
    var transformedText = transform("url(foo.png)", undefined, "");
    expect(transformedText).to.eql("url(foo.png)");
  });

  it("should handle when passed empty string for inputFile", function() {
    var transformedText = transform("url(foo.png)", "", "");
    expect(transformedText).to.eql("url(foo.png)");
  });

  it("should handle when passed null for outputFile", function() {
    var transformedText = transform("url(foo.png)", "", null);
    expect(transformedText).to.eql("url(foo.png)");
  });

  it("should handle when passed undefined for outputFile", function() {
    var transformedText = transform("url(foo.png)", "", undefined);
    expect(transformedText).to.eql("url(foo.png)");
  });

  it("should handle when passed empty string for outputFile", function() {
    var transformedText = transform("url(foo.png)", "", "");
    expect(transformedText).to.eql("url(foo.png)");
  });

});