# GitHub Secrets Setup Guide

This guide will help you configure GitHub Secrets for Development and Production environments.

## 📋 Prerequisites

- GitHub repository created
- Admin access to the repository
- Environment variables ready (MongoDB URI, API URLs, etc.)

---

## 🔐 Setting Up GitHub Secrets

### Step 1: Access Repository Settings

1. Go to your GitHub repository
2. Click on **Settings** (top navigation bar)
3. In the left sidebar, click on **Secrets and variables** → **Actions**

---

## 🌍 Setting Up Environments

GitHub Environments allow you to have separate secrets for dev and prod.

### Step 2: Create Environments

1. In the **Secrets and variables** → **Actions** page, scroll down to **Environments**
2. Click **New environment**
3. Create two environments:
   - **`dev`** - For development branch
   - **`prod`** - For production/main branch

---

## 🔑 Required Secrets for Each Environment

### Development Environment (`dev`)

Navigate to **Environments** → **dev** → **Add secret** and create:

| Secret Name | Description | Example Value |
|------------|-------------|---------------|
| `BE_PORT_DEV` | Backend port for dev | `4000` |
| `MONGO_URI_DEV` | MongoDB connection string (dev) | `mongodb://mongo:27017/productsdb` |
| `LOG_LEVEL_DEV` | Logging level for dev | `debug` |
| `VITE_API_URL_DEV` | Frontend API URL for dev | `http://localhost:4001/api/products` |

### Production Environment (`prod`)

Navigate to **Environments** → **prod** → **Add secret** and create:

| Secret Name | Description | Example Value |
|------------|-------------|---------------|
| `BE_PORT_PROD` | Backend port for prod | `4000` |
| `MONGO_URI_PROD` | MongoDB connection string (prod) | `mongodb+srv://user:pass@cluster.mongodb.net/productsdb` |
| `LOG_LEVEL_PROD` | Logging level for prod | `error` |
| `VITE_API_URL_PROD` | Frontend API URL for prod | `https://api.yourdomain.com/api/products` |

---

## 📝 Step-by-Step: Adding Secrets

### For Development Environment:

1. Go to **Settings** → **Secrets and variables** → **Actions**
2. Click on **Environments** section
3. Click on **`dev`** environment
4. Click **Add secret** button
5. For each secret:
   - **Name**: Enter the secret name (e.g., `MONGO_URI_DEV`)
   - **Secret**: Enter the secret value
   - Click **Add secret**
6. Repeat for all dev secrets

### For Production Environment:

1. Click on **`prod`** environment
2. Click **Add secret** button
3. For each secret:
   - **Name**: Enter the secret name (e.g., `MONGO_URI_PROD`)
   - **Secret**: Enter the secret value
   - Click **Add secret**
4. Repeat for all prod secrets

---

## 🔒 Security Best Practices

1. **Never commit secrets** - Always use GitHub Secrets
2. **Use different values** - Dev and Prod should have different credentials
3. **Rotate secrets regularly** - Update passwords/keys periodically
4. **Limit access** - Only grant access to trusted team members
5. **Use environment protection rules** (optional):
   - Go to Environment → **Protection rules**
   - Add required reviewers for production deployments
   - Set deployment branches (e.g., only `main` for prod)

---

## ✅ Verification

After setting up secrets, verify:

1. **Check workflows run successfully**:
   - Push to `dev` branch → Should use `dev` environment secrets
   - Push to `main` branch → Should use `prod` environment secrets

2. **View workflow logs**:
   - Go to **Actions** tab
   - Click on a workflow run
   - Check that secrets are being used (values are masked as `***`)

---

## 🚀 Workflow Behavior

### Development Branch (`dev`):
- Triggers `build-dev` job
- Uses `dev` environment secrets
- Builds with development configuration

### Production Branch (`main`):
- Triggers both `build-dev` and `build-prod` jobs
- Uses `prod` environment secrets for production builds
- Validates production configuration

---

## 📋 Quick Reference: Secret Names

### Development:
- `BE_PORT_DEV`
- `MONGO_URI_DEV`
- `LOG_LEVEL_DEV`
- `VITE_API_URL_DEV`

### Production:
- `BE_PORT_PROD`
- `MONGO_URI_PROD`
- `LOG_LEVEL_PROD`
- `VITE_API_URL_PROD`

---

## 🐛 Troubleshooting

### Issue: "Secret not found"
- **Solution**: Ensure secret name matches exactly (case-sensitive)
- Check that you're in the correct environment

### Issue: "Environment not found"
- **Solution**: Create the environment first (dev/prod)
- Ensure workflow uses `environment: dev` or `environment: prod`

### Issue: "Workflow not using secrets"
- **Solution**: Check workflow YAML syntax
- Verify `environment:` is set correctly in the job

---

## 📚 Additional Resources

- [GitHub Secrets Documentation](https://docs.github.com/en/actions/security-guides/encrypted-secrets)
- [GitHub Environments Documentation](https://docs.github.com/en/actions/deployment/targeting-different-environments/using-environments-for-deployment)

---

## 🎯 Next Steps

1. ✅ Set up GitHub Secrets (this guide)
2. ✅ Push code to GitHub
3. ✅ Verify workflows run successfully
4. ✅ Monitor CI/CD pipeline
5. ✅ Deploy to production when ready

---

**Note**: After pushing your code, GitHub Actions will automatically use these secrets based on the branch and environment configuration.

