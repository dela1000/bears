import React from 'react';
import logo from '../images/bear.png';

class Header extends React.Component {

  render (){
    return (
      <div className="col-12">
        <div className="jumbotron">
          <div className="container">
            <div className="row justify-content-md-center">
              <div className="col-md-auto mr-3">
                <img src={logo} alt="Bear" height="42" width="42" />
              </div>
              <div className="col-md-auto mt-1">
                <h2>Bear Sightings</h2>
              </div>
            </div>
          </div>
        </div>
      </div>
    )
  }
}

export default Header;
