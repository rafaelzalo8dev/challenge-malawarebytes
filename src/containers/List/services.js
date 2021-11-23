import { getCall } from '../../http';

export function getEntries (filter) {
  return new Promise(async(resolve, reject) => {
    try {
      let url = `entries${filter}`;
      const response = await getCall(url);
      resolve(response);
    } catch (err) {
      reject(err);
    }
  });
};