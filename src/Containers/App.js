import React, { Component } from 'react';
import './App.css';

import Persons from '../Components/Persons/Persons';
import Cockpit from '../Components/Cockpit/Cockpit';

class App extends Component {
  constructor(props){
    super(props);
    console.log('[App.js] inside constructor', props)
  }

  componentWillMount(){
    console.log('[App.js] inside componentWillMount');    
  }

  componentDidMount(){
    console.log('[App.js] inside componentDidMount');       
  }

  state = {
    //userInput: '',
    persons: [
      { id: 'dsd1', name: 'Max', age: 28 },
      { id: 'dsd2', name: 'Manu', age: 29 },
      { id: 'dsd3', name: 'Stephanie', age: 26 }
    ],
    otherState: 'some other value',
    showPersons: false
  }

  deletePersonHandler =(personIndex) =>{
    //const persons = this.state.persons;   //this is mutating the original list. So instead use: the method below
    //const persons = this.state.persons.slice(); // this is a pure js way. We could use 'SPREAD' operator from ES6 which react understands
    const persons = [...this.state.persons]; //this will make a copy of the original state objects and not mutate the original ones.
    persons.splice(personIndex, 1);
    this.setState({persons: persons});

  }

  nameChangedHandler = ( event, id ) => {
    //we are checking if the event that we clicked is on the id of the passed id
    const personIndex = this.state.persons.findIndex(p =>{
      return p.id === id;
    });
    //use SPREAD operator in objects to pervent mutating the original objects
    const person = {...this.state.persons[personIndex]};
    //alernative way to do so is using vanilla js function object.assign() :
    //in object assign function pass an empty object and then the object we want to assign properties with as the second argument.    
    //const person = Object.assign({},this.state.persons[personIndex]);
    person.name = event.target.value;
    const persons = [...this.state.persons];
    persons[personIndex] = person;
    this.setState({ persons: persons });
  }

  togglePersonsHandler = () => {
    const doesShow = this.state.showPersons;
    this.setState( { showPersons: !doesShow } );
  }

  render () {  
    console.log('[App.js] inside render');
    
    let persons = null;
    /* if statement */
    if ( this.state.showPersons ) {
      persons = 
          <Persons 
            persons={this.state.persons}
            clicked={this.deletePersonHandler}
            changed={this.nameChangedHandler}
          />         
    }
    return (      
      <div className="App">       
        <Cockpit 
          appTitle = {this.props.title}
          showPersons = {this.state.showPersons}
          persons = {this.state.persons}
          clicked = {this.togglePersonsHandler}
          />        
        {persons}
      </div>
    );
    // return React.createElement('div', {className: 'App'}, React.createElement('h1', null, 'Does this work now?'));
  }
}

export default App;
