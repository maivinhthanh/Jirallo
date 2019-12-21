import React, { Component, Fragment } from 'react';
import UploadImage from '../InputEdit/UploadImage'
class EditProjectModal extends Component {
  constructor(props) {
      super(props)
  }
    render() {
        const {project} = this.props
        console.log(project)
        return (
            <Fragment>
                 <div className="container">
                        <div className="row">
                            <div className="col-4">
                                <p>Your project</p>
                            </div>
                            <div className="col-8 form-group">
                                <input className="form-control" type="text"
                                    value={this.state.name}
                                    name="name"
                                    // onChange={e => this.setState({ text: e.target.value })}
                                    onChange={this.handleChangename} />
                            </div>
                        </div>
                        <br />
                        <div className="row">
                            <div className="col-4">
                                <p>Date Edit</p>
                            </div>
                            <div className="col-8">
                                <input className="form-control" type="text"
                                    value={this.state.dateedit}
                                    onChange={this.handleChangeDateEdit} />
                            </div>
                        </div>
                        <br />
                        <div className="row">
                            <div className="col-4">
                                <p>Descripton</p>
                            </div>
                            <div className="col-8">
                                <input className="form-control" type="text"
                                    value={this.state.description}
                                    onChange={this.hanleChangeDescript} />
                            </div>
                        </div>
                        <br />
                        <div>
                            <UploadImage setAvatar={this.setAvatar} />
                        </div>
                        <button className="btn btn-primary" onClick={this.editProject}>Submit</button>
                </div>
            </Fragment>
        );
    }
}

export default EditProjectModal;