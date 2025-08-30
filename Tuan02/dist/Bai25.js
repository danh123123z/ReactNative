"use strict";
// 25. Simulate downloading a file in 3 seconds.
async function downloadFile() {
    await new Promise(resolve => setTimeout(resolve, 3000));
    console.log("File downloaded");
}
downloadFile();
