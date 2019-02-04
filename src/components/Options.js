import React from 'react';
import Option from './Option';

const Options = (props) => (
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

export { Options as default };
