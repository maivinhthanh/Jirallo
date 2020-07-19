import React from 'react'
import { connect } from 'react-redux'
import Search from './Search'
import Member from './Member'

class ListMember extends React.Component {
    componentWillMount() {
    
        this.setState({ visibleProjects : [] })
      }

    render() {
        const { listMember } = this.props
        return (
            <div>
        <Search listMember={listMember} filterProject={ (query,listMember) => (listMember == query) } onUpdateProjects={ listMember => this.setState({ visibleProjects : listMember }) }  />
        <div>
          {this.state.visibleProjects.map(mem => {
            return <Member member={mem} key={mem._id} />;
          })}
        </div>
      </div>    
        )
    }
}

const mapStateToProps = (state) => {
    return {
      listMember: state.listMember
    }
}

export default connect(mapStateToProps, null) (ListMember)
