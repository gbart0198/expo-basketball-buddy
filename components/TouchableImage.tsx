import { Image } from "expo-image";
import { TouchableOpacity } from "react-native";
import { createShadow } from "@/theme";

const TouchableImage = ({
    source,
    style,
    containerStyle,
    onPress,
    activeOpacity = 0.8,
    ...imageProps
}: {
    source: any;
    style?: object;
    containerStyle?: object;
    onPress: () => void;
    activeOpacity?: number;
    imageProps?: object;
}) => {
    return (
        <TouchableOpacity
            style={[{ ...createShadow(2) }, containerStyle]}
            onPress={onPress}
            activeOpacity={activeOpacity}
        >
            <Image
                source={source}
                style={style}
                {...imageProps}
            />
        </TouchableOpacity>
    )
};

export default TouchableImage;
