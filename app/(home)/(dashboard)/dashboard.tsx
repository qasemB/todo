import Divider from '@/components/Divider';
import FaText from '@/components/FaText';
import { useUserInfoStore } from '@/stores/userInfoStore';
import { TasksListItemsType } from '@/types/task';
import { convertMiladi2Jalali } from '@/utils/dateUtils';
import React, { useEffect, useState } from 'react';
import { ActivityIndicator, FlatList, Pressable, View } from 'react-native';
import { dashboardStyles } from './_dashboard.style';
import { useGetTodayTasksQuery } from '@/queries/task';
import Loading from './_loading';
import { changeTaskIsDoneService, deleteTaskService } from '@/services/tasks';
import TaskAction from '@/components/task/TaskAction';


const Dashboard = () => {
    const { userInfo } = useUserInfoStore(state => state)
    const [today, setToday] = useState("")
    const [selectedTask, setSelectedTask] = useState<TasksListItemsType>()

    const { data, isFetching, isLoading, refetch } = useGetTodayTasksQuery()
    const todayTasks: TasksListItemsType[] = data

    useEffect(() => {
        setToday(convertMiladi2Jalali(undefined, "dddd، jD jMMMM jYYYY"))
    }, [])

    return (
        <View style={{ flex: 1 }}>
            <View style={{ flexDirection: "row", justifyContent: "space-between" }}>
                <FaText style={{ color: "gray" }}>{userInfo?.firstName + " " + userInfo?.lastName}</FaText>
                <FaText>لیست تسک های امروز</FaText>
            </View>
            <FaText style={{ color: "gray", fontSize: 12, marginTop: 10 }}>{today}</FaText>
            <Divider />

            {isLoading ? (<Loading />) : (
                <FlatList
                    data={todayTasks}
                    keyExtractor={(item)=>item.id.toString()}
                    ListEmptyComponent={<FaText style={{textAlign: "center"}}>تسکی پیدا نشد...!</FaText>}
                    refreshing = {isFetching}
                    onRefresh={refetch}
                    renderItem={({ item }) => (
                        <Pressable
                            key={item.id}
                            style={[
                                dashboardStyles.taskItem,
                                {
                                    backgroundColor: item.isDone ? "palegreen" : undefined,
                                    opacity: selectedTask && selectedTask.id !== item.id ? 0.3 : 1,
                                    transform: [{ scale: selectedTask && selectedTask.id === item.id ? 1.05 : 1 }]
                                }
                            ]}
                            onPress={() => setSelectedTask(item)}
                        >
                            <FaText>
                                <FaText style={{ marginLeft: 10, color: "gray" }}>{item.taskCategory.title} : </FaText>
                                {item.title}
                            </FaText>
                        </Pressable>
                    )}
                    style={{ flex: 1 }}
                />
            )}

            {isFetching && <ActivityIndicator style={{ marginBottom: 100 }} size={"large"} />}

            <TaskAction refetch={refetch} selectedTask={selectedTask} setSelectedTask={(item) => setSelectedTask(item)} />
        </View>
    );
};

export default Dashboard;

