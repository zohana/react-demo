import React, {Component} from 'react';

import './Person.css';

class Person extends Component {
    componentWillMount(){
        console.log('[Person.js] inside componentWillMount');            
    }

    componentDidMount(){
        console.log('[Person.js] inside componentDidMount');            
    }

    render(){
        console.log('[Person.js] inside render');
        
        return (
            <div className="Person">
                <p onClick={this.props.click}>I'm {this.props.name} and I am {this.props.age} years old!</p>
                <p>{this.props.children}</p>
                <input type="text" onChange={this.props.changed} value={this.props.name} />
            </div>
        )
    }
};

export default Person;