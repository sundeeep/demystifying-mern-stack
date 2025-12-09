import { Component } from "react";

class TimerApp extends Component{
    constructor(){
        super();
        this.state = {
            seconds: 0,
            intervalId: null,
            username: "Sundeeep Dasari",
            isLoading: true,
            error: "",
            data:[],
            isDataEmpty: false
        }
    }

    componentDidMount(){
        console.log("Component Mounted Successfully!")

        this.intervalId = setInterval(function(){
            this.setState({seconds: this.state.seconds + 1})
        }.bind(this), 1000)
    }

    componentDidUpdate(prevProps, prevState){
        if(prevState.isLoading !== this.state.isLoading){
            
        }
        if(prevState.isDataEmpty !== this.state.isDataEmpty){

        }
    }



    componentWillUnmount(){
        // Cleanup
        clearInterval(this.intervalId);
    }


    render() {
        return(
            <>
                <h1>Timer Starts: {this.state.seconds}</h1>
                {this.state.isLoading && <p>Loading...</p>}
                {this.state.isDataEmpty && <p>Data is Empty</p>}
            </>
        )
    }
}

export default TimerApp;