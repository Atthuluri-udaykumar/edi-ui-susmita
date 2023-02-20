import path from 'path';

let rootDir: string = process.mainModule ? path.dirname(process.mainModule!.filename) : '';
let serverPort: number = parseInt(process.env.DEPLOY_PORT || "8080"); // Set your desired port
let contextPath: string = '/edi/api';
let version: string = '0.0.1';
let jwtKey: string = process.env.JWT_KEY || "JWT_DEFAULT";

export { rootDir, serverPort, contextPath, version, jwtKey };
