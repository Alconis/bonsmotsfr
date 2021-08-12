import {Component} from "react";
import "./Keyboard.css";

class Keyboard extends Component {
    constructor(props) {
        super(props);

        this.keys = [
            { key: 'A', label: 'A'},
            { key: 'Z', label: 'Z'},
            { key: 'E', label: 'E'},
            { key: 'R', label: 'R'},
            { key: 'T', label: 'T'},
            { key: 'Y', label: 'Y'},
            { key: 'U', label: 'U'},
            { key: 'I', label: 'I'},
            { key: 'O', label: 'O'},
            { key: 'P', label: 'P'},
            { key: 'Q', label: 'Q'},
            { key: 'S', label: 'S'},
            { key: 'D', label: 'D'},
            { key: 'F', label: 'F'},
            { key: 'G', label: 'G'},
            { key: 'H', label: 'H'},
            { key: 'J', label: 'J'},
            { key: 'K', label: 'K'},
            { key: 'L', label: 'L'},
            { key: 'M', label: 'M'},
            { key: 'W', label: 'W'},
            { key: 'X', label: 'X'},
            { key: 'C', label: 'C'},
            { key: 'V', label: 'V'},
            { key: 'B', label: 'B'},
            { key: 'N', label: 'N'},
            { key: 'delete', label: '✖'},
        ];

        this.state = {
            visible : props.visible ?? true
        }
    }

    onKeyClick = (key, event) => {
        this.props.onKey(key);
    }

    render() {
        if(this.props.visible)
            return (
                <div id="keyboard" className="keyboard">
                    <div className="keys">
                        {this.keys.map((key) => {
                            return (
                                <button type="button" className={"key key-" + key.key}
                                        key={key.key}
                                        onClick={(e) => this.onKeyClick(key.key, e)}>
                                    {key.label}
                                </button>
                            )
                        })}
                    </div>
                </div>
            )
        else return (null);
    }
}

export default Keyboard;