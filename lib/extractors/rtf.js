var rtf2html = require('../../scripts/rtf_extract'),
    fs = require('fs'),
    htmlExtract = require( './html' )

function extractFromText( data, cb ) {

  // From Rtf2Html documentation
  //
  // Highest-level conversion function and easiest to use.  Just call and you'll
  // be returned a string of HTML text.
  //
  // txt .................... [ in] Rich text formatted (RTF) string.
  // baseurl ................ [ in] Base URL for hyperlinks.
  // out .................... [ in] Output object; will contain files to be
  //                                                      written out.
  // ver .................... [ in] Version.  Currently only 2 is supported.
  //
  // rtf2html(txt, baseurl, out, ver)
  try {
    var parsed = rtf2html(data);
    htmlExtract.extractFromText(parsed, cb);
  } catch (err) {
    cb( err, null );
  }
}

function extractText( filePath, options, cb ) {
  fs.readFile( filePath, function( error, data ) {
    if ( error ) {
      cb( error, null );
      return;
    }
    extractFromText( data.toString(), cb );
  });
}

module.exports = {
  types: ['application/rtf', 'text/rtf'],
  extract: extractText,
  extractFromText: extractFromText
};
