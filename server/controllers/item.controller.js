const db = require("../database-mysql");
// const Item = require('../database-mongo/Item.model.js');

// UNCOMMENT IF USING MYSQL WITH CALLBACKS
 const selectAll = function (req, res) {
  db.query("SELECT * FROM analyses", (err, items) => {
    if (err) {
       res.status(500).send(err);
     } else {
       res.status(200).send(items);
     }
   });
 };
 const selectAllC = function (req, res) {
  db.query("SELECT * FROM clients", (err, items) => {
    if (err) {
       res.status(500).send(err);
     } else {
       res.status(200).send(items);
     }
   });
 };
 const selectOneida=function (req,res) {
  const query=`select * from analyses where design_an = "${req.params.design_an}" `
  db.query(query,(err,result)=>{
      err ? res.status(500).send(err) : res.status(200).send(result)
  })
}
const selectOnec=function (req,res) {
  const query=`select * from clients where idclient = "${req.params.id}" `
  db.query(query,(err,result)=>{
      err ? res.status(500).send(err) : res.status(200).send(result)
  })
}
const addC=(req,res)=>{
  const query="insert into clients set ?"
  console.log("body: ",req.body);
  db.query(query,req.body,(err,result)=>{
    err ? res.status(500).send(err) : res.status(200).send(result)
})
}
const addAC=(req,res)=>{
  const query=`insert into analyses set ?`
   db.query(query,req.body,(err,result)=>{
    err ? res.status(500).send(err) : res.status(200).send(result)
 })
}

const remove=(req,res)=>{
  const query=`delete from analyses item where idanalyse=${req.params.id}`
  db.query(query,(err,result)=>{
    err ? res.status(500).send(err) : res.status(200).send(result)
  })
}

const modify=(req,res)=>{
  const query=`update analyses set ? where idanalyse=${req.params.id}`;
   db.query(query,req.body,(err,result)=>{
    err ? res.status(500).send(err) : res.status(200).send(result)
  })
}

module.exports = { selectAll,selectOneida,selectAllC,selectOnec,addAC,addC,remove,modify };
