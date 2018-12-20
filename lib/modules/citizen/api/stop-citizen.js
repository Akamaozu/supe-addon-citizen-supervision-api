module.exports = function( citizen, config ){
  
  citizen.supervisor.stop = function(){
    var arguments_array = Array.prototype.slice.call( arguments ),
        command = 'stop';

    arguments_array.unshift( command );

    send_request.apply( null, arguments_array );
  } 
}