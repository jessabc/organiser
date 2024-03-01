export default function getStatusOptions(currentBoard) {

    const statusOptionElements = currentBoard?.columns?.map((option, index) => {
      return  <option key={index} value={option.name}>
                {option.name} 
              </option> 
    })

    return statusOptionElements
}

