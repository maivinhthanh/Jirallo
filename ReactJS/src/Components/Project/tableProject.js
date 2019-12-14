import React, { Component } from 'react';
import _ from 'lodash'
import { Button, Form, FormGroup, Label, Input, FormText } from 'reactstrap';
class tableProject extends Component {
    constructor(props) {
        super(props)
        this.state = {
            valueEmail: '',
            status: false,
            selected: 'developer',
            name:'',
            datecreate: '',
            dateedit: '',
            descript: '',
            image: ''
        }
        this.userSelect = ''
        this.project = ''
        this.fomatDateTime = this.fomatDateTime.bind(this)
        this.onChangeEmail = this.onChangeEmail.bind(this)
        this.searchEmail = this.searchEmail.bind(this)
        this.addMember = this.addMember.bind(this)
        this.handleChangeSelect = this.handleChangeSelect.bind(this)
        this.editProject = this.editProject.bind(this)
        this.hanleChangename = this.hanleChangename.bind(this)
        this.handleChangeDateEdit = this.handleChangeDateEdit.bind(this)
        // this.hanleChangeDateCreate = this.hanleChangeDateCreate.bind(this)
        this.handleChangeImage = this.handleChangeImage.bind(this)
        this.hanleChangeDescript = this.hanleChangeDescript.bind(this)
        this.loadDataForm = this.loadDataForm.bind(this)
    }
    editProject(e){
        e.preventDefault()
        let data = new FormData()
        data.append('avatar', this.state.image)
        // data.append('idproject',this.props.params)
        data.append('dateedit',this.state.dateedit)
        data.append('description',this.state.descript)
        data.append('name',this.state.name)
        // const project = {
        //     idproject: this.props.params,
        //     name: this.state.name,
        //     dateedit: this.state.dateedit,
        //     description: this.state.description,
        //     image: this.state.image
        // }
        this.props.EditProject(this.props.params, data)
    }
    // hanleChangeDateCreate(e){
    //     e.preventDefault()
    //     this.setState({
    //         datecreate: e.target.value
    //     })
    // }
    hanleChangeDescript(e){
        e.preventDefault();
        this.setState({
            descript: e.target.value
        })
    }
    handleChangeImage(e){
        e.preventDefault()
        this.setState({
            image: e.target.files[0]
        })
    }
    handleChangeDateEdit(e){
        e.preventDefault();
        this.setState({
            dateedit: e.target.value
        })
    }
    hanleChangename(e){
        e.preventDefault();
        this.setState({
            name: e.target.value
        })
    }
    fomatDateTime(date) {
        return _.slice(_.replace(date, /-/g, "/"), 0, 10);
    }
    onChangeEmail(e) {
        e.preventDefault()
        this.setState({
            valueEmail: e.target.value
        })
    }
    searchEmail() {
        this.setState({
            status: !this.state.status
        })
        this.props.searchEmail(this.state.valueEmail)
    }
    getId = (id) => {
        this.userSelect = id
    }
    addMember() {
        const params = this.props.params
        const user = { _id: this.userSelect, position: this.state.selected }
        this.props.AddMemberIntoProject(params, user)
    }
    handleChangeSelect(e) {
        e.preventDefault();
        this.setState({
            selected: e.target.value
        })
    }
    loadDataForm(){
        _.map(this.project,(item, key) => {
            this.setState({
                name: item.name,
                dateedit: item.dateedit,
                descript: item.description,
                image: item.image
            })
        })
    }
    render() {
        const { project, member } = this.props
        const { status } = this.state
        this.project = _.cloneDeep(this.props.project)
        return (
            <div>
                <table class="table table-hover">
                    <thead>
                        <tr>
                            <th>Stt</th>
                            <th>Name project</th>
                            <th>Date-create</th>
                            <th>Date-edit</th>
                            <th>Description</th>
                            <th>Image</th>
                            <th>Action</th>
                        </tr>
                    </thead>
                    <tbody>
                        {
                            _.map(project, (item, key) => {
                                return (
                                    <tr>
                                        <td>{key + 1}</td>
                                        <td>{item.name}</td>
                                        <td>{this.fomatDateTime(item.datecreate)}</td>
                                        <td>{this.fomatDateTime(item.datecreate)}</td>
                                        <td>{item.description}</td>
                                        <td>{item.image}</td>
                                        <td>
                                            <button type="button" className='btn btn-danger' onClick={this.loadDataForm} data-toggle="modal" data-target="#myModal1">Edit</button>
                                            <button type="button" className='btn btn-danger ml-2' data-toggle="modal" data-target="#myModal">Add user</button>
                                        </td>
                                    </tr>
                                )
                            })
                        }
                        <div className="modal" id="myModal">
                            <div className="modal-dialog">
                                <div className="modal-content">
                                    {/* Modal Header */}
                                    <div className="modal-header">
                                        <input type="text" onChange={this.onChangeEmail} placeholder="search email"></input>
                                        <i onClick={this.searchEmail} className="fas fa-search"></i>
                                    </div>
                                    {/* Modal body */}
                                    <div className="modal-body">
                                        <div className="content-top" style={{ textAlign: 'left' }}>
                                            {status ?
                                                <div>
                                                    {
                                                        _.map(member, (item, key) => {
                                                            return (
                                                                <FormGroup check>
                                                                    <Label check>
                                                                        <Input onClick={() => this.getId(item._id)} type="radio" name="radio1" />{' '}
                                                                        {item.name}
                                                                    </Label>
                                                                </FormGroup>
                                                            )
                                                        })
                                                    }
                                                    <div className="selectDev" style={{ width: '50%' }}>
                                                        <FormGroup style={{ textAlign: 'left' }}>
                                                            <Label for="exampleSelect" >Select</Label>
                                                            <Input type="select" name="select" id="exampleSelect" value={this.state.selected} onChange={this.handleChangeSelect}>
                                                                <option value='developer'>Developer</option>
                                                                <option value='manager'>Manager</option>
                                                            </Input>
                                                        </FormGroup>
                                                    </div>
                                                </div>
                                                : <p> No infomation </p>
                                            }
                                        </div>

                                    </div>
                                    {/* Modal footer */}
                                    <div className="modal-footer">
                                        <Button outline color="success" onClick={this.addMember}>Add</Button>
                                        <Button outline color="danger" data-dismiss="modal">Close</Button>
                                        {/* <button type="button" className="btn btn-danger" data-dismiss="modal">Close</button> */}
                                    </div>
                                </div>
                            </div>
                        </div>
                    </tbody>
                </table>
                <div className="modal" id="myModal1">
                    <div className="modal-dialog">
                        <div className="modal-content">
                            {/* Modal Header */}
                            <div className="modal-header">
                                <h4 className="modal-title">Edit project</h4>
                                <button type="button" className="close" data-dismiss="modal">×</button>
                            </div>
                            {/* Modal body */}
                            <div className="modal-body">
                                <form action="/action_page.php" style={{textAlign:'left'}} className="was-validated">
                                    <div className="form-group">
                                        <label htmlFor="uname">Name project:</label>
                                        <input type="text" className="form-control" onChange={this.hanleChangename} value={this.state.name} id="uname" placeholder="Enter username" name="uname" required />
                                        {/* <div className="valid-feedback">Valid.</div>
                                        <div className="invalid-feedback">Please fill out this field.</div> */}
                                    </div>
                                    <div className="form-group">
                                        <label htmlFor="uname">Date-edit:</label>
                                        <input type="text" className="form-control" onChange={this.handleChangeDateEdit} value={this.state.dateedit} id="dateedit" placeholder="Enter dateedit" name="dateedit" />
                                        {/* <div className="valid-feedback">Valid.</div>
                                        <div className="invalid-feedback">Please fill out this field.</div> */}
                                    </div>
                                    <div className="form-group">
                                        <label htmlFor="uname">Descripton:</label>
                                        <input type="text" className="form-control" onChange={this.hanleChangeDescript} value={this.state.descript} id="description" placeholder="Enter description" name="description" />
                                        {/* <div className="valid-feedback">Valid.</div>
                                        <div className="invalid-feedback">Please fill out this field.</div> */}
                                    </div>
                                    <div className="form-group">
                                        <label htmlFor="uname">Image:</label>
                                        <input type="file" className="form-control" onChange={this.handleChangeImage} id="image" name="image" />
                                        {/* <div className="valid-feedback">Valid.</div>
                                        <div className="invalid-feedback">Please fill out this field.</div> */}
                                    </div>
                                  
                                </form>
                            </div>
                            {/* Modal footer */}
                            <div className="modal-footer">
                                <button type="submit" className="btn btn-primary" onClick={this.editProject}>Submit</button>
                                <button type="button" className="btn btn-danger" data-dismiss="modal">Close</button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}

export default tableProject;