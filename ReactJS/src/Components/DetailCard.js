import React, { Component } from 'react'
import ItemBoard from './itemBoard'
import HeaderBoard from './HeaderBoard'
import { InputGroup, InputGroupAddon, Button, Input } from 'reactstrap';
import ListUser from './ListUser';
class DetailCard extends Component {
  render() {
    return (
      <div className="detail-card">
      <div className="board-header">
        <HeaderBoard/>
      </div>
      <div className="container-fluid">
      <div className="title-board">
        <p>Main Board</p>
        <div className="search-form">
        <InputGroup>
        <Input />
        <InputGroupAddon addonType="append">
          <Button color="secondary">search</Button>
        </InputGroupAddon>
      </InputGroup>
        </div>
        {/* add Iteam */}
      </div>
      <div className="filter">
        <p>Quick Filters: </p>
        <ListUser/>
        {/* API load user in task */}
      </div>
        <ItemBoard/>
      </div>
      </div>
    )
  }
}
export default DetailCard
