import axios from "axios"

export default async function getCard() {
  try {
    const response = await axios.get("/data/cardData.json")
    await new Promise((resolve) => setTimeout(resolve, 2000));
    return response.data
  }catch(err) {
    console.log(err)
  }
} 