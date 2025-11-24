import axios from 'axios';
import { toast } from 'sonner';

const baseAPI = axios.create({
  baseURL: "http://localhost:3000",
  headers: { "Content-Type": "application/json" },
});

baseAPI.interceptors.request.use((config) => {
  const token = JSON.parse(sessionStorage.getItem('token'));
  if (token) { config.headers.Authorization = `Bearer ${token}` };
  return config;
});

baseAPI.interceptors.response.use(
  response => response,
  error => {
    if (error.response && (error.response.status === 401 || error.response.status === 403)) {
      alert("Session expired. Please log in again.");
      sessionStorage.removeItem("token");  // Clear token
      sessionStorage.removeItem("role");  // Clear token
      window.location.href = "/login";  // Redirect user to login page
    }
    return Promise.reject(error);
  }
);

// -----------------------------------------------------------------------[Create API]
export const Create = async (ItemURL, NewItemData) => {

  try {

    const response = await baseAPI.post(`api/${ItemURL}/add`, NewItemData);
    if (response.status === 500) {
      toast.error("Sever Error");
    }
    return response.status;

  } catch (error) {
    console.error('ItemURL: ', ItemURL, 'NewItemData: ', NewItemData, 'Error: ', error);
  }

};

// -----------------------------------------------------------------------[List API]
export const List = async (ItemURL) => {

  try {

    const response = await baseAPI.get(`api/${ItemURL}`);
    if (response.status === 200) {
      return response.data;
    } else if (response.status === 500) {
      toast.error("Sever Error");
    }

  } catch (error) {
    console.error('ItemURL: ', ItemURL, 'Error: ', error);
  }

};

// -----------------------------------------------------------------------[Delete API]
export const Delete = async (ItemURL, id) => {

  try {

    let response = await baseAPI.delete(`api/${ItemURL}/${id}`);
    if (response.status === 500) {
      toast.error("Sever Error");
    }
    return response.status;

  } catch (error) {
    console.error('ItemURL: ', ItemURL, 'id', id, 'Error: ', error);
  }

};

// -----------------------------------------------------------------------[Get data of an item API]
export const GetOne = async (ItemURL, id) => {

  try {

    let response = await baseAPI.get(`api/${ItemURL}/${id}`);
    if (response.status === 200) {
      return response.data;
    } else if (response.status === 500) {
      toast.error("Sever Error");
    }

  } catch (error) {
    console.error('ItemURL: ', ItemURL, 'id', id, 'Error: ', error);
  }

};

// -----------------------------------------------------------------------[Update API]
export const Update = async (ItemURL, id, updateData) => {

  try {

    let response = await baseAPI.put(`api/${ItemURL}/${id}`, updateData);
    if (response.status === 500) {
      toast.error("Sever Error");
    }
    return response.status;

  } catch (error) {
    console.error('ItemURL: ', ItemURL, 'id', id, 'updateData', updateData, 'Error: ', error);
  }

};

// -----------------------------------------------------------------------[Cross check email ID API]
export const CheckEmployeeEmail = async (emailID) => {

  try {

    let response = await baseAPI.get(`api/employees/check/${emailID}`);
    if (response.status === 500) {
      toast.error("Sever Error");
    }
    return response.data.result;

  } catch (error) {
    console.error('emailID', emailID, 'Error: ', error);
  }

};

// -----------------------------------------------------------------------[Upload Image API]
export const UploadImage = async (ItemURL, ImageData, filename) => {

  try {
    const formData = new FormData();
    formData.append('image', ImageData, `${filename}.jpg`);
    const response = await axios.post(`http://localhost:3000/api/${ItemURL}/upload`, formData, {
      headers: {
        'Content-Type': 'multipart/form-data',
        Authorization: `Bearer ${JSON.parse(sessionStorage.getItem('token'))}`,
      }
    })
    return response.data.filename;
  } catch (error) {
    console.log('ItemURL: ', ItemURL);
    console.log('Error: ', error);
  }

};