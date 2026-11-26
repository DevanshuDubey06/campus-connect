/**
 * ============================================================
 * CAMPUS CONNECT – Google Apps Script Web App
 * ============================================================
 * HOW TO DEPLOY:
 * 1. Open your Google Spreadsheet
 * 2. Go to Extensions → Apps Script
 * 3. Paste this entire script, replacing any existing code
 * 4. Save (Ctrl+S), then click Deploy → New Deployment
 * 5. Choose Type: "Web app"
 *    - Execute as: Me
 *    - Who has access: Anyone
 * 6. Click Deploy, authorize permissions when prompted
 * 7. Copy the Web App URL
 * 8. Open your project's .env.local file
 * 9. Set GOOGLE_SHEETS_API_URL=<paste URL here>
 * ============================================================
 */

const SHEET_NAME = "Work Updates";

// Column order (must match your spreadsheet)
const COLUMNS = [
  "S.No.",
  "Timestamp",
  "Full Name",
  "Enrollment Number",
  "College",
  "Branch",
  "Semester",
  "Department / Team",
  "Contribution Date",
  "Work Title",
  "Work Description",
  "Hours Invested",
  "Status",
  "Remarks"
];

/**
 * Handle POST requests from the website form
 */
function doPost(e) {
  try {
    const data = JSON.parse(e.postData.contents);
    const sheet = getOrCreateSheet();
    const lastRow = sheet.getLastRow();
    const sNo = lastRow <= 1 ? 1 : lastRow; // S.No. starts at 1

    const timestamp = new Date().toLocaleString("en-IN", {
      timeZone: "Asia/Kolkata",
      day: "2-digit",
      month: "2-digit",
      year: "numeric",
      hour: "2-digit",
      minute: "2-digit",
      second: "2-digit"
    });

    const row = [
      sNo,
      timestamp,
      data.fullName || "",
      data.enrollmentNumber || "",
      data.collegeName || "",
      data.branch || "",
      data.semester || "",
      data.department || "",
      data.contributionDate || "",
      data.workTitle || "",
      data.workDescription || "",
      data.hoursInvested || "",
      data.workStatus || "",
      data.remarks || ""
    ];

    sheet.appendRow(row);

    // Auto-format the new row
    const newRow = sheet.getLastRow();
    formatRow(sheet, newRow, data.workStatus);

    return ContentService
      .createTextOutput(JSON.stringify({ success: true, row: newRow }))
      .setMimeType(ContentService.MimeType.JSON);

  } catch (err) {
    return ContentService
      .createTextOutput(JSON.stringify({ success: false, error: err.toString() }))
      .setMimeType(ContentService.MimeType.JSON);
  }
}

/**
 * Handle GET requests (health check)
 */
function doGet() {
  return ContentService
    .createTextOutput(JSON.stringify({
      status: "Campus Connect API is running",
      timestamp: new Date().toISOString()
    }))
    .setMimeType(ContentService.MimeType.JSON);
}

/**
 * Get or create the work updates sheet with headers
 */
function getOrCreateSheet() {
  const ss = SpreadsheetApp.getActiveSpreadsheet();
  let sheet = ss.getSheetByName(SHEET_NAME);

  if (!sheet) {
    sheet = ss.insertSheet(SHEET_NAME);
    setupHeaders(sheet);
  } else if (sheet.getLastRow() === 0) {
    setupHeaders(sheet);
  }

  return sheet;
}

/**
 * Set up column headers with styling
 */
function setupHeaders(sheet) {
  const headerRange = sheet.getRange(1, 1, 1, COLUMNS.length);
  headerRange.setValues([COLUMNS]);
  
  // Header styling
  headerRange.setBackground("#FF2D55");
  headerRange.setFontColor("#FFFFFF");
  headerRange.setFontWeight("bold");
  headerRange.setFontSize(11);
  headerRange.setHorizontalAlignment("center");
  headerRange.setVerticalAlignment("middle");
  
  sheet.setRowHeight(1, 36);
  sheet.setFrozenRows(1);

  // Column widths
  sheet.setColumnWidth(1, 60);   // S.No.
  sheet.setColumnWidth(2, 160);  // Timestamp
  sheet.setColumnWidth(3, 180);  // Name
  sheet.setColumnWidth(4, 150);  // Enrollment
  sheet.setColumnWidth(5, 220);  // College
  sheet.setColumnWidth(6, 100);  // Branch
  sheet.setColumnWidth(7, 90);   // Semester
  sheet.setColumnWidth(8, 160);  // Department
  sheet.setColumnWidth(9, 120);  // Date
  sheet.setColumnWidth(10, 240); // Work Title
  sheet.setColumnWidth(11, 400); // Description
  sheet.setColumnWidth(12, 100); // Hours
  sheet.setColumnWidth(13, 110); // Status
  sheet.setColumnWidth(14, 200); // Remarks
}

/**
 * Format a data row based on status
 */
function formatRow(sheet, rowIndex, status) {
  const range = sheet.getRange(rowIndex, 1, 1, COLUMNS.length);
  range.setVerticalAlignment("middle");
  range.setWrapStrategy(SpreadsheetApp.WrapStrategy.WRAP);
  
  // Alternate row colors
  const bgColor = rowIndex % 2 === 0 ? "#FFF5F7" : "#FFFFFF";
  range.setBackground(bgColor);

  // Status cell color
  const statusCell = sheet.getRange(rowIndex, 13);
  if (status === "Completed") {
    statusCell.setBackground("#D4EDDA");
    statusCell.setFontColor("#155724");
    statusCell.setFontWeight("bold");
  } else if (status === "In Progress") {
    statusCell.setBackground("#FFF3CD");
    statusCell.setFontColor("#856404");
    statusCell.setFontWeight("bold");
  }

  // S.No. cell alignment
  sheet.getRange(rowIndex, 1).setHorizontalAlignment("center");
  sheet.getRange(rowIndex, 12).setHorizontalAlignment("center"); // Hours
  sheet.getRange(rowIndex, 13).setHorizontalAlignment("center"); // Status
}
