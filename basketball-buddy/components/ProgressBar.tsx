import { View, StyleSheet } from 'react-native';
import { COLORS, BORDER_RADIUS } from '../theme';

const ProgressBar = ({ progress, color }: { progress: number, color?: string }) => {
    return (
        <View style={styles.container}>
            <View 
                style={[
                    styles.filler, 
                    { width: `${progress * 100}%` },
                    color && { backgroundColor: color }
                ]} 
            />
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        height: 6,
        backgroundColor: COLORS.cardBackground,
        borderRadius: BORDER_RADIUS.sm,
        overflow: 'hidden',
    },
    filler: {
        height: '100%',
        backgroundColor: COLORS.primaryAccent,
        borderRadius: BORDER_RADIUS.sm,
    },
});

export default ProgressBar;
