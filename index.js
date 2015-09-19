#!/usr/bin/env node

var express = require('express');
var JiraApi = require('./lib/jira').JiraApi;
var expressHbs = require('express-handlebars');
var config = {
    jira: require('./config/jira.json'),
    server: require('./config/server.json')
};

// setup express app
var app = express();
app.set('views', './views');
app.engine('hbs', expressHbs({extname:'hbs'}));
app.set('view engine', 'hbs');

var jira = new JiraApi('https', config.jira.host, config.jira.port, config.jira.user, config.jira.password, '2.0');

app.get('/monitor/view/:view', function(req, res) {
    var viewId = req.params.view;
    jira.getBacklogForRapidView(viewId, function(error, data) {
        res.render('rapid-view-monitor',data);
    })

});

var server = app.listen(3000, function() {
    var host = server.address().address;
    var port = server.address().port;

    console.log('Example app listening at http://%s:%s', host, port);
});
