angular.module('MyApp', []);
angular.module('MyApp')
  .controller('EditorCtrl',
    function($scope) {
      var self = this;
      
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
        }
        self.getDefinitions();
      };
      
      $scope.export = function() {
        self.exportToXML();
      };
      
      self.initializeGrid = function(rows, cols) {
        var squares = [];
        var i = 0;
        var max = rows * cols;
        
        while(i < max){
          
          var square = {
            idx : i,
            type : 'letter',
            definitions : null,
            letter : '',
            solution: ''
          };
          
          if ((i < cols) && (i % 2) === 0){
            square.type = 'definition';
          }else if(i % (cols * 2) === 0){
            square.type = 'definition';
          }
          
          squares[i++] = square;
        }
        
        return squares;
      };
      
      self.getDefinitions = function() {
        $scope.horizontalDefinitions = self.getHorizontalDefinitions();
        $scope.verticalDefinitions = self.getVerticalDefinitions();
      };
      
      self.getHorizontalDefinitions = function() {
        var defs = [];
        var sq = $scope.squares;
        var rows = $scope.rows;
        var cols = $scope.cols;
        
        var i = 0;
        var max = rows*cols;
        while(i < max) {
          var word = self.getHorizontalWordAt(i);
          if(word !== null) {
            var def = {
              startIdx : i,
              definitionIdx : -1,
              text : "",
              orientation : 'horizontal',
              solution : word
            }
            defs.push(def);
            i += word.length;
          }else{
            i++;
          }
        }
        
        return defs;
      };
      
      self.getVerticalDefinitions = function() {
        var defs = [];
        var sq = $scope.squares;
        var rows = $scope.rows;
        var cols = $scope.cols;
        
        var col;
        var max = rows*cols;
        for(col = 0; col < cols; col++) {
          var i = col;
          while(i < max) {
            var word = self.getVerticalWordAt(i);
            if(word !== null) {
              var def = {
                startIdx : i,
                definitionIdx : -1,
                text : "",
                orientation : 'vertical',
                solution : word
              };
              defs.push(def);
              i += (word.length * cols);
            }else{
              i += cols;
            }
          }
        }
        
        return defs;
      };
      
      self.getHorizontalWordAt = function(idx) {
        var word = "";
        var sq = $scope.squares;
        var cols = $scope.cols;
        
        if(sq[idx].type === 'definition') return null;
        
        var i = idx;
        var max = (Math.floor(idx/cols)+1)*cols;
        while(i < max && sq[i].type === 'letter'){
          var letter = sq[i++].letter;
          word += (letter === '' ? '-' : letter);
        }

        return (word.length <= 1 ? null : word);
      };
      
      self.getVerticalWordAt = function(idx) {
        var word = "";
        var sq = $scope.squares;
        var rows = $scope.rows;
        var cols = $scope.cols;
        
        if(sq[idx].type === 'definition') return null;
        
        var i = idx;
        var max = cols*(rows-1) + idx%cols;
        while(i <= max && sq[i].type === 'letter'){
          var letter = sq[i].letter;
          word += (letter === '' ? '-' : letter);
          i += cols;
        }

        return (word.length <= 1 ? null : word);
      };
      
      self.updateDefinitionIndex = function(def) {
        var cols = $scope.cols;
        
        if(def.orientation == 'horizontal'){
            if (def.startIdx % cols === 0){
                def.definitionIdx = def.startIdx - cols;
                def.orientation = 'horizontal-under';
            }else{
                def.definitionIdx = def.startIdx - 1;
            }
        }else if(def.orientation == 'vertical'){
            if (def.startIdx < cols){
                def.definitionIdx = def.startIdx - 1;
                def.orientation = 'vertical-right';
            }else{
                def.definitionIdx = def.startIdx - cols;
            }                
        }
      };
      
      self.exportToXML = function() {
        var allDefs = $scope.horizontalDefinitions.concat($scope.verticalDefinitions);

        var xml = '<grid colCount="' + $scope.cols  + '" rowCount="' + $scope.rows  + '">';

        angular.forEach(allDefs, function(def) {
          self.updateDefinitionIndex(def);
          xml += '<word idx="' + def.definitionIdx + '" definition="' + def.text + '" orientation="' + def.orientation + '" solution="' + def.solution + '"/>';
        });

        xml += '</grid>';
        
        $scope.gridXML = xml;
        return xml;
      };
      
      $scope.selectedIndex = -1;
      $scope.rows = 7;
      $scope.cols = 5;
      $scope.squares = self.initializeGrid($scope.rows, $scope.cols);
      
      $scope.$watch('rows', function() {
        $scope.squares = self.initializeGrid($scope.rows, $scope.cols);
      });
      $scope.$watch('cols', function() {
        $scope.squares = self.initializeGrid($scope.rows, $scope.cols);
      });
    });