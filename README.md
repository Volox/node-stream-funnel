# Stream collector

Join/merge *n* streams into one. The resulting stream will end when all the input streams have sent the `end` event.

## Example

```js
let Collector = require( 'node-stream-collector' );
let stream1 = new Stream();
let stream2 = new Stream();

let collector = new Collector( 'Hubert' );


collector.add( stream1 );
collector.add( stream2 );
collector.pipe( process.out );
```


## Debug

This module uses the `debug` package, add `stream-collector` to the `DEBUG` env variable to se the logs.