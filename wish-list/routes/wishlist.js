var express = require('express');
var router = express.Router();
var sqlight3 = require('sqlite3');
const db = new sqlight3.Database('wishlist.db');

/* GET wishlist */
router.get('/',(req, res, next)=> {
    db.serialize(()=>{
      db.all("select * from wishlist",(err,rows)=>{
        if(!err){
          var data={
            title: "Wish List",
            content: rows
          };
          res.render('wishlist', data);
        }
      });
    });
});

// /* get add page */
// router.get('/add', (req,res, next) => {
//   var data = {

//   }
// });

/* search */
router.get('/search',(req, res, next)=> {
  const keyword = req.query
  db.serialize(()=>{
    db.all(`select * from wishlist where wish LIKE "%${keyword.wish}%"`,(err,rows)=>{
      if(!err){
        var data={
          title: "Wish List",
          content: rows
        };
        res.render('wishlist', data);
      }
    });
  });
});

/* GET add page. */
router.get('/add',(req, res, next)=> {
  var data={
    title: "Add Wish List"
  };
  res.render('add', data); 
});

/* post */
router.post('/',(req, res, next)=> {

  var wish = req.body.wish;
  var memo = req.body.memo;
  var finished = req.body.finished;

  db.serialize(()=>{
    db.exec(`insert into wishlist (wish, memo, finished) values("${wish}","${memo}","${finished}")`, (stat, error)=>{
      res.redirect('/wishlist');
    });
  });
});


module.exports = router;
