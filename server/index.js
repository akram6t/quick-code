const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const vm = require('vm');
const { transformSync } = require('@babel/core');

const app = express();
const PORT = 3001;

app.use(cors());
app.use(bodyParser.json());

let dynamicRouter = express.Router();
app.use('/api', dynamicRouter);

// Function to transform ES module code to CommonJS
const transformCodeToCommonJS = (code) => {
    return transformSync(code, {
        presets: ['@babel/preset-env'],
    }).code;
};

// Function to dynamically create routes
const createRoutesFromCode = (code) => {
    try {
        // Transform ES module code to CommonJS
        const commonJSCode = transformCodeToCommonJS(code);
        console.log('Transformed Code:', commonJSCode);

        // Create a context with `module`, `exports`, and globals
        const context = {
            module: { exports: {} },
            exports: {}, // This will be linked to module.exports
            require, // Provide `require` for CommonJS modules
            fetch, // Provide fetch
            setTimeout, // Provide setTimeout
            console, // Provide console
        };
        vm.createContext(context);

        // Link exports to module.exports
        context.exports = context.module.exports;

        // Evaluate the transformed CommonJS code
        vm.runInContext(commonJSCode, context);

        // Log the exports
        console.log('Exports:', context.module.exports);

        const { exports } = context.module;

        // Remove the old router
        app._router.stack = app._router.stack.filter((layer) => layer.handle !== dynamicRouter);

        // Create a new router
        dynamicRouter = express.Router();

        if (exports.GET) {
            console.log('GET route created');
            dynamicRouter.get('/', (req, res) => {
                console.log('GET request received');
                exports.GET(req, res);
            });
        }

        if (exports.POST) {
            console.log('POST route created');
            dynamicRouter.post('/', (req, res) => {
                console.log('POST request received');
                exports.POST(req, res);
            });
        }

        if (exports.DELETE) {
            console.log('DELETE route created');
            dynamicRouter.delete('/', (req, res) => {
                console.log('DELETE request received');
                exports.DELETE(req, res);
            });
        }

        // Attach the new router to the /api route
        app.use('/api', dynamicRouter);

        console.log('Routes created successfully!');
    } catch (error) {
        console.error('Error evaluating code:', error);
    }
};

// Endpoint to receive code from the client
app.post('/save-code', (req, res) => {
    const { code } = req.body;

    if (!code) {
        return res.status(400).json({ error: 'No code provided' });
    }

    // Create routes from the received code
    createRoutesFromCode(code);

    res.json({ message: 'Code saved and routes created!' });
});

app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});