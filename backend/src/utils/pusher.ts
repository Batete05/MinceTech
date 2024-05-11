import type { Verification } from "@/schema/verification";
import PushNotifications from "@pusher/push-notifications-server";

const pushNotifications = new PushNotifications({
  instanceId: process.env.PUSHER_INSTANCE_ID,
  secretKey: process.env.PUSHER_SECRET_KEY,
});

export const sendVerificationNotification = async (data: Verification) => {
  try {
    await pushNotifications.publishToInterests(["verification"], {
      apns: {
        aps: {
          alert: "Verify Payment",
        },
        data
      },
      fcm: {
        notification: {
          title: "Verification",
          body: "Verify payment",
        },
        data
      },
      web: {
        notification: {
          title: "Verification",
          body: "verify payment",
          deep_link: "http://localhost:3000/api/verify/"+data.id, // TODO: deep link
        },
        data
      },
    });
  } catch (error) {
    if (error instanceof Error) {
      console.error(error.message);
    }
  }
};
