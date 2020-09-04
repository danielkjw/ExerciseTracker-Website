var express = require("express"),
    app = express();
    var path = require('path');


var bodyParser  = require("body-parser");
// var handlebars = require('express-handlebars');
var handlebars = require('express-handlebars').create({defaultLayout:'main'});
app.engine('handlebars', handlebars.engine);

var $ = require('jquery');

// const ejs = require('ejs');

app.set('views', __dirname + '/views');
app.set('view engine', 'handlebars');

app.use(bodyParser.urlencoded({extended: true}));
app.use(bodyParser.json());


var options = {
  dotfiles: 'ignore',
  etag: false,
  extensions: ['htm', 'html'],
  index: false
};



app.use(express.static(path.join(__dirname, 'public') , options    ));
// app.use('/static', express.static('public'));
// app.use(express.static(path.join(__dirname, 'public')));
// app.use('/', express.static('public'));
// app.use("/",express.static(__dirname + '/public'));
// app.use("/",express.static(__dirname));
app.use('/static', express.static(path.join(__dirname, 'public')));
app.use("/",express.static(__dirname + '/views'));
app.use('./', express.static(path.join(__dirname, '/')));

// var frontexp = require('./member.js');

var mysql = require('./dbcon1.js');
app.set('mysql', mysql);
//var mysql = require('./dbcon.js');
// var member = app.require("/static/member.js");

var home = app.get('/', function(req, res) {
	res.render('./home');
});

var getAllMemRoute = app.get("/member", function(req,res){

    var que1 =`SELECT mid AS id, fname, lname, gender, age, ename as exercise, cname AS category FROM member AS m INNER JOIN member_exercise AS me ON m.mid = me.member_id INNER JOIN exercise AS e ON me.exercise_id = e.eid INNER JOIN ecategory AS c ON e.category_id = c.cid`;
    var que2 ='SELECT mid AS id, fname, lname, gender, age, b.weight AS weight, b.units AS units, photo, aboutme FROM member INNER JOIN bweight AS b ON member.mid = b.member_id';
    var que3 ='SELECT friend_id, member1_id, member2_id, status, fname, lname FROM friendship AS f INNER JOIN member AS m ON f.member2_id = m.mid WHERE f.member1_id = 1';               
    var que4 ='SELECT mid AS id, fname, lname, gender, age, photo, aboutme FROM member';

    mysql.pool.query(que4, function (err, results1, fields) {
    //console.log(results1[0]); 
    
      if (err) {
        console.log("Error in this sections"); 
        console.log(err);
        return;
      }
        // job1.results = results1;
        // res.render(job1);
        console.log(results1);
           var r1 = JSON.parse(JSON.stringify(results1));
        res.render("./member",{r1});
        // error will be an Error if one occurred during the query

        // results will contain the results of the query
        // fields will contain information about the returned results fields (if any)
    });
});


var putMemberRoute = app.put("/member/:id", function(req,res){
    // input value from search
    console.log(req.params.id);
    var que1 ="UPDATE member SET fname=?, lname=?, gender=?, age=?,aboutme=? WHERE mid=?";
    var inserts = [req.body.fname, req.body.lname, req.body.gender, req.body.age,req.body.aboutme, req.params.id];
    mysql.pool.query(que1,inserts, function (err, results1, fields) {
    // //console.log(results1[0]); 
      if (err) {
        console.log("Error in this sections"); 
        console.log(err);
        return;
      }
        console.log(results1);
        res.status(200);
        res.end();
    });

});

var deleteMemberRoute = app.delete("/member/:id", function(req,res){
    var values=[req.body.fname, req.body.lname, req.body.gender, req.body.age, req.body.aboutme];
    var queDelete = 'DELETE FROM member WHERE mid=?';     
    mysql.pool.query(queDelete,req.params.id, function (err, results1, fields) {
      if (err) {
        console.log("Error in this sections"); 
        console.log(err);
        return;
      }
        console.log(results1);
        res.status(200);
        res.end();   
        
    });
});

var addMemberRoute = app.post("/member", function(req,res){
    var values=[req.body.fname, req.body.lname, req.body.gender, req.body.age, req.body.aboutme];
    var queInsert = 'INSERT INTO member (fname,lname,gender,age,aboutme) VALUES (?,?,?,?,?)';               
    console.log(req.body.member);
    console.log(req.body);
    mysql.pool.query(queInsert,values, function (err, results1, fields) {
      if (err) {
        console.log("Error in this sections"); 
        console.log(err);
        return;
      }
        console.log(results1);
        res.status(200);
        res.end();
    });
 });
 
var getMemberRoute = app.get("/member/:id", function(req,res){

  	var job1 = [];
    var que1 ='SELECT mid AS id, fname, lname, gender, age, aboutme FROM member WHERE mid=?';
    var que2 ='SELECT mid AS id, fname, lname, gender, age, b.weight AS weight, b.units AS units, photo, aboutme FROM member INNER JOIN bweight AS b ON member.mid = b.member_id';

    mysql.pool.query(que1,req.params.id, function (err, results1, fields) {
    //console.log(results1[0]); 
      if (err) {
        console.log("Error in this sections"); 
        console.log(err);
        return;
      }
        console.log(results1);
        var member = JSON.parse(JSON.stringify(results1));
        res.send({member});
    });

});




