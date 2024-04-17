import { ITask } from "../types/interfaces";

export default function getPercentage(
  numCompletedSubtasks: number,
  task: ITask
) {
  return Math.trunc((numCompletedSubtasks / task.subtasks.length) * 100);
}
