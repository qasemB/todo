import { AntDesign } from '@expo/vector-icons';
import AnimatedContainer from '@/components/animated/AnimatedContainer';
import { Pressable } from 'react-native';
import { changeTaskIsDoneService, deleteTaskService } from '@/services/tasks';
import { RefetchType } from '@/hooks/reactQueryHook';
import { TasksListItemsType } from '@/types/task';

type TaskActionType = {
    refetch: RefetchType
    setSelectedTask: (item: TasksListItemsType | undefined) => void
    selectedTask: TasksListItemsType | undefined
}

const TaskAction = ({refetch, setSelectedTask, selectedTask}:TaskActionType) => {
    const handleChangeIsDone = async () => {
        const res = await changeTaskIsDoneService(selectedTask!)
        if (res.status === 200 || res.status === 201) {
            refetch()
            setSelectedTask(undefined)
        }
    }

    const handleDeleteTask = async () => {
        const res = await deleteTaskService(selectedTask?.id!)
        if (res.status === 200 || res.status === 201) {
            refetch()
            setSelectedTask(undefined)
        }
    }
    return (
        <AnimatedContainer isVisible={!!selectedTask}>
        <Pressable
            style={{
                backgroundColor: '#F44336',
                borderRadius: 25,
                padding: 15,
            }}
            onPress={handleDeleteTask}
        >
            <AntDesign name="delete" size={24} color="white" />
        </Pressable>

        <Pressable
            style={{
                backgroundColor: 'gray',
                borderRadius: 25,
                padding: 15,
                marginHorizontal: 20
            }}
            onPress={() => {
                setSelectedTask(undefined);
            }}
        >
            <AntDesign name="close" size={24} color="white" />
        </Pressable>

        <Pressable
            style={{
                backgroundColor: '#4CAF50',
                borderRadius: 25,
                padding: 15,
            }}
            onPress={handleChangeIsDone}
        >
            <AntDesign name="check" size={24} color="white" />
        </Pressable>
    </AnimatedContainer>
    );
};

export default TaskAction;