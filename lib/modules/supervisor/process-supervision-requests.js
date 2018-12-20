module.exports = function( supervisor, config ){
  
  supervisor.hook.add( 'citizen-signal', 'process-supervision-request', function( envelope ){
    if( ! envelope || ! 'signal' in envelope || envelope.signal !== 'SUPERVISION-REQUEST' ) return;

    var details = envelope.data,
        id = details.id,
        cmd = details.cmd,
        args = details.args,
        citizen = supervisor.get( envelope.from );

    if( ! citizen ){
      console.log({ action: 'drop-supervision-request', reason: 'citizen "'+ envelope.from + '" not found' });
      return;
    } 

    var valid_cmds = [ 'is_registered', 'register', 'deregister', 'start', 'stop' ],
        success = false,
        result,
        error;

    try {
      if( valid_cmds.indexOf( cmd ) == -1 ) throw new Error( 'unknown command "'+ cmd + '"' );

      result = supervisor[ cmd ].apply( supervisor, args );
      success = true;
    }

    catch( e ){
      error = e;
    }

    var response = { id: id, success: success };

    if( ! success ) response.error = error;
    else response.result = result;

    citizen.signal.send( 'SUPERVISION-REQUEST-RESPONSE', response );
  });
}