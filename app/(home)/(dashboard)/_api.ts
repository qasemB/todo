import httpService from "@/services/_httpService"

export const getTodayTasksService = () => {
    return httpService("/client/tasks", "get")
}