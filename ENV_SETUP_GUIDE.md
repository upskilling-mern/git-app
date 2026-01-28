# Environment Setup Guide: Dev vs Prod

## 📚 Understanding Environments

### What are Environments?
Environments are different configurations for your application:
- **Development (Dev)**: Local development, testing, debugging
- **Staging**: Pre-production testing environment
- **Production (Prod)**: Live application used by real users

### Why Different Environments?
- **Different Configurations**: Different database URLs, API endpoints, ports
- **Security**: Production secrets should never be in dev code
- **Testing**: Test changes safely before production
- **Isolation**: Prevent dev changes from affecting production

---

## 🔧 Environment Variable Assignment Methods

### Method 1: `.env` Files (Recommended for Local)

#### Structure:
```
BE/
  ├── .env          # Default (gitignored)
  ├── .env.dev      # Development (gitignored)
  ├── .env.prod     # Production (gitignored)
  └── .env.example  # Template (committed to git)
```

#### Example `.env.dev`:
```bash
# Backend Development Environment
PORT=4000
MONGO_URI=mongodb://mongo:27017/productsdb
NODE_ENV=development
LOG_LEVEL=debug
```

#### Example `.env.prod`:
```bash
# Backend Production Environment
PORT=4000
MONGO_URI=mongodb+srv://user:pass@cluster.mongodb.net/productsdb
NODE_ENV=production
LOG_LEVEL=error
```

### Method 2: Docker Compose `env_file`
```yaml
services:
  backend:
    env_file:
      - ./BE/.env.dev  # Loads all variables from file
```

### Method 3: Docker Compose `environment` (Inline)
```yaml
services:
  backend:
    environment:
      - PORT=4000
      - MONGO_URI=mongodb://mongo:27017/productsdb
      - NODE_ENV=development
```

### Method 4: Environment Variables (Shell/CI)
```bash
# Set in shell
export PORT=4000
export MONGO_URI=mongodb://localhost:27017/productsdb

# Or in CI/CD
env:
  PORT: 4000
  MONGO_URI: ${{ secrets.MONGO_URI }}
```

---

## 🎯 Priority Order (Highest to Lowest)

1. **Inline `environment:` in docker-compose** (highest priority)
2. **Shell environment variables** (`export VAR=value`)
3. **`env_file:` in docker-compose**
4. **Default values in code** (`process.env.PORT || 4000`)

---

## 📁 File Structure for Multi-Environment Setup

```
project/
├── BE/
│   ├── .env.example      # Template (committed)
│   ├── .env.dev          # Dev config (gitignored)
│   ├── .env.prod         # Prod config (gitignored)
│   └── .env              # Default (gitignored)
│
├── FE/
│   ├── .env.example      # Template (committed)
│   ├── .env.dev          # Dev config (gitignored)
│   ├── .env.prod         # Prod config (gitignored)
│   └── .env              # Default (gitignored)
│
├── docker-compose.yml        # Default compose
├── docker-compose.dev.yml    # Development compose
└── docker-compose.prod.yml   # Production compose
```

---

## 🚀 How to Use Different Environments

### Development Setup:

1. **Create `.env.dev` files:**
```bash
# BE/.env.dev
PORT=4000
MONGO_URI=mongodb://mongo:27017/productsdb
NODE_ENV=development

# FE/.env.dev
VITE_API_URL=http://localhost:4001/api/products
VITE_ENV=development
```

2. **Run with dev compose:**
```bash
docker-compose -f docker-compose.dev.yml up -d
```

### Production Setup:

1. **Create `.env.prod` files:**
```bash
# BE/.env.prod
PORT=4000
MONGO_URI=mongodb+srv://user:pass@cluster.mongodb.net/productsdb
NODE_ENV=production

# FE/.env.prod
VITE_API_URL=https://api.yourdomain.com/api/products
VITE_ENV=production
```

2. **Run with prod compose:**
```bash
docker-compose -f docker-compose.prod.yml up -d
```

---

## 🔐 Environment Variables in Your Code

### Backend (Node.js):
```javascript
// BE/index.js
const PORT = process.env.PORT || 4000;
const MONGO_URI = process.env.MONGO_URI || 'mongodb://localhost:27017/productsdb';
const NODE_ENV = process.env.NODE_ENV || 'development';

// Use in code
if (NODE_ENV === 'production') {
  // Production-specific code
  app.use(helmet()); // Security headers
} else {
  // Development-specific code
  app.use(morgan('dev')); // Logging
}
```

