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
        sqClasses += this.square.type + " ";
        sqClasses += this.square.arrowsClasses + " ";

        let sqContent;
        if(this.square.type === 'definition'){
            sqContent = this.square.definitions.map((definition) => {
                return (
                    <div class={"def " + definition.orientation}>
                        {definition.text}
                    </div>
                )
            });
        }else{
            sqContent = this.square.letter;
        }

        return (
            <div className={"square player " + sqClasses} onClick={this.onClick}>
                {sqContent}
            </div>
        );
    }
}

export default Square;