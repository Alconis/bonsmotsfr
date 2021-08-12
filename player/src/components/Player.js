import {Component} from "react";
import "./Player.css";
import Square from "./Square";
import Grid from "../models/Grid";
import Keyboard from "./Keyboard";

class Player extends Component {
    constructor(props) {
        super(props);

        /**
         * @type {Grid}
         */
        this.grid = null;

        this.state = {
            selectedIndex : props.selectedIndex ?? 0,
            typingDirection: 'right',
            gridFull: false,
            gridValid: false,

            showKeyboard: this.isTouchDevice()
        };

        if(props.grid){
            this.grid = props.grid;
            this.state = {
                ...this.state,
                rows: this.grid.rows,
                cols: this.grid.cols,
                squares: this.grid.squares
            }
        }

        if(props.gridId){
            this.loadGrid(props.gridId);
        }
    }

    isTouchDevice = () => {
        return (('ontouchstart' in window) ||
            (navigator.maxTouchPoints > 0) ||
            (navigator.msMaxTouchPoints > 0));
    }

    loadGrid = (gridId) => {
        const apiURL = 'https://bonsmots.fr/services/grid.php';
        fetch(apiURL + '?action=get&id=' + gridId)
            .then((response) => {
                return response.text();
            })
            .then(gridJSONString => {
                this.grid = new Grid();
                this.grid.initializeFromXML(atob(gridJSONString));
                this.setState({
                    rows: this.grid.rows,
                    cols: this.grid.cols,
                    squares: this.grid.squares
                });
            })
            .catch((error) => {
                console.error('Error: ' + error);
            })
    }

    onSquareClick = (idx, event) => {
        if(this.state.selectedIndex === idx){
            this.changeTypingDirection();
        }
        this.setSelectedIndex(idx);
    }

    onGridKeyDown = (event) => {
        let keyCode;

        if(event.which !== null) keyCode = event.which;
        else if(event.keyCode !== null) keyCode = event.keyCode;

        let square = this.state.squares[this.state.selectedIndex];

        if (square.type === 'letter' && keyCode > 64 && keyCode < 91){
            const strCaps = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";
            const letter = strCaps.charAt(keyCode - 65);
            this.changeSquareLetter(letter, square);
            this.checkGrid();
            this.selectNextSquare();
        }else if(keyCode === 32 /* space */ || keyCode === 46 /* delete */ || keyCode === 8 /* backspace */){
            if(square.type === 'letter') {
                this.changeSquareLetter("", square);
                this.checkGrid();
            }
            event.preventDefault();
        }else if(keyCode === 38 /* up arrow */) {
            this.setSelectedIndex(Math.max(this.state.selectedIndex - this.state.cols, this.state.selectedIndex % this.state.cols));
            event.preventDefault();
        }else if(keyCode === 40 /* down arrow */) {
            this.setSelectedIndex(Math.min(this.state.selectedIndex + this.state.cols, this.state.cols*(this.state.rows-1) + this.state.selectedIndex % this.state.cols));
            event.preventDefault();
        }else if(keyCode === 37 /* left arrow */) {
            this.setSelectedIndex(Math.max(this.state.selectedIndex-1, 0));
            event.preventDefault();
        }else if(keyCode === 39 /* right arrow */) {
            this.setSelectedIndex(Math.min(this.state.selectedIndex+1, this.state.cols*this.state.rows-1));
            event.preventDefault();
        }else if(keyCode === 17 /* ctrl */) {
            this.changeTypingDirection();
            event.preventDefault();
        }
    }

    onKeyboardKey = (key) => {
        let letter = key;
        if(key === 'delete'){
            letter = "";
        }
        this.changeSquareLetter(letter);
        this.checkGrid();
        this.selectNextSquare();
    }

    changeSquareLetter = (letter, square) => {
        if(undefined === square){
            square = this.state.squares[this.state.selectedIndex];
        }
        if(square.type === 'letter' && ((-1 !== "ABCDFEGHIJKLMNOPQRSTUVWXYZ".indexOf(letter)) || (letter === ""))){
            square.letter = letter;
        }
    }

    changeTypingDirection = (direction) => {
        let newDir = direction ?? (this.state.typingDirection === 'right' ? 'down' : 'right');
        this.setState({typingDirection: newDir});
    }

    selectNextSquare = () => {
        const tdir = this.state.typingDirection,
            idx = this.state.selectedIndex,
            squares = this.state.squares,
            cols = this.state.cols,
            max = this.state.rows * cols;
        let i = 0;

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

        this.setSelectedIndex(i);
        return i;
    }

    checkGrid = () => {
        const gridIsFull = this.grid.isFull();
        let gridIsValid = false;
        if(gridIsFull) {
            gridIsValid=this.grid.isValid();
        }
        this.setState({
            gridFull: gridIsFull,
            gridValid: gridIsValid
        });
    }

    setSelectedIndex = (i) => {
        this.setState({selectedIndex : i});
    }

    renderGrid = () => {
        let gridRows = [];
        let gridCursor = 0;
        for (let row = 0; row < this.state.rows; row++){
            let rowItems = [];

            for (let col = 0; col < this.state.cols; col++){
                const sq = this.state.squares[gridCursor];

                let sqClasses = (this.state.selectedIndex === sq.idx) ? 'selected direction-' +  this.state.typingDirection : '';

                rowItems.push((
                    <Square className={sqClasses} key={sq.idx} square={sq} onClick={this.onSquareClick}/>
                ));

                gridCursor++;
            }

            gridRows.push((
                <div className="gridRow" key={row}>{rowItems}</div>
            ));
        }
        return gridRows;
    }

    render() {
        return (
            <div className="player">
                <div className="grid" tabIndex="-1" onKeyDown={this.onGridKeyDown}>
                    {this.renderGrid()}
                </div>
                <Keyboard visible={this.state.showKeyboard} onKey={this.onKeyboardKey}/>
            </div>
        );
    }
}

export default Player;