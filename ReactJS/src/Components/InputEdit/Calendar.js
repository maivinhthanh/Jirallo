
import React, { Component } from "react"
import InfiniteCalendar from 'react-infinite-calendar';
import 'react-infinite-calendar/styles.css';

class Calendar extends Component {
  constructor(props) {
    super(props);
    this.state = {
        openSchedule: false,
        dates: null
    };
  }
  toggleSchedule = () =>{
    this.setState({
      openSchedule: !this.state.openSchedule, 
    })
  }
  setdate = (data) => {
    this.setState({
        dates : data
    })
    this.props.setdate(data)
  }
  render() {

    return (
        <div >
            <div className="input">
                <div className="input-group mb-3">
                    
                    <input type="text" className="form-control" value={this.state.dates} disabled/>
                    <div className="input-group-prepend" onClick={()=>this.toggleSchedule()}>
                        <i className="fas fa-calendar input-group-text"></i>
                    </div>
                </div>
            </div>
            { 
            this.state.openSchedule?
              <div className="Calendar" style={{position: 'absolute',left: '100%',top: '-475%'}}> 
                  <InfiniteCalendar
                  width={400}
                  height={200}
                  onSelect={this.setdate}
                  />
              </div>:null
            }
        </div>
        
    );
  }
}

export default Calendar;
