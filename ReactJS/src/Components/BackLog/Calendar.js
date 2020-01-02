import React, { Component } from 'react';
import InfiniteCalendar from 'react-infinite-calendar';
import 'react-infinite-calendar/styles.css';

class Calendar extends Component {
    constructor(props) {
        super(props);
        this.state = {
          openSchedule: false,
          status: false,
          dates : ''
        };
      }
      toggleSchedule = () => {
        this.setState({
          openSchedule: !this.state.openSchedule,
        })
      }
      setdate = async (data) => {
        const {flag} = this.props
        await this.setState({
          dates: data
        })
        if (flag === 'time') {
            this.props.settimebegin(this.state.dates)
        }
        else {
            this.props.setdealine(this.state.dates)
        }
        this.toggleSchedule()
      }
    render() {
        return (
            <div >
        <div className="input">
          <div className="input-group mb-3">
          <div className='wrapper' style={{display: 'contents'}}>
            <input style={{position:'relative'}} type="text" className="form-control" value={!this.props.clearData ? this.state.dates : ''} />
            <div className="input-group-prepend" onClick={() => this.toggleSchedule()} style={{position:'absolute', right:'1px', height:'38px'}}>
              <i className="fas fa-calendar input-group-text"></i>
            </div>
            {/* <div className="error">
              {
                this.state.status === false ? ' ' : <span style={{ color: 'red', textAlign: 'left' }}>Please select date time correct</span>
              }
            </div> */}
            </div>
          </div>
        </div>
        {
          this.state.openSchedule ?
            <div className="Calendar" style={{ position: 'absolute', left: '100%', top: '-475%' }}>
              <InfiniteCalendar
                width={400}
                height={200}
                onSelect={this.setdate}
              />
            </div> : null
        }

      </div>
        );
    }
}

export default Calendar;