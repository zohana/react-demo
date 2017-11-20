//It is used to wrap a component which might fail at the runtime which you can't prevent
// and then show custom error message 

import React, { Component } from 'react';

class ErrorBoundry extends Component{
    state ={
        hasError: false,
        errorMessage: ''
    }

    componentDidCatch = (error, info) => {
        this.setState({ hasError: true, errorMessage:error});
    }

    render(){
        if(this.state.hasError){
            return <h1>{this.state.errorMessage}</h1>
        }else{
            return this.props.children;
        }
    }
}

export default ErrorBoundry;