import React, { Component } from 'react';
import './App.css';
import Person from './Person/Person';
import Validation from './Validation/Validation';
import Char from './Char/Char';
import ErrorBoundry from './ErrorBoundry/ErrorBoundry';

class App extends Component {
  state = {
    userInput: '',
    persons: [
      { id: 'dsd1', name: 'Max', age: 28 },
      { id: 'dsd2', name: 'Manu', age: 29 },
      { id: 'dsd3', name: 'Stephanie', age: 26 }
    ],
    otherState: 'some other value',
    showPersons: false
  }

  inputChangedHandler = (event) =>{
    this.setState({
      userInput: event.target.value
    });
  }

  /* switchNameHandler = ( newName ) => {
    // console.log('Was clicked!');
    // DON'T DO THIS: this.state.persons[0].name = 'Maximilian';
    this.setState( {
      persons: [
        { name: newName, age: 28 },
        { name: 'Manu', age: 29 },
        { name: 'Stephanie', age: 27 }
      ]
    } )
  } */

  deletePerson =(personIndex) =>{
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

  deleteCharacterHandler = (index) =>{
    const text = this.state.userInput.split('');
    text.splice(index,1);
    const updatedText = text.join('');
    this.setState({
      userInput: updatedText
    })
  }

  render () {
    const style = {
      backgroundColor: 'white',
      font: 'inherit',
      border: '1px solid blue',
      padding: '8px',
      cursor: 'pointer'
    };

    let persons = null;
    /* if statement */
    if ( this.state.showPersons ) {
      persons = (
        
        <div>
          {/* For statement --> use map */}
          {this.state.persons.map((person, index) =>{
              return <ErrorBoundry key={person.id}>
                  <Person 
                      click={() => this.deletePerson(index)}
                      name= {person.name}
                      age = {person.age}                        
                      changed = {(event) => this.nameChangedHandler(event, person.id)}
                    />
                </ ErrorBoundry>
            })
          }
          {/* <Person
            name={this.state.persons[0].name}
            age={this.state.persons[0].age} />
          <Person
            name={this.state.persons[1].name}
            age={this.state.persons[1].age}
            click={this.switchNameHandler.bind( this, 'Max!' )}
            changed={this.nameChangedHandler} >My Hobbies: Racing</Person>
          <Person
            name={this.state.persons[2].name}
            age={this.state.persons[2].age} /> */}
        </div>
      );
    }

    const charList = this.state.userInput.split('').map((char, index) =>{
        return (
          <Char 
            character={char} 
            key={index} 
            clicked ={() => this.deleteCharacterHandler(index)}
          />
        )
    });

    return (
      
      <div className="App">
        <h1>Hi, I'm a React App</h1>
        <p>This is really working!</p>
        <button
          style={style}
          onClick={this.togglePersonsHandler}>Toggle Persons</button>
        {persons}

        <hr/>
        <h3>Input field and display the value below</h3>
        <input type="text" 
          onChange={this.inputChangedHandler}
          value ={this.state.userInput}/>

        <Validation 
          inputLength = {this.state.userInput.length}
        />
        <p>{this.state.userInput}</p>

        {charList}
        

      </div>
    );
    // return React.createElement('div', {className: 'App'}, React.createElement('h1', null, 'Does this work now?'));
  }
}

export default App;
