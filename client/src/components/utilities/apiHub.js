import axios from 'axios';
const baseURL = 'http://localhost:3000'; // Base URL for your API
const token = JSON.parse(sessionStorage.getItem('token'));

// -----------------------------------------------------------------------[Create API]
export const Create = async (ItemURL, NewItemData) => {
  try {

    const response = await axios.post(`${baseURL}/api/${ItemURL}/add`, NewItemData, {
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`
      },
    });

    return response.status;

  } catch (error) {
    console.error('ItemURL: ', ItemURL, 'NewItemData: ', NewItemData, 'Error: ', error);
  }
};

// -----------------------------------------------------------------------[List API]
export const List = async (ItemURL) => {
  try {
    const response = await axios.get(`${baseURL}/api/${ItemURL}`, {
      headers: {
        'Content-Type': 'application/json',
        authorization: `Bearer ${token}`
      },
    });

    if (response.status === 200) {
      return response.data;
    }

  } catch (error) {
    console.error('ItemURL: ', ItemURL, 'Error: ', error);
  }
};

// -----------------------------------------------------------------------[Delete API]
export const Delete = async (ItemURL, id) => {
  try {
    let response = await axios.delete(`${baseURL}/api/${ItemURL}/${id}`, {
      headers: {
        'Content-Type': 'application/json',
        authorization: `Bearer ${token}`
      },
    });

    return response.status;

  } catch (error) {
    console.error('ItemURL: ', ItemURL, 'id', id, 'Error: ', error);
  }
};

// -----------------------------------------------------------------------[Get data of an item API]
export const GetOne = async (ItemURL, id) => {
  try {
    let response = await axios.get(`${baseURL}/api/${ItemURL}/${id}`, {
      headers: {
        'Content-Type': 'application/json',
        authorization: `Bearer ${token}`
      },
    });

    if (response.status === 200) {
      return response.data;
    }

  } catch (error) {
    console.error('ItemURL: ', ItemURL, 'id', id, 'Error: ', error);
  }
};

// -----------------------------------------------------------------------[Update API]
export const Update = async (ItemURL, id, updateData) => {

  try {
    let response = await axios.put(`${baseURL}/api/${ItemURL}/${id}`, updateData, {
      headers: {
        'Content-Type': 'application/json',
        authorization: `Bearer ${token}`
      },
    });

    return response.status;

  } catch (error) {
    console.error('ItemURL: ', ItemURL, 'id', id, 'updateData', updateData, 'Error: ', error);
  }

};

// -----------------------------------------------------------------------[Cross check email ID API]
export const CheckEmployeeEmail = async (emailID) => {

  try {
    let response = await axios.get(`${baseURL}/api/employees/check/${emailID}`, {
      headers: {
        'Content-Type': 'application/json',
        authorization: `Bearer ${token}`
      },
    });

    return response.data.result;

  } catch (error) {
    console.error('emailID', emailID, 'Error: ', error);
  }

};