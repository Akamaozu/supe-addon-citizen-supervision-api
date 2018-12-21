module.exports = function( citizen, config ){
  
  citizen.hook.add( 'supervisor-signal', 'process-supervision-request-response', function ( envelope ){
    if( ! envelope || ! 'signal' in envelope || envelope.signal !== 'SUPERVISION-REQUEST-RESPONSE' ) return;

    var details = envelope.data,
        request_id = details.id;

    if( ! request_id in config.pending_supervision_requests ){
      console.log({ action: 'process-supervision-request-response', success: false, reason: 'unknown request id' });
      return;
    }

    var request_callback = config.pending_supervision_requests[ request_id ],
        success = details.success;

    if( ! success ) request_callback( new Error( details.error ) );
    else request_callback( null, success );
  });
}