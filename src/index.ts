// Load system modules
import { PassThrough, TransformOptions } from 'stream';

// Load modules
import * as initDebug from 'debug';

// Load my modules

// Constant declaration
const debug = initDebug( 'stream-funnel' );

// Module variables declaration

// Module functions declaration

// Module type declaration

// Module class declaration
class Funnel extends PassThrough {
  private sources: number = 0;

  constructor( options: TransformOptions ) {
    super( options );
    // super( { objectMode: true } );
    this.setMaxListeners( 0 );
  }

  // Methods
  public addSource( source: NodeJS.ReadableStream ) {
    this.sources += 1;
    debug( 'Adding source: %d', this.sources );

    source.on( 'end', () => this.sourceFinished( source ) );
    source.pipe( this, { end: false } );
  }
  public addSources( sources: NodeJS.ReadableStream[] ) {
    for( const source of sources ) {
      this.addSource( source );
    }
  }

  public sourceFinished( source: NodeJS.ReadableStream ) {
    this.sources -= 1;
    debug( 'Source finished: %d', this.sources );

    // Unpipe from self
    source.unpipe( this );

    if( this.sources === 0 ) {
      debug( '%s, no more sources', this );
      // No more account to wait for...
      this.end();
    }
  }
}

// Module initialization (at first load)

// Module exports
export = Funnel;

//  50 6F 77 65 72 65 64  62 79  56 6F 6C 6F 78