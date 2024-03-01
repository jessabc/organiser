import React from 'react'

export default function deleteBoard(boards, currentBoard, dispatch, setAllBoards, router) {
  const updatedBoards = boards?.filter(board => board.name != currentBoard?.name)
  dispatch(setAllBoards(updatedBoards))
  router.push('/project/new')
}