//Friendship Routes ---------------------




var putFriendRoute = app.put("/friendlist/:id/:fid", function(req,res){
    // input value from search
    console.log(req.params.id);
    var que1 ="UPDATE member SET fname=?, lname=?, gender=?, age=?,aboutme=? WHERE mid=?";
    var inserts = [req.body.fname, req.body.lname, req.body.gender, req.body.age,req.body.aboutme, req.params.id];
    mysql.pool.query(que1,inserts, function (err, results1, fields) {
    // //console.log(results1[0]); 
      if (err) {
        console.log("Error in this sections"); 
        console.log(err);
        return;
      }
        console.log(results1);
        res.status(200);
        res.end();
    });

});

var deleteFriendRoute = app.delete("/friendlist/:id/:fid", function(req,res){
    var values=[req.body.fname, req.body.lname, req.body.gender, req.body.age, req.body.aboutme];
    var queDelete = 'DELETE FROM member WHERE mid=?';     
    mysql.pool.query(queDelete,req.params.id, function (err, results1, fields) {
      if (err) {
        console.log("Error in this sections"); 
        console.log(err);
        return;
      }
        console.log(results1);
        res.status(200);
        res.end();
    });
});

var addFriendRoute = app.post("/friendlist", function(req,res){
    var values=[req.body.fname, req.body.lname, req.body.gender, req.body.age, req.body.aboutme];
    var queInsert = 'INSERT INTO member (fname,lname,gender,age,aboutme) VALUES (?,?,?,?,?)';               
    console.log(req.body.member);
    console.log(req.body);
    mysql.pool.query(queInsert,values, function (err, results1, fields) {
      if (err) {
        console.log("Error in this sections"); 
        console.log(err);
        return;
      }
        console.log(results1);
        res.status(200);
        res.end();
    });
 });
 
var getFriendRoute = app.get("/member/:id", function(req,res){

  	var job1 = [];
    var que1 ='SELECT mid AS id, fname, lname, gender, age, aboutme FROM member WHERE mid=?';
    var que2 ='SELECT mid AS id, fname, lname, gender, age, b.weight AS weight, b.units AS units, photo, aboutme FROM member INNER JOIN bweight AS b ON member.mid = b.member_id';

    mysql.pool.query(que1,req.params.id, function (err, results1, fields) {
    //console.log(results1[0]); 
      if (err) {
        console.log("Error in this sections"); 
        console.log(err);
        return;
      }
        console.log(results1);
        var member = JSON.parse(JSON.stringify(results1));
        res.send({member});
    });

});


var getFriendlist = app.get("/friendlist/:id", function(req,res){
    // input value from search
  	var job1 = [];

    var que1 ='SELECT mid AS id, fname, lname, gender, age, ename as exercise, cname AS category FROM member AS m INNER JOIN member_exercise AS me ON m.mid = me.member_id INNER JOIN exercise AS e ON me.exercise_id = e.eid INNER JOIN ecategory AS c ON e.category_id = c.cid';
    var que2 ='SELECT mid AS id, fname, lname, gender, age, b.weight AS weight, b.units AS units, photo, aboutme FROM member INNER JOIN bweight AS b ON member.mid = b.member_id';
    var que3 ='SELECT friend_id, member1_id, member2_id, status, fname, lname FROM friendship AS f INNER JOIN member AS m ON f.member2_id = m.mid WHERE f.member1_id =?';               
    
    mysql.pool.query(que3,req.params.id, function (err, results1, fields) {
    //console.log(results1[0]); 
      if (err) {
        console.log("Error in this sections"); 
        console.log(err);
        return;
      }
        // job1.results = results1;
        // res.render(job1);
        console.log(results1);
        var r2 = JSON.parse(JSON.stringify(results1));
        res.send({r2});
        // error will be an Error if one occurred during the query
        // results will contain the results of the query
        // fields will contain information about the returned results fields (if any)
    });

});

var getMemExercise = app.get("/memberexercise/:id", function(req,res){
    var c1 ={};
    var id = req.params.id;
    var q4 = 'SELECT mid, fname, lname from member WHERE mid=?'
    mysql.pool.query(q4,id, function (err, results1, fields) {
      //console.log(results1[0]); 
        if (err) {
          console.log("Error in this sections"); 
          console.log(err);
          return;
        }
          c1.member = results1;
          //console.log(results1[0]);
            var que2 ='SELECT me.meid meid, me.member_id member_id, me.exercise_id, e.eid, e.ename,e.category_id, c.cid, c.cname FROM member_exercise AS me INNER JOIN exercise AS e ON me.exercise_id = e.eid INNER JOIN ecategory AS c ON e.category_id = c.cid WHERE me.member_id = ?';
            mysql.pool.query(que2,req.params.id, function (err, results2, fields) {
            //console.log(results1[0]); 
              if (err) {
                console.log("Error in this sections"); 
                console.log(err);
                return;
              }
                c1.exercise = results2;
                console.log(results2[0]);
                c1 = JSON.parse(JSON.stringify(c1));
                res.send(c1);
            });
      });
});

