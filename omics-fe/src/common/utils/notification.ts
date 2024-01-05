import { notification } from "antd";

export class Notification {
  public static success(payload: any, description = "", props?: any) {
    notification.success({
      message: payload?.title || "Success",
      description: description || payload?.message,
      duration: 5,
      ...props,
    });
  }

  public static info(payload: any, description = "", props?: any) {
    notification.info({
      message: payload?.title || "Info",
      description: description || payload?.message,
      duration: 5,
      ...props,
    });
  }

  public static error(payload: any, description = "", props?: any) {
    notification.error({
      message: payload?.title || "Error",
      description: Array.isArray(payload?.message)
        ? payload?.message.join(", ")
        : payload?.message || description,
      duration: 5,
      ...props,
    });
  }

  public static warn(payload: any, description = "", props?: any) {
    notification.warn({
      message: payload?.title || "Warning",
      description: description || payload?.message,
      duration: 5,
      ...props,
    });
  }
}
