import Toast from "vue3-toast-single";

export const showToast = (message, className) => {
  const toast = new Toast({
    horizontalPosition: "right",
    verticalPosition: "top",
    duration: 2000,
    closeable: false,
    transition: "slide-right",
    className: className,
  });

  toast.show(message);
};
