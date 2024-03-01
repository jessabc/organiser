import React from 'react'

export default function getPercentage(numCompletedSubtasks, task) {
   return Math.trunc((numCompletedSubtasks / task.subtasks.length) * 100)

}