var updateMemExerciseRoute = app.put("/memberexercise/:id", function(req,res){
    // input value from search
    console.log(req.params.id);
    var que1 ="UPDATE member_exercise SET exercise_id=? WHERE meid =?";
    var inserts = [req.body.exercise_id, req.params.id];
    mysql.pool.query(que1,inserts, function (err, results1, fields) {
    // //console.log(results1[0]); 
      if (err) {
        console.log("Error in this sections"); 
        console.log(err);
        return;
      }
        console.log(results1);
        res.status(200);
        res.end();
    });
});

var getMemExerciseUpdateRoute = app.get("/memberexercise/exercise/:id", function(req,res){
    // input value from search
    var c1 ={};
    var id = req.params.id;
    var q4 = 'SELECT meid, member_id, exercise_id from member_exercise WHERE meid=?'
    mysql.pool.query(q4,id, function (err, results1, fields) {
      //console.log(results1[0]); 
      if (err) {
        console.log("Error in this sections"); 
        console.log(err);
        return;
      }
      c1.member = results1;
      //console.log(results1[0]);
      var que1 ="SELECT eid, ename FROM exercise";
      mysql.pool.query(que1,function (err, results2, fields) {
      // //console.log(results1[0]); 
      if (err) {
        console.log("Error in this sections"); 
        console.log(err);
        return;
      }
        c1.exercise = results2;
        console.log(results2[0]);
        c1 = JSON.parse(JSON.stringify(c1));
        res.send(c1);
      });
    });
});

var deleteMemExerciseRoute = app.delete("/memberexercise/:id", function(req,res){
    var queDelete = 'DELETE FROM member_exercise WHERE meid=?';     
    mysql.pool.query(queDelete,req.params.id, function (err, results1, fields) {
      if (err) {
        console.log("Error in this sections"); 
        console.log(err);
        return;
      }
        console.log(results1);
        res.status(200);
        res.end();   
    });
});

var getAddMemberExerciseRoute = app.get("/memberexercise/add/:id", function(req,res){
      var c1 ={};
      var que1 ="SELECT mid, fname,lname FROM member WHERE mid=?";
      mysql.pool.query(que1,req.params.id,function (err, results2, fields) {
      // //console.log(results1[0]); 
      if (err) {
        console.log("Error in this sections"); 
        console.log(err);
        return;
      }
        c1.member = results2;
        console.log(results2[0]);
        var que2 ="SELECT eid, ename FROM exercise";
      mysql.pool.query(que2,function (err, results1, fields) {
      // //console.log(results1[0]); 
      if (err) {
        console.log("Error in this sections"); 
        console.log(err);
        return;
      }
        c1.exercise = results1;
        console.log(results2[0]);
        c1 = JSON.parse(JSON.stringify(c1));
        res.send(c1);
      });
    });
});

var addMemExerciseRoute = app.post("/memberexercise/:id", function(req,res){
    var member_id = req.params.id;
    var values=[member_id, req.body.exercise_id];
    var queInsert = 'INSERT INTO member_exercise (member_id,exercise_id) VALUES (?,?)';               
    mysql.pool.query(queInsert,values, function (err, results1, fields) {
      if (err) {
        console.log("Error in this sections"); 
        console.log(err);
        return;
      }
        console.log(results1);
        res.status(200);
        res.end();
    });
 });


//////////Member & Bweight Route ////////////////////////


var getBweightRoute = app.get("/bweight/:id", function(req,res){
    var c1 ={};
    var id = req.params.id;
    var q4 = 'SELECT mid AS id, fname, lname, gender, age, b.bid, b.bdate as bdate, b.weight AS weight, b.units AS units, photo, aboutme FROM member INNER JOIN bweight AS b ON member.mid = b.member_id WHERE member.mid = ?';
    mysql.pool.query(q4,id, function (err, results1, fields) {
      //console.log(results1[0]); 
        if (err) {
          console.log("Error in this sections"); 
          console.log(err);
          return;
        }
          c1.bweight = results1;
          c1 = JSON.parse(JSON.stringify(c1));
          res.send(c1);
          });
      });


var updateBweightRoute = app.put("/bweight/:id", function(req,res){
    // input value from search
    console.log(req.params.id);
    var que1 ="UPDATE bweight SET bdate=?, weight=? WHERE bid =?";
    var inserts = [req.body.bdate,req.body.weight,req.params.id];
    mysql.pool.query(que1,inserts, function (err, results1, fields) {
    // //console.log(results1[0]); 
      if (err) {
        console.log("Error in this sections"); 
        console.log(err);
        return;
      }
        console.log(results1);
        res.status(200);
        res.end();
    });
});


