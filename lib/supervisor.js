var require_dir = require( 'require-directory' );

module.exports = function( supervisor, config ){

  require_dir( module, { visit: run_found_module, recurse: false });

  function run_found_module( found_module ){
    found_module( supervisor, config );
  }
}