"use strict";
// 17. Write a singleton Logger class that logs messages to console.
class Logger {
    constructor() { }
    static getInstance() {
        if (!Logger.instance) {
            Logger.instance = new Logger();
        }
        return Logger.instance;
    }
    log(message) {
        console.log(`[LOG]: ${message}`);
    }
    error(message) {
        console.error(`[ERROR]: ${message}`);
    }
    warn(message) {
        console.warn(`[WARN]: ${message}`);
    }
}
const logger1 = Logger.getInstance();
const logger2 = Logger.getInstance();
logger1.log("Day la log");
logger2.error("Day la loi");
