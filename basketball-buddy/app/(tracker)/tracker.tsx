import {
    StyleSheet,
    View,
    Platform,
    Dimensions,
} from "react-native";

import PaddedSafeAreaView from "@/components/PaddedSafeAreaView";
import SessionActions from "@/components/SessionActions";
import ShootingSession from "@/components/ShootingSession";
import BasketballCourt from "@/components/BasketballCourt";
import { useState, useEffect } from "react";

interface Shot {
    x: number;
    y: number;
    made: boolean;
    timestamp: string;
}

export default function ShotTrackerView() {
    const [isDesktop, setIsDesktop] = useState(false);
    const [shots, setShots] = useState<Shot[]>([]);
    const [dimensions, setDimensions] = useState({
        window: Dimensions.get("window"),
    });

    const madeShots = shots.filter((shot) => shot.made).length;
    const attemptedShots = shots.length; // this includes both made and missed shots
    const shootingPercentage =
        attemptedShots === 0 ? 0 : Math.round((madeShots / attemptedShots) * 100);

    useEffect(() => {
        setIsDesktop(Platform.OS === "web" && dimensions.window.width > 768);

        const subscription = Dimensions.addEventListener("change", ({ window }) => {
            setDimensions({ window });
            setIsDesktop(Platform.OS === "web" && window.width > 768);
        });

        return () => subscription?.remove();
    }, [dimensions.window]);

    const onShotConfirmed = (shot: Shot) => {
        setShots([...shots, shot]);
    }


    return (
        <PaddedSafeAreaView style={styles.screen}>
            <View style={isDesktop ? styles.desktopLayout : styles.mobileLayout}>
                <ShootingSession
                    madeShots={madeShots}
                    attemptedShots={attemptedShots}
                    shootingPercentage={shootingPercentage}
                />
                <BasketballCourt isDesktop={isDesktop} shots={shots} onShotConfirmed={onShotConfirmed} />
                <SessionActions />
            </View>
        </PaddedSafeAreaView>
    );
}

const styles = StyleSheet.create({
    screen: {
        backgroundColor: "#76a6f5",
        flex: 1,
    },
    mobileLayout: {
        flex: 1,
        flexDirection: "column",
    },
    desktopLayout: {
        flex: 1,
        flexDirection: "column",
        maxWidth: 1200,
        marginHorizontal: "auto",
        paddingHorizontal: 16,
    },
});
