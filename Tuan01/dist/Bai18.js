"use strict";
// 18. Create a static class MathUtil with methods add(), subtract(), multiply(), divide().
Object.defineProperty(exports, "__esModule", { value: true });
exports.MathUtil = void 0;
class MathUtil {
    static add(a, b) {
        return a + b;
    }
    static subtract(a, b) {
        return a - b;
    }
    static multiply(a, b) {
        return a * b;
    }
    static divide(a, b) {
        if (b === 0) {
            throw new Error("Không thể chia cho 0");
        }
        return a / b;
    }
}
exports.MathUtil = MathUtil;
