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
  console.log(data);

  // const date = findValNextRow(data, "date invoiced");
  // const invoice = findValNextRow(data, "invoice number");
  // const balance = findBalance(data, "");
  // console.log("Date: ", date);
  // console.log("Invoice Number: ", invoice);
  // console.log("Due Balance: ", balance);
});

//   elements: [
//     {
//       Bounds: [Array],
//       Font: [Object],
//       HasClip: false,
//       Lang: 'en',
//       Page: 0,
//       Path: '//Document/Sect/P',
//       Text: 'SKJ CONSTRUCTION ',
//       TextSize: 12,
//       attributes: [Object]
//     },
//     {
//       Bounds: [Array],
//       Font: [Object],
//       HasClip: false,
//       Page: 0,
//       Path: '//Document/Sect/P[2]/Sub',
//       Text: 'HC 60BOX226 ',
//       TextSize: 12,
//       attributes: [Object]
//     },
//     {
//       Bounds: [Array],
//       Font: [Object],
//       HasClip: false,
//       Page: 0,
//       Path: '//Document/Sect/P[2]/Sub[2]',
//       Text: 'MONA, UT 84645 ',
//       TextSize: 12,
//       attributes: [Object]
//     },
//     {
//       Bounds: [Array],
//       ClipBounds: [Array],
//       Page: 0,
//       Path: '//Document/Sect/Figure',
//       attributes: [Object]
//     },
//     {
//       Bounds: [Array],
//       ClipBounds: [Array],
//       Page: 0,
//       Path: '//Document/Sect/Figure',
//       attributes: [Object]
//     },
//     {
//       Bounds: [Array],
//       Font: [Object],
//       HasClip: false,
//       Lang: 'no',
//       Page: 0,
//       Path: '//Document/Sect/Title',
//       Text: 'Invoice ',
//       TextSize: 20.5,
//       attributes: [Object]
//     },
//     {
//       Bounds: [Array],
//       Page: 0,
//       Path: '//Document/Sect/Table',
//       attributes: [Object]
//     },
//     {
//       Bounds: [Array],
//       Page: 0,
//       Path: '//Document/Sect/Table/TR/TD',
//       attributes: [Object]
//     },
//     {
//       Bounds: [Array],
//       Font: [Object],
//       HasClip: false,
//       Lang: 'no',
//       Page: 0,
//       Path: '//Document/Sect/Table/TR/TD/P',
//       Text: 'Date ',
//       TextSize: 9,
//       attributes: [Object]
//     },
//     {
//       Bounds: [Array],
//       Page: 0,
//       Path: '//Document/Sect/Table/TR/TD[2]',
//       attributes: [Object]
//     },
//     {
//       Bounds: [Array],
//       Font: [Object],
//       HasClip: false,
//       Lang: 'no',
//       Page: 0,
//       Path: '//Document/Sect/Table/TR/TD[2]/P',
//       Text: 'Invoice# ',
//       TextSize: 9,
//       attributes: [Object]
//     },
//     {
//       Bounds: [Array],
//       Page: 0,
//       Path: '//Document/Sect/Table/TR[2]/TD',
//       attributes: [Object]
//     },
//     {
//       Bounds: [Array],
//       Font: [Object],
//       HasClip: false,
//       Lang: 'no',
//       Page: 0,
//       Path: '//Document/Sect/Table/TR[2]/TD/P',
//       Text: '4/21/2022 ',
//       TextSize: 9,
//       attributes: [Object]
//     },
//     {
//       Bounds: [Array],
//       Page: 0,
//       Path: '//Document/Sect/Table/TR[2]/TD[2]',
//       attributes: [Object]
//     },
//     {
//       Bounds: [Array],
//       Font: [Object],
//       HasClip: false,
//       Lang: 'no',
//       Page: 0,
//       Path: '//Document/Sect/Table/TR[2]/TD[2]/P',
//       Text: '7087 ',
//       TextSize: 9,
//       attributes: [Object]
//     },
//     {
//       Bounds: [Array],
//       Page: 0,
//       Path: '//Document/Sect/Table[2]',
//       attributes: [Object]
//     },
//     {
//       Bounds: [Array],
//       Page: 0,
//       Path: '//Document/Sect/Table[2]/TR/TH',
//       attributes: [Object]
//     },
//     {
//       Bounds: [Array],
//       Font: [Object],
//       HasClip: false,
//       Lang: 'no',
//       Page: 0,
//       Path: '//Document/Sect/Table[2]/TR/TH/P',
//       Text: 'Bill To ',
//       TextSize: 9,
//       attributes: [Object]
//     },
//     {
//       Bounds: [Array],
//       Page: 0,
//       Path: '//Document/Sect/Table[2]/TR[2]/TD',
//       attributes: [Object]
//     },
//     {
//       Bounds: [Array],
//       Font: [Object],
//       HasClip: false,
//       Lang: 'en',
//       Page: 0,
//       Path: '//Document/Sect/Table[2]/TR[2]/TD/P',
//       Text: 'SYMPHONY HOMES ',
//       TextSize: 9,
//       attributes: [Object]
//     },
//     {
//       Bounds: [Array],
//       Font: [Object],
//       HasClip: false,
//       Lang: 'no',
//       Page: 0,
//       Path: '//Document/Sect/Table[2]/TR[2]/TD/P[2]',
//       Text: '111 S Frontage Road Centerville, UT 84114 801-298-5768 ',
//       TextSize: 9,
//       attributes: [Object]
//     },
//     {
//       Bounds: [Array],
//       ClipBounds: [Array],
//       Page: 0,
//       Path: '//Document/Sect/Figure[2]',
//       attributes: [Object]
//     },
//     {
//       Bounds: [Array],
//       ClipBounds: [Array],
//       Page: 0,
//       Path: '//Document/Sect/Figure[2]',
//       attributes: [Object]
//     },
//     {
//       Bounds: [Array],
//       Page: 0,
//       Path: '//Document/Sect/Table[3]',
//       attributes: [Object]
//     },
//     { Path: '//Document/Sect/Table[3]/TR/TD', attributes: [Object] },
//     {
//       Bounds: [Array],
//       Page: 0,
//       Path: '//Document/Sect/Table[3]/TR/TH',
//       attributes: [Object]
//     },
//     {
//       Bounds: [Array],
//       Font: [Object],
//       HasClip: false,
//       Lang: 'no',
//       Page: 0,
//       Path: '//Document/Sect/Table[3]/TR/TH/P',
//       Text: 'P.O. No. ',
//       TextSize: 9,
//       attributes: [Object]
//     },
//     {
//       Bounds: [Array],
//       Page: 0,
//       Path: '//Document/Sect/Table[3]/TR/TH[2]',
//       attributes: [Object]
//     },
//     {
//       Bounds: [Array],
//       Font: [Object],
//       HasClip: false,
//       Lang: 'no',
//       Page: 0,
//       Path: '//Document/Sect/Table[3]/TR/TH[2]/P',
//       Text: 'Terms ',
//       TextSize: 9,
//       attributes: [Object]
//     },
//     {
//       Bounds: [Array],
//       Page: 0,
//       Path: '//Document/Sect/Table[3]/TR[2]/TH',
//       attributes: [Object]
//     },
//     {
//       Bounds: [Array],
//       Font: [Object],
//       HasClip: false,
//       Lang: 'no',
//       Page: 0,
//       Path: '//Document/Sect/Table[3]/TR[2]/TH/P',
//       Text: '12ORH220 ',
//       TextSize: 9,
//       attributes: [Object]
//     },
//     {
//       Bounds: [Array],
//       Page: 0,
//       Path: '//Document/Sect/Table[3]/TR[2]/TH[2]',
//       attributes: [Object]
//     },
//     {
//       Bounds: [Array],
//       Font: [Object],
//       HasClip: false,
//       Lang: 'en',
//       Page: 0,
//       Path: '//Document/Sect/Table[3]/TR[2]/TH[2]/P',
//       Text: 'Due on receipt ',
//       TextSize: 9,
//       attributes: [Object]
//     },
//     {
//       Bounds: [Array],
//       Page: 0,
//       Path: '//Document/Sect/Table[3]/TR[3]/TH',
//       attributes: [Object]
//     },
//     {
//       Bounds: [Array],
//       Font: [Object],
//       HasClip: false,
//       Lang: 'en',
//       Page: 0,
//       Path: '//Document/Sect/Table[3]/TR[3]/TH/P',
//       Text: 'Item ',
//       TextSize: 9,
//       attributes: [Object]
//     },
//     {
//       Bounds: [Array],
//       Page: 0,
//       Path: '//Document/Sect/Table[3]/TR[3]/TH[2]',
//       attributes: [Object]
//     },
//     {
//       Bounds: [Array],
//       Font: [Object],
//       HasClip: false,
//       Lang: 'en',
//       Page: 0,
//       Path: '//Document/Sect/Table[3]/TR[3]/TH[2]/P',
//       Text: 'Description ',
//       TextSize: 9,
//       attributes: [Object]
//     },
//     { Path: '//Document/Sect/Table[3]/TR[3]/TD', attributes: [Object] },
//     {
//       Bounds: [Array],
//       Page: 0,
//       Path: '//Document/Sect/Table[3]/TR[3]/TH[3]',
//       attributes: [Object]
//     },
//     {
//       Bounds: [Array],
//       Font: [Object],
//       HasClip: false,
//       Lang: 'en',
//       Page: 0,
//       Path: '//Document/Sect/Table[3]/TR[3]/TH[3]/P',
//       Text: 'Amount ',
//       TextSize: 9,
//       attributes: [Object]
//     },
//     {
//       Bounds: [Array],
//       Page: 0,
//       Path: '//Document/Sect/Table[3]/TR[4]/TD',
//       attributes: [Object]
//     },
//     {
//       Bounds: [Array],
//       Font: [Object],
//       HasClip: false,
//       Lang: 'en',
//       Page: 0,
//       Path: '//Document/Sect/Table[3]/TR[4]/TD/P',
//       Text: 'FRAMING LABOR ',
//       TextSize: 9,
//       attributes: [Object]
//     },
//     {
//       Bounds: [Array],
//       Page: 0,
//       Path: '//Document/Sect/Table[3]/TR[4]/TD[2]',
//       attributes: [Object]
//     },
//     {
//       Bounds: [Array],
//       Font: [Object],
//       HasClip: false,
//       Lang: 'en',
//       Page: 0,
//       Path: '//Document/Sect/Table[3]/TR[4]/TD[2]/P',
//       Text: 'LOT 220 ORCHARD HEIGHTS ',
//       TextSize: 9,
//       attributes: [Object]
//     },
//     {
//       Path: '//Document/Sect/Table[3]/TR[4]/TD[3]',
//       attributes: [Object]
//     },
//     {
//       Bounds: [Array],
//       Page: 0,
//       Path: '//Document/Sect/Table[3]/TR[4]/TD[4]',
//       attributes: [Object]
//     },
//     {
//       Bounds: [Array],
//       Font: [Object],
//       HasClip: false,
//       Lang: 'en',
//       Page: 0,
//       Path: '//Document/Sect/Table[3]/TR[4]/TD[4]/P',
//       Text: '33,701.25 ',
//       TextSize: 9,
//       attributes: [Object]
//     },
//     { Path: '//Document/Sect/Table[3]/TR[5]/TD', attributes: [Object] },
//     {
//       Bounds: [Array],
//       Page: 0,
//       Path: '//Document/Sect/Table[3]/TR[5]/TD[2]',
//       attributes: [Object]
//     },
//     {
//       Bounds: [Array],
//       Font: [Object],
//       HasClip: false,
//       Lang: 'en',
//       Page: 0,
//       Path: '//Document/Sect/Table[3]/TR[5]/TD[2]/P',
//       Text: 'DŁ -lo ',
//       TextSize: 23,
//       attributes: [Object]
//     },
//     {
//       Bounds: [Array],
//       Font: [Object],
//       HasClip: false,
//       Lang: 'en',
//       Page: 0,
//       Path: '//Document/Sect/Table[3]/TR[5]/TD[2]/P[2]',
//       Text: 'fJ ',
//       TextSize: 29,
//       attributes: [Object]
//     },
//     {
//       Bounds: [Array],
//       Font: [Object],
//       HasClip: false,
//       Lang: 'en',
//       Page: 0,
//       Path: '//Document/Sect/Table[3]/TR[5]/TD[2]/P[3]',
//       Text: 'QŁ 11/l() 0tLMoJ\\I\\ ',
//       TextSize: 10,
//       attributes: [Object]
//     },
//     {
//       Bounds: [Array],
//       Page: 0,
//       Path: '//Document/Sect/Table[3]/TR[5]/TD[3]',
//       attributes: [Object]
//     },
//     {
//       Bounds: [Array],
//       Font: [Object],
//       HasClip: false,
//       Lang: 'en',
//       Page: 0,
//       Path: '//Document/Sect/Table[3]/TR[5]/TD[3]/P',
//       Text: 't ',
//       TextSize: 30,
//       attributes: [Object]
//     },
//     {
//       Bounds: [Array],
//       Font: [Object],
//       HasClip: false,
//       Lang: 'en',
//       Page: 0,
//       Path: '//Document/Sect/Table[3]/TR[5]/TD[3]/P[2]',
//       Rotation: 357.520263671875,
//       Skew: -2.4797210693359375,
//       Text: 'qo%) ',
//       TextSize: 16.984085083007812,
//       attributes: [Object]
//     },
//     {
//       Path: '//Document/Sect/Table[3]/TR[5]/TD[4]',
//       attributes: [Object]
//     },
//     {
//       Bounds: [Array],
//       Page: 0,
//       Path: '//Document/Sect/Table[3]/TR[6]/TD',
//       attributes: [Object]
//     },
//     {
//       Bounds: [Array],
//       Font: [Object],
//       HasClip: false,
//       Lang: 'en',
//       Page: 0,
//       Path: '//Document/Sect/Table[3]/TR[6]/TD/P',
//       Text: 'Thank you for your busmess. ',
//       TextSize: 9,
//       attributes: [Object]
//     },
//     {
//       Bounds: [Array],
//       Page: 0,
//       Path: '//Document/Sect/Table[3]/TR[6]/TD[2]',
//       attributes: [Object]
//     },
//     {
//       Bounds: [Array],
//       Font: [Object],
//       HasClip: false,
//       Lang: 'en',
//       Page: 0,
//       Path: '//Document/Sect/Table[3]/TR[6]/TD[2]/P',
//       Text: 'Total ',
//       TextSize: 16,
//       attributes: [Object]
//     },
//     {
//       Bounds: [Array],
//       Page: 0,
//       Path: '//Document/Sect/Table[3]/TR[6]/TD[3]',
//       attributes: [Object]
//     },
//     {
//       Bounds: [Array],
//       Font: [Object],
//       HasClip: false,
//       Lang: 'en',
//       Page: 0,
//       Path: '//Document/Sect/Table[3]/TR[6]/TD[3]/P',
//       Text: '$33,701.25 ',
//       TextSize: 9,
//       attributes: [Object]
//     },
//     { Path: '//Document/Sect/Table[3]/TR[7]/TD', attributes: [Object] },
//     {
//       Bounds: [Array],
//       Page: 0,
//       Path: '//Document/Sect/Table[3]/TR[7]/TD[2]',
//       attributes: [Object]
//     },
//     {
//       Bounds: [Array],
//       Font: [Object],
//       HasClip: false,
//       Lang: 'en',
//       Page: 0,
//       Path: '//Document/Sect/Table[3]/TR[7]/TD[2]/P',
//       Text: 'Payments/Credits ',
//       TextSize: 12,
//       attributes: [Object]
//     },
//     {
//       Bounds: [Array],
//       Page: 0,
//       Path: '//Document/Sect/Table[3]/TR[7]/TD[3]',
//       attributes: [Object]
//     },
//     {
//       Bounds: [Array],
//       Font: [Object],
//       HasClip: false,
//       Lang: 'en',
//       Page: 0,
//       Path: '//Document/Sect/Table[3]/TR[7]/TD[3]/P',
//       Text: '$0.00 ',
//       TextSize: 9,
//       attributes: [Object]
//     },
//     {
//       Bounds: [Array],
//       Page: 0,
//       Path: '//Document/Sect/Table[3]/TR[8]/TD',
//       attributes: [Object]
//     },
//     {
//       Bounds: [Array],
//       Font: [Object],
//       HasClip: false,
//       Lang: 'en',
//       Page: 0,
//       Path: '//Document/Sect/Table[3]/TR[8]/TD/P',
//       Text: 'Balance Due ',
//       TextSize: 12,
//       attributes: [Object]
//     },
//     {
//       Bounds: [Array],
//       Page: 0,
//       Path: '//Document/Sect/Table[3]/TR[8]/TD[2]',
//       attributes: [Object]
//     },
//     {
//       Bounds: [Array],
//       Font: [Object],
//       HasClip: false,
//       Lang: 'en',
//       Page: 0,
//       Path: '//Document/Sect/Table[3]/TR[8]/TD[2]/P',
//       Text: '$33,701.25 ',
//       TextSize: 9,
//       attributes: [Object]
//     },
//     {
//       Bounds: [Array],
//       Page: 0,
//       Path: '//Document/Sect/Table[3]/TR[9]/TD',
//       attributes: [Object]
//     },
//     {
//       Bounds: [Array],
//       Font: [Object],
//       HasClip: false,
//       Lang: 'en',
//       Page: 0,
//       Path: '//Document/Sect/Table[3]/TR[9]/TD/P',
//       Text: 'Phone# ',
//       TextSize: 9,
//       attributes: [Object]
//     },
//     {
//       Bounds: [Array],
//       Font: [Object],
//       HasClip: false,
//       Lang: 'en',
//       Page: 0,
//       Path: '//Document/Sect/Table[3]/TR[9]/TD/P[2]',
//       Text: '801-380-5209 ',
//       TextSize: 9,
//       attributes: [Object]
//     },
//     {
//       Bounds: [Array],
//       Page: 0,
//       Path: '//Document/Sect/Table[3]/TR[9]/TD[2]',
//       attributes: [Object]
//     },
//     {
//       Bounds: [Array],
//       Font: [Object],
//       HasClip: false,
//       Lang: 'en',
//       Page: 0,
//       Path: '//Document/Sect/Table[3]/TR[9]/TD[2]/P',
//       Text: 'Fax# ',
//       TextSize: 9,
//       attributes: [Object]
//     },
//     {
//       Bounds: [Array],
//       Font: [Object],
//       HasClip: false,
//       Lang: 'en',
//       Page: 0,
//       Path: '//Document/Sect/Table[3]/TR[9]/TD[2]/P[2]',
//       Text: '435-623-1853 ',
//       TextSize: 9,
//       attributes: [Object]
//     },
//     {
//       Path: '//Document/Sect/Table[3]/TR[9]/TD[3]',
//       attributes: [Object]
//     },
//     {
//       Path: '//Document/Sect/Table[3]/TR[9]/TD[4]',
//       attributes: [Object]
//     }
//   ],
//   pages: [
//     {
//       boxes: [Object],
//       height: 796.7999877929688,
//       is_scanned: true,
//       page_number: 0,
//       rotation: 0,
//       width: 618.239990234375
//     }
//   ]
