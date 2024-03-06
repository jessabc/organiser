import { Board } from "../types/interfaces"

export default function getStatusOptions(currentBoard: Board) {

  const statusOptionElements = currentBoard?.columns?.map((option, index) => {
    return  <option key={index} value={option.name}>
              {option.name} 
            </option> 
  })

  return statusOptionElements
}

 