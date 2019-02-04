import React from 'react';

class AddSighting extends React.Component {

  bearTypeRef = React.createRef();
  notesRef = React.createRef();
  zipCodeRef = React.createRef();
  numBearsRef = React.createRef();
  
  state = {
    dataAddedMessage: false,
    failMessage: false
  }

  addSighting = (event) => {
    event.preventDefault();

    fetch("http://localhost:8080/sighting", {
      method: 'POST',
      headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/json',
      },
      body: JSON.stringify({
          bear_type: this.bearTypeRef.current.value,
          notes: this.notesRef.current.value,
          zip_code: this.zipCodeRef.current.value,
          num_bears: parseFloat(this.numBearsRef.current.value),
      })
    })
      .then(res => res.json())
      .then(
        (result) => {
          if(result.code === 201){
              let dataAddedMessage = {...this.state.dataAddedMessage};
              dataAddedMessage = true;
              this.setState({ dataAddedMessage });
              setTimeout(function() {this.setState({dataAddedMessage: false});}.bind(this), 3000);
            }
        },
        (error) => {
          let failMessage = {...this.state.failMessage};
          failMessage = true;
          this.setState({ failMessage });
          setTimeout(function() {this.setState({failMessage: false});}.bind(this), 3000);
        }
      )
    
    event.currentTarget.reset(); 
  }

  render (){
    return (
      <form onSubmit={this.addSighting} autoComplete="off">
        <label className="font-weight-bold">Add Sighting:</label>
        <div className="form-group">
          <label>Bear Type:</label>
          <input name="bearType" className="form-control" ref={this.bearTypeRef} type="text" placeholder="Bear Type" required maxlength="30" />
        </div>
        
        <div className="form-group">
          <label>Notes:</label>
          <textarea name="notes" className="form-control" ref={this.notesRef} placeholder="Notes" maxlength="200" />
        </div>

        <div className="form-group">
          <label>Zip Code:</label>
          <input name="zipCode" className="form-control"  ref={this.zipCodeRef} type="text" placeholder="Zip Code" required maxlength="5" />
        </div>

        <div className="form-group">
          <label>Number of Bears:</label>
          <input name="numBears" className="form-control" ref={this.numBearsRef} min="0" max="100" type="number" placeholder="Number of Bears" />
        </div>
        
        <button className="btn btn-primary" type="submit">Add Sighting</button>
        <br/>
        <br/>
        <div>{ this.state.dataAddedMessage ? <div className="alert alert-success">Sighting added!</div> : null }</div>
        <div>{ this.state.failMessage ? <div className="alert alert-danger">Sighting not added. Pleaset try again </div> : null }</div>
      </form>
    )
  }
}

export default AddSighting;