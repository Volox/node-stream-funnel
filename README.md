# Stream collector

Join/merge *n* streams into one. The resulting stream will end when all the input streams have sent the `end` event.

## Example

```js
const Funnel = require( 'stream-funnel' );
const stream1 = new Stream();
const stream2 = new Stream();

const funnel = new Funnel();


funnel.addSource( stream1 );
funnel.addSource( stream2 );
// OR funnel.addSources( [ stream1, stream2 ] );
funnel.pipe( process.out );
```


## Debug

This module uses the `debug` package, add `stream-funnel` to the `DEBUG` env variable to see the logs.