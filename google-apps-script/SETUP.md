# Campus Connect – Google Apps Script Setup Guide

## Step-by-Step Deployment Instructions

### 1. Open Your Google Spreadsheet

Open the Google Spreadsheet where you want to store the work updates.

---

### 2. Open Apps Script Editor

- In the spreadsheet menu: **Extensions → Apps Script**
- A new tab will open with the script editor

---

### 3. Paste the Script

- Delete all existing code in the editor
- Open the file `google-apps-script/Code.gs` from this project
- Copy the entire contents and paste it into the Apps Script editor
- Press **Ctrl + S** to save

---

### 4. Deploy as Web App

1. Click **Deploy** (top right) → **New deployment**
2. Click the gear icon ⚙️ next to "Select type" → Choose **Web app**
3. Fill in the settings:
   - **Description**: `Campus Connect Work Updates API`
   - **Execute as**: `Me (your email)`
   - **Who has access**: `Anyone`
4. Click **Deploy**
5. If prompted, click **Authorize access** and grant permissions

---

### 5. Copy the Web App URL

After deployment, you'll see a URL like:
```
https://script.google.com/macros/s/AKfycb.../exec
```

**Copy this URL.**

---

### 6. Configure the Website

Open the `.env.local` file in this project and replace `YOUR_SCRIPT_ID`:

```env
GOOGLE_SHEETS_API_URL=https://script.google.com/macros/s/YOUR_ACTUAL_SCRIPT_ID/exec
```

---

### 7. Restart the Dev Server

```bash
pnpm dev
# or
npm run dev
```

---

### 8. Test the Integration

1. Open `http://localhost:3000`
2. Fill in the work update form
3. Click Submit
4. Check your Google Spreadsheet — a new row should appear!

---

## Spreadsheet Column Structure

| S.No. | Timestamp | Full Name | Enrollment Number | College | Branch | Semester | Department | Date | Work Title | Work Description | Hours | Status | Remarks |
|-------|-----------|-----------|-------------------|---------|--------|----------|------------|------|------------|-----------------|-------|--------|---------|

---

## Troubleshooting

| Problem | Solution |
|---------|----------|
| "Submission Failed" error | Check that the Web App URL is correct in `.env.local` |
| Form submits but no data in sheet | Check the Apps Script execution logs (Extensions → Apps Script → Executions) |
| "Authorization required" | Re-deploy the script and re-authorize |
| Mock response in development | The app works without the API (mock mode) — just configure the URL for production |

---

## Re-deploying After Changes

If you edit `Code.gs`, you must create a **new deployment** (not update an existing one) for the changes to take effect:
1. Deploy → New deployment
2. Update the URL in `.env.local`