var deleteMemExerciseRoute = app.delete("/bweight/:id", function(req,res){
    var queDelete = 'DELETE FROM bweight WHERE bid=?';     
    mysql.pool.query(queDelete,req.params.id, function (err, results1, fields) {
      if (err) {
        console.log("Error in this sections"); 
        console.log(err);
        return;
      }
        console.log(results1);
        res.status(200);
        res.end();   
    });
});

var getAddBweightRoute = app.get("/bweight/:id", function(req,res){
    var c1 ={};
    var id = req.params.id;
    var q4 = 'SELECT mid AS id, fname, lname, gender, age, b.bid, b.bdate as bdate, b.weight AS weight, b.units AS units, photo, aboutme FROM member INNER JOIN bweight AS b ON member.mid = b.member_id WHERE member.mid = ?';
    mysql.pool.query(q4,id, function (err, results1, fields) {
      //console.log(results1[0]); 
        if (err) {
          console.log("Error in this sections"); 
          console.log(err);
          return;
        }
          c1.bweight = results1;
          c1 = JSON.parse(JSON.stringify(c1));
          res.send(c1);
          });
      });

var addBweight = app.post("/bweight/:id", function(req,res){
    var member_id = req.params.id;
    var values=[req.body.bdate, req.body.weight, member_id, req.body.units];
    var queInsert = 'INSERT INTO bweight (bdate, weight, member_id, units) VALUES (?,?,?,?)';               
    mysql.pool.query(queInsert,values, function (err, results1, fields) {
      if (err) {
        console.log("Error in this sections"); 
        console.log(err);
        return;
      }
        console.log(results1);
        res.status(200);
        res.end();
    });
 });
 
 
 
 //////////// END OF MEMBER BWEIGHT ROUTE ////////////////////////


///////////////////LOG_LOG_EXERCISE ROUTES//////////////////////////////

var getLogExerciseRoute = app.get("/logexercise", function(req,res){
  var c1 ={};
  var id = req.params.id;
  var q4 = 'SELECT mid as id, fname, lname, l.lid, l.ldate from member AS m INNER JOIN log AS l ON m.mid = l.member_id';
  mysql.pool.query(q4,id, function (err, results1, fields) {
    ////console.log(results1[0]); 
      if (err) {
        console.log("Error in this sections"); 
        console.log(err);
        return;
      }
      c1.memberlog = results1;
      console.log(results1);
      
      c1 = JSON.parse(JSON.stringify(c1));
      console.log(c1);
      res.render('./logexercise',c1);
        });
    });
      
      
var getLogDERoute = app.get("/logexercise/:id", function(req,res){
  var c1 ={};
  var id = req.params.id;
  var q4 = "SELECT mid as id, fname, lname, l.lid, l.ldate,ld.ldid, ld.exercise_id,e.eid, e.ename, ld.log_id,ld.eweight,ld.eunits,ld.sets,ld.reps, ld.sets*ld.reps AS totalreps from member AS m INNER JOIN log AS l ON m.mid = l.member_id LEFT JOIN logdetails AS ld ON l.lid = ld.log_id LEFT JOIN exercise AS e ON ld.exercise_id = e.eid WHERE lid=?";
  mysql.pool.query(q4,req.params.id, function (err, result, fields){
      if (err) {
        console.log("Error in this sections"); 
        console.log(err);
        return;
      }
        console.log(result);
        c1.logdetails = JSON.parse(JSON.stringify(result));
        var q5 = "SELECT SUM(ld.sets*ld.reps) AS allreps from member AS m INNER JOIN log AS l ON m.mid = l.member_id LEFT JOIN logdetails AS ld ON l.lid = ld.log_id LEFT JOIN exercise AS e ON ld.exercise_id = e.eid GROUP BY l.lid HAVING lid=?";
          mysql.pool.query(q5,req.params.id, function (err, result, fields){
              if (err) {
                console.log("Error in this sections"); 
                console.log(err);
                return;
              }
                console.log(result);
        c1.alldetails = JSON.parse(JSON.stringify(result));
        console.log(c1);
        res.send(c1);
        });
  });
})

var getUpdatelogDetailRoute = app.get("/logexercise/:lid/logdetail/:ldid", function(req,res){
    var c1 ={};
    var lid = req.params.lid;
    var ldid = req.params.ldid;
    var inserts = [lid, ldid];
    var q4 = "SELECT l.lid, l.ldate, ld.ldid, ld.exercise_id,e.eid, e.ename, ld.log_id,ld.eweight,ld.eunits,ld.sets,ld.reps from log AS l INNER JOIN logdetails AS ld ON l.lid = ld.log_id INNER JOIN exercise AS e ON ld.exercise_id = e.eid WHERE ldid=?";
    mysql.pool.query(q4,ldid, function (err, result, fields){
        if (err) {
          console.log("Error in this sections"); 
          console.log(err);
          return;
        }
          console.log(result);
          c1.logdetails = JSON.parse(JSON.stringify(result));
            mysql.pool.query("SELECT eid, ename FROM exercise", function (err, result, fields){
              if (err) {
                console.log("Error in this sections"); 
                console.log(err);
                return;
              }
                console.log(result);
                c1.exerciselist = JSON.parse(JSON.stringify(result));
                res.send(c1);
          });
      });
});

