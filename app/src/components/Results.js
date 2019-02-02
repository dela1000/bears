import React from 'react';

class Results extends React.Component {
  render (){
    return (
      <div className="col">
        {this.props.bears.map((item, index) => (
          <div key={index} className="row">
            <div className="col">
              <div className="form-group">
                <p><b>Bear Type:</b> {item.bear_type}</p>
              </div>
              <div className="form-group">
                <p><b>Number of Bears: </b>{item.num_bears}</p>
              </div>
              <div className="form-group">
                <p><b>Zip Code: </b>{item.zip_code}</p>
              </div>
            </div>
            <div className="col">
              <div className="form-group">
                <label><b>Notes:</b></label>
                <p>{item.notes}</p>
              </div>
            </div>
          <hr/>
          <hr className="col-12"/>
          </div>
        ))}
      </div>
    )
  }
}

export default Results;