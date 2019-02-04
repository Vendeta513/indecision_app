console.log('I\'m working fine');

const appRoot = document.getElementById("app");

const app = {
  title: 'Tidal wave',
  subtitle: 'Ako si Malakas',
  options: [],
  location: 'Cawayan'
};

function getLocation(location){
  if(location){
    return <p>Location: {location}</p>;
  }
}

const renderSubmit = (e) => {
  e.preventDefault();
  const option = e.target.elements.option.value;
  if(option){
    app.options.push(option);
    e.target.elements.option.value = '';
    counter();
  }
};

const counter = () => {
  const appTwo = (
    <div>
      <h1>{app.title ? app.title : 'Anonymous'}</h1>
      {(app.subtitle && app.subtitle != '') && <p>Subtitle: {app.subtitle}</p>}
      {getLocation(app.location)}
      <p>{(app.options.length > 0) ? 'Number of choices: ' : 'No choices'}</p>
      <button disabled={app.options.length === 0} onClick={onWhatToDo}>What to do next</button>
      <button onClick={removeAll}>Remove All</button>
      <p>To Do List</p>
      <ol>
        {
          app.options.map((list) => <li key={list}>{list}</li>)
        }
      </ol>
      <form onSubmit={renderSubmit}>
        <input type="text" name="option"></input>
        <button> Add To Do</button>
      </form>
    </div>
  );
  ReactDOM.render(appTwo, appRoot);
}

counter();

const removeAll = () => {
  app.options = [];
  counter();
};

const onWhatToDo = () => {
  const random = Math.floor(Math.random() * app.options.length);
  alert(app.options[random]);
  counter();
};
