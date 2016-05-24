# Stream collector

Join/merge *n* streams into one. The resulting stream will end when all the input streams have sent the `end` event.

## Example

```js
let Funnel = require( 'stream-funnel' );
let stream1 = new Stream();
let stream2 = new Stream();

let funnel = new Funnel( 'Hubert' );


funnel.add( stream1 );
funnel.add( stream2 );
funnel.pipe( process.out );
```


## Debug

This module uses the `debug` package, add `stream-collector` to the `DEBUG` env variable to se the logs.