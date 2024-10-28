import httpService from "./_httpService"

export const handleGetTaskCats = async () => {
    const res = await httpService(`/client/task-categories`, "get")
    return res?.data?.data
}