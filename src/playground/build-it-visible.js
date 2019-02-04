class VisibilityToggle extends React.Component{
  constructor(props){
    super(props);
    this.handleToggleVisibility = this.handleToggleVisibility.bind(this);
    this.state = {
      visibility: false
    };
  }

  handleToggleVisibility(){
    this.setState((prvState)=>{
      return{
        visibility: !prvState.visibility
      };
    });
  }

  render(){
    return(
      <div>
        <h1>Toggle Visibility</h1>
        <button onClick={this.handleToggleVisibility}>
          {
            this.state.visibility ? 'Hide Details' : 'Show Details'
          }
        </button>
        {
          this.state.visibility && <p>Here I am the details</p>
        }
      </div>
    );
  }
}

ReactDOM.render(<VisibilityToggle/>, document.getElementById('app'));
