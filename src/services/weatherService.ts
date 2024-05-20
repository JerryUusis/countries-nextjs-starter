import axios from "axios";
import { VITE_OPENWEATHER_API } from "../utils/config";
import { Country } from "../types/country";

export const getWeather = async (capital: string[]) => {
  try {
    const response = await axios.get(
      `https://api.openweathermap.org/data/2.5/weather?q=${capital}&units=metric&appid=${VITE_OPENWEATHER_API}`
    );
    return response.data;
  } catch (error) {
    console.error(error);
    throw error;
  }
};
