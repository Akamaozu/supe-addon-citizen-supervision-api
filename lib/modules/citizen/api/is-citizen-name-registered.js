module.exports = function( citizen, send_request, config ){
  
  citizen.supervisor.is_registered = function(){
    var arguments_array = Array.prototype.slice.call( arguments ),
        command = 'is_registered';

    arguments_array.unshift( command );

    send_request.apply( null, arguments_array );
  }
}