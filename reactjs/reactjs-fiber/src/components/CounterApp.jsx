// React components has : state, props
import {Component} from "react";

class CounterApp extends Component {
    constructor(props){
        super();
        this.state = {
            count: 0,
            username: props.username
        }
    }
    
    render() { // returns JSX Expression
        console.log(this.state);
        return(
            <div>
                <h2>Count: {this.state.count}</h2>
                <button onClick={() => (this.setState({count: this.state.count + 1}))}>
                    Add
                </button>
            </div>
        )
    }
}

export default CounterApp;