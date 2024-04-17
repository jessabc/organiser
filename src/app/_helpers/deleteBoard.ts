import { setAllBoards } from "@/app/_redux/features/boards/boardsSlice";
import { Board } from "../types/interfaces";

// @ts-ignore
export default function deleteBoard(
  boards: Board[],
  currentBoard: Board,
  // TS TO FIX
  // @ts-ignore
  dispatch,
  // TS TO FIX
  // @ts-ignore
  router,
  // TS TO FIX
  // @ts-ignore
  pathname
) {
  const updatedBoards = boards?.filter(
    (board) => board.name != currentBoard?.name
  );
  dispatch(setAllBoards(updatedBoards));
  if (
    pathname.includes("%20")
      ? pathname.replace("%20", " ")
      : pathname === `/projects/${currentBoard.name}`
  ) {
    router.push("/projects/new");
  }
}
