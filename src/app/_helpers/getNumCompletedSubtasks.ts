import { Task } from "../types/interfaces";

export default function getNumCompletedSubtasks(task: Task) {
  let count = 0;
  task.subtasks.forEach((subtask) => (subtask.isCompleted ? count++ : null));
  return count;
}
