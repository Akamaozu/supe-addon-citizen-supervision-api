module.exports = function( citizen, config ){
  
  citizen.supervisor.register = function(){
    var arguments_array = Array.prototype.slice.call( arguments ),
        command = 'register';

    arguments_array.unshift( command );

    send_request.apply( null, arguments_array );
  }
}