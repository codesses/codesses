app.controller('ContactCtrl', ['$scope', '$http', 'Ref', '$firebaseArray', 'Auth', '$filter', function($scope, $http, Ref, $firebaseArray, Auth, $filter) {

  $scope.items = [];
  var users = $firebaseArray(Ref.child('profile'));
  users.$loaded().then(function (data) {
    angular.forEach(data, function(val, key) {
      $scope.items.push(val);
    });
    $scope.item = $filter('orderBy')($scope.items, 'first')[0];
    $scope.item.selected = true;
  });

  var auth = Auth.$getAuth();



  $scope.filter = '';
  $scope.groups = [
    {name: 'Codesses'},
    {name: 'Team Members'},
    {name: 'Friends'},
    {name: 'Mentors'}
  ];


  $scope.createGroup = function(){
    var group = {name: 'New Group'};
    group.name = $scope.checkItem(group, $scope.groups, 'name');
    $scope.groups.push(group);
  };

  $scope.checkItem = function(obj, arr, key){
    var i=0;
    angular.forEach(arr, function(item) {
      if(item[key].indexOf( obj[key] ) == 0){
        var j = item[key].replace(obj[key], '').trim();
        if(j){
          i = Math.max(i, parseInt(j)+1);
        }else{
          i = 1;
        }
      }
    });
    return obj[key] + (i ? ' '+i : '');
  };

  $scope.deleteGroup = function(item){
    $scope.groups.splice($scope.groups.indexOf(item), 1);
  };

  $scope.selectGroup = function(item){
    angular.forEach($scope.groups, function(item) {
      item.selected = false;
    });
    $scope.group = item;
    $scope.group.selected = true;
    $scope.filter = item.name;
  };

  $scope.selectItem = function(item){
    angular.forEach($scope.items, function(item) {
      item.selected = false;
      item.editing = false;
    });
    $scope.item = item;
    $scope.item.selected = true;
    // var token = $scope.user.username + '@' + $scope.item.username;
    // var num = parseInt(auth.token.replace(/\D/g,''));
    // var hashids = new Hashids(token, 8);
    // $scope.id = hashids.encode(num);
    $scope.messages = [];

    var chats = Ref.child('chats/');
    chats.orderByChild("timestamp").on('child_added', function(snapshot) {
      var data = snapshot.val();
      if(data.sender != $scope.user.username && data.recipient != $scope.user.username) return;
      if(data.sender != $scope.item.username && data.recipient != $scope.item.username) return;
      $scope.messages.push(data);
      // $scope.$apply();

      // angular.forEach(snapshot, function(val, key) {
      //   if (val.sender ===  && val.recipient === $scope.item.username) {
      //     $scope.messages.push(val);
      //   } else if(val.sender === $scope.item.username && val.recipient === $scope.user.username){
      //     $scope.messages.push(val);
      //   } else {
      //     console.log("Empty");
      //   };
      // });
    });

  };

  $scope.sendChat = function() {
    var chat = Ref.child('chats/');
    chat.push({
      sender: $scope.user.username,
      recipient: $scope.item.username,
      text: $scope.text,
      timestamp: Firebase.ServerValue.TIMESTAMP
    });
    $scope.text = '';
  };

  $scope.$watch('messages', function(old, newVal) {
    console.log($scope.messages);
  }, true);

  $scope.deleteItem = function(item){
    $scope.items.splice($scope.items.indexOf(item), 1);
    $scope.item = $filter('orderBy')($scope.items, 'first')[0];
    if($scope.item) $scope.item.selected = true;
  };

  $scope.createItem = function(){
    var item = {
      group: 'Friends',
      avatar:'/images/a0.jpg'
    };
    $scope.items.push(item);
    $scope.selectItem(item);
    $scope.item.editing = true;
  };

  $scope.editItem = function(item){
    if(item && item.selected){
      item.editing = true;
    }
  };

  $scope.doneEditing = function(item){
    item.editing = false;
  };

}]);