var updateLogDetailRoute = app.put("/logexercise/:lid/logdetail/:ldid", function(req,res){
    var c1 ={};
    var lid = req.params.lid;
    var ldid = req.params.ldid;
    var inserts = [req.body.exercise_id, req.body.eweight, req.body.eunits, req.body.sets, req.body.reps,ldid];
    var updateLDetailsQuery = 'UPDATE logdetails SET exercise_id =?, eweight=?, eunits=?, sets=?, reps=?  WHERE ldid=?';
    mysql.pool.query(updateLDetailsQuery,inserts, function (err, results1, fields) {
        if (err) {
          console.log("Error in this sections"); 
          console.log(err);
          return;
        }
        res.status(200);
        res.end();
          });
      });
 
var getAddLogDetailRoute = app.get("/logexercise/:lid/logdetail", function(req,res){
    var c1 ={};
    var lid = req.params.lid;
    var ldid = req.params.ldid;
    var inserts = [lid, ldid];
    var q4 = "SELECT lid, ldate FROM log WHERE lid=?"
    mysql.pool.query(q4,lid, function (err, result, fields){
        if (err) {
          console.log("Error in this sections"); 
          console.log(err);
          return;
        }
          console.log(result);
          c1.logdetails = JSON.parse(JSON.stringify(result));
            mysql.pool.query("SELECT eid, ename FROM exercise", function (err, result, fields){
              if (err) {
                console.log("Error in this sections"); 
                console.log(err);
                return;
              }
                console.log(result);
                c1.exerciselist = JSON.parse(JSON.stringify(result));
                res.send(c1);
          });
      });
});

var addLogDetailRoute = app.post("/logexercise/:lid/logdetail", function(req,res){
    var c1 ={};
    var lid = req.params.lid;

    var inserts = [req.body.exercise_id, req.body.eweight, req.body.eunits, req.body.sets, req.body.reps,lid];
    var addLogDetailsQuery = 'INSERT into logdetails (exercise_id,eweight,eunits,sets,reps,log_id) VALUES (?,?,?,?,?,?)';
    mysql.pool.query(addLogDetailsQuery,inserts, function (err, results1, fields) {
        if (err) {
          console.log("Error in this sections"); 
          console.log(err);
          return;
        }
        res.status(200);
        res.end();
          });
      });
       
var deleteLogDetailRoute = app.delete("/logexercise/:lid/logdetail/:ldid", function(req,res){
    var c1 ={};
    var lid = req.params.lid;
    var ldid = req.params.ldid;
    var deleteLDetailsQuery = 'DELETE FROM logdetails WHERE ldid=?';
    mysql.pool.query(deleteLDetailsQuery,ldid, function (err, results1, fields) {
        if (err) {
          console.log("Error in this sections"); 
          console.log(err);
          return;
        }
        res.status(200);
        res.end();
          });
      }); 
 
 
      
var logInitUpdate = app.get('/addlog', function(req,res){
    var c6 ={};
    var id = req.params.id;
    var query = mysql.pool.query('SELECT mid,fname,lname FROM member', function(err,results1){
        if (err){
          console.log("Error in this sections"); 
          res.send(500);
          return;
        }
        c6.memberlist = JSON.parse(JSON.stringify(results1)); 
        var q7 = 'SELECT mid as id, fname, lname, l.lid, l.ldate from member AS m INNER JOIN log AS l ON m.mid = l.member_id';
        mysql.pool.query(q7,id, function (err, results1, fields) {
          console.log(results1); 
            if (err) {
              console.log("Error in this sections"); 
              console.log(err);
              return;
            }
            c6.memberlog = JSON.parse(JSON.stringify(results1));
            console.log(results1);
                var que1 ='SELECT cid, cname FROM ecategory';
                mysql.pool.query(que1, function (err, results1) {
                console.log(results1); 
                  if (err) {
                    console.log("Error in this sections"); 
                    console.log(err);
                    return;
                  }
                    c6.category = JSON.parse(JSON.stringify(results1));
                    console.log("c1 query");
                    var id = req.params.id;
                    var que2 ='SELECT ec.cid, ec.cname, e.eid, e.ename, e.description FROM ecategory AS ec INNER JOIN exercise AS e ON ec.cid = e.category_id';
                    mysql.pool.query(que2,id, function (err, results1, fields) {
                    console.log(results1); 
                    if (err) {
                      console.log("Error in this sections"); 
                      console.log(err);
                      return;
                    }
                      c6.exercise = JSON.parse(JSON.stringify(results1));

                      console.log(c6);
                      res.send(c6);
                    });
                });
           });
        });
    });
 
    
var addLogRoute = app.post("/logexercise", function(req,res){
    var id = req.params.id;
    var queInsert = 'INSERT INTO log (ldate,member_id) VALUES (?,?)';               
    var inserts = [req.body.ldate, req.body.mid];
    mysql.pool.query(queInsert,inserts, function (err, results1, fields) {
      if (err) {
        console.log("Error in this sections"); 
        console.log(err);
        return;
      }
        console.log(results1);
        res.status(200);
        res.end();   
      });
    });


