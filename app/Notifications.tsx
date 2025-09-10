import * as Notifications from "expo-notifications";
import { useEffect, useRef } from "react";

// Configure notifications behavior
Notifications.setNotificationHandler({
    handleNotification: async () => ({
        shouldShowAlert: true,
        shouldPlaySound: true,
        shouldSetBadge: false,
    }),
});

export default function NotificationsHandler() {
    const notificationListener = useRef<any>();
    const responseListener = useRef<any>();

    useEffect(() => {
        // Request permissions
        (async () => {
            const { status } = await Notifications.requestPermissionsAsync();
            if (status !== "granted") {
                console.log("Notification permissions not granted!");
            }
        })();

        // Foreground notifications
        notificationListener.current = Notifications.addNotificationReceivedListener(notification => {
            console.log("Received notification:", notification);
        });

        // When user taps on notification
        responseListener.current = Notifications.addNotificationResponseReceivedListener(response => {
            console.log("Notification tapped:", response);
        });

        return () => {
            Notifications.removeNotificationSubscription(notificationListener.current);
            Notifications.removeNotificationSubscription(responseListener.current);
        };
    }, []);

    return null; // invisible component
}
