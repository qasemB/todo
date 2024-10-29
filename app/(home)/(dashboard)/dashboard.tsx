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
import FontAwesome from '@expo/vector-icons/FontAwesome';
import { useLocalSearchParams, useRouter } from 'expo-router';



const Dashboard = () => {
    const router = useRouter()
    const { userInfo } = useUserInfoStore(state => state)
    const [today, setToday] = useState("")
    const [selectedTask, setSelectedTask] = useState<TasksListItemsType>()


    const params = useLocalSearchParams()
    const startedAt = params.startedAt as string
    const tasksParam = params.tasks as string
    const tasksFromParams = tasksParam ? JSON.parse(tasksParam) as TasksListItemsType[] : undefined

    const { data, isFetching, isLoading, refetch } = useGetTodayTasksQuery({
        enabled: !tasksFromParams
    })
    const todayTasks: TasksListItemsType[] = tasksFromParams || data || []

    useEffect(() => {
        setToday(convertMiladi2Jalali(startedAt, "dddd، jD jMMMM jYYYY"))
    }, [])



    return (
        <View style={{ flex: 1, backgroundColor: "white", }}>
            <View style={{ flexDirection: "row", justifyContent: "space-between" }}>
                <FaText style={{ color: "gray" }}>{userInfo?.firstName + " " + userInfo?.lastName}</FaText>
                <FaText>لیست تسک های امروز</FaText>
            </View>
            <View style={{ flexDirection: "row", justifyContent: "space-between", marginTop: 15, alignItems: "center" }}>
                <FontAwesome name="power-off" size={24} color="black" style={{ marginLeft: 20 }} onPress={() => router.replace("/logout")} />
                <FaText style={{ color: "gray", fontSize: 12, marginTop: 10 }}>{today}</FaText>
            </View>

            <Divider />

            {isLoading ? (<Loading />) : (
                <FlatList
                    data={todayTasks}
                    keyExtractor={(item) => item.id.toString()}
                    ListEmptyComponent={<FaText style={{ textAlign: "center" }}>تسکی پیدا نشد...!</FaText>}
                    refreshing={isFetching}
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

            <TaskAction refetch={refetch} selectedTask={selectedTask} setSelectedTask={(item) => setSelectedTask(item)} />
        </View>
    );
};

export default Dashboard;

