var path = require('path');

module.exports = function( inputText, inputName, outputName ) {
  if (!inputText || !inputName || !outputName) {
    return inputText;
  }

  var transformedText = inputText;
  var regex = /url\(\\?['"]?(\/?[\w_-]*\/)*([\w-_]+\.\w{3,4})\\?['"]?\)/g;
  // Here's the breakdown of this regex given the following example string
  //   background-image: url(\'images/spritesheet.png\');
  //
  // It is looking for the string "url(" followed by an optional "\" and
  // optional single or double quote.
  //
  // 1st Capturing group (.+[\/])? is for the path if specified.
  // It is looking for any character followed by a "/". This entire
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
  var found = inputText.match(regex);
  if (found) {
    var relPath = path.relative(path.dirname(outputName), path.dirname(inputName));
    relPath = relPath.replace(/\\\\/g, '/');// convert windows paths to web paths
    transformedText = inputText.replace(regex, 'url(' + relPath + '/$1$2)');
  }
  return transformedText;
};
