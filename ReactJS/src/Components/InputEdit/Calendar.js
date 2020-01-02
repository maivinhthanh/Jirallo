
import React, { Component } from "react"
import InfiniteCalendar from 'react-infinite-calendar';
import 'react-infinite-calendar/styles.css';

class Calendar extends Component {
  constructor(props) {
    super(props);
    this.state = {
      openSchedule: false,
      status: false,
      // dates: this.props.clearData ? '' : this.props.admin[0].birthdate
      dates: this.props.admin[0].birthdate
    };
  }
  toggleSchedule = () => {
    this.setState({
      openSchedule: !this.state.openSchedule,
    })
  }
  setdate = async (data) => {
    let newDate = ''
    let datetime = new Date()
    await this.setState({
      dates: data
    })
    let dateEdit = new Date(this.state.dates);
    let day = datetime.getDate(), month = datetime.getMonth() + 1, year = datetime.getFullYear()
    let dayEdit = dateEdit.getDate(), monthEdit = dateEdit.getMonth() + 1, yearEdit = dateEdit.getFullYear()
    if (yearEdit <= year) {
      if (monthEdit <= month) {
        if (dayEdit <= day) {
          this.setState({
            dates: dateEdit,
            status: false,
          })
        }
        else {
          this.setState({
            dates: '',
            status: true
          })
        }
      }
      else {
        this.setState({
          dates: '',
          status: true
        })
      }
    }
    else {
      this.setState({
        dates: '',
        status: true
      })
    }
    console.log(dateEdit)
    this.props.setdate(this.state.dates)
    this.toggleSchedule()
  }
  render() {
    console.log(this.props.clearData)
    return (
      <div >
        <div className="input">
          <div className="input-group mb-3">
          <div className='wrapper' style={{display: 'contents'}}>
            <input style={{position:'relative'}} type="text" className="form-control" value={!this.props.clearData ? this.state.dates : ''} disabled />
            {
                this.state.status === false ? ' ' : <span style={{ color: 'red', textAlign: 'left' }}>Please select date time correct</span>
              }
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
