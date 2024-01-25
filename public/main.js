const { app, BrowserWindow, ipcMain } = require("electron");
const path = require("path");
const fs = require("fs");
const { adobeExtract } = require("./helpers/adobeHelper"); // Adjust the path as necessary
const { findBalance, findValNextRow } = require("./helpers/parse"); // Adjust the path as necessary

function createWindow() {
  // Create the browser window.
  const win = new BrowserWindow({
    width: 1200,
    height: 800,
    webPreferences: {
      nodeIntegration: true,
      preload: path.join(__dirname, "preload.js"),
    },
  });

  //load the index.html from a url
  win.loadURL("http://localhost:3000");

  // Open the DevTools.
  win.webContents.openDevTools();
}

// This method will be called when Electron has finished
// initialization and is ready to create browser windows.
// Some APIs can only be used after this event occurs.
app.whenReady().then(createWindow);

// Quit when all windows are closed, except on macOS. There, it's common
// for applications and their menu bar to stay active until the user quits
// explicitly with Cmd + Q.
app.on("window-all-closed", () => {
  if (process.platform !== "darwin") {
    app.quit();
  }
});

app.on("activate", () => {
  // On macOS it's common to re-create a window in the app when the
  // dock icon is clicked and there are no other windows open.

  if (BrowserWindow.getAllWindows().length === 0) {
    createWindow();
  }
});

// This lister recieves a files and upload it to the uploads folder
ipcMain.handle("upload-file", (event, filePath) => {
  const uploadsDir = path.join(__dirname, "uploads");
  const fileName = path.basename(filePath);
  const destPath = path.join(uploadsDir, fileName);

  fs.copyFile(filePath, destPath, (err) => {
    if (err) {
      return err;
    }
    return "Uploaded";
  });
});

// This lister makes use of adobe's api to extract data and then manually parse the data
ipcMain.handle("adobe-extract", async (event, fileName) => {
  // Adobe Extract API
  const data = await adobeExtract(fileName);
  console.log(data)
  
  // const date = findValNextRow(data, "date");
  // const invoice = findValNextRow(data, "invoice");
  // const balance = findBalance(data);
  // console.log("Date: ", date);
  // console.log("Invoice Number: ", invoice);
  // console.log("Due Balance: ", balance);
});

// Function to get the path to the public folder
// function getPublicFolderPath() {
//   // Check if the app is in development or production mode
//   if (process.env.NODE_ENV === 'development') {
//       // Path when in development (assuming public folder is at project root)
//       return path.join(__dirname, '..', 'public');
//   } else {
//       // Path when in production (assuming public folder is in the resources directory of the packaged app)
//       return path.join(process.resourcesPath, 'public');
//   }
// }
