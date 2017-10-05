
node-stream-string
==========

Streamed ES6 template literal function.

# Motivation

Written for using `renderToNodeStream` React SSR function with ES6 template literals.

# Install

`npm i --save node-stream-string`

# Usage

```javascript
const streamString = require('node-stream-string')

// ...

app.get("/", (req, res) => {
    const stream = streamString`
        <!DOCTYPE html>
        <html>
        <head>
            <title>${ getTitle(req) }</title>
            <style>${ getStyle(req) }</style>
        </head>
        <body>    
            <div id='root'>
                ${ renderToNodeStream(<App/>) }
            </div>
        </body>
        </html>
    `
    stream.pipe(res)
})
```

# License

MIT
