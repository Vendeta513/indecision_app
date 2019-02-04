import React from 'react';
import Header from './Header';
import Action from './Action';
import Options from './Options';
import AddOption from './AddOption';

class IndecisionApp extends React.Component{
  state = {
    options: []
  }

  handleAddOption = (option) => {
    if(!option){
      return 'Add a valid add to do option';
    }else if(this.state.options.indexOf(option) > -1){
      return 'Already existed add to do option';
    }
    this.setState((prvState)=>({ options: prvState.options.concat([option])}));
  };

  handleDeleteAll = () => {
    this.setState(()=>({options: []}));
  };

  handleDeleteOption = (optionToRemove) => {
    this.setState((prvState)=>({
      options: prvState.options.filter((option)=> option !== optionToRemove)
    }));
  };

  handlePick = () => {
    const randomNum = Math.floor(Math.random() * this.state.options.length);
    alert(`To Do: ${this.state.options[randomNum]}`);
  };

  render = () => {
    const subtitle = 'Put your life at the hands of the computer';
    return(
      <div>
        <Header subtitle={subtitle}/>
        <Action
          handlePick={this.handlePick}
          hasOptions={this.state.options.length > 0}
        />
        <Options
          options={this.state.options}
          handleDeleteAll={this.handleDeleteAll}
          handleDeleteOption={this.handleDeleteOption}
        />
        <AddOption handleAddOption={this.handleAddOption}/>
      </div>
    );
  };

  componentDidMount() {
    try {
      const json = localStorage.getItem('options');
      const options = JSON.parse(json);
      if(options){
        this.setState(()=>({ options }));
      }
    } catch (e) {
      //Do nothing
    }
  }

  componentDidUpdate(prvProps, prvState){
    if(prvState.options.length !== this.state.options.length){
      const json = JSON.stringify(this.state.options);
      localStorage.setItem('options', json);
    }
  };

  componentWillUnmount(){
    console.log('Component is unmounted');
  }
}

export { IndecisionApp as default };
