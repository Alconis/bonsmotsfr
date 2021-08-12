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
        let sqContent;
        if(this.square.type === 'definition'){
            sqContent = this.square.definitions.map((definition, index) => {
                return (
                    <div className={"def " + definition.orientation} key={index}>
                        {definition.text}
                    </div>
                )
            });

            if(this.square.definitions.length > 1){
                const firstDefType = this.square.definitions[0].orientation;
                if(firstDefType === 'vertical' || firstDefType === 'horizontal-under'){
                    sqContent.reverse();
                }
            }

        }else{
            sqContent = this.square.letter;
        }

        let sqClasses = this.props.className + " ";
        sqClasses += this.square.type + " ";
        sqClasses += this.square.arrowsClasses;

        return (
            <div className={"square " + sqClasses} onClick={this.onClick}>
                {sqContent}
            </div>
        );
    }
}

export default Square;