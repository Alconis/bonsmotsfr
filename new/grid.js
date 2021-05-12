var grid = function() {
    this.rows = -1;
    this.cols = -1;
    this.squares = [];
    this.horizontalDefinitions = [];
    this.verticalDefinitions = [];
    this.gridXML = '';
    this.gridJSON = '';
};

grid.prototype.initializeBlankGrid = function(rows, cols) {
    this.rows = rows;
    this.cols = cols;

    var i = 0;
    var max = rows * cols;

    while(i < max){

        var square = {
            idx : i,
            type : 'letter',
            definitions : [],
            letter : '',
            solution: '',
            arrowsClasses: ''
        };

        if ((i < cols) && (i % 2) === 0){
            square.type = 'definition';
        }else if(i % (cols * 2) === 0){
            square.type = 'definition';
        }

        this.squares[i++] = square;
    }

    return this.squares;
};

grid.prototype.initializeFromJson = function(json) {
    var obj = angular.fromJson(json);

    this.initializeBlankGrid(obj.rowCount, obj.colCount);

    angular.forEach(obj.definitions, function(definition) {
        var sq = this.squares[definition.idx];
        sq.type = 'definition';
        sq.definitions.push({
            text: definition.definition,
            orientation: definition.orientation,
            solution: definition.solution
        });
        sq.arrowsClasses += ' arrow-' + definition.orientation;

        var defIdx = definition.idx;
        var defOrientation = definition.orientation;
        var defSolution = definition.solution;
        var startIdx;
        var endIdx;
        var idxIncr;

        if (defOrientation == 'horizontal'){
            idxIncr = 1;
            startIdx = defIdx + 1;
        }else if (defOrientation == 'horizontal-under'){
            idxIncr = 1;
            startIdx = defIdx + this.cols;
        }else if (defOrientation == 'vertical'){
            idxIncr = this.cols;
            startIdx = defIdx + this.cols;
        }else if (defOrientation == 'vertical-right'){
            idxIncr = this.cols;
            startIdx = defIdx + 1;
        }

        var j = 0;
        endIdx = startIdx + ((defSolution.length-1) * idxIncr);
        for(i = startIdx; i <= endIdx; i += idxIncr){
            this.squares[i].solution = defSolution.charAt(j++);
        }
    }.bind(this));

    return true;
};

grid.prototype.getHorizontalDefinitions = function() {
    var defs = [];
    var sq = this.squares;
    var rows = this.rows;
    var cols = this.cols;

    var i = 0;
    var max = rows*cols;
    while(i < max) {
        var word = this.getHorizontalWordAt(i);
        if(word !== null) {
            var def = {
                startIdx : i,
                definitionIdx : -1,
                text : "",
                orientation : 'horizontal',
                solution : word
            };
            defs.push(def);
            i += word.length;
        }else{
            i++;
        }
    }

    this.horizontalDefinitions = defs;
    return this.horizontalDefinitions;
};

grid.prototype.getVerticalDefinitions = function() {
    var defs = [];
    var sq = this.squares;
    var rows = this.rows;
    var cols = this.cols;

    var col;
    var max = rows*cols;
    for(col = 0; col < cols; col++) {
        var i = col;
        while(i < max) {
            var word = this.getVerticalWordAt(i);
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

    this.verticalDefinitions = defs;
    return this.verticalDefinitions;
};

grid.prototype.getHorizontalWordAt = function(idx) {
    var word = "";
    var sq = this.squares;
    var cols = this.cols;

    if(sq[idx].type === 'definition') return null;

    var i = idx;
    var max = (Math.floor(idx/cols)+1)*cols;
    while(i < max && sq[i].type === 'letter'){
        var letter = sq[i++].letter;
        word += (letter === '' ? '-' : letter);
    }

    return (word.length <= 1 ? null : word);
};

grid.prototype.getVerticalWordAt = function(idx) {
    var word = "";
    var sq = this.squares;
    var rows = this.rows;
    var cols = this.cols;

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

grid.prototype.updateDefinitionIndex = function(def) {
    var cols = this.cols;

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

grid.prototype.isValid = function() {
    var allValid = true;
    var sq;

    angular.forEach(this.squares, function(sq) {
        if (sq.type === 'letter' && sq.letter != sq.solution) {
            allValid = false;
            return;
        }
    });

    return allValid;
};

grid.prototype.isFull = function() {
    var isFull = true;
    var sq;

    angular.forEach(this.squares, function(sq) {
        if (sq.type ===  'letter' && sq.letter === ""){
            isFull = false;
            return;
        }
    });

    return isFull;
};

grid.prototype.exportToXML = function() {
    var allDefs = this.horizontalDefinitions.concat(this.verticalDefinitions);

    var xml = '<grid colCount="' + this.cols  + '" rowCount="' + this.rows  + '">\n';

    angular.forEach(allDefs, function(def) {
        this.updateDefinitionIndex(def);
        xml += '\t<word idx="' + def.definitionIdx + '" definition="' + def.text + '" orientation="' + def.orientation + '" solution="' + def.solution + '"/>\n';
    }.bind(this));

    xml += '</grid>';

    this.gridXML = xml;
    return this.gridXML;
};

grid.prototype.exportToJSON = function() {
    var allDefs = this.horizontalDefinitions.concat(this.verticalDefinitions);

    var json = {
        colCount : this.cols,
        rowCount : this.rows,
        definitions : []
    };

    angular.forEach(allDefs, function(def) {
        this.updateDefinitionIndex(def);

        json.definitions.push({
            idx : def.definitionIdx,
            definition: def.text,
            orientation: def.orientation,
            solution: def.solution
        });
    }.bind(this));

    angular.forEach(this.squares, function(sq) {
        if(sq.type === 'definition') {
            var found = false;
            var i;
            for(i = 0; i < allDefs.length; i++) {
                var def = allDefs[i];
                if(def.definitionIdx == sq.idx) {
                    found = true;
                    break;
                }
            }

            if(!found) {
                json.definitions.push({
                    idx : sq.idx,
                    definition: '',
                    orientation:'none',
                    solution: ''
                });
            }
        }
    });

    this.gridJSON = angular.toJson(json, true);
    return this.gridJSON;
};