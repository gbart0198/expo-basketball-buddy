import React from 'react';
import { ViewProps, StyleSheet } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

const PaddedSafeAreaView: React.FC<ViewProps> = ({
    style,
    children,
    ...props
}) => {
    return (
        <SafeAreaView style={[styles.container, style]} {...props}>
            {children}
        </SafeAreaView>
    );
};

const styles = StyleSheet.create({
    container: {
        padding: 16,
    },
});

export default PaddedSafeAreaView;
