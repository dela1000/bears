import React from 'react';

class SearchById extends React.Component {

  idRef = React.createRef();

  searchbyId = (event) => {
    event.preventDefault();
    
    const idData = {
      id: parseInt(this.idRef.current.value),
    };

    this.props.searchbyId(idData);
    
    event.currentTarget.reset(); 
  }

  render (){
    return (
      <form onSubmit={this.searchbyId} autoComplete="off">
        <div className="form-group">
          <input name="numBears" className="form-control" ref={this.idRef} min="1" type="number" placeholder="Id" />
        </div>
        <button className="btn btn-primary" type="submit">Search By Id</button>
      </form>
    )
  }
}

export default SearchById;