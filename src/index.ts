// Load system modules
import { PassThrough, TransformOptions } from 'stream';

// Load modules
import * as initDebug from 'debug';

// Load my modules

// Constant declaration
const debug = initDebug('stream-funnel');

// Module variables declaration

// Module functions declaration

// Module type declaration
export interface FunnelOptions extends TransformOptions {
  maxListeners?: number,
  name?: string,
}

// Module class declaration
export default class Funnel extends PassThrough {
  private static id: number = 0;
  private numSources: number = 0;
  private name: string;

  constructor(options: FunnelOptions) {
    super(options);

    this.name = options.name || `Funnel(${++Funnel.id})`;
    this.setMaxListeners(options.maxListeners || 0);
    debug('Created: %s', this);
  }
  toString() {
    return this.name;
  }

  // Methods
  public addSource(source: NodeJS.ReadableStream, waitForEnd: boolean = true) {
    this.numSources += 1;
    debug('%s: adding source, total %d', this, this.numSources);

    if (waitForEnd) {
      source.once('end', () => this.sourceFinished(source));
    }
    source.pipe(this, { end: false });
  }
  public addSources(sources: NodeJS.ReadableStream[], waitForEnd: boolean = true) {
    for (const source of sources) {
      this.addSource(source, waitForEnd);
    }
  }

  public sourceFinished(source: NodeJS.ReadableStream) {
    this.numSources -= 1;
    debug('%s: source finished, left %d', this, this.numSources);

    // Unpipe from self
    source.unpipe(this);

    if (this.numSources === 0) {
      debug('%s, no more sources', this);
      // No more account to wait for...
      this.end();
    }
  }
}

//  50 6F 77 65 72 65 64  62 79  56 6F 6C 6F 78