const fs = require('fs');

fs.readdir('./node_modules', (err, files) => {
    console.log(files);
});