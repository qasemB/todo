import FaText from '@/components/FaText';
import FaTextInput from '@/components/form/FaTextInput';
import FormInput from '@/components/form/formik/FormInput';
import { createTaskFormValidationSchema } from '@/constants/schema/addTask';
import { useGetTaskCatsQuery } from '@/queries/taskCats';
import { CreateTaskReqParamsType } from '@/types/task';
import { TaskCategoryListItemsType } from '@/types/taskCat';
import { convertMiladi2Jalali } from '@/utils/dateUtils';
import { Picker } from '@react-native-picker/picker';
import { BottomSheet } from '@rneui/themed';
import { Stack, useRouter } from 'expo-router';
import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import { ActivityIndicator, KeyboardAvoidingView, Platform, Pressable, ScrollView, StyleSheet, ToastAndroid, View } from 'react-native';
import DatePicker, { getFormatedDate } from 'react-native-modern-datepicker';
import moment from 'jalali-moment';
import { handleConfirmCreateTask } from '@/services/tasks';
import { useAsyncMethod } from '@/hooks/asyncMethodsHook';
import Toast from 'react-native-toast-message';
import { errorToast, successToast } from '@/utils/toast';

moment.locale("fa-IR");


const AddTask = () => {
    const router = useRouter()
    const [isBottomSheetVisible, setIsBottomSheetVisible] = useState(false);
    const [inProgressDate, setInProgressDate] = useState<string | null>(null);
    const [selectedDate, setSelectedDate] = useState<keyof CreateTaskReqParamsType>();

    const { data } = useGetTaskCatsQuery()
    const taskCats: TaskCategoryListItemsType[] = data

    const { control, handleSubmit, formState: { errors }, setValue, getValues } = useForm<CreateTaskReqParamsType>({
        resolver: createTaskFormValidationSchema
    })

    const handleSubmitDate = () => {
        setIsBottomSheetVisible(false)
        setValue(selectedDate!, inProgressDate, { shouldValidate: true })
    }

    const { isLoading, runMethod: onSubmit } = useAsyncMethod(async (values: CreateTaskReqParamsType) => {
        const startedAtGregorian = moment(values.startedAt, 'jYYYY/jMM/jDD HH:mm').format('YYYY-MM-DD') + "T00:00:00.000Z";
        const endedAtGregorian = moment(values.endedAt, 'jYYYY/jMM/jDD HH:mm').format('YYYY-MM-DD') + "T00:00:00.000Z";


        const newVals = {
            ...values,
            startedAt: startedAtGregorian,
            endedAt: endedAtGregorian,
            repetitionItems: parseInt("" + values?.repetitionItems) || 0,
            repetitionType: parseInt("" + values?.repetitionType) || 0
        }

        const res = await handleConfirmCreateTask(newVals)
        if (res.status === 200 || res.status === 201) {
            successToast()
            router.push("/dashboard")
        }
    })

    return (
        <KeyboardAvoidingView
            behavior={Platform.OS === "ios" ? "padding" : "height"}
            style={styles.container}
        >
            <ScrollView style={styles.scrollView}>
                <View style={styles.contentWrapper}>
                    <Stack.Screen options={{ animation: "slide_from_bottom" }} />
                    <FaText style={styles.pageTitle}>افزودن تسک جدید</FaText>
                    <View style={styles.formGroup}>
                        <FaText>دسته بندی</FaText>
                        <View style={styles.pickerContainer}>
                            <Picker
                                style={styles.picker}
                                selectedValue={getValues("taskCategoryId")}
                                onValueChange={(itemValue, itemIndex) => setValue("taskCategoryId", itemValue, { shouldValidate: true })}
                            >
                                {taskCats?.map(taskCat => (
                                    <Picker.Item key={taskCat.id} label={taskCat.title} value={taskCat.id} />
                                ))}
                            </Picker>
                        </View>
                        {errors.taskCategoryId && <FaText style={styles.errorText}>{errors.taskCategoryId.message}</FaText>}
                    </View>
                    <View style={styles.formGroup}>
                        <FaText>عنوان</FaText>
                        <FormInput control={control} name={"title"} placeholder="حروف فارسی انگلیسی و اعداد" />
                        {errors.title && <FaText style={styles.errorText}>{errors.title.message}</FaText>}
                    </View>
                    <View style={styles.formGroup}>
                        <FaText>توضیحات</FaText>
                        <FormInput control={control} name={"description"} placeholder="حروف فارسی انگلیسی و اعداد" />
                        {errors.description && <FaText style={styles.errorText}>{errors.description.message}</FaText>}
                    </View>
                    <View style={styles.datePickerRow}>
                        <View style={styles.datePickerRight}>
                            <Pressable style={styles.datePickerButton} onPress={() => { setIsBottomSheetVisible(true); setSelectedDate("endedAt") }}>
                                <FaText>{getValues("endedAt") || 'تاریخ پایان'}</FaText>
                            </Pressable>
                            {errors.endedAt && <FaText style={styles.errorText}>{errors?.endedAt?.message as string}</FaText>}
                        </View>
                        <FaText style={{ marginHorizontal: 5 }}>تا</FaText>
                        <View style={styles.datePickerLeft}>
                            <Pressable style={styles.datePickerButton} onPress={() => { setIsBottomSheetVisible(true); setSelectedDate("startedAt") }}>
                                <FaText>{getValues("startedAt") || 'تاریخ شروع'}</FaText>
                            </Pressable>
                            {errors.startedAt && <FaText style={styles.errorText}>{errors?.startedAt?.message as string}</FaText>}
                        </View>
                    </View>
                    <View style={styles.repetitionRow}>
                        <View style={styles.repetitionRight}>
                            <FaText>چند روز در میان</FaText>
                            <FormInput keyboardType='numeric' control={control} name={"repetitionType"} placeholder="عدد" style={styles.numericInput} />
                            {errors.repetitionType && <FaText style={styles.errorText}>{errors.repetitionType.message}</FaText>}
                        </View>
                        <View style={styles.repetitionLeft}>
                            <FaText>تعداد تکرار</FaText>
                            <FormInput keyboardType='numeric' control={control} name={"repetitionItems"} placeholder="عدد" style={styles.numericInput} />
                            {errors.repetitionItems && <FaText style={styles.errorText}>{errors.repetitionItems.message}</FaText>}
                        </View>
                    </View>

                    <View style={styles.submitButtonContainer}>
                        <Pressable
                            android_ripple={{ color: '#2196F3' }}
                            style={styles.submitButton}
                            onPress={handleSubmit(onSubmit)}
                            disabled={isLoading}
                        >

                            {isLoading ? <ActivityIndicator size="small" color="#007AFF" /> : <FaText style={styles.submitButtonText}>ثبت</FaText>}
                        </Pressable>
                    </View>
                </View>
            </ScrollView>

            <BottomSheet
                modalProps={{}}
                isVisible={isBottomSheetVisible}
                onBackdropPress={() => setIsBottomSheetVisible(false)}
            >
                <View style={styles.bottomSheetContent}>
                    <FaText>تاریخ</FaText>

                    <DatePicker
                        style={styles.datePicker}
                        isGregorian={false}
                        mode="calendar"
                        options={{
                            defaultFont: 'irsans',
                        }}
                        onSelectedChange={date => setInProgressDate(date)}
                        selected={getFormatedDate(new Date(), 'jYYYY/jMM/jDD')}
                    />

                    <Pressable
                        style={styles.confirmButton}
                        onPress={handleSubmitDate}
                    >
                        <FaText style={styles.confirmButtonText}>تایید</FaText>
                    </Pressable>
                </View>
            </BottomSheet>
        </KeyboardAvoidingView>
    );
};

