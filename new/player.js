angular.module('MyApp')
    .controller('PlayerCtrl',
        function($scope) {
            var self = this;

            self.selectNextSquare = function() {
                var tdir = $scope.typingDirection;
                var idx = $scope.selectedIndex;
                var squares = $scope.squares;
                var cols = $scope.cols;
                var max = $scope.rows * cols;
                var i;

                if(tdir === 'right') {
                    i = (idx+1 >= max) ? 0 : idx+1;
                    while(squares[i].type !== 'letter'){
                        if(i+1 >= max){
                            i = 0;
                        }else{
                            i++;
                        }
                    }
                }else{
                    i = (idx+cols >= max) ? idx%cols+1 : idx+cols;
                    while(squares[i].type !== 'letter'){
                        if((i+cols) >= max){
                            i = (i % cols) + 1;
                        }else{
                            i += cols;
                        }
                    }
                }

                $scope.setSelectedIndex(i);
                return i;
            };

            self.checkGrid = function() {
                $scope.gridFull = self.grid.isFull();
                if($scope.gridFull){
                    $scope.gridValid = self.grid.isValid();
                }
            };

            $scope.setSelectedIndex = function(i) {
                $scope.selectedIndex = i;
            };

            $scope.onGridKeyDown = function($event) {
                var keyCode;

                if($event.which !== null) keyCode = $event.which;
                else if($event.keyCode !== null) keyCode = $event.keyCode;

                var square = $scope.squares[$scope.selectedIndex];

                if (square.type == 'letter' && keyCode > 64 && keyCode < 91){
                    var strCaps = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";
                    var char = strCaps.charAt(keyCode - 65);
                    square.letter = char;
                    self.checkGrid();
                    self.selectNextSquare();
                }else if(keyCode == 32 /* space */ || keyCode == 46 /* delete */ || keyCode == 8 /* backspace */){
                    if(square.type == 'letter') {
                        square.letter = "";
                        self.checkGrid();
                    }
                    $event.preventDefault();
                }else if(keyCode == 38 /* up arrow */) {
                    $scope.setSelectedIndex(Math.max($scope.selectedIndex - $scope.cols, $scope.selectedIndex % $scope.cols));
                    $event.preventDefault();
                }else if(keyCode == 40 /* down arrow */) {
                    $scope.setSelectedIndex(Math.min($scope.selectedIndex + $scope.cols, $scope.cols*($scope.rows-1) + $scope.selectedIndex % $scope.cols));
                    $event.preventDefault();
                }else if(keyCode == 37 /* left arrow */) {
                    $scope.setSelectedIndex(Math.max($scope.selectedIndex-1, 0));
                    $event.preventDefault();
                }else if(keyCode == 39 /* right arrow */) {
                    $scope.setSelectedIndex(Math.min($scope.selectedIndex+1, $scope.cols*$scope.rows-1));
                    $event.preventDefault();
                }else if(keyCode == 17 /* ctrl */) {
                    if($scope.typingDirection == 'right') {
                        $scope.typingDirection = 'down';
                    }else{
                        $scope.typingDirection = 'right';
                    }
                    $event.preventDefault();
                }
            };

            $scope.$watch('gridData', function(newValue, oldValue) {
                if(newValue && newValue != oldValue) {
                    self.grid = new grid();
                    self.grid.initializeFromJson(newValue);
                    $scope.rows = self.grid.rows;
                    $scope.cols = self.grid.cols;
                    $scope.squares = self.grid.squares;
                }
            });
            $scope.gridFull = false;
            $scope.gridValid = false;
            $scope.squareSize = 80;
        });