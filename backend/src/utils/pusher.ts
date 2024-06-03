import type { Verification } from "@/schema/verification";
import PushNotifications from "@pusher/push-notifications-server";
import Pusher from "pusher";

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
        data,
      },
      fcm: {
        notification: {
          title: "Verification",
          body: "Verify payment",
        },
        data,
      },
      web: {
        notification: {
          title: "Verification",
          body: "verify payment",
          deep_link: "http://localhost:3000/api/verify/" + data.id, // TODO: deep link
        },
        data,
      },
    });
  } catch (error) {
    if (error instanceof Error) {
      console.error(error.message);
    }
  }
};

const pusher = new Pusher({
  appId: "1813523",
  key: "394898683a9d77dcfab9",
  secret: "843ef9ac459df8dcfa51",
  cluster: "ap2",
  useTLS: true,
});

export const notifyVerification = async (data: Verification) => {
  pusher.trigger("verify", "verifification", data);
};
