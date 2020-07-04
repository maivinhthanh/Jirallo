import React from 'react';
import { Select, Spin } from 'antd';
import debounce from 'lodash/debounce';
import { connect } from "react-redux"
import * as action from './action';
import * as Config from '../../../Config';

const { Option } = Select;

class UserRemoteSelect extends React.Component {
  constructor(props) {
    super(props);
    this.lastFetchId = 0;
    this.fetchUser = debounce(this.fetchUser, 800);
  }

  state = {
    data: [],
    value: [],
    fetching: false,
  };

  fetchUser = value => {
    console.log('fetching user', value);

    this.setState({ data: [], fetching: true });
    fetch(Config.API_URL + '/auth/findUserLikeEmail')
      .then(response => {

        const data = response.data.result.map(user => ({
          text: `${user.name} - ${user.email}`,
          value: user._id,
        }));
        this.setState({ data, fetching: false });
      });
  };

  handleChange = value => {
    this.setState({
      value,
      data: [],
      fetching: false,
    });
  };

  render() {
    const { fetching, data, value } = this.state;
    return (
      <Select
        mode="multiple"
        labelInValue
        value={value}
        placeholder="Select users"
        notFoundContent={fetching ? <Spin size="small" /> : null}
        filterOption={false}
        onSearch={this.fetchUser}
        onChange={this.handleChange}
        style={{ width: '100%' }}
      >
        {data.map(d => (
          <Option key={d.value}>{d.text}</Option>
        ))}
      </Select>
    );
  }
}
const mapStateToProps = state => {
    return {
      auth: state.auth,
      listMember: state.listMember,
      note: state.note
    }
  }
  const mapDispatchToProps = dispatch => {
    return {
      findUserLikeEmail: (email) => dispatch(action.findUserLikeEmailAct(email)),
    }
  }
  export default connect(
    mapStateToProps,
    mapDispatchToProps
  )(UserRemoteSelect)