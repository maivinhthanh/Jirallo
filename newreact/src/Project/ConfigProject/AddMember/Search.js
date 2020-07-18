import React, { Component } from 'react'

export default class Search extends React.Component {
    componentDidMount() {
    
        const { listMember, filterProject, onUpdateProjects } = this.props;
        onUpdateProjects(listMember);
      }
      
      handleInputChange = (event) => {
        
        const query = event.currentTarget.value;
        const { listMember, filterProject, onUpdateProjects } = this.props;
        
        const filteredProjects = listMember.filter(listMember => !query || filterProject(query, listMember));
        
        onUpdateProjects(filteredProjects);
      };
    
    render() {
        return (
            <form>
        <input style={{ border: '1px solid'}} onChange={this.handleInputChange} />
       </form>
        )
    }
}
