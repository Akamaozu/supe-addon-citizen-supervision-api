module.exports = function( supe, config ){
  if( supe.supervised ) require( './lib/citizen' )( supe, config );
  else require( './lib/supervisor' )( supe, config );
}