// Create web server
var express = require('express');
var router = express.Router();
var db = require('../models/db');
var bodyParser = require('body-parser');
var urlencodedParser = bodyParser.urlencoded({ extended: false });
var session = require('express-session');

router.post('/add', urlencodedParser, function(req, res) {
    // Check if user is logged in
    if(!req.session.loggedin) {
        res.redirect('/login');
    }
    else {
        var comment = req.body.comment;
        var username = req.session.username;
        var bookid = req.body.bookid;
        // Insert comment into database
        db.query('INSERT INTO comments (comment, username, bookid) VALUES (?, ?, ?)', [comment, username, bookid], function(error, results, fields) {
            if(error) {
                console.log(error);
            }
            else {
                res.redirect('/book?id=' + bookid);
            }
        });
    }
});

router.get('/delete', urlencodedParser, function(req, res) {
    // Check if user is logged in
    if(!req.session.loggedin) {
        res.redirect('/login');
    }
    else {
        var commentid = req.query.id;
        var bookid = req.query.bookid;
        // Delete comment from database
        db.query('DELETE FROM comments WHERE id = ?', [commentid], function(error, results, fields) {
            if(error) {
                console.log(error);
            }
            else {
                res.redirect('/book?id=' + bookid);
            }
        });
    }
});

module.exports = router;