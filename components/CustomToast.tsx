import React from 'react';
import { ErrorToast } from 'react-native-toast-message';
import { BaseToast } from 'react-native-toast-message';
import Toast from 'react-native-toast-message';

const CustomToast = () => {
    return <Toast position='bottom' config={{
        success: (props) => (
            <BaseToast
                {...props}
                style={{ borderLeftColor: 'green' }}
                contentContainerStyle={{ paddingHorizontal: 15 }}
                text1Style={{
                    fontSize: 15,
                    fontFamily: 'irsans'
                }}
                text2Style={{
                    fontSize: 13,
                    fontFamily: 'irsans'
                }}
            />
        ),
        error: (props) => (
            <ErrorToast
                {...props}
                text1Style={{
                    fontSize: 15,
                    fontFamily: 'irsans'
                }}
                text2Style={{
                    fontSize: 13,
                    fontFamily: 'irsans'
                }}
            />
        )
    }} />

};

export default CustomToast;