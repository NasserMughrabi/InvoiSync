const { app, BrowserWindow, ipcMain } = require("electron");
const path = require("path");
const Tesseract = require("tesseract.js");
const fs = require("fs");
// import * as pdf from 'pdfjs-dist';


function createWindow() {
  // Create the browser window.
  const win = new BrowserWindow({
    width: 800,
    height: 600,
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

// In this file you can include the rest of your app's specific main process
// code. You can also put them in separate files and require them here.

ipcMain.handle("upload-file", (event, filePath) => {
  const uploadsDir = path.join(__dirname, "uploads");
  const fileName = path.basename(filePath);
  const destPath = path.join(uploadsDir, fileName);

  fs.copyFile(filePath, destPath, (err) => {
    if (err) {
      console.error("Error saving file:", err);
      // Send error response back to renderer process
      //   event.reply("upload-file-response", "error");
      return;
    }
    // Send success response back to renderer process
    // event.reply("upload-file-response", "success");
  });
});

ipcMain.handle("convert-pdf-to-images", async (event, pdfPath) => {
  // Dynamically import the PDF.js module
  const pdfjsLib = await import("pdfjs-dist/build/pdf.mjs");
  pdfjsLib.GlobalWorkerOptions.workerSrc = "pdfjs-dist/build/pdf.worker.mjs";

  // constructing the path
  pdfPath = path.join(__dirname, "uploads", pdfPath);
  console.log(pdfPath);

  // Loading the PDF file
  // const loadingTask = pdfjsLib.PDFDocument.load(fs.readFileSync(pdfPath));
  const loadingTask = pdfjsLib.getDocument(pdfPath);
  const pdf = await loadingTask.promise;

  // console.log("pdf", pdf)
  const numPages = pdf.numPages;
  const pages = [];
  const viewports = []
  for (let pageNum = 1; pageNum <= numPages; pageNum++) {
    const page = await pdf.getPage(pageNum);
    const viewport = page.getViewport({ scale: 1.5 });
    viewports.push(viewport);
  }

  const pdfInfo = {
    numPages: numPages,
    viewports: viewports,
    // pages: pages,
  };

  return pdfInfo;

  // const numPages = pdf.numPages;

  // const images = [];

  // for (let pageNum = 1; pageNum <= numPages; pageNum++) {
  //   const page = await pdf.getPage(pageNum);
  //   const viewport = page.getViewport({ scale: 1.5 });

  //   // Prepare a canvas for rendering.
  //   const canvas = document.createElement("canvas");
  //   canvas.width = viewport.width;
  //   canvas.height = viewport.height;

  //   const ctx = canvas.getContext("2d");

  //   const renderContext = {
  //     canvasContext: ctx,
  //     viewport: viewport,
  //   };

  //   await page.render(renderContext).promise;

  //   // Convert canvas to an image format (e.g., PNG)
  //   images.push(canvas.toDataURL("image/png"));
  // }

  // return images;
});

ipcMain.handle("perform-ocr", async (event, imagePath) => {
  console.log("OCRrRRRR")
  try {
    const {
      data: { text },
    } = await Tesseract.recognize(imagePath, "eng");
    console.log("return text", imagePath)
    return text; // Returns the extracted text from the image
  } catch (error) {
    console.error("Error during OCR:", error);
    return ""; // Return empty string on error
  }
});