### Frontend (Vite/React):
```javascript
// FE/src/App.jsx
// Vite requires VITE_ prefix for env variables
const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:4001/api/products';
const ENV = import.meta.env.VITE_ENV || 'development';

// Use in code
if (ENV === 'production') {
  // Production-specific code
  console.log = () => {}; // Disable console in prod
}
```

**Important**: Vite only exposes variables prefixed with `VITE_` to the client!

---

## 🐳 Docker Compose Environment Configuration

### Development (`docker-compose.dev.yml`):
```yaml
services:
  backend:
    env_file:
      - ./BE/.env.dev
    environment:
      - NODE_ENV=development
    ports:
      - "4001:4000"  # Different port for dev
```

### Production (`docker-compose.prod.yml`):
```yaml
services:
  backend:
    env_file:
      - ./BE/.env.prod
    environment:
      - NODE_ENV=production
    ports:
      - "4000:4000"  # Standard port
    restart: always  # Auto-restart on failure
```

---

## 🔄 Frontend Build-Time vs Runtime Variables

### Build-Time (Vite):
```bash
# Set during docker build
docker build --build-arg VITE_API_URL=http://backend:4000 -t frontend .
```

```yaml
# In docker-compose
build:
  args:
    VITE_API_URL: http://backend:4000
```

**Note**: Vite variables are baked into the build at build time!

### Runtime (Backend):
```bash
# Can be changed at runtime
docker run -e PORT=5000 backend
```

---

## 📋 Best Practices

### 1. **Never Commit `.env` Files**
Add to `.gitignore`:
```
.env
.env.*
!.env.example
```

### 2. **Always Create `.env.example`**
```bash
# BE/.env.example
PORT=4000
MONGO_URI=your_mongodb_connection_string
NODE_ENV=development
```

### 3. **Use Different Files for Different Environments**
- `.env.dev` → Development
- `.env.staging` → Staging
- `.env.prod` → Production

### 4. **Use Secrets in CI/CD**
```yaml
# GitHub Actions
env:
  MONGO_URI: ${{ secrets.MONGO_URI_PROD }}
```

### 5. **Validate Environment Variables**
```javascript
// BE/config.js
const requiredEnvVars = ['PORT', 'MONGO_URI'];
requiredEnvVars.forEach(varName => {
  if (!process.env[varName]) {
    throw new Error(`Missing required environment variable: ${varName}`);
  }
});
```

---

## 🎓 Common Patterns

### Pattern 1: Environment-Specific Config Files
```javascript
// BE/config/index.js
const config = {
  development: {
    port: 4000,
    mongoUri: 'mongodb://localhost:27017/productsdb',
    logLevel: 'debug'
  },
  production: {
    port: process.env.PORT || 4000,
    mongoUri: process.env.MONGO_URI,
    logLevel: 'error'
  }
};

const env = process.env.NODE_ENV || 'development';
module.exports = config[env];
```

### Pattern 2: Using dotenv Package
```javascript
// BE/index.js
require('dotenv').config({ path: `.env.${process.env.NODE_ENV || 'development'}` });
```

### Pattern 3: Docker Compose with Profiles
```yaml
services:
  backend-dev:
    profiles: ["dev"]
    env_file: ["./BE/.env.dev"]
  
  backend-prod:
    profiles: ["prod"]
    env_file: ["./BE/.env.prod"]
```

Run with: `docker-compose --profile dev up`

---

## 🔍 Debugging Environment Variables

### Check what's loaded:
```bash
# In container
docker exec products-be env | grep PORT

# In Node.js
console.log('Environment:', process.env);

# In React
console.log('Vite Env:', import.meta.env);
```

---

## 📝 Quick Reference

| Method | When to Use | Priority |
|--------|-------------|----------|
| `.env` file | Local development | Low |
| `env_file:` in compose | Docker development | Medium |
| `environment:` in compose | Override specific vars | High |
| Shell `export` | CI/CD, scripts | High |
| GitHub Secrets | CI/CD pipelines | High |

---

## 🎯 Summary

1. **Create separate `.env` files** for each environment
2. **Use different docker-compose files** for dev/prod
3. **Never commit `.env` files** (only `.env.example`)
4. **Use GitHub Secrets** for CI/CD
5. **Validate required variables** at startup
6. **Use environment-specific configs** in code

---

## 📚 Next Steps

1. Create `.env.dev` and `.env.prod` files
2. Update your code to use environment variables
3. Test locally with dev environment
4. Set up CI/CD with environment secrets
5. Deploy to production with prod environment

