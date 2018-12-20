module.exports = function( citizen, send_request, config ){
  
  citizen.supervisor.start = function(){
    var arguments_array = Array.prototype.slice.call( arguments ),
        command = 'start';

    arguments_array.unshift( command );

    send_request.apply( null, arguments_array );
  }
}