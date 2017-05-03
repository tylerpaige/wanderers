var express = require('express');
var app = express();

//The public folder is available for all routes at the root dir
app.use(express.static(`${__dirname}/dist)`);

// Default route should be a list of all other routes.
app.get('*', function(req, res) {
  res.sendFile(`${__dirname}/index.html`)
});

//Init
app.set('port', (process.env.PORT || 5000))
app.listen(app.get('port'), function() {
  console.log("App is running at http://localhost:" + app.get('port'))
})
