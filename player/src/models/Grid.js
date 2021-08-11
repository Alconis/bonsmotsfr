class Grid {
    constructor() {
        this.rows = -1;
        this.cols = -1;
        this.squares = [];
        this.horizontalDefinitions = [];
        this.verticalDefinitions = [];
        this.gridXML = '';
        this.gridJSON = '';
    }

    initializeBlankGrid = (rows, cols) => {
        this.rows = rows;
        this.cols = cols;

        let i = 0;
        const max = rows * cols;

        while(i < max){

            let square = {
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
    }

    initializeFromJSON = (json) => {
        let obj=json;
        if (typeof json === "string"){
            obj=JSON.parse(json);
        }

        this.initializeBlankGrid(obj.rowCount, obj.colCount);
        obj.definitions.forEach((definition, index) => {
            let sq = this.squares[definition.idx];
            sq.type = 'definition';
            sq.definitions.push({
                text: definition.definition,
                orientation: definition.orientation,
                solution: definition.solution
            });
            sq.arrowsClasses += ' arrow-' + definition.orientation;

            let defIdx = definition.idx;
            let defOrientation = definition.orientation;
            let defSolution = definition.solution;
            let startIdx;
            let endIdx;
            let idxIncr;

            if (defOrientation === 'horizontal'){
                idxIncr = 1;
                startIdx = defIdx + 1;
            }else if (defOrientation === 'horizontal-under'){
                idxIncr = 1;
                startIdx = defIdx + this.cols;
            }else if (defOrientation === 'vertical'){
                idxIncr = this.cols;
                startIdx = defIdx + this.cols;
            }else if (defOrientation === 'vertical-right'){
                idxIncr = this.cols;
                startIdx = defIdx + 1;
            }

            let j = 0;
            endIdx = startIdx + ((defSolution.length-1) * idxIncr);
            for(let i = startIdx; i <= endIdx; i += idxIncr){
                this.squares[i].solution = defSolution.charAt(j++);
            }
        });

        return true;
    }

    initializeFromXML = (xmlString) => {
        let gridJSON = {
            rowCount : 0,
            colCount : 0,
            definitions: []
        };

        const parser = new DOMParser();
        const doc = parser.parseFromString(xmlString, 'application/xml');

        console.log(doc);

        const rootNode = doc.getElementsByTagName('grid').item(0);
        const rowCount = rootNode.getAttribute("rowCount");
        const colCount = rootNode.getAttribute("colCount");

        gridJSON.rowCount = parseInt(rowCount);
        gridJSON.colCount = parseInt(colCount);

        const words = rootNode.getElementsByTagName('word');
        for (let i = 0; i < words.length; i++){
            const word = words.item(i);
            const idx = word.getAttribute('idx');
            const definition = word.getAttribute('definition');
            const orientation = word.getAttribute('orientation');
            const solution = word.getAttribute('solution');

            gridJSON.definitions.push({
                idx : parseInt(idx),
                definition: definition,
                orientation: orientation,
                solution: solution
            });
        }

        this.initializeFromJSON(gridJSON);
    }

    getHorizontalDefinitions = () => {
        let defs = [];
        let rows = this.rows;
        let cols = this.cols;

        let i = 0;
        let max = rows*cols;
        while(i < max) {
            let word = this.getHorizontalWordAt(i);
            if(word !== null) {
                let def = {
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
    }

    getVerticalDefinitions = () => {
        let defs = [];
        let rows = this.rows;
        let cols = this.cols;

        let col;
        let max = rows*cols;
        for(col = 0; col < cols; col++) {
            let i = col;
            while(i < max) {
                let word = this.getVerticalWordAt(i);
                if(word !== null) {
                    let def = {
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
    }

    getHorizontalWordAt = (idx) => {
        let word = "";
        let sq = this.squares;
        let cols = this.cols;

        if(sq[idx].type === 'definition') return null;

        let i = idx;
        let max = (Math.floor(idx/cols)+1)*cols;
        while(i < max && sq[i].type === 'letter'){
            let letter = sq[i++].letter;
            word += (letter === '' ? '-' : letter);
        }

        return (word.length <= 1 ? null : word);
    }

    getVerticalWordAt = (idx) => {
        let word = "";
        let sq = this.squares;
        let rows = this.rows;
        let cols = this.cols;

        if(sq[idx].type === 'definition') return null;

        let i = idx;
        let max = cols*(rows-1) + idx%cols;
        while(i <= max && sq[i].type === 'letter'){
            let letter = sq[i].letter;
            word += (letter === '' ? '-' : letter);
            i += cols;
        }

        return (word.length <= 1 ? null : word);
    }

    updateDefinitionIndex = (def) => {
        let cols = this.cols;

        if(def.orientation === 'horizontal'){
            if (def.startIdx % cols === 0){
                def.definitionIdx = def.startIdx - cols;
                def.orientation = 'horizontal-under';
            }else{
                def.definitionIdx = def.startIdx - 1;
            }
        }else if(def.orientation === 'vertical'){
            if (def.startIdx < cols){
                def.definitionIdx = def.startIdx - 1;
                def.orientation = 'vertical-right';
            }else{
                def.definitionIdx = def.startIdx - cols;
            }
        }
    }

    isValid = () => {
        let allValid = true;

        for(let sq of this.squares){
            if (sq.type === 'letter' && sq.letter !== sq.solution) {
                allValid = false;
                break;
            }
        }

        return allValid;
    }

    isFull = () => {
        let isFull = true;

        for(let sq of this.squares){
            if (sq.type === 'letter' && sq.letter === "") {
                isFull = false;
                break;
            }
        }

        return isFull;
    }

    exportToJSON = () => {
        let allDefs = this.horizontalDefinitions.concat(this.verticalDefinitions);

        let json = {
            colCount : this.cols,
            rowCount : this.rows
        }

        json.definitions = allDefs.map((def) => {
            this.updateDefinitionIndex(def);

            return {
                idx : def.definitionIdx,
                definition: def.text,
                orientation: def.orientation,
                solution: def.solution
            };
        });

        for(let sq of this.squares){
            if(sq.type === 'definition') {
                let found = false;
                let i;
                for(i = 0; i < allDefs.length; i++) {
                    let def = allDefs[i];
                    if(def.definitionIdx === sq.idx) {
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
        }

        this.gridJSON = JSON.stringify(json, null, 2);
        return this.gridJSON;
    }
}

export default Grid;