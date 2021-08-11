import {Component} from "react";
import "./Player.css";
import Square from "./Square";

class Player extends Component {
    constructor(props) {
        super(props);

        /**
         * @type {Grid}
         */
        this.grid = props.grid;

        this.typingDirection = 'right';

        this.state = {
            squareSize: props.squareSize ?? 80,
            selectedIndex : props.selectedIndex ?? 0,
            gridFull: false,
            gridValid: false,

            rows: this.grid.rows,
            cols: this.grid.cols,
            squares: this.grid.squares ?? []
        };
    }

    onSquareClick = (idx, event) => {
        this.setSelectedIndex(idx);
    }

    onGridKeyDown = (event) => {
        let keyCode;

        if(event.which !== null) keyCode = event.which;
        else if(event.keyCode !== null) keyCode = event.keyCode;

        let square = this.state.squares[this.state.selectedIndex];

        if (square.type === 'letter' && keyCode > 64 && keyCode < 91){
            const strCaps = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";
            square.letter = strCaps.charAt(keyCode - 65);
            this.checkGrid();
            this.selectNextSquare();
        }else if(keyCode === 32 /* space */ || keyCode === 46 /* delete */ || keyCode === 8 /* backspace */){
            if(square.type === 'letter') {
                square.letter = "";
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
            if(this.state.typingDirection === 'right') {
                this.setState({typingDirection : 'down'});
            }else{
                this.setState({typingDirection : 'right'});
            }
            event.preventDefault();
        }
    }

    selectNextSquare = () => {
        const tdir = this.typingDirection,
            idx = this.state.selectedIndex,
            squares = this.state.squares,
            cols = this.cols,
            max = this.rows * cols;
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

    render() {
        return (
            <div className="grid" tabIndex="-1" onKeyDown={this.onGridKeyDown}>
                {
                    this.state.squares.map((sq, index) => {
                        let sqClasses = (sq.idx % this.state.cols === 0) ? 'wrap ' : '';
                        sqClasses += (this.state.selectedIndex === sq.idx) ? 'selected' : '';

                        return <Square className={sqClasses} key={sq.idx} square={sq} onClick={this.onSquareClick}/>;
                    })
                }
            </div>
        );
    }
}

export default Player;