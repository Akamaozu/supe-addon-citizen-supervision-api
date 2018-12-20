var require_dir = require('require-directory'),
    uuid = require('uuid/v4');

module.exports = function( citizen, config ){

  require_dir( module, './api', { visit: run_found_module, recurse: false });

  function run_found_module( found_module ){
    found_module( citizen, send_supervision_request, config );
  }  

  function send_supervision_request(){
    if( arguments.length < 2 ) throw new Error( 'missing required arguments' );

    var arguments_array = Array.prototype.slice.call( arguments );
        request_callback = arguments_array.pop(),
        cmd = arguments_array.shift();

    if( typeof request_callback !== 'function' ) throw new Error( 'request callback must be a function' );
    if( typeof cmd !== 'string' ) return callback( new Error( 'request command must be a string' ) );

    var cmd_args = arguments_array,
        request_id = create_new_request_id();

    config.pending_supervision_requests[ request_id ] = request_callback;

    citizen.signal.send( 'SUPERVISION-REQUEST', { id: request_id, cmd: cmd, args: cmd_args });
  }

  function create_new_request_id(){
    var request_id = uuid();

    while( request_id in config.pending_supervision_requests ){
      request_id = uuid();
    }

    return request_id;
  }
}