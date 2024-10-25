export type TasksListItemsType = {
    createdAt: string
    description: string
    groupCode: string
    endedAt: string
    id: string
    includeVacation: boolean
    isDone: boolean
    repetitionItems: number
    repetitionType: number
    startedAt: string
    taskCategoryId: string
    title: string
    taskCategory: { title: string }
}