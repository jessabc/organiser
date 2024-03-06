import { Task } from "../types/interfaces"

export default function getPercentage(numCompletedSubtasks: number, task: Task) {
   return Math.trunc((numCompletedSubtasks / task.subtasks.length) * 100)

} 