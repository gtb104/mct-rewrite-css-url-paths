var path = require('path');

module.exports = function( inputText, inputName, outputName ) {
  if (!inputText || !inputName || !outputName) {
    return inputText;
  }

  // Transform Windows paths
  inputName = inputName.replace(/\\/g, '/').replace(/[cC]:/g, '');
  outputName = outputName.replace(/\\/g, '/').replace(/[cC]:/g, '');

  var transformedText = inputText,
      regex = /url\((?:\\?['"])?([\w\/\\._-]*?)([\w-_]+\.\w{3,4})\\?['"]?\)/g,
      found = inputText.match(regex);

  // Here's the breakdown of this regex given the following example string
  //   background-image: url(\'images/spritesheet.png\');
  //
  // It is looking for the string "url(" followed by an optional "\" and
  // optional single or double quote.
  //
  // 1st Capturing group ([\w\/\\._-]*?) is for the path if specified.
  // It is looking for any character using a lazy quantifier. This entire
  // string is optional if no path is specified for the file.
  //   $1 = images/
  //
  // 2nd Capturing group ([\w-_]+\.\w{3,4}) is for the filename.
  // It is looking for 1+ word characters[a-zA-Z0-9], dash, or underscore
  // followed by a period and a 3 to 4 character file extension.
  //   $2 = spritesheet.png
  //
  // It is looking for an optional '\' character followed by an optional
  // single or double quote, followed by a ")".

  if (found) {
    var relPath = path.relative(path.dirname(outputName), path.dirname(inputName));
    transformedText = inputText.replace(regex, function( match, cg1, cg2 ) {
      // replace a leading ./ with / if it exists
      cg1 = cg1.replace(/^\.\//, '');
      return 'url(' + relPath + '/' + cg1 + cg2 + ')';
    });
  }
  return transformedText;
};
