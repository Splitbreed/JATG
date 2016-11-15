var express = require('express'),
    router = express.Router();

var Chore = require('../models/chore.js');

router.post('/create', function(req, res){
  if (req.body.name == '' || req.body.description == '') {
    res.json({err: 'empty field'});
  } else {
    console.log(req)
    Chore.create(req.body)
    .then(function(chore){
      console.log(chore);
      res.json(chore)
    })
  }
})

router.delete('/delete/:id', function(req, res){
  Chore.remove({_id: req.params.id})
  .then(function(chore){
    console.log(chore);
    res.json(chore);
  })
})

router.get('/all', function(req, res){
  Chore.find({}).exec()
  .then(function(allChores){
    console.log(allChores);
    res.json(allChores);
  })
})

router.patch('/update', function(req, res){
  console.log(req.body);
  Chore.findById(req.body._id).exec()
  .then(function(chore){
    console.log(chore.urgent);
    chore.urgent = !chore.urgent;
    console.log(chore.urgent);
    chore.save(function(chore){
      res.json(chore);
    });
  })
})

module.exports = router;
