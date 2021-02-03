import React, { useState } from 'react';
import 'antd/dist/antd.css';
import { Modal, Input } from 'antd'


const Edit = (props) => {



  const [isModalVisible, setIsModalVisible] = useState(false);

  const showModal = () => {
    setIsModalVisible(props.visible);
  };

  const handleOk = () => {
    setIsModalVisible(false);
  };

  const handleCancel = () => {
    setIsModalVisible(false);
  };

  return (
    <Modal
      title={<h3>Edit Username</h3>}
      visible={isModalVisible}
      onOk={handleOk}
      onCancel={handleCancel}
    >
      <Input placeholder={props.list[props.index]} />

    </Modal>
  )


}


export default Edit;