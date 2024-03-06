import axios from "axios"

export default async function getAdvice() {
  try {
    const response = await axios.get("https://api.adviceslip.com/advice") 
    return response.data.slip.advice
  }catch(err) {
    console.log(err)
  }
} 