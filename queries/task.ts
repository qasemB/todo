import { useQueryOptionType, useReactQuery } from "@/hooks/reactQueryHook"
import { getTodayTasksService } from "@/services/tasks"

export const GET_TodayTasks_QUERY_KEY = "get-today-tasks-query-key"

export const useGetTodayTasksQuery = (options?: useQueryOptionType) => useReactQuery(
    GET_TodayTasks_QUERY_KEY,
    () => getTodayTasksService(),
    options
)
