import { View, Text, TouchableOpacity, StyleSheet } from "react-native";
import { useNavigation } from "@react-navigation/native";
import { Ionicons } from "@expo/vector-icons";
import {
    COLORS,
    SPACING,
    FONT_SIZE,
    createShadow,
    BORDER_RADIUS,
} from "../theme";

const CustomHeader = ({
    title = "Screen Title",
    showBackButton = true,
    onBackPress,
}: {
    title?: string;
    showBackButton?: boolean;
    onBackPress?: () => void;
}) => {
    const navigation = useNavigation();

    const handleBackPress = () => {
        if (onBackPress) {
            onBackPress();
        } else {
            navigation.goBack();
        }
    };

    return (
        <View style={styles.headerContainer}>
            {showBackButton ? (
                <TouchableOpacity
                    style={styles.backButton}
                    onPress={handleBackPress}
                    activeOpacity={0.7}
                >
                    <Ionicons name="arrow-back" size={24} color={COLORS.textPrimary} />
                </TouchableOpacity>
            ) : (
                <View style={styles.placeholder} />
            )}

            <Text style={styles.headerTitle}>{title}</Text>
            {/* Empty view for layout balance */}
            <View style={styles.placeholder} />
        </View>
    );
};

const styles = StyleSheet.create({
    headerContainer: {
        marginTop: 50,
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "space-between",
        backgroundColor: COLORS.background,
        paddingHorizontal: SPACING.md,
        paddingVertical: SPACING.sm,
        borderBottomWidth: 1,
        borderBottomColor: COLORS.borderColor,
        ...createShadow(2),
    },
    backButton: {
        width: 44,
        height: 44,
        justifyContent: "center",
        alignItems: "center",
        borderRadius: BORDER_RADIUS.round,
    },
    headerTitle: {
        fontSize: FONT_SIZE.lg,
        fontWeight: 700,
        flex: 1,
        textAlign: "center",
        color: COLORS.textPrimary,
    },
    placeholder: {
        width: 44,
    },
});

export default CustomHeader;
