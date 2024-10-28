import { CreateTaskReqParamsType, TasksListItemsType } from "@/types/task"
import httpService from "./_httpService"

export const getTodayTasksService = async () => {
    const res = await httpService("/client/tasks", "get")
    return res?.data?.data
}

export const handleConfirmCreateTask = (values: CreateTaskReqParamsType) => {
    return httpService("/client/tasks", "post", values)
}

export const changeTaskIsDoneService = (task: TasksListItemsType) => {
    return httpService(`/client/tasks/${task.id}`, "patch", { isDone: !task.isDone })
}

export const deleteTaskService = (taskId: string) => {
    return httpService(`/client/tasks/${taskId}`, "delete")
}
