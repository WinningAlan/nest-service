"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getEnvConfig = void 0;
const fs = require("node:fs");
const path = require("node:path");
const isPord = process.env.NODE_ENV === 'production';
const getEnvConfig = () => {
    const localPath = path.resolve(__dirname, '../.env.dev');
    const prodPath = path.resolve(__dirname, '../.env.prod');
    console.log(localPath, prodPath);
    if (!fs.existsSync(localPath) || !fs.existsSync(prodPath)) {
        throw new Error('未找到环境配置文件');
    }
    return isPord && fs.existsSync(prodPath) ? prodPath : localPath;
};
exports.getEnvConfig = getEnvConfig;
//# sourceMappingURL=env.js.map