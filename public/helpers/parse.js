/* 
  This function is to find a field in a table, then find it's value assuming that the value is 
  a single line below the field. so if field is at row 1 and col 1, the value would be at row 2 and col 1.

  This is for when value is on the same column but the next row
  */
const findValNextRow = (data, field) => {
  // Sort JSON table data
  // Needed Data: Invoice Date, Invoice Number, Items/Description, total/balance

  // Step 1: Find the element with text "field" and path containing 'Table'
  let dateElementPath = "";
  for (const element of data.elements) {
    if (
      element.Text &&
      element.Text.trim().toLowerCase().includes(`${field.toLowerCase()}`) &&
      element.Path.includes("Table")
    ) {
      dateElementPath = element.Path;
      //   console.log(dateElementPath);
      break;
    }
  }

  // if filed doesn't exist return ""
  if (!dateElementPath) {
    return dateElementPath;
  }

  // if the path doesn't include TR and (TD or TH) in it, then we cannot split it as we do after this
  if (
    !(
      dateElementPath.includes("TR") &&
      (dateElementPath.includes("TD") || dateElementPath.includes("TH"))
    )
  ) {
    return "";
  }

  // Step 2: Parse the path to get the row and column
  const pathParts = dateElementPath.split("/");
  let table = pathParts[pathParts.length - 4];
  let tableRow = pathParts[pathParts.length - 3];
  let tableColumn = pathParts[pathParts.length - 2];

  // value is at same column but next row, when row increase column changes from TH to TD
  const converted = convertRowCol(tableRow, tableColumn);
  tableRow = converted[0];
  tableColumn = converted[1];

  // Step 3: Calculate the row and column for the value
  const valueColumn = tableColumn; // Assuming value is in the same column
  let rowIndex = parseInt(tableRow.match(/\d+/)[0]);
  const valueRow = `TR[${rowIndex + 1}]`; // Assuming value is in the next row

  // Step 4: Find the value at the calculated table/valueRow/valueColumn
  let valueText = "";
  for (const element of data.elements) {
    if (element.Path.includes(`${table}/${valueRow}/${valueColumn}/P`)) {
      valueText = element.Text;
      break;
    }
  }
  return valueText;
};

const findValNextCol = (data, field) => {
  // This is for when value is on the same row but the next column ----- optimize in findValNextCol
  // Step 1: Find the element with text "Date" and path containing 'Table'
  let dateElementPath = "";
  for (const element of data.elements) {
    if (
      element.Text &&
      element.Text.trim().toLowerCase().includes(`${field}`) &&
      element.Path.includes("Table")
    ) {
      dateElementPath = element.Path;
      break;
    }
  }

  // if filed doesn't exist return ""
  if (!dateElementPath) {
    return dateElementPath;
  }

  // if the path doesn't include TR and (TD or TH) in it, then we cannot split it as we do after this
  if (
    !(
      dateElementPath.includes("TR") &&
      (dateElementPath.includes("TD") || dateElementPath.includes("TH"))
    )
  ) {
    return "";
  }

  // Step 2: Parse the path to get the row and column
  const pathParts = dateElementPath.split("/");
  let table = pathParts[pathParts.length - 4];
  let tableRow = pathParts[pathParts.length - 3];
  let tableColumn = pathParts[pathParts.length - 2];

  // value is at same column but next row, when row increase column changes from TH to TD
  const converted = convertCol(tableColumn);
  tableColumn = converted;

  // Step 3: Calculate the row and column for the value
  const valueRow = tableRow; // Assuming value is in the same row
  let rowIndex = parseInt(tableColumn.match(/\d+/)[0]);
  const valueColumn = `TD[${rowIndex + 1}]`; // Assuming value is in the next column

  // Step 4: Find the value at the calculated table/valueRow/valueColumn
  let valueText = "";
  for (const element of data.elements) {
    if (element.Path.includes(`${table}/${valueRow}/${valueColumn}/P`)) {
      valueText = element.Text;
      break;
    }
  }
  return valueText;
};

/* 
  This function is to find the balance field in a table, then find it's value accordingly. 
  */
const findBalance = (data) => {
  // Find the line that contains balance and the value should be in same string
  let balanceStr = "";
  for (const element of data.elements) {
    if (element.Text && element.Text.trim().toLowerCase().includes("balance")) {
      balanceStr = element.Text;
      break;
    }
  }

  const regex = /[\d,]+\.?\d*/;
  let match = balanceStr.match(regex);
  let balanceNum = balanceStrToNumber(match);

  // If the balance value is on the same line, this should NOT be null
  if (balanceNum) {
    return balanceNum;
  }

  // if the balance is part of table, then it's value must be on the same line according
  // to the vendor's pdf format. same row but next column. Let's find it now.
  const valueText = findValNextCol(data, "balance");
  match = valueText.match(regex);
  balanceNum = balanceStrToNumber(match);

  if (!balanceNum) {
    return "";
  } else {
    return balanceNum;
  }
};

