import * as Notifications from "expo-notifications";
import { useEffect, useRef } from "react";

// (Notification handler setup remains the same)
Notifications.setNotificationHandler({
    handleNotification: async () => ({
        shouldShowAlert: true,
        shouldPlaySound: true,
        shouldSetBadge: false,
    }),
});

export default function NotificationsHandler() {
    const notificationListener = useRef();
    const responseListener = useRef();

    useEffect(() => {
        (async () => {
            const { status } = await Notifications.requestPermissionsAsync();
            if (status !== "granted") {
                console.log("Notification permissions not granted!");
            }
        })();

        // Add listeners and save the subscription object
        notificationListener.current = Notifications.addNotificationReceivedListener(notification => {
            console.log("Received notification:", notification);
        });

        responseListener.current = Notifications.addNotificationResponseReceivedListener(response => {
            console.log("Notification tapped:", response);
        });

        // Remove subscriptions on unmount using `.remove()`
        return () => {
            notificationListener.current && notificationListener.current.remove();
            responseListener.current && responseListener.current.remove();
        };
    }, []);

    return null;
}
