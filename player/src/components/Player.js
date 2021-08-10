import {Component} from "react";
import "./Player.css";

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
    };

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
            <div className="grid">
                {
                    this.state.squares.map((sq, index) => {
                        let sqClasses = "square player " + sq.arrowsClasses;
                        sqClasses += (sq.idx % this.state.cols === 0) ? ' wrap' : '';
                        sqClasses += (sq.type === 'definition') ? ' definition' : '';
                        sqClasses += (sq.idx === this.state.selectedIndex) ? ' selected' : '';

                        return <div className={sqClasses} key={sq.idx} onClick={(event) => this.onSquareClick(sq.idx, event)}>
                            {sq.type === 'definition' ? sq.definitions.length : sq.letter}
                        </div>
                    })
                }
            </div>
        );
    }
}

export default Player;