/* 
  Changes TR to TR[1] in order for regex to work and replaces TH with TD because TR increases 
  */
const convertRowCol = (row, col) => {
  let newRow = row;
  let newCol = col;
  if (row === "TR") {
    newRow = "TR[1]";
  }
  if (col.includes("TH")) {
    newCol = col.replace("TH", "TD");
  }
  return [newRow, newCol];
};

/* 
  Changes TD to TD[1] in order for regex to work
  */
const convertCol = (col) => {
  let newCol = col;
  if (col === "TD") {
    newCol = "TD[1]";
  }
  return newCol;
};

/* 
  Convert balance string to number
  */
const balanceStrToNumber = (match) => {
  let number;
  if (match) {
    // Remove commas and convert to number
    number = parseFloat(match[0].replace(/,/g, ""));
  }

  return number;
};

module.exports = { findBalance, findValNextRow };

// {
//   elements: [
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
//       Font: [Object],
//       HasClip: false,
//       Page: 0,
//       Path: '//Document/Sect/Figure',
//       Text: 'Ł ',
//       TextSize: 10,
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
//       Font: [Object],
//       HasClip: false,
//       Page: 0,
//       Path: '//Document/Sect/Title',
//       Text: 'INVOICE ',
//       TextSize: 20,
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
//       Path: '//Document/Sect/Table/TR/TH',
//       attributes: [Object]
//     },
//     {
//       Bounds: [Array],
//       Font: [Object],
//       HasClip: false,
//       Lang: 'en',
//       Page: 0,
//       Path: '//Document/Sect/Table/TR/TH/P',
//       Text: 'Date ',
//       TextSize: 10,
//       attributes: [Object]
//     },
//     {
//       Bounds: [Array],
//       Page: 0,
//       Path: '//Document/Sect/Table/TR/TH[2]',
//       attributes: [Object]
//     },
//     {
//       Bounds: [Array],
//       Font: [Object],
//       HasClip: false,
//       Lang: 'en',
//       Page: 0,
//       Path: '//Document/Sect/Table/TR/TH[2]/P',
//       Text: 'Invoice# ',
//       TextSize: 10,
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
//       Lang: 'en',
//       Page: 0,
//       Path: '//Document/Sect/Table/TR[2]/TD/P',
//       Text: '1/10/2024 ',
//       TextSize: 12,
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
//       Lang: 'en',
//       Page: 0,
//       Path: '//Document/Sect/Table/TR[2]/TD[2]/P',
//       Text: '68679 ',
//       TextSize: 12,
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
//       Path: '//Document/Sect/Table[2]/TR/TD',
//       attributes: [Object]
//     },
//     {
//       Bounds: [Array],
//       Font: [Object],
//       HasClip: false,
//       Lang: 'en',
//       Page: 0,
//       Path: '//Document/Sect/Table[2]/TR/TD/P',
//       Text: 'Bill To ',
//       TextSize: 10,
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
//       Text: 'Symphony Homes 111 S Frontage Rd Centerville UT 84014 ',
//       TextSize: 12,
//       attributes: [Object]
//     },
//     {
//       Bounds: [Array],
//       Font: [Object],
//       HasClip: false,
//       Lang: 'en',
//       Page: 0,
//       Path: '//Document/Sect/Table[2]/TR[2]/TD/P[2]',
//       Text: 'r ',
//       TextSize: 8,
//       attributes: [Object]
//     },
//     {
//       Path: '//Document/Sect/Table[2]/TR[2]/TD[2]',
//       attributes: [Object]
//     },
//     {
//       Bounds: [Array],
//       Page: 0,
//       Path: '//Document/Sect/Table[2]/TR[3]/TD',
//       attributes: [Object]
//     },
//     {
//       Bounds: [Array],
//       Font: [Object],
//       HasClip: false,
//       Lang: 'en',
//       Page: 0,
//       Path: '//Document/Sect/Table[2]/TR[3]/TD/P',
//       Text: 'Cornpany:��----+­Lot / Job:���--;-, ',
//       TextSize: 12.5,
//       attributes: [Object]
//     },
//     {
//       Bounds: [Array],
//       Page: 0,
//       Path: '//Document/Sect/Table[2]/TR[4]/TD',
//       attributes: [Object]
//     },
//     {
//       Bounds: [Array],
//       Font: [Object],
//       HasClip: false,
//       Lang: 'en',
//       Page: 0,
//       Path: '//Document/Sect/Table[2]/TR[4]/TD/P',
//       Text: 'C.O.A. #: ________ ',
//       TextSize: 11,
//       attributes: [Object]
//     },
//     {
//       Bounds: [Array],
//       Font: [Object],
//       HasClip: false,
//       Lang: 'en',
//       Page: 0,
//       Path: '//Document/Sect/Table[2]/TR[4]/TD/P[2]',
//       Text: 'Approval(s): ______ ',
//       TextSize: 11,
//       attributes: [Object]
//     },
//     {
//       Bounds: [Array],
//       Font: [Object],
//       HasClip: false,
//       Lang: 'en',
//       Page: 0,
//       Path: '//Document/Sect/Table[2]/TR[4]/TD/P[3]',
//       Text: '-, e: ',
//       TextSize: 8,
//       attributes: [Object]
//     },
//     {
//       Bounds: [Array],
//       Page: 0,
//       Path: '//Document/Sect/Table[3]',
//       attributes: [Object]
//     },
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
//       Lang: 'en',
//       Page: 0,
//       Path: '//Document/Sect/Table[3]/TR/TH/P',
//       Text: 'Ship To ',
//       TextSize: 10,
//       attributes: [Object]
//     },
//     {
//       Bounds: [Array],
//       Page: 0,
//       Path: '//Document/Sect/Table[3]/TR[2]/TD',
//       attributes: [Object]
//     },
//     {
//       Bounds: [Array],
//       Font: [Object],
//       HasClip: false,
//       Lang: 'en',
//       Page: 0,
//       Path: '//Document/Sect/Table[3]/TR[2]/TD/P',
//       Text: '315 Maplewood Lane ',
//       TextSize: 12,
//       attributes: [Object]
//     },
//     {
//       Bounds: [Array],
//       Page: 0,
//       Path: '//Document/Sect/Table[4]',
//       attributes: [Object]
//     },
//     { Path: '//Document/Sect/Table[4]/TR/TD', attributes: [Object] },
//     {
//       Bounds: [Array],
//       Page: 0,
//       Path: '//Document/Sect/Table[4]/TR/TH',
//       attributes: [Object]
//     },
//     {
//       Bounds: [Array],
//       Font: [Object],
//       HasClip: false,
//       Lang: 'en',
//       Page: 0,
//       Path: '//Document/Sect/Table[4]/TR/TH/P',
//       Text: 'Job ID# ',
//       TextSize: 10,
//       attributes: [Object]
//     },
//     {
//       Bounds: [Array],
//       Page: 0,
//       Path: '//Document/Sect/Table[4]/TR/TH[2]',
//       attributes: [Object]
//     },
//     {
//       Bounds: [Array],
//       Font: [Object],
//       HasClip: false,
//       Lang: 'en',
//       Page: 0,
//       Path: '//Document/Sect/Table[4]/TR/TH[2]/P',
//       Text: 'SO# ',
//       TextSize: 10,
//       attributes: [Object]
//     },
//     {
//       Bounds: [Array],
//       Page: 0,
//       Path: '//Document/Sect/Table[4]/TR[2]/TH',
//       attributes: [Object]
//     },
//     {
//       Bounds: [Array],
//       Font: [Object],
//       HasClip: false,
//       Lang: 'en',
//       Page: 0,
//       Path: '//Document/Sect/Table[4]/TR[2]/TH/P',
//       Text: '8787 ',
//       TextSize: 12,
//       attributes: [Object]
//     },
//     {
//       Bounds: [Array],
//       Page: 0,
//       Path: '//Document/Sect/Table[4]/TR[2]/TH[2]',
//       attributes: [Object]
//     },
//     {
//       Bounds: [Array],
//       Font: [Object],
//       HasClip: false,
//       Lang: 'en',
//       Page: 0,
//       Path: '//Document/Sect/Table[4]/TR[2]/TH[2]/P',
//       Text: '3086349 ',
//       TextSize: 9,
//       attributes: [Object]
//     },
//     {
//       Bounds: [Array],
//       Page: 0,
//       Path: '//Document/Sect/Table[4]/TR[3]/TD',
//       attributes: [Object]
//     },
//     {
//       Bounds: [Array],
//       Font: [Object],
//       HasClip: false,
//       Lang: 'en',
//       Page: 0,
//       Path: '//Document/Sect/Table[4]/TR[3]/TD/P',
//       Text: 'Description ',
//       TextSize: 10,
//       attributes: [Object]
//     },
//     {
//       Bounds: [Array],
//       Page: 0,
//       Path: '//Document/Sect/Table[4]/TR[3]/TD[2]',
//       attributes: [Object]
//     },
//     {
//       Bounds: [Array],
//       Font: [Object],
//       HasClip: false,
//       Lang: 'en',
//       Page: 0,
//       Path: '//Document/Sect/Table[4]/TR[3]/TD[2]/P',
//       Text: 'Amount ',
//       TextSize: 10,
//       attributes: [Object]
//     },
//     {
//       Bounds: [Array],
//       Page: 0,
//       Path: '//Document/Sect/Table[4]/TR[4]/TD',
//       attributes: [Object]
//     },
//     {
//       Bounds: [Array],
//       Font: [Object],
//       HasClip: false,
//       Page: 0,
//       Path: '//Document/Sect/Table[4]/TR[4]/TD/P/Sub',
//       Text: '12/05/23 as per final contract ',
//       TextSize: 12,
//       attributes: [Object]
//     },
//     {
//       Bounds: [Array],
//       Font: [Object],
//       HasClip: false,
//       Page: 0,
//       Path: '//Document/Sect/Table[4]/TR[4]/TD/P/Sub[2]',
//       Text: 'Kitchen, Desk Kit, Main, Master, and Basement Baths, Laundry, Basement ',
//       TextSize: 12,
//       attributes: [Object]
//     },
//     {
//       Bounds: [Array],
//       Page: 0,
//       Path: '//Document/Sect/Table[4]/TR[4]/TD[2]',
//       attributes: [Object]
//     },
//     {
//       Bounds: [Array],
//       Font: [Object],
//       HasClip: false,
//       Lang: 'en',
//       Page: 0,
//       Path: '//Document/Sect/Table[4]/TR[4]/TD[2]/P',
//       Text: '25,356.89 ',
//       TextSize: 12,
//       attributes: [Object]
//     },
//     {
//       Bounds: [Array],
//       Page: 0,
//       Path: '//Document/Sect/Table[4]/TR[5]/TD',
//       attributes: [Object]
//     },
//     {
//       Bounds: [Array],
//       Font: [Object],
//       HasClip: false,
//       Lang: 'en',
//       Page: 0,
//       Path: '//Document/Sect/Table[4]/TR[5]/TD/P',
//       Text: 'Wet Bar cabinets ',
//       TextSize: 12,
//       attributes: [Object]
//     },
//     {
//       Path: '//Document/Sect/Table[4]/TR[5]/TD[2]',
//       attributes: [Object]
//     },
//     {
//       Bounds: [Array],
//       Page: 0,
//       Path: '//Document/Sect/Table[4]/TR[6]/TD',
//       attributes: [Object]
//     },
//     {
//       Bounds: [Array],
//       Font: [Object],
//       HasClip: false,
//       Lang: 'en',
//       Page: 0,
//       Path: '//Document/Sect/Table[4]/TR[6]/TD/P',
//       Text: 'Finish ',
//       TextSize: 12,
//       attributes: [Object]
//     },
//     {
//       Path: '//Document/Sect/Table[4]/TR[6]/TD[2]',
//       attributes: [Object]
//     },
//     {
//       Bounds: [Array],
//       Page: 0,
//       Path: '//Document/Sect/Table[4]/TR[6]/TD[3]',
//       attributes: [Object]
//     },
//     {
//       Bounds: [Array],
//       Font: [Object],
//       HasClip: false,
//       Lang: 'en',
//       Page: 0,
//       Path: '//Document/Sect/Table[4]/TR[6]/TD[3]/P',
//       Text: '4,182.23 ',
//       TextSize: 12,
//       attributes: [Object]
//     },
//     {
//       Bounds: [Array],
//       Page: 0,
//       Path: '//Document/Sect/Table[4]/TR[7]/TD',
//       attributes: [Object]
//     },
//     {
//       Bounds: [Array],
//       Font: [Object],
//       HasClip: false,
//       Lang: 'en',
//       Page: 0,
//       Path: '//Document/Sect/Table[4]/TR[7]/TD/P',
//       Text: 'Installation ',
//       TextSize: 12,
//       attributes: [Object]
//     },
//     {
//       Bounds: [Array],
//       Page: 0,
//       Path: '//Document/Sect/Table[4]/TR[7]/TD[2]',
//       attributes: [Object]
//     },
//     {
//       Bounds: [Array],
//       Font: [Object],
//       HasClip: false,
//       Lang: 'en',
//       Page: 0,
//       Path: '//Document/Sect/Table[4]/TR[7]/TD[2]/P',
//       Text: '4,018.88 ',
//       TextSize: 12,
//       attributes: [Object]
//     },
//     {
//       Bounds: [Array],
//       Page: 0,
//       Path: '//Document/Sect/Table[4]/TR[8]/TD',
//       attributes: [Object]
//     },
//     {
//       Bounds: [Array],
//       Font: [Object],
//       HasClip: false,
//       Lang: 'en',
//       Page: 0,
//       Path: '//Document/Sect/Table[4]/TR[8]/TD/P',
//       Text: 'THANK.YOU ',
//       TextSize: 11,
//       attributes: [Object]
//     },
//     {
//       Bounds: [Array],
//       Page: 0,
//       Path: '//Document/Sect/Table[4]/TR[8]/TD[2]',
//       attributes: [Object]
//     },
//     {
//       Bounds: [Array],
//       Font: [Object],
//       HasClip: false,
//       Lang: 'en',
//       Page: 0,
//       Path: '//Document/Sect/Table[4]/TR[8]/TD[2]/P',
//       Text: 'Total ',
//       TextSize: 12,
//       attributes: [Object]
//     },
//     {
//       Bounds: [Array],
//       Page: 0,
//       Path: '//Document/Sect/Table[4]/TR[8]/TD[3]',
//       attributes: [Object]
//     },
//     {
//       Bounds: [Array],
//       Font: [Object],
//       HasClip: false,
//       Lang: 'en',
//       Page: 0,
//       Path: '//Document/Sect/Table[4]/TR[8]/TD[3]/P',
//       Text: '$33,558.00 ',
//       TextSize: 12,
//       attributes: [Object]
//     },
//     {
//       Bounds: [Array],
//       Page: 0,
//       Path: '//Document/Sect/Table[4]/TR[9]/TD',
//       attributes: [Object]
//     },
//     {
//       Bounds: [Array],
//       Font: [Object],
//       HasClip: false,
//       Lang: 'en',
//       Page: 0,
//       Path: '//Document/Sect/Table[4]/TR[9]/TD/P',
//       Text: 'Invoice due upon receipt. I 1/2% per month interest ifnot paid within 30 days from invoice date. Reasonable collection and attorney fees charged on accounts placed for collection. ',
//       TextSize: 10,
//       attributes: [Object]
//     },
//     {
//       Bounds: [Array],
//       Page: 0,
//       Path: '//Document/Sect/Table[4]/TR[9]/TD[2]',
//       attributes: [Object]
//     },
//     {
//       Bounds: [Array],
//       Font: [Object],
//       HasClip: false,
//       Lang: 'en',
//       Page: 0,
//       Path: '//Document/Sect/Table[4]/TR[9]/TD[2]/P',
//       Text: 'Deposits ',
//       TextSize: 12,
//       attributes: [Object]
//     },
//     {
//       Bounds: [Array],
//       Page: 0,
//       Path: '//Document/Sect/Table[4]/TR[9]/TD[3]',
//       attributes: [Object]
//     },
//     {
//       Bounds: [Array],
//       Font: [Object],
//       HasClip: false,
//       Lang: 'en',
//       Page: 0,
//       Path: '//Document/Sect/Table[4]/TR[9]/TD[3]/P',
//       Text: '$0.00 ',
//       TextSize: 12,
//       attributes: [Object]
//     },
//     {
//       Bounds: [Array],
//       Page: 0,
//       Path: '//Document/Sect/Table[4]/TR[10]/TD',
//       attributes: [Object]
//     },
//     {
//       Bounds: [Array],
//       Font: [Object],
//       HasClip: false,
//       Lang: 'en',
//       Page: 0,
//       Path: '//Document/Sect/Table[4]/TR[10]/TD/P',
//       Text: 'v ',
//       TextSize: 13,
//       attributes: [Object]
//     },
//     {
//       Bounds: [Array],
//       Font: [Object],
//       HasClip: false,
//       Lang: 'en',
//       Page: 0,
//       Path: '//Document/Sect/Table[4]/TR[10]/TD/P[2]',
//       Rotation: 0.4528656005859375,
//       Skew: 0.4528656005859375,
//       Text: 'Balance Due $33,558.00..,,. ',
//       TextSize: 13.49957275390625,
//       attributes: [Object]
//     },
//     {
//       Bounds: [Array],
//       Font: [Object],
//       HasClip: false,
//       Lang: 'en',
//       Page: 0,
//       Path: '//Document/Sect/P',
//       Text: 'Please mail remittance to: P.O. Box 160315, Clearfield, UT 84016 801-773-0374 (P) 801-773-0379 (F) ',
//       TextSize: 10
//     }
//   ],
// }
