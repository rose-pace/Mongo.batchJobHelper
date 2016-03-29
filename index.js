var EventEmitter = require('events'),
    util = require('util');
    
module.exports = {
    create = create
};

function create(cursor) {
    return (function (cursor) {
        var MongoBatchObject = function (cursor) {
            this.data = [];
            // add events
            EventEmitter.call(this);
        },
        isComplete = false;

        util.inherits(MongoBatchObject, EventEmitter);
        
        MongoBatchObject.prototype.isComplete = function () {
            return isComplete && this.data.length === 0;
        };
        
        MongoBatchObject.prototype.next = function () {
            var nextItem = undefined,
                me = this;
            if (this.data.length) nextItem = this.data.shift();
            
            // retrieve next item from cursor
            cursor.next().then(function (item) {
                if (item != null) {
                    me.data.push(item);
                    me.emit('ready');
                } 
            })
            
            return nextItem;
        };
        
        MongoBatchObject.prototype.toString = function () {
            return 'BatchObject';
        };
        
        var obj = new MongoBatchObject(cursor);
        cursor.on('end', function () {
            isComplete = false;
            obj.emit('end');
        });
        
        return obj;
    })(cursor);    
}
