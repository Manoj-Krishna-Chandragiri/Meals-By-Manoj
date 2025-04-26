import { exec } from 'child_process';
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';
import readline from 'readline';

// Get the directory name
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Create readline interface
const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout
});

// Create data directory if it doesn't exist
const dataDir = path.join(__dirname, 'data', 'db');
if (!fs.existsSync(dataDir)) {
    fs.mkdirSync(dataDir, { recursive: true });
    console.log(`Created MongoDB data directory: ${dataDir}`);
}

console.log("Food Delivery App Database Helper");
console.log("================================");
console.log("\nThis script helps you run MongoDB locally.");
console.log("Make sure MongoDB is installed on your system.\n");

rl.question('Do you want to start MongoDB locally? (y/n): ', (answer) => {
    if (answer.toLowerCase() === 'y' || answer.toLowerCase() === 'yes') {
        console.log("\nStarting MongoDB...");
        
        // Command to start MongoDB with the local data directory
        const mongoCommand = process.platform === 'win32' 
            ? `mongod --dbpath="${dataDir}"`
            : `mongod --dbpath="${dataDir}"`;
        
        const mongoProcess = exec(mongoCommand);
        
        mongoProcess.stdout.on('data', (data) => {
            console.log(`MongoDB: ${data}`);
        });
        
        mongoProcess.stderr.on('data', (data) => {
            console.error(`MongoDB Error: ${data}`);
        });
        
        console.log("\nMongoDB is starting in the background.");
        console.log("Now you can start the backend server with: npm run dev");
        console.log("\nPress Ctrl+C to stop MongoDB when you're done.");
        
        // Keep the script running
        process.stdin.resume();
    } else {
        console.log("\nOK. You'll need to start MongoDB separately.");
        console.log("Make sure MongoDB is running before starting the backend server.");
        rl.close();
        process.exit(0);
    }
});
