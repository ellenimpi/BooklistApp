const express = require('express');

const app = express();

app.listen(4000,() => {
    console.log("Now listening for port 4000 requests");
})