import FaText from '@/components/FaText';
import { useAsyncMethod } from '@/hooks/asyncMethodsHook';
import { useCalendar } from '@/hooks/calendarHook';
import { getTasksInRangeService } from '@/services/tasks';
import { TasksListItemsType } from '@/types/task';
import { CalendarDay } from '@/utils/dateUtils';
import { Entypo } from '@expo/vector-icons';
import { useRouter } from 'expo-router';
import React, { Fragment, useEffect, useMemo, useState } from 'react';
import { Pressable, StyleSheet, Text, View } from 'react-native';

interface ICalendarDayIncludeData extends CalendarDay {
    tasks: TasksListItemsType[]
}


const Calendar = () => {
    const router = useRouter()
    const [tasks, setTasks] = useState<TasksListItemsType[]>([])
    const { days, handleCurrentMonth, handleNextMonth, handlePrevMonth, weeks, currentMonthName } = useCalendar()

    const { isLoading, runMethod: getTasksService } = useAsyncMethod(async () => {
        const startFrom = days[0].dateGregorian
        const endAt = days[days.length - 1].dateGregorian
        const res = await getTasksInRangeService(startFrom, endAt)
        if (res) {
            setTasks(res)
        }
    })

    useEffect(() => {
        if (days.length) getTasksService()
    }, [days])

    const handleCpmpareTodatByDate = (day: CalendarDay) => {
        const today = new Date().toISOString().split("T")[0]
        const selectedDate = day.dateGregorian.replaceAll("/", "-")
        return today == selectedDate
    }

    const weeksIncludeData: (ICalendarDayIncludeData | undefined)[][] = useMemo(() => {
        const newWeeks: (ICalendarDayIncludeData | undefined)[][] = []
        for (const week of weeks) {
            const newWeek: (ICalendarDayIncludeData | undefined)[] = []
            for (const day of week) {
                if (day) {
                    const newDay: ICalendarDayIncludeData = {
                        ...day,
                        tasks: tasks.filter(q => {
                            const taskDate = new Date(q.startedAt).toISOString().split("T")[0]
                            const dayDate = day.dateGregorian.replaceAll("/", "-")
                            return taskDate === dayDate
                        })
                    }

                    newWeek.push(newDay)
                }
                else newWeek.push(undefined)
            }
            newWeeks.push(newWeek)
        }
        return newWeeks
    }, [weeks, tasks])

    const handleDayPress = (day: ICalendarDayIncludeData) => {
        try {
            router.push({
                pathname: '/dashboard',
            params: {
                startedAt: day.dateGregorian.replaceAll("/", "-"),
                tasks: JSON.stringify(day.tasks)
                }
            })
        } catch (error) {
            console.log(error);
        }
    }



    return (
        <View style={styles.container}>
            <View style={styles.monthContainer}>
                <FaText>ماه : {currentMonthName}</FaText>
            </View>
            <View style={styles.gridContainer}>
                {/* سرستون روزهای هفته */}
                <FaText style={styles.headerText}>ش</FaText>
                <FaText style={styles.headerText}>1ش</FaText>
                <FaText style={styles.headerText}>2ش</FaText>
                <FaText style={styles.headerText}>3ش</FaText>
                <FaText style={styles.headerText}>4ش</FaText>
                <FaText style={styles.headerText}>5ش</FaText>
                <FaText style={styles.headerText}>ج</FaText>

                {/* روزهای ماه */}
                {weeksIncludeData.map((week, index) => (
                    <Fragment key={index}>
                        {week.map((day, jindex) => day ? (
                            <Pressable
                                onPress={() => handleDayPress(day)}
                                style={[
                                    styles.dayContainer,
                                    isLoading && styles.loading,
                                    handleCpmpareTodatByDate(day) && styles.today
                                ]}
                                key={day.dateJalali}
                            >
                                <FaText style={styles.dayText}>{day.day}</FaText>
                                {/* <FaText style={styles.taskCount}>{day.tasks.length}</FaText> */}
                                <View style={styles.taskDotsContainer}>
                                    {day.tasks.map(t => (
                                        <View
                                            style={[
                                                styles.dotes,
                                                { backgroundColor: t.isDone ? '#10B981' : '#9CA3AF' }
                                            ]}
                                            key={t.id + "_tasks_dotes"}
                                        />
                                    ))}
                                </View>
                            </Pressable>
                        ) : (
                            <View style={styles.emptyDayContainer} key={jindex + "_empty"}>
                            </View>
                        ))}
                    </Fragment>
                ))}
            </View>

            <View style={styles.navigationContainer}>
                <FaText style={styles.navigationButton} onPress={handlePrevMonth}>ماه قبل</FaText>
                <FaText style={[styles.navigationButton, styles.currentMonthButton]} onPress={handleCurrentMonth}>ماه جاری</FaText>
                <FaText style={styles.navigationButton} onPress={handleNextMonth}>ماه بعد</FaText>
            </View>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        backgroundColor: "#fff",    
        flex: 1,
        padding: 7,
    },
    monthContainer: {
        marginBottom: 16,
    },
    gridContainer: {
        direction: "rtl",
        flexDirection: 'row-reverse',
        flexWrap: 'wrap',
        justifyContent: 'space-between',
    },
    headerText: {
        textAlign: 'center',
        fontSize: 14,
        width: '14.28%', // 100% / 7 days
        marginBottom: 10
    },
    dayContainer: {
        borderWidth: 1,
        borderColor: '#D1D5DB',
        textAlign: 'center',
        borderRadius: 8,
        minHeight: 56,
        justifyContent: 'center',
        alignItems: 'center',
        position: 'relative',
        width: '14.28%', // 100% / 7 days
    },
    loading: {
        opacity: 0.5,
    },
    today: {
        borderColor: '#38BDF8',
        borderWidth: 4,
    },
    dayText: {
        position: 'absolute',
        top: 4,
        right: 12,
        color: '#9CA3AF',
    },
    taskCount: {
        position: 'absolute',
        bottom: 4,
        left: 12,
    },
    taskDotsContainer: {
        position: 'absolute',
        bottom: 4,
        left: 12,
        flexDirection: 'row',
        gap: 4,
        flexWrap: "wrap",
        maxWidth: '80%', // Prevent dots from overflowing
        right: 12 // Add right constraint to contain dots
    },
    dotes: {
        width: 4,
        height: 4,
        borderRadius: 4,
    },
    emptyDayContainer: {
        borderWidth: 1,
        borderColor: '#D1D5DB',
        padding: 16,
        textAlign: 'center',
        borderRadius: 8,
        minHeight: 56,
        opacity: 0.3,
        width: '14.28%', // 100% / 7 days
    },
    navigationContainer: {
        flexDirection: 'row-reverse',
        justifyContent: 'center',
        alignItems: 'center',
        marginTop: 40,
    },
    navigationButton: {
        borderWidth: 1,
        borderColor: '#D1D5DB',
        borderRadius: 50,
        paddingVertical: 8,
        paddingHorizontal: 16,
        marginHorizontal: 8,
        textAlign: 'center',
    },
    currentMonthButton: {
        marginHorizontal: 16,
    },
});

export default Calendar;