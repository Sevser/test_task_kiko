import axios from 'axios';
import env from "react-dotenv";

export const axiosPlaces =  axios.create({
  baseURL: 'https://maps.googleapis.com/maps/api/place',
  params: {
      'api-key': env.GOOGLE_PLACES_API_KEY,
  },
});
