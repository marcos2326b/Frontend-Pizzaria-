type ToastStatus = "success" | "error" | "warning";

interface FormResult {
  status: ToastStatus;
  message: string;
}
