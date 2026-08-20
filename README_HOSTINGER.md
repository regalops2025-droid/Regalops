# Hostinger Node.js Web App Deployment Guide

This guide details how to correctly set up the **Regal OPs** application on **Hostinger Shared/Cloud hosting** to resolve the `404 Not Found` API issue.

## Why did `/api/` requests return 404/HTML errors?
By default, the Vite static frontend files are served by Apache/Litespeed from the root directory. However, without a running Node.js process and appropriate routing rules, any request to `/api/*` is treated as a static folder request by Apache, resulting in a 404 error page (or the index.html page, causing JSON parsing syntax errors like `Unexpected token '<'`).

---

## Step 1: Run the Database Setup
Before running the server, make sure the MySQL database matches the new premium schemas:
1. Navigate to `https://regalops.com/db_setup.php` in your browser.
2. This runs the updated PHP script which checks and aligns all database tables and seeds the admin user (`regalops2025@gmail.com` with password `Regalops@123`).
3. You should see a green `"All done successfully!"` status page.
4. *Security Tip:* After verification, delete or rename `db_setup.php` to prevent unauthorized resets.

---

## Step 2: Configure the Node.js Web App in Hostinger hPanel
To ensure the Node.js backend handles the API requests, configure it in your Hostinger dashboard:

1. Log into your **Hostinger hPanel**.
2. Go to **Websites** -> **Manage** -> search for **Node.js** in the sidebar.
3. Click **Create Application** (or manage the existing Node.js App for `regalops.com`):
   * **Node.js Version**: Select `20.x` or `22.x` (or newer).
   * **Application Directory**: Set to the root directory where the code is located (e.g. `public_html`).
   * **Application Startup File**: Set to **`server.js`** (the root entry file that imports `backend/server.js`).
   * **Environment Variables**: Add these environment variables in the Hostinger UI:
     * `NODE_ENV=production`
     * `DB_HOST=127.0.0.1` (or `localhost` — this connects internally to your database which is much faster/more secure and avoids remote connection firewall blocks)
     * `DB_USER=u903092239_Regalops`
     * `DB_PASSWORD=Regalops@123`
     * `DB_NAME=u903092239_Regalops`
     * `DB_PORT=3306`
     * `JWT_SECRET=f2a7db76150efb0e0ad886ad6040854d92a106f2382e2c0e86b970894539ef38`
4. Save and click **Start / Restart** application.

---

## Step 3: Verify the `.htaccess` File
Hostinger hPanel Node.js Web App manager automatically writes Passenger rules in your `.htaccess` file inside `public_html`.
If you build/deploy your frontend static files via FTP or Git, **do not overwrite the `.htaccess` file** created by Hostinger!

If `.htaccess` is missing or overwritten, it should contain the following instructions to activate Phusion Passenger (which routes traffic to your Node app):

```apache
PassengerEnabled on
PassengerAppType node
PassengerStartupFile server.js
```

> [!WARNING]
> Do **not** use a React Router rewrite rule like `RewriteRule ^(.*)$ index.html [L]` in `.htaccess`.
> Express handles SPA routing automatically in production with `app.get("*", ...)`! Adding custom Apache rewrites will intercept `/api` requests and break the backend.

---

## Step 4: Build and Deploy Flow
Whenever you make updates to the frontend or backend:

1. Build the frontend locally or on a build server:
   ```bash
   npm run build
   ```
   *(This builds Vite assets into `frontend/dist` and automatically copies them to the root using `deploy-copy.js`)*.
2. Upload the root folder files (specifically `assets/`, `backend/`, `dist/`, `index.html`, `package.json`, and `server.js`) to Hostinger `public_html`.
3. Go to the Hostinger Node.js panel and click **Stop Node.js App**, then **Run npm install** to update packages, and finally click **Start Node.js App**.
