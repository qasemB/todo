import { Stack } from 'expo-router';
import React from 'react';
import { Text, View } from 'react-native';

const AddTask = () => {
    return (
        <View>
            <Stack.Screen options={{
                animation: "slide_from_bottom"
            }} />
            <Text>Add Task</Text>
        </View>
    );
};

export default AddTask;