var getLogUpdateRoute = app.get("/logexercise/update/:id", function(req,res){
    var c1 ={};
    var id = req.params.id;
    var q4 = 'SELECT lid, ldate from log WHERE lid=?';
    mysql.pool.query(q4,id, function (err, results1, fields) {
      ////console.log(results1[0]); 
        if (err) {
          console.log("Error in this sections"); 
          console.log(err);
          return;
        }
        c1.memberlog = JSON.parse(JSON.stringify(results1));
        //console.log(results1[0]);
        res.send(c1);
          });
      });
      
var updateLogRoute = app.put("/logexercise/update/:id", function(req,res){
    var c1 ={};
    var id = req.params.id;
    var values=[req.body.ldate, id];
    var q4 = 'UPDATE log SET ldate =? WHERE lid=?';
    mysql.pool.query(q4,values, function (err, results1, fields) {
      //console.log(results1[0]); 
        if (err) {
          console.log("Error in this sections"); 
          console.log(err);
          return;
        }
        res.status(200);
        res.end();
          });
      });
      
var deleteLogRoute = app.delete("/logexercise/:id", function(req,res){
    var id = req.params.id;
    var queDelete = 'DELETE FROM logdetails WHERE log_id=?';     
    mysql.pool.query(queDelete,req.params.id, function (err, results1, fields) {
      if (err) {
        console.log("Error in this sections"); 
        console.log(err);
        return;
      }
        console.log(results1);
          var queDelete = 'DELETE FROM log WHERE lid=?';     
          mysql.pool.query(queDelete,req.params.id, function (err, results1, fields) {
          if (err) {
          console.log("Error in this sections"); 
          console.log(err);
          return;
        }
          console.log(results1);
          res.status(200);
          res.end();   
      });
    });
});



var getMemExerciseUpdateRoute = app.get("/memberexercise/exercise/:id", function(req,res){
    // input value from search
    var c1 ={};
    var id = req.params.id;
    var q4 = 'SELECT meid, member_id, exercise_id from member_exercise WHERE meid=?'
    mysql.pool.query(q4,id, function (err, results1, fields) {
      //console.log(results1[0]); 
      if (err) {
        console.log("Error in this sections"); 
        console.log(err);
        return;
      }
      c1.member = results1;
      //console.log(results1[0]);
      var que1 ="SELECT eid, ename FROM exercise";
      mysql.pool.query(que1,function (err, results2, fields) {
      // //console.log(results1[0]); 
      if (err) {
        console.log("Error in this sections"); 
        console.log(err);
        return;
      }
        c1.exercise = results2;
        console.log(results2[0]);
        c1 = JSON.parse(JSON.stringify(c1));
        res.send(c1);
      });
    });
});



var deleteMemExerciseRoute = app.delete("/memberexercise/:id", function(req,res){
    var queDelete = 'DELETE FROM member_exercise WHERE meid=?';     
    mysql.pool.query(queDelete,req.params.id, function (err, results1, fields) {
      if (err) {
        console.log("Error in this sections"); 
        console.log(err);
        return;
      }
        console.log(results1);
        res.status(200);
        res.end();   
    });
});

var getAddMemberExerciseRoute = app.get("/memberexercise/add/:id", function(req,res){
      var c1 ={};
      var que1 ="SELECT mid, fname,lname FROM member WHERE mid=?";
      mysql.pool.query(que1,req.params.id,function (err, results2, fields) {
      // //console.log(results1[0]); 
      if (err) {
        console.log("Error in this sections"); 
        console.log(err);
        return;
      }
        c1.member = results2;
        console.log(results2[0]);
        var que2 ="SELECT eid, ename FROM exercise";
      mysql.pool.query(que2,function (err, results1, fields) {
      // //console.log(results1[0]); 
      if (err) {
        console.log("Error in this sections"); 
        console.log(err);
        return;
      }
        c1.exercise = results1;
        console.log(results2[0]);
        c1.memberlog = JSON.parse(JSON.stringify(c1));
        res.send(c1);
      });
    });
});

var addMemExerciseRoute = app.post("/memberexercise/:id", function(req,res){
    var member_id = req.params.id;
    var values=[member_id, req.body.exercise_id];
    var queInsert = 'INSERT INTO member_exercise (member_id,exercise_id) VALUES (?,?)';               
    mysql.pool.query(queInsert,values, function (err, results1, fields) {
      if (err) {
        console.log("Error in this sections"); 
        console.log(err);
        return;
      }
        console.log(results1);
        res.status(200);
        res.end();
    });
 });











///////////////////EXERCISE ROUTES//////////////////////////////


