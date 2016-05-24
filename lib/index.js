"use strict";
var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
// Load system modules
var stream_1 = require('stream');
// Load modules
var initDebug = require('debug');
// Load my modules
// Constant declaration
var debug = initDebug('stream-funnel');
// Module class declaration
var Funnel = (function (_super) {
    __extends(Funnel, _super);
    function Funnel() {
        _super.call(this, { objectMode: true });
        this.sources = 0;
        this.setMaxListeners(0);
    }
    // Methods
    Funnel.prototype.addSource = function (source) {
        var _this = this;
        this.sources += 1;
        debug('Adding source: %d', this.sources);
        source.on('end', function () { return _this.sourceFinished(source); });
        source.pipe(this, { end: false });
    };
    Funnel.prototype.addSources = function (sources) {
        for (var _i = 0, sources_1 = sources; _i < sources_1.length; _i++) {
            var source = sources_1[_i];
            this.addSource(source);
        }
    };
    Funnel.prototype.sourceFinished = function (source) {
        this.sources -= 1;
        debug('Source finished: %d', this.sources);
        // Unpipe from self
        source.unpipe(this);
        if (this.sources === 0) {
            debug('%s, no more sources', this);
            // No more account to wait for...
            this.end();
        }
    };
    return Funnel;
}(stream_1.PassThrough));
module.exports = Funnel;
//  50 6F 77 65 72 65 64  62 79  56 6F 6C 6F 78 
//# sourceMappingURL=index.js.map