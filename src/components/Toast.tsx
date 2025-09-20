import classNames from "classnames";
import { Toast } from "react-hot-toast";

export const getToast = (t: Toast, text: string) => {
  return (
    <div
      className={classNames(
        "w-fit relative flex items-center justify-center",
        `${t.visible ? "animate-enter-toast" : "animate-exit-toast"} `
      )}
    >
      <div
        className={classNames(
          "absolute top-0 left-0 bg-hot-pink text-transparent flex items-center justify-center w-full h-full rounded-lg",
          "before:absolute before:top-0 before:left-0 before:translate-x-1 before:translate-y-1 before:bg-electric-blue before:opacity-50",
          " before:absolute before:top-0 before:left-0 before:w-full before:h-full before:rounded-lg", // Glitch layer 1
          "before:translate-x-1 before:translate-y-1 before:bg-electric-blue before:opacity-50 before:z-0",
          " after:absolute after:top-0 after:left-0 after:w-full after:h-full after:rounded-lg", // Glitch layer 2
          "after:-translate-x-1 after:-translate-y-1 after:bg-white after:opacity-25 after:text-white"
        )}
      >
        {text /* This text is invisible, but its used to size the glitch div*/}
      </div>
      <div className="font-mono px-12 py-4 text-white z-50"> {text}</div>
    </div>
  );
};
