module.exports = function( citizen, send_request, config ){
  
  citizen.supervisor.deregister = function(){
    var arguments_array = Array.prototype.slice.call( arguments ),
        command = 'deregister';

    arguments_array.unshift( command );

    send_request.apply( null, arguments_array );
  }  
}