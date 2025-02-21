import axios from "axios"

const API_BASE_URL = "https://www.googleapis.com/books/v1/volumes?q=";
// The api key supposed to be stored in the .env file but I intentionally don't store it there.
const API_KEY = "AIzaSyD312sO6sBQAqgXvD_VYXRH1gvEW8nUDwc"

export const fetchBooks = async (query: string) => {
    try {
        const response = await axios.get(`${API_BASE_URL}${query}&maxResults=40&key=${API_KEY}`);
        console.log("Full API Response:", response.data);  // Log full response
        return response.data.items || [];
    } catch (err) {
        console.error("Error fetching books:", err);
        return [];
    }
};
