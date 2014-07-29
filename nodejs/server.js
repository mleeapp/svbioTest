var connect = require('connect');

connect.createServer(
    connect.static("../svbio")

).listen(5000);