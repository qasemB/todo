import { useReactQuery } from "@/hooks/reactQueryHook"
import { handleGetTaskCats } from "@/services/taskCats"

export const GET_TASK_CATS_QUERY_KEY = "get-task-cats-query-key"

export const useGetTaskCatsQuery = () => useReactQuery(
    GET_TASK_CATS_QUERY_KEY,
    () => handleGetTaskCats()
)
