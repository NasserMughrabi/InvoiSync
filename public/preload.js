const { contextBridge, ipcRenderer } = require('electron');

contextBridge.exposeInMainWorld('electronAPI', {
    convertPdfToImages: (pdfPath) => ipcRenderer.invoke('convert-pdf-to-images', pdfPath),
    performOcr: (imagePath) => ipcRenderer.invoke('perform-ocr', imagePath),
    uploadFile: (filePath) => ipcRenderer.invoke('upload-file', filePath)
});
