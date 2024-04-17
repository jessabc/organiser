import { ITask } from "../types/interfaces";

export default function getNumCompletedSubtasks(task: ITask) {
  let count = 0;
  task.subtasks.forEach((subtask) => (subtask.isCompleted ? count++ : null));
  return count;
}
