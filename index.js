var stream = require('stream')

function streamString(strings) {
    var args = arguments
    var count = strings.length * 2 - 1
    var offset = 0

    var result = new stream.Transform({
        transform: function(data, encoding, callback) {
            callback(null, data)
        }
    })

    next()

    function next() {
        if (offset === count) {
            result.end()
            return
        }

        var isValue = offset & 1
        var item = isValue ? args[1 + offset >> 1] : strings[offset >> 1]
        offset++

        if (!item) {
            next()
            return
        }

        if (!isValue) {
            result.write(item, 'utf8', next)
            return
        }

        if (item instanceof Buffer) {
            result.write(item, next)
            return
        }

        if (item instanceof stream.Readable) {
            item.pipe(result, { end: false })
            item.on('end', next)
            return
        }

        result.write(item.toString(), 'utf8', next)
    }

    return result
}

module.exports = streamString
