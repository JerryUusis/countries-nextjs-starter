import axios from "axios";
import { initializeDB } from "../utils/indexedDb";

const countriesAPI = "https://studies.cs.helsinki.fi/restcountries/api/all";

// If indexedDB is empty, fetch countries directly from API and populate indexedDB
const getAll = async () => {
  try {
    const db = await initializeDB();
    const transaction = db.transaction("countries", "readonly");
    const store = transaction.objectStore("countries");
    const countriesArray = await store.get("all");

    if (!countriesArray) {
      const response = await axios.get(countriesAPI);
      if (response.data) {
        const transaction = db.transaction("countries", "readwrite");
        const store = transaction.objectStore("countries");
        await store.put(response.data, "all");
        return response.data;
      }
    }
    return countriesArray;
  } catch (error) {
    console.error("Error fetching countries data:", error);
    throw error;
  }
};

export default { getAll };
