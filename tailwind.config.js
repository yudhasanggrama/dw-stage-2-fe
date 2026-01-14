const plugin = require("eslint-plugin-react-hooks");

module.exports = {
    darkMode :'class',
    content:    [
        "./index.html",
        ".src/**/*.{js,ts,jsx,tsx}",
    ],
    theme:{ 
        extend: {}
    },
    plugin: []
}