# Local Environment Files Setup

This guide helps you create the necessary `.env` files for local development.

## 📁 File Structure

```
BE/
  ├── .env.example      # Template (committed to git)
  ├── .env.dev          # Development config (gitignored)
  └── .env.prod         # Production config (gitignored)

FE/
  ├── .env.example      # Template (committed to git)
  ├── .env.dev          # Development config (gitignored)
  └── .env.prod         # Production config (gitignored)
```

---

## 🚀 Quick Setup

### Step 1: Create Backend Environment Files

#### `BE/.env.dev` (Development)
```bash
# Backend Development Environment
PORT=4000
NODE_ENV=development
MONGO_URI=mongodb://mongo:27017/productsdb
LOG_LEVEL=debug
```

#### `BE/.env.prod` (Production - for local testing)
```bash
# Backend Production Environment
PORT=4000
NODE_ENV=production
MONGO_URI=mongodb+srv://username:password@cluster.mongodb.net/productsdb
LOG_LEVEL=error
```

### Step 2: Create Frontend Environment Files

#### `FE/.env.dev` (Development)
```bash
# Frontend Development Environment
VITE_API_URL=http://localhost:4001/api/products
VITE_ENV=development
```

#### `FE/.env.prod` (Production - for local testing)
```bash
# Frontend Production Environment
VITE_API_URL=https://api.yourdomain.com/api/products
VITE_ENV=production
```

---

## 📝 Manual Creation Steps

### Option 1: Copy from Examples (Recommended)

1. **Backend**:
   ```bash
   cd BE
   # Copy the template (if .env.example exists)
   cp .env.example .env.dev
   # Or create manually
   ```

2. **Frontend**:
   ```bash
   cd FE
   # Copy the template (if .env.example exists)
   cp .env.example .env.dev
   # Or create manually
   ```

### Option 2: Create Files Manually

1. Create `BE/.env.dev` with the content above
2. Create `BE/.env.prod` with the content above
3. Create `FE/.env.dev` with the content above
4. Create `FE/.env.prod` with the content above

---

## 🔍 Verify Setup

### Check Files Exist:
```bash
# Backend
ls BE/.env.dev BE/.env.prod

# Frontend
ls FE/.env.dev FE/.env.prod
```

### Test Docker Compose:
```bash
# Development
docker-compose -f docker-compose.dev.yml config

# Production
docker-compose -f docker-compose.prod.yml config
```

---

## ⚠️ Important Notes

1. **Never commit `.env` files** - They're in `.gitignore`
2. **Only commit `.env.example`** - Template files are safe
3. **Use different values** - Dev and Prod should differ
4. **Update MongoDB URI** - Replace with your actual connection string

---

## 🐳 Using with Docker Compose

### Development:
```bash
docker-compose -f docker-compose.dev.yml up -d
```
- Uses `BE/.env.dev` and `FE/.env.dev`

### Production:
```bash
docker-compose -f docker-compose.prod.yml up -d
```
- Uses `BE/.env.prod` and `FE/.env.prod`

---

## 🔐 Environment Variables Reference

### Backend Variables:
- `PORT` - Server port (default: 4000)
- `NODE_ENV` - Environment mode (development/production)
- `MONGO_URI` - MongoDB connection string
- `LOG_LEVEL` - Logging level (debug/info/error)

### Frontend Variables:
- `VITE_API_URL` - Backend API endpoint
- `VITE_ENV` - Environment mode (development/production)

**Note**: Vite requires `VITE_` prefix for client-side variables!

---

## ✅ Checklist

- [ ] Created `BE/.env.dev`
- [ ] Created `BE/.env.prod`
- [ ] Created `FE/.env.dev`
- [ ] Created `FE/.env.prod`
- [ ] Updated MongoDB URI in `.env.prod`
- [ ] Updated API URL in `FE/.env.prod`
- [ ] Verified files are gitignored
- [ ] Tested docker-compose configs

---

## 🆘 Troubleshooting

### Issue: "File not found"
- **Solution**: Ensure files are in correct directories (`BE/` and `FE/`)

### Issue: "Environment variable not loading"
- **Solution**: Check file syntax (no spaces around `=`)
- Verify docker-compose `env_file` path is correct

### Issue: "MongoDB connection failed"
- **Solution**: Verify `MONGO_URI` is correct
- Check MongoDB is running (for dev: `mongodb://mongo:27017/productsdb`)

---

**Ready to go!** Your local environment is now configured. 🎉

