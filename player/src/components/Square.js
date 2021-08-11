import {Component} from "react";

class Square extends Component {
    constructor(props) {
        super(props);

        this.square = props.square;
    }

    onClick = (event) => {
        this.props.onClick(this.square.idx, event);
    }

    render() {
        let sqClasses = this.props.className + " ";
        sqClasses += this.square.type;
        sqClasses += this.square.arrowsClasses + " ";

        return (
            <div className={"square player " + sqClasses} onClick={this.onClick}>
                {this.square.type === 'definition' ? this.square.definitions.length : this.square.letter}
            </div>);
    }
}

export default Square;