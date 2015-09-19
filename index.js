#!/usr/bin/env node

var express = require('express');
var JiraApi = require('./lib/jira').JiraApi;
var config = {
    jira: require('./config/jira.json'),
    server: require('./config/server.json')
};
var app = express();

var jira = new JiraApi('https', config.jira.host, config.jira.port, config.jira.user, config.jira.password, '2.0');

app.get('/monitor/view/:view', function(req, res) {
    var viewId = req.params.view;
    jira.getBacklogForRapidView(viewId, function(error, data) {
        res.send(data);
    })

});

var server = app.listen(3000, function() {
    var host = server.address().address;
    var port = server.address().port;

    console.log('Example app listening at http://%s:%s', host, port);
});
