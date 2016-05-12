import { parseString } from 'xml2js'
import keyfinder from 'keyfinder'
import flattenDeep from 'lodash.flattendeep'

export default function( source ) {

  parseString( source, ( err, result ) => {

    if( err ) {
      return this.callback( err )
    }

    const data = flattenDeep( keyfinder( result, 'float_array') )[0]['_'].split( ' ' ).map( Number )

    this.callback( null, `module.exports = ${JSON.stringify( data )};` )
  })
}