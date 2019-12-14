
import React, { Component } from "react"
import InfiniteCalendar from 'react-infinite-calendar';
import 'react-infinite-calendar/styles.css';

class Calendar extends Component {
  constructor(props) {
    super(props);
    this.state = {
        avatar: null,
        allFiles: []
    };
  }
  handleAvatar = (e) => {
    e.preventDefault();
    let files = e.target.files

    for (var i = 0; i < files.length; i++) {

        let file = files[i];

        let reader = new FileReader();

        reader.readAsDataURL(file);

        reader.onload = () => {

            let fileInfo = {
                name: file.name,
                type: file.type,
                size: Math.round(file.size / 1000) + ' kB',
                base64: reader.result,
                file: file,
            }
            this.setState({
                allFiles: [...this.state.allFiles,fileInfo]
            })
        }
        
    }
    this.setState({
        avatar: files[0],
    })
    this.props.setAvatar(this.state.avatar)
  }
  shouldComponentUpdate(nextProps, nextState){
      return nextState.allFiles !== this.state.allFiles
  }
  render() {

    return (
        <div >
            <div className="row">
                <div className="col-4">
                <p>Avatar</p>
                </div>
                <div className="col-8">
                <input className="form-control" type="file"
                    onChange={this.handleAvatar} />
                
                </div>
            </div>
            <br/>
            <div className="row">
                <div className="col-12">
                { this.state.allFiles.map((file,i) => {
                    return <img  key={i} src={file.base64} class="avatar-image" width="100" height="100"/>
                }) }
                <img src="" />
                </div>
            </div>
                
            
        </div>
        
    );
  }
}

export default Calendar;
