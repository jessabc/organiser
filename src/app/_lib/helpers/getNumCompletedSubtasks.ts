export default function getNumCompletedSubtasks(task) {
    let count = 0
    task.subtasks.forEach(subtask => subtask.isCompleted ? count++ : null)
    return count
  }
