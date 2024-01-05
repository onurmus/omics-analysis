//TODO: implement
import React from 'react';
import { Button, Form, Input, InputNumber } from 'antd';
import { Notification } from '../../common/utils/notification';
import axios from 'axios';

const CreateExperiment = () => {
  const [form] = Form.useForm();

  const onFinish = async (values: any) => {
    try {
      const response = await axios.post(`${process.env.REACT_APP_BACKEND_ENDPOINT}/mocking`, values);
      Notification.info(response.data, 'Created mock experiment');
    } catch (error) {
      Notification.error(error);
    }
  };

  const onFinishFailed = (errorInfo: any) => {
    Notification.error(errorInfo, 'Error occurred during creating mock data');
  };

  return (
    <>
      <h1>Create Mock Experiment</h1>
      <br></br>
      <Form form={form} name='createMockData' onFinish={onFinish} onFinishFailed={onFinishFailed} layout='vertical'>
        <Form.Item
          name='experimentName'
          label='Experiment Name'
          rules={[
            {
              required: true,
              message: 'Please input the experiment name!',
              max: 50,
            },
            {
              pattern: /^[a-zA-Z0-9]*$/,
              message: 'Experiment name must be alphanumeric!',
            },
          ]}
        >
          <Input style={{ maxWidth: '300px' }} />
        </Form.Item>

        <Form.Item
          name='numberOfSamples'
          label='Number of Samples'
          rules={[
            {
              required: true,
              message: 'Please input the number of samples!',
              type: 'number',
              min: 1,
              max: 20,
            },
          ]}
        >
          <InputNumber min={1} max={20} />
        </Form.Item>

        <Form.Item
          name='numberOfGenes'
          label='Number of Genes'
          rules={[
            {
              required: true,
              message: 'Please input the number of genes!',
              type: 'number',
              min: 1,
              max: 50000,
            },
          ]}
        >
          <InputNumber min={1} max={50000} />
        </Form.Item>

        <Form.Item
          name='wideRangeExpressionRatio'
          label='Outlier ratio'
          rules={[
            {
              type: 'number',
              min: 0,
              max: 1,
              message: 'The wide range expression ratio must be between 0 and 1!',
            },
          ]}
        >
          <InputNumber min={0} max={1} step={0.1} />
        </Form.Item>

        <Form.Item>
          <Button type='primary' htmlType='submit'>
            Create Mock Data
          </Button>
        </Form.Item>
      </Form>
    </>
  );
};

export default CreateExperiment;
