import React, { Component } from 'react';


class Form extends Component {
  render() {
    return (
      <div className="form">
      <input type="text" />
      <button type="Submit" onClick={() => this.props.onSubmit()} >Submit</button>
      </div>
    );
  }
}


export default Form;
