const appRoot = document.getElementById('app');

class IndecisionApp extends React.Component{
  constructor(props){
    super(props);
    this.handlePick = this.handlePick.bind(this);
    this.handleDeleteAll = this.handleDeleteAll.bind(this);
    this.handleDeleteOption = this.handleDeleteOption.bind(this);
    this.handleAddOption = this.handleAddOption.bind(this);
    this.state = {
      options: []
    };
  }

  componentDidMount(){
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
  }

  componentWillUnmount(){
    console.log('Component is unmounted');
  }

  handleAddOption(option){
    if(!option){
      return 'Add a valid add to do option';
    }else if(this.state.options.indexOf(option) > -1){
      return 'Already existed add to do option';
    }
    this.setState((prvState)=>({ options: prvState.options.concat([option])}));
  }

  handleDeleteAll(){
    this.setState(()=>({options: []}));
  }

  handleDeleteOption(optionToRemove){
    this.setState((prvState)=>({
      options: prvState.options.filter((option)=> option !== optionToRemove)
    }));
  }

  handlePick(){
    const randomNum = Math.floor(Math.random() * this.state.options.length);
    alert(`To Do: ${this.state.options[randomNum]}`);
  }

  render(){
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
  }
}

const Header = (props) => {
  return(
    <div>
      <h1>{props.title}</h1>
      {props.subtitle && <h2>{props.subtitle}</h2>}
    </div>
  );
};

Header.defaultProps = {
  title: 'Indecision App'
};

const Action = (props) => {
  return(
    <div>
      <button
        onClick={props.handlePick}
        disabled={!props.hasOptions}
      >
        What should I do?
      </button>
    </div>
  );
};

const Options = (props) => {
  return(
    <div>
      <button onClick={props.handleDeleteAll}>Remove All</button>
      {props.options.length === 0 && <p>Enter Add To Do item to get started!</p>}
      {props.options.map((option)=>
        <Option
          key={option}
          optionText={option}
          handleDeleteOption={props.handleDeleteOption}
        />)
      }
    </div>
  );
};

const Option = (props) => {
  return(
    <div>
      {props.optionText}
      <button
        onClick={(e)=>{
          props.handleDeleteOption(props.optionText);
        }}
      >
        Remove
      </button>
    </div>
  );
};

class AddOption extends React.Component{

  constructor(props){
    super(props);
    this.handleAddOption = this.handleAddOption.bind(this);
    this.state = {
      error: undefined
    };
  }

  handleAddOption(e){
    e.preventDefault();
    const option = e.target.elements.option.value.trim();
    const error = this.props.handleAddOption(option);
    this.setState(()=>({ error }));
    if(!error){
      e.target.elements.option.value = '';
    }
  }

  render(){
    return(
      <div>
      {this.state.error && <p>{this.state.error}</p>}
      <form onSubmit={this.handleAddOption}>
        <input type="text" name="option"></input>
        <button>Add Option</button>
      </form>
    </div>
    );
  }
}

ReactDOM.render(<IndecisionApp />, appRoot);