var invoke1 = app.get("/gettables", function(req,res){
     var que1 ='SELECT mid AS id, fname, lname, gender, age, ename as exercise, cname AS category FROM member AS m INNER JOIN member_exercise AS me ON m.mid = me.member_id INNER JOIN exercise AS e ON me.exercise_id = e.eid INNER JOIN ecategory AS c ON e.category_id = c.cid';
    var que2 ='SELECT mid AS id, fname, lname, gender, age, b.weight AS weight, b.units AS units, photo, aboutme FROM member INNER JOIN bweight AS b ON member.mid = b.member_id';
    var que3 ='SELECT friend_id, member1_id, member2_id, status, fname, lname FROM friendship AS f INNER JOIN member AS m ON f.member2_id = m.mid WHERE f.member1_id = 1';               
    
    mysql.pool.query(que1, function (err, results1, fields) {
    //console.log(results1[0]); 
      if (err) {
        console.log("Error in this sections"); 
        console.log(err);
        return;
      }
        // job1.results = results1;
        // res.render(job1);
        console.log(results1);
           var r2 = JSON.parse(JSON.stringify(results1));
        res.send({r2});
    });

});

var getMemberRoute = app.get("/profile/:id", function(req,res){
    
  	var job1 = [];
    var que1 ='SELECT mid AS id, fname, lname, gender, age, aboutme FROM member WHERE mid=?';
    mysql.pool.query(que1,req.params.id, function (err, results1, fields) {
    //console.log(results1[0]); 
      if (err) {
        console.log("Error in this sections"); 
        console.log(err);
        return;
      }
        console.log(results1);
        var member = JSON.parse(JSON.stringify(results1));
        res.send({member});
    });

});



//GET EXERCISE + CATEGORY ROUTES

app.get("/category", function(req,res){

    var c1 ={};
    var que1 ='SELECT cid, cname FROM ecategory';
    mysql.pool.query(que1, function (err, results1, fields) {
    //console.log(results1[0]); 
      if (err) {
        console.log("Error in this sections"); 
        console.log(err);
        return;
      }
        console.log(results1);
        c1.category = results1;
        c1 = JSON.parse(JSON.stringify(c1));
        console.log(c1.exercise);
        res.send(c1);
  });
});
var addCategoryRoute = app.post("/category", function(req,res){
    var values=[req.body.cname];
    var queInsert = 'INSERT INTO ecategory (cname) VALUES (?)';               
    mysql.pool.query(queInsert,values, function (err, results1, fields) {
      if (err) {
        console.log("Error in this sections"); 
        console.log(err);
        return;
      }
        console.log(results1);
        res.status(200);
        res.end();
    });
 });

var deleteCategoryRoute = app.delete("/category/:id", function(req,res){
    var queDelete = 'DELETE FROM ecategory WHERE cid=?';     
    mysql.pool.query(queDelete,req.params.id, function (err, results1, fields) {
      if (err) {
        console.log("Error in this sections"); 
        console.log(err);
        return;
      }
        console.log(results1);
        res.status(200);
        res.end();   
    });
});

var getCategoryUpdate = app.get("/category/:id", function(req,res){

    var c1 ={};
    var que1 ='SELECT cid, cname FROM ecategory WHERE cid=?';
    mysql.pool.query(que1, req.params.id, function (err, results1, fields) {
    //console.log(results1[0]); 
      if (err) {
        console.log("Error in this sections"); 
        console.log(err);
        return;
      }
        console.log(results1);
        c1.category = results1;
        c1 = JSON.parse(JSON.stringify(c1));
        res.send(c1);
  });
});

var putCategoryUpdate = app.get("/category", function(req,res){

    var c1 ={};
    var que1 ='INSERT INTO ecategory (cname) VALUES (?)';
    mysql.pool.query(que1, req.body.cname, function (err, results1, fields) {
    //console.log(results1[0]); 
      if (err) {
        console.log("Error in this sections"); 
        console.log(err);
        return;
      }
        console.log(results1);
        res.status(200);
        res.end();
  });
});



var exercise = app.get("/exercise", function(req,res){

    var c1 ={};
    var que1 ='SELECT cid, cname FROM ecategory';
    mysql.pool.query(que1, function (err, results1, fields) {
    ////console.log(results1[0]); 
      if (err) {
        console.log("Error in this sections"); 
        console.log(err);
        return;
      }
        console.log(results1);
        c1.category = results1;
        var que1 ='SELECT ec.cid, ec.cname, e.eid, e.ename, e.description FROM ecategory AS ec INNER JOIN exercise AS e ON ec.cid = e.category_id';
        mysql.pool.query(que1,function (err, results1, fields) {
        //console.log(results1[0]); 
          if (err) {
            console.log("Error in this sections"); 
            console.log(err);
            return;
          }
            console.log(results1);
            c1.exercise = results1;      
            c1 = JSON.parse(JSON.stringify(c1));
            console.log(c1.exercise);
            res.render("./exercise",c1);
    });
  });
});





