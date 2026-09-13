# GitHub Edit & Republish Guide

This project is a static site. There is no build command: `index.html` must remain in the repository root.

## 1. Keep only the production website

Extract the deployment ZIP, then copy its contents into the existing GitHub repository folder. Keep the hidden `.git` folder in the repository.

The following old/duplicate folders shown in the earlier workspace are not part of this deployment and must not be published:

- `.tmp.driveupload`
- `assests` (misspelled old folder)
- `Madhav Portfolio` (old nested copy)

The correct image folder is `assets`.

## 2. Verify locally

Open PowerShell in the portfolio root and run:

```powershell
Set-ExecutionPolicy -Scope Process Bypass
.\VERIFY_PORTFOLIO.ps1
python -m http.server 8080
```

Open `http://localhost:8080`, test the menu, project links, gallery filters, certificate lightbox and WhatsApp form, then stop the server with `Ctrl+C`.

## 3. Republish an existing GitHub repository

Check that the current folder is linked to the expected repository:

```powershell
git status
git remote -v
```

If the old duplicate folders were previously committed, remove them from Git tracking. This command does not delete the local folders:

```powershell
git rm -r --cached --ignore-unmatch .tmp.driveupload assests "Madhav Portfolio"
```

Stage, commit, update from GitHub and push:

```powershell
git add -A
git commit -m "Redesign portfolio and add verified achievements"
git pull --rebase origin main
git push origin main
```

If Git reports `nothing to commit`, confirm that the edited files were saved and that the terminal is open in the correct folder.

## 4. First publish only

Use this only when the folder is not already linked to a repository:

```powershell
git init
git branch -M main
git add -A
git commit -m "Publish premium portfolio"
git remote add origin https://github.com/USERNAME/REPOSITORY.git
git push -u origin main
```

Replace `USERNAME` and `REPOSITORY` with the actual GitHub values. If Git says `remote origin already exists`, do not add it again; inspect it with `git remote -v`.

## 5. Enable or confirm GitHub Pages

In the GitHub repository, open **Settings → Pages** and select:

- Source: **Deploy from a branch**
- Branch: **main**
- Folder: **/(root)**

Save the setting. Future pushes to `main` will republish the site automatically. The latest deployment status is visible in the repository's **Actions** tab.

## Future edits

Edit the relevant file, save it, run verification and use:

```powershell
git add -A
git commit -m "Describe the portfolio update"
git pull --rebase origin main
git push origin main
```

In VS Code, the same flow is available from **Source Control**: Stage All Changes, enter a commit message, select Commit, then Sync Changes.
