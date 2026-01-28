# GitHub Setup - Complete Steps Guide

This document provides step-by-step instructions for setting up your repository on GitHub with environment secrets.

---

## ✅ What Has Been Done

1. ✅ Created `.gitignore` files (root, BE, FE) to exclude `.env` files
2. ✅ Updated GitHub Actions workflows to use environment secrets
3. ✅ Created documentation files:
   - `GITHUB_SECRETS_SETUP.md` - How to set up GitHub secrets
   - `LOCAL_ENV_SETUP.md` - How to create local `.env` files
   - `ENV_SETUP_GUIDE.md` - General environment setup guide

---

## 🚀 Next Steps for GitHub

### Step 1: Create GitHub Repository

1. Go to [GitHub](https://github.com) and sign in
2. Click the **+** icon → **New repository**
3. Repository name: `your-project-name` (e.g., `products-app`)
4. Description: Optional
5. Choose **Public** or **Private**
6. **DO NOT** initialize with README, .gitignore, or license (we already have these)
7. Click **Create repository**

---

### Step 2: Initialize Git and Push Code

Open your terminal in the project root directory:

```bash
# Initialize git (if not already done)
git init

# Add all files
git add .

# Create initial commit
git commit -m "Initial commit: Setup project with environment configuration"

# Add remote repository (replace YOUR_USERNAME and REPO_NAME)
git remote add origin https://github.com/YOUR_USERNAME/REPO_NAME.git

# Create and switch to dev branch
git checkout -b dev

# Push dev branch
git push -u origin dev

# Switch to main branch
git checkout -b main

# Push main branch
git push -u origin main
```

---

### Step 3: Set Up GitHub Environments

1. Go to your repository on GitHub
2. Click **Settings** → **Environments**
3. Click **New environment**
4. Create two environments:
   - **Name**: `dev` → Click **Configure environment**
   - **Name**: `prod` → Click **Configure environment**

---

### Step 4: Add Secrets to GitHub

#### For `dev` Environment:

1. Go to **Settings** → **Secrets and variables** → **Actions**
2. Click **Environments** → **dev**
3. Click **Add secret** and add:

   | Secret Name | Value |
   |------------|-------|
   | `BE_PORT_DEV` | `4000` |
   | `MONGO_URI_DEV` | `mongodb://mongo:27017/productsdb` |
   | `LOG_LEVEL_DEV` | `debug` |
   | `VITE_API_URL_DEV` | `http://localhost:4001/api/products` |

#### For `prod` Environment:

1. Click **Environments** → **prod**
2. Click **Add secret** and add:

   | Secret Name | Value |
   |------------|-------|
   | `BE_PORT_PROD` | `4000` |
   | `MONGO_URI_PROD` | `mongodb+srv://user:pass@cluster.mongodb.net/productsdb` (your actual MongoDB Atlas URI) |
   | `LOG_LEVEL_PROD` | `error` |
   | `VITE_API_URL_PROD` | `https://api.yourdomain.com/api/products` (your production API URL) |

**⚠️ Important**: Replace placeholder values with your actual production credentials!

---

### Step 5: Verify GitHub Actions

1. Go to **Actions** tab in your repository
2. You should see workflows running automatically:
   - Push to `dev` → Triggers `build-dev` job
   - Push to `main` → Triggers both `build-dev` and `build-prod` jobs
3. Click on a workflow run to see the logs
4. Verify that secrets are being used (they'll appear as `***` in logs)

---

### Step 6: Set Up Branch Protection (Optional but Recommended)

1. Go to **Settings** → **Branches**
2. Click **Add rule** for `main` branch
3. Enable:
   - ✅ Require a pull request before merging
   - ✅ Require status checks to pass before merging
   - ✅ Require branches to be up to date before merging
4. Click **Create**

---

## 📋 Checklist

Before pushing to GitHub, ensure:

- [ ] `.gitignore` files are in place (✅ Done)
- [ ] No `.env` files are committed (check with `git status`)
- [ ] GitHub repository is created
- [ ] Git remote is configured
- [ ] Code is committed locally
- [ ] `dev` and `main` branches exist
- [ ] GitHub environments (`dev` and `prod`) are created
- [ ] All secrets are added to both environments
- [ ] Production secrets use real values (not placeholders)

---

## 🔍 Verify Everything Works

### Test Development Workflow:

```bash
# Make a small change
echo "# Test" >> README.md

# Commit and push to dev
git add .
git commit -m "Test: Verify dev workflow"
git push origin dev
```

Check **Actions** tab → Should see `build-dev` job running successfully.

### Test Production Workflow:

```bash
# Merge dev to main (or push directly)
git checkout main
git merge dev
git push origin main
```

Check **Actions** tab → Should see both `build-dev` and `build-prod` jobs running.

---

## 🐛 Troubleshooting

### Issue: "Workflow not running"
- **Solution**: Check that workflows are in `.github/workflows/` directory
- Verify YAML syntax is correct

### Issue: "Secret not found"
- **Solution**: Double-check secret names match exactly (case-sensitive)
- Ensure you're adding secrets to the correct environment

### Issue: "Environment not found"
- **Solution**: Create environments first in Settings → Environments
- Verify workflow uses `environment: dev` or `environment: prod`

### Issue: "Git push fails"
- **Solution**: Check you have write access to the repository
- Verify remote URL is correct: `git remote -v`

---

## 📚 Additional Resources

- **GitHub Secrets**: See `GITHUB_SECRETS_SETUP.md`
- **Local Setup**: See `LOCAL_ENV_SETUP.md`
- **Environment Guide**: See `ENV_SETUP_GUIDE.md`

---

## 🎯 Summary

1. ✅ **Code is ready** - Environment configuration is complete
2. ⏭️ **Create GitHub repo** - Set up repository
3. ⏭️ **Push code** - Initialize git and push branches
4. ⏭️ **Set up environments** - Create dev and prod environments
5. ⏭️ **Add secrets** - Configure all required secrets
6. ⏭️ **Verify workflows** - Test CI/CD pipeline

---

**You're all set!** Once you complete these steps, your CI/CD pipeline will automatically use the correct secrets based on the branch and environment. 🚀

