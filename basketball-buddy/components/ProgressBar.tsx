import { View, StyleSheet } from 'react-native';

const ProgressBar = ({ progress }: { progress: number }) => {
    return (
        <View style={styles.container}>
            <View style={[styles.filler, { width: `${progress * 100}%` }]} />
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        height: 4,
        backgroundColor: '#e5e7eb',
        borderRadius: 2,
        overflow: 'hidden',
    },
    filler: {
        height: '100%',
        backgroundColor: '#fcba03',
        borderRadius: 2,
    },
});

export default ProgressBar;
