angular.module('MyApp')
    .controller('EditorCtrl',
        function($scope) {
            var self = this;

            self.getDefinitions = function() {
                $scope.horizontalDefinitions = self.grid.getHorizontalDefinitions();
                $scope.verticalDefinitions = self.grid.getVerticalDefinitions();
            };

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

            $scope.setSelectedIndex = function(i) {
                $scope.selectedIndex = i;
            };

            $scope.onGridKeyDown = function($event) {
                var keyCode;

                if($event.which !== null) keyCode = $event.which;
                else if($event.keyCode !== null) keyCode = $event.keyCode;

                var square = $scope.squares[$scope.selectedIndex];

                if (keyCode > 64 && keyCode < 91){
                    var strCaps = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";
                    var char = strCaps.charAt(keyCode - 65);
                    square.type = 'letter';
                    square.letter = char;
                    self.selectNextSquare();
                }else if(keyCode == 32 /* space */){
                    square.letter = "";
                    if (square.type === 'letter'){
                        square.type = 'definition';
                    }else{
                        square.type = 'letter';
                    }
                    $event.preventDefault();
                }else if(keyCode == 46 /* delete */ || keyCode == 8 /* backspace */){
                    square.type = 'letter';
                    square.letter = "";
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
                self.getDefinitions();
            };

            $scope.exportXML = function() {
                $scope.gridData = self.grid.exportToXML();
            };
            $scope.exportJSON = function() {
                $scope.gridData = self.grid.exportToJSON();
            };

            $scope.squareSize = 40;
            $scope.selectedIndex = 5;
            $scope.rows = 7;
            $scope.cols = 5;
            $scope.typingDirection = 'right';

            $scope.$watch('rows', function() {
                self.grid = new grid();
                self.grid.initializeBlankGrid($scope.rows, $scope.cols);
                $scope.squares = self.grid.squares;
            });
            $scope.$watch('cols', function() {
                self.grid = new grid();
                self.grid.initializeBlankGrid($scope.rows, $scope.cols);
                $scope.squares = self.grid.squares;
            });
        });