import React from 'react';
import _ from 'lodash';

import Header from './Header';
import AddSighting from './AddSighting';
import SearchById from './SearchById';
import Search from './Search';
import Results from './Results';

class App extends React.Component {

    state = {
      dataAddedMessage: false,
      noResultsFound: false,
      view: "add",
      bearSightings: []
    }

    changeView = (event) => {
      this.setState({view: event.target.value});
    }

    searchbyId = (idData) => {
      fetch("http://localhost:8080/sighting/" + idData.id)
        .then(res => res.json())
        .then(
          (result) => {
            if(result.code === 201){
                this.addResults(result)
              }
          },
          (error) => {
            this.noResultsFound();
          }
        )
    }

    searchSighting = (searchData) => {
      let searchString = "http://localhost:8080/sighting/?"

      _.forEach(searchData, (value, key) => {
        if(value){
          searchString = searchString + key + "=" + value + "&";
        }
      })
      searchString = searchString.slice(0, -1);

      fetch(searchString)
        .then(res => res.json())
        .then(
          (result) => {
            if(result.code === 201){
                this.addResults(result)
              }
          },
          (error) => {
            this.noResultsFound();
          }
        )
    }

    addResults = (result) =>{
      let bearSightings = {...this.state.bearSightings};
      bearSightings = result.sightings;
      this.setState({ bearSightings },  () => {
          if(this.state.bearSightings.length === 0){
            this.noResultsFound();
          }
      });
    }

    noResultsFound = () => {
      let noResultsFound = {...this.state.noResultsFound};
      noResultsFound = true;
      this.setState({ noResultsFound });
      setTimeout(function() {this.setState({noResultsFound: false});}.bind(this), 3000);
    }

    render() {
      return (
      <div className="row mt-4">
        <Header />
        <div className="col-12">
          <div className="row"> 
            <div className="col-6">
              <div className="w-50">
                <div className="form-group">
                  <label>
                    Select View:
                  </label>
                    <select className="form-control" type="text" name="view" value={this.state.sort} onChange={this.changeView} >
                    <option value="add">Add Sighting</option>
                    <option value="searchById">Search Sightings by Id</option>
                    <option value="searchByDetails">Search by Sightings Details</option>
                  </select>
                </div>
              </div>
            </div>
            <div className="col-6">
              <div>{ this.state.noResultsFound ? <h3 className="alert alert-warning">No results found</h3> : null } </div>
              <div>{ this.state.bearSightings.length === 1 ? <h3 className="alert alert-success">Found {this.state.bearSightings.length} bear sighting</h3> : null } </div>
              <div>{ this.state.bearSightings.length > 1 ? <h3 className="alert alert-success">Found {this.state.bearSightings.length} bear sightings</h3> : null } </div>
            </div>
          </div>
          
        </div>
        <div className="col">
          <div>{ this.state.view === "add" ? <AddSighting addSighting={this.addSighting} /> : null }</div>
          <div>{ this.state.view === "searchById" ? 
            <div>
              <SearchById searchbyId={this.searchbyId}/>
            </div>
             : null }
          </div>
          <div>{ this.state.view === "searchByDetails" ? 
            <div>
              <Search searchSighting={this.searchSighting} />  
            </div>
             : null }
          </div>


        </div>
        <div className="col">
          <div>{ this.state.bearSightings.length > 0 ? <Results bears={this.state.bearSightings}/> : null }
          </div>
        </div>
      </div>
        )
    }
}

export default App;