(function(){
  angular.module('jatg')
  .controller('choreController', choreController);
  choreController.$inject = ['$http', '$location', '$state', 'Flash'];

  function choreController($http, $location, $state, Flash) {
    var self = this;

    self.newInfo = {name: '', description: '', urgent: false};
    self.allChores = [];

    $http.get('/api/all')
    .then(function(response){
      console.log(response);
      self.allChores = response.data;
      console.log(self.allChores);
    })

    this.getAll = function(){
      $http.get('/api/all')
      .then(function(response){
        console.log(response);
        self.allChores = response.data;
        console.log(self.allChores);
      })
    }

    this.newChore = function(send){
      $http.post(`/api/create`, send)
      .then(function(response){
        if (response.data.err){
          failAlert('Both fields must be filled!')
        } else {
          passAlert('<strong>Chore Created!</strong>')
          console.log(response);
          self.allChores = self.allChores.push(response.data);
          self.newInfo = {name: '', description: '', urgent: false};
          self.getAll();
          $state.go('main');
        }
      })
    }

    this.deleteChore = function(index, rem){
      self.allChores.splice(rem, 1);
      failAlert('<strong>Chore Deleted!</strong>')
      $http.delete('/api/delete/'+index)
      .then(function(response){

      })
    }

    this.updateChore = function(index){
      var send = self.allChores[index];
      $http.patch('/api/update', send)
      .then(function(response){
        console.log(response);
        self.getAll();
      })
    }

    function passAlert(msg){
      var id = Flash.create('success', msg, 7000, {class: 'flashAlert'}, true);
    }

    function failAlert(msg){
      var id = Flash.create('danger', msg, 7000, {class: 'flashAlert'}, true);
    }

  }

})()
