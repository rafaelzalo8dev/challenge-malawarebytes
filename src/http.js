import axios from 'axios';
const API_URL = 'https://api.publicapis.org/';

export const getCall =  (url) => {
  return new Promise(async (resolve, reject) => {
    try {
      const response = await axios.get(`${API_URL}${url}`);
      if (response && response.data) resolve(response.data);
      reject('Error fetching data');
    } catch (err) { reject('Error fetching data ' + err); }
  });
};