var exerciseCategoryID = app.get("/exercise/category/:id", function(req,res){
    console.log("app.get/exercise/category/:id");
    var c1 ={};
    var que1 ='SELECT cid, cname FROM ecategory';
    mysql.pool.query(que1, function (err, results1, fields) {
    //console.log(results1[0]); 
      
      if (err) {
        console.log("Error in this sections"); 
        console.log(err);
        return;
      }
        
        c1.category = results1;
        console.log("c1 query");
        console.log(c1.category);
        var id = req.params.id;
        var que2 ='SELECT ec.cid, ec.cname, e.eid, e.ename, e.description FROM ecategory AS ec INNER JOIN exercise AS e ON ec.cid = e.category_id WHERE ec.cid = ?';
        mysql.pool.query(que2,id, function (err, results1, fields) {
        //console.log(results1[0]); 
        if (err) {
          console.log("Error in this sections"); 
          console.log(err);
          return;
        }
          c1.exercise = results1;
          console.log(c1.exercise);
          console.log("c1exercise query");
          c1 = JSON.parse(JSON.stringify(c1));
          res.send(c1);
     });
    });
  });

var addExerciseRoute = app.post("/exercise", function(req,res){
    var values=[req.body.ename, req.body.category_id, req.body.description];
    var queInsert = 'INSERT INTO exercise (ename,category_id,description) VALUES (?,?,?)';               
    console.log(req.body.member);
    console.log(req.body);
    mysql.pool.query(queInsert,values, function (err, results1, fields) {
      if (err) {
        console.log("Error in this sections"); 
        console.log(err);
        return;
      }
        console.log(results1);
        res.status(200);
        res.end();
    });
 });
 
var getExerciseRoute = app.get("/exercise/:id", function(req,res){
    var id = req.params.id;
    var c1 ={};
    var que1 ='SELECT cid, cname FROM ecategory';
    mysql.pool.query(que1, function (err, results1, fields) {
    //console.log(results1[0]); 
      
      if (err) {
        console.log("Error in this sections"); 
        console.log(err);
        return;
      }
        c1.category = results1;
        var que2 ='SELECT eid, ename, category_id, description FROM exercise WHERE eid = ?';
        mysql.pool.query(que2,req.params.id, function (err, results2, fields) {
        //console.log(results1[0]); 
        if (err) {
          console.log("Error in this sections"); 
          console.log(err);
          return;
        }
          c1.exercise = results2;
          console.log(c1.exercise);
          c1 = JSON.parse(JSON.stringify(c1));
          res.send(c1);
     });
    });
  });

var putExerciseRoute = app.put("/exercise/:id", function(req,res){
    // input value from search
    console.log(req.params.id);
    var que1 ="UPDATE exercise SET ename=?, category_id=?, description=? WHERE eid=?";
    var inserts = [req.body.ename, req.body.category_id, req.body.description, req.params.id];
    mysql.pool.query(que1,inserts, function (err, results1, fields) {
    // //console.log(results1[0]); 
      if (err) {
        console.log("Error in this sections"); 
        console.log(err);
        return;
      }
        console.log(results1);
        res.status(200);
        res.end();
    });
});

var deleteExerciseRoute = app.delete("/exercise/:id", function(req,res){
    var queDelete = 'DELETE FROM exercise WHERE eid=?';     
    mysql.pool.query(queDelete,req.params.id, function (err, results1, fields) {
      if (err) {
        console.log("Error in this sections"); 
        console.log(err);
        return;
      }
        console.log(results1);
        res.status(200);
        res.end();   
    });
});




var getFriendlist = app.get("/friendlist/:id", function(req,res){
    // input value from search

    var que1 ='SELECT mid AS id, fname, lname, gender, age, ename as exercise, cname AS category FROM member AS m INNER JOIN member_exercise AS me ON m.mid = me.member_id INNER JOIN exercise AS e ON me.exercise_id = e.eid INNER JOIN ecategory AS c ON e.category_id = c.cid';
    var que2 ='SELECT mid AS id, fname, lname, gender, age, b.weight AS weight, b.units AS units, photo, aboutme FROM member INNER JOIN bweight AS b ON member.mid = b.member_id';
    var que3 ='SELECT friend_id, member1_id, member2_id, status, fname, lname FROM friendship AS f INNER JOIN member AS m ON f.member2_id = m.mid WHERE f.member1_id =?';               
    
    mysql.pool.query(que3,req.params.id, function (err, results1, fields) {
    //console.log(results1[0]); 
      if (err) {
        console.log("Error in this sections"); 
        console.log(err);
        return;
      }
        // job1.results = results1;
        // res.render(job1);
        var r2 = JSON.parse(JSON.stringify(results1));
        res.send({r2});
        // error will be an Error if one occurred during the query
        // results will contain the results of the query
        // fields will contain information about the returned results fields (if any)
    });
});


app.use(function(req,res){
  res.status(404);
  res.render('404');
});

app.use(function(err, req, res, next){
  console.error(err.stack);
  res.status(500);
  res.render('500');
});


var port = process.env.PORT; //|| 5052;

app.listen(port, process.env.IP, function(){
    console.log("This is the listening code");
});


// var http=require('http');

// var server=http.createServer(function(req,res){
//     res.end('test');
// });

// server.on('listening',function(){
//     console.log('ok, server is running');
// });

// server.listen(80);