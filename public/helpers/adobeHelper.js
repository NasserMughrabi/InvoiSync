const path = require("path");
const fs = require("fs");
const PDFServicesSdk = require("@adobe/pdfservices-node-sdk");
const AdmZip = require("adm-zip");

const adobeExtract = async (fileName) => {
  const credentials =
    PDFServicesSdk.Credentials.servicePrincipalCredentialsBuilder()
      .withClientId(process.env.PDF_SERVICES_CLIENT_ID)
      .withClientSecret(process.env.PDF_SERVICES_CLIENT_SECRET)
      .build();

  // Create an ExecutionContext using credentials
  const executionContext = PDFServicesSdk.ExecutionContext.create(credentials);

  try {
    const OUTPUT_ZIP = path.join(
      __dirname,
      "..",
      "uploads",
      "ExtractTextInfoFromPDF.zip"
    );

    //Remove if the output already exists.
    if (fs.existsSync(OUTPUT_ZIP)) fs.unlinkSync(OUTPUT_ZIP);

    const INPUT_PDF = path.join(__dirname, "..", "uploads", fileName);

    // Create a new operation instance.
    const extractPDFOperation = PDFServicesSdk.ExtractPDF.Operation.createNew(),
      input = PDFServicesSdk.FileRef.createFromLocalFile(
        INPUT_PDF,
        PDFServicesSdk.ExtractPDF.SupportedSourceFormat.pdf
      );

    // Build extractPDF options
    const options =
      new PDFServicesSdk.ExtractPDF.options.ExtractPdfOptions.Builder()
        .addElementsToExtract(
          PDFServicesSdk.ExtractPDF.options.ExtractElementType.TEXT
        )
        .build();

    extractPDFOperation.setInput(input);
    extractPDFOperation.setOptions(options);

    // Execute the operation and wait for it to complete
    const result = await extractPDFOperation.execute(executionContext);
    await result.saveAsFile(OUTPUT_ZIP);

    console.log("Successfully extracted information from PDF.");

    if (!fs.existsSync(OUTPUT_ZIP)) {
      throw new Error("ZIP file not found: " + OUTPUT_ZIP);
    }

    let zip = new AdmZip(OUTPUT_ZIP);
    let jsondata = zip.readAsText("structuredData.json");
    let data = JSON.parse(jsondata);

    return data;
  } catch (error) {
    console.log(error);
  }
};

module.exports = { adobeExtract };
