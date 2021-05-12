angular.module('MyApp', []);
angular.module('MyApp')
    .controller('MainCtrl', function($scope) {
        var self = this;

        $scope.view = 'editor';

    });