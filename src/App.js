import React, { Component, useState } from 'react'
import axios from 'axios'
import 'antd/dist/antd.css';
import { List, message, Button, Modal, Input } from 'antd';
import { ListWrapper, ButtonWrapper } from './style.js'
// import Edit from './edit.js'

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      inputValue: '',
      list: [],
      visible: false,
      index: 0
    }
  }

  componentDidMount() {
    axios.get('http://jsonplaceholder.typicode.com/users').then(res => {
      message.success('request success');
      const userlist = res.data;
      const newlist = [];
      userlist.map((item) => newlist.push(item.username));
      this.setState({
        list: newlist
      })
      console.log(this.state.list);
      // this.setState({
      //   list: userlist
      // })
    }).catch((err) => {
      console.error(err)
    })
  }

  render() {
    return (
      <div>
        <ListWrapper>
          <List
            size="large"
            header={<h3>List of Events</h3>}
            bordered
            dataSource={this.state.list}
            renderItem={(item, index) => <List.Item key={index}>
              {item}
              <ButtonWrapper>
                <Button key={index} onClick={this.handleButtonDelete.bind(this, index)} type="dashed" danger>
                  Delete
              </Button>

              </ButtonWrapper>
              <ButtonWrapper>
                <Button key={index} onClick={this.handleButtonEdit.bind(this, index)} type="primary" danger>
                  Edit
              </Button>
              </ButtonWrapper>
            </List.Item>}
          />
        </ListWrapper>
        <Modal
          title={<h3>Edit Username</h3>}
          visible={this.state.visible}
          onOk={this.handleOk.bind(this)}
          onCancel={this.handleCancel.bind(this)}
        >
          <Input value={this.state.inputValue} onChange={this.handleInputChange.bind(this)} />

        </Modal>
      </div>
    )
  }

  handleButtonDelete(index) {
    const list = [...this.state.list];
    list.splice(index, 1)
    this.setState({
      list: list
    });
    axios.delete('http://jsonplaceholder.typicode.com/users', { id: index }).then((res) => {
      console.log(res);
    }).catch((err) => {
      console.error(err);
    })

  }

  handleButtonEdit(index) {
    this.setState({
      visible: true,
      index: index,
      inputValue: this.state.list[index]
    });
  }



  handleOk() {
    const list = [...this.state.list];
    list.splice(this.state.index, 1, this.state.inputValue);
    this.setState({
      visible: false,
      list: list
    });
    axios.post('http://jsonplaceholder.typicode.com/users', { id: this.state.index, username: this.state.list[this.state.index] }).then((res) => {
      console.log(res);
    }).catch((err) => {
      console.error(err);
    })
  };


  handleCancel() {
    this.setState({
      visible: false
    })
  };


  handleInputChange(e) {
    this.setState({
      inputValue: e.target.value
    })
  }



}

export default App;
