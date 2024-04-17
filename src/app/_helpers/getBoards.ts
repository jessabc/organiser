import axios from "axios";

export default async function getBoards() {
  try {
    const response = await axios.get("/data/projectsData.json");
    await new Promise((resolve) => setTimeout(resolve, 2000));
    return response.data;
  } catch (err) {
    console.log(err);
  }
}
