import "../node_modules/react-notifications/lib/notifications.css";
import { NotificationManager } from "react-notifications";

const showErrorMessage = (message) => {
	NotificationManager.error(message, "Error", 5000);
};
const showSuccessMessage = (message) => {
	NotificationManager.success(message, "Message", 3000);
};

export { showErrorMessage, showSuccessMessage };