export default AddTask;

const styles = StyleSheet.create({
    container: {
        flex: 1
    },
    scrollView: {
        flex: 1,
        backgroundColor: "white"
    },
    contentWrapper: {
        gap: 15,
        padding: 15
    },
    pageTitle: {
        fontSize: 20
    },
    formGroup: {
        gap: 7
    },
    pickerContainer: {
        height: 40,
        borderWidth: 1,
        borderColor: "gray",
        borderRadius: 5,
        justifyContent: 'center'
    },
    picker: {
        height: 40,
        textAlign: "right"
    },
    datePickerRow: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        marginTop: 20,
        alignItems: 'center'
    },
    datePickerLeft: {
        flex: 1,
    },
    datePickerRight: {
        flex: 1,
    },
    datePickerButton: {
        height: 40,
        borderWidth: 1,
        borderColor: "gray",
        borderRadius: 5,
        padding: 5,
        justifyContent: 'center',
        alignItems: 'center'
    },
    repetitionRow: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        marginTop: 20
    },
    repetitionLeft: {
        flex: 1,
        marginLeft: 5,
        gap: 8
    },
    repetitionRight: {
        flex: 1,
        marginRight: 5,
        gap: 8
    },
    numericInput: {
        textAlign: 'center'
    },
    bottomSheetContent: {
        gap: 7,
        borderTopLeftRadius: 20,
        borderTopRightRadius: 20,
        backgroundColor: "white",
        padding: 20
    },
    datePicker: {
        backgroundColor: "transparent"
    },
    confirmButton: {
        backgroundColor: "#007AFF",
        borderRadius: 50,
        padding: 15,
        alignItems: 'center'
    },
    confirmButtonText: {
        color: "white",
        fontWeight: "bold"
    },
    submitButtonContainer: {
        marginTop: 20,
        borderRadius: 50,
        overflow: 'hidden',
        borderColor: "#007AFF",
        borderWidth: 1
    },
    submitButton: {
        padding: 15,
        alignItems: 'center'
    },
    submitButtonPressed: {
        backgroundColor: 'rgba(0, 122, 255, 0.1)'
    },
    submitButtonText: {
        color: "#007AFF",
        fontSize: 16
    },
    errorText: {
        color: 'red',
        fontSize: 12
    }
});
