import React from 'react';

class Search extends React.Component {

  state = {
    startDate: null,
    endDate: null,
    bear_type: null,
    zip_code: null,
    sort: "false"
  }
  
  updateParams = (event) => {
    this.setState({[event.target.name]: event.target.value});
  }

  searchSighting = (event) => {
    event.preventDefault();
    
    const searchData = {
      startDate: this.state.startDate,
      endDate: this.state.endDate,
      bear_type: this.state.bear_type,
      zip_code: this.state.zip_code,
      sort: this.state.sort
    };
    
    this.props.searchSighting(searchData); 
  }

  render (){
    return (
      <form onSubmit={this.searchSighting} className="mt-4">
        <label className="font-weight-bold">Search Specific Sightings:</label>
        <div className="form-group">
          <label>Start Date:</label>
          <input className="form-control" name="startDate" type="date" onChange={this.updateParams}/>
        </div>
        <div className="form-group">
          <label>End Date:</label>
          <input className="form-control" name="endDate" type="date" onChange={this.updateParams}/>
        </div>
        <div className="form-group">
          <label>Bear Type:</label>
          <input className="form-control" name="bear_type" type="text" placeholder="Bear Type" onChange={this.updateParams} />
        </div>

        <div className="form-group">
          <label>Zip Code:</label>
          <input className="form-control" name="zip_code" type="text" placeholder="Zip Code" onChange={this.updateParams} />
        </div>
        <div className="form-group">
          <label>
            Sort by Number of Bears:
          </label>
            <select className="form-control" name="sort" value={this.state.sort} onChange={this.updateParams} >
            <option value="true">Yes</option>
            <option value="false">No</option>
          </select>
        </div>

        
        <button className="btn btn-primary" type="submit">Search Sightings</button>
      </form>
    )
  }
}

export default Search;