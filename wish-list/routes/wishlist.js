var express = require('express');
var router = express.Router();
var sqlight3 = require('sqlite3');
const db = new sqlight3.Database('wishlist.db');


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
module.exports = router;
