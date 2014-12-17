var path = require('path');

module.exports = function( inputText, inputName, outputName ) {
  var transformedText = inputText;
  var regex = /(.+url\(\\?['"]?)(.+[\/])?([\w-_]+\.\w{3,4})(\\?['"]?\).+)/g;
  // Here's the breakdown of this regex given the following example string
  //   background-image: url(\'images/spritesheet.png\');
  //
  // 1st Capturing group (.+url\(\\?['"]?) is for the stuff before path.
  // It is looking for the string "url(" followed by an optional "\" and
  // optional single or double quote.
  //   $1 = background-image: url(\'
  //
  // 2nd Capturing group (.+[\/])? is for the path if specified.
  // It is looking for any character followed by a "/". This entire
  // string is optional if no path is specified for the file.
  //   $2 = images/
  //
  // 3rd Capturing group ([\w-_]+\.\w{3,4}) is for the filename.
  // It is looking for 1+ word characters[a-zA-Z0-9], dash, or underscore
  // followed by a period and a 3 to 4 character file extension.
  //   $3 = spritesheet.png
  //
  // 4th Capturing group (\\?['"]?\).+) is for the stuff after filename.
  // It is looking for an optional '\' character followed by an optional
  // single or double quote, followed by a ")", and then anything else
  //   $4 = \');
  var found = inputText.match(regex);
  if (found) {
    var relPath = path.relative(path.dirname(outputName), path.dirname(inputName));
    relPath = relPath.replace(/\\\\/g, '/');// convert windows paths to web paths
    transformedText = inputText.replace(regex, '$1' + relPath + '/$2$3$4');
  }
  return transformedText;
};
