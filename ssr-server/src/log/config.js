import path from "path";
import util from "util";

const logDirectory = path.join(process.cwd(), "logs");
const logLayout = {
  type: "pattern",
  pattern: "%d %p %c %f:%l %x{singleLine}",
  tokens: {
    singleLine: function (logEvent) {
      return logEvent.data
        .map((d) => {
          if (
            typeof d === "boolean" ||
            typeof d === "number" ||
            typeof d === "string"
          ) {
            return d.toString().replace(/\n/gm, "\\n");
          } else {
            return util
              .inspect(d, { breakLength: Infinity })
              .replace(/\n/gm, "\\n");
          }
        })
        .filter((d) => d.length > 0)
        .join(" ");
    },
  },
};

export const log4jsConfig = {
  appenders: {
    console: {
      type: "console",
      layout: logLayout,
    },
    app: {
      type: "dateFile",
      layout: logLayout,
      filename: path.join(logDirectory, "app.log"),
      pattern: "-yyyy-MM-dd",
      numBackups: 7,
      compress: true,
    },
  },
  categories: {
    default: {
      appenders: ["console", "app"],
      level: "all",
      enableCallStack: true,
    },
  },
}