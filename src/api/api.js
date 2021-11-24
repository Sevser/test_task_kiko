import axios from 'axios';

export const API_Places =  axios.create({
  baseURL: 'https://maps.googleapis.com/maps/api/place',
});
