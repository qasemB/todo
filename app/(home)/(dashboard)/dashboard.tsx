import Divider from '@/components/Divider';
import FaText from '@/components/FaText';
import { useUserInfoStore } from '@/stores/userInfoStore';
import { TasksListItemsType } from '@/types/task';
import { convertMiladi2Jalali } from '@/utils/dateUtils';
import React, { useEffect, useState } from 'react';
import { FlatList, View } from 'react-native';
import { getTodayTasksService } from './_api';
import { dashboardStyles } from './_dashboard.style';

const Dashboard = () => {
    const { userInfo } = useUserInfoStore(state => state)
    const [today, setToday] = useState("")

    const [todayTasks, setTodayTasks] = useState<TasksListItemsType[] | undefined>()

    const getTodayTasks = async () => {
        const res = await getTodayTasksService()
        if (res.status === 200) {
            setTodayTasks(res.data.data)
        }
    }

    useEffect(() => {
        setToday(convertMiladi2Jalali(undefined, "dddd، jD jMMMM jYYYY"))
        getTodayTasks()
    }, [])




    return (
        <View >
            <View style={{ flexDirection: "row", justifyContent: "space-between" }}>
                <FaText style={{ color: "gray" }}>{userInfo?.firstName + " " + userInfo?.lastName}</FaText>
                <FaText>لیست تسک های امروز</FaText>
            </View>
            <FaText style={{ color: "gray", fontSize: 12, marginTop: 10 }}>{today}</FaText>
            <Divider />

            <FlatList
                data={todayTasks}
                renderItem={({ item }) => (
                    <View key={item.id} style={[dashboardStyles.taskItem, {backgroundColor: item.isDone ? "palegreen" : undefined}]}>
                        <FaText>
                            <FaText style={{marginLeft: 10, color: "gray"}}>{item.taskCategory.title} : </FaText>
                            {item.title}
                        </FaText>
                    </View>
                )}
            />
        </View>
    );
};

export default Dashboard;