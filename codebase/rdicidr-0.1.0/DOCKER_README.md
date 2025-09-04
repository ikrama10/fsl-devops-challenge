# 🐳 Docker Setup for rdicidr

This document explains how to use Docker with the rdicidr IPv4 CIDR calculator application.

## 📁 **Docker Files Created**

- `Dockerfile` - Production multi-stage build
- `Dockerfile.dev` - Development environment
- `docker-compose.yml` - Easy development and production setup
- `nginx.conf` - Nginx configuration for production
- `.dockerignore` - Optimized build context

## 🚀 **Quick Start**

### **Option 1: Using Docker Compose (Recommended)**

#### **Development Mode:**
```bash
# Start development server with hot reload
docker-compose up app-dev

# Access at: http://localhost:3000
```

#### **Production Mode:**
```bash
# Build and start production server
docker-compose up app-prod

# Access at: http://localhost:80
```

### **Option 2: Using Docker Commands**

#### **Development:**
```bash
# Build development image
docker build -f Dockerfile.dev -t rdicidr-dev .

# Run development container
docker run -p 3000:3000 -v $(pwd):/app rdicidr-dev
```

#### **Production:**
```bash
# Build production image
docker build -t rdicidr-prod .

# Run production container
docker run -p 80:80 rdicidr-prod
```

## 🔧 **Docker Commands Reference**

### **Build Images:**
```bash
# Production build
docker build -t rdicidr:latest .

# Development build
docker build -f Dockerfile.dev -t rdicidr:dev .

# Build with specific tag
docker build -t rdicidr:v1.0.0 .
```

### **Run Containers:**
```bash
# Run in detached mode
docker run -d -p 80:80 --name rdicidr-app rdicidr:latest

# Run with environment variables
docker run -d -p 80:80 -e NODE_ENV=production rdicidr:latest

# Run with volume mounting
docker run -d -p 80:80 -v /host/path:/app/data rdicidr:latest
```

### **Container Management:**
```bash
# List running containers
docker ps

# Stop container
docker stop rdicidr-app

# Remove container
docker rm rdicidr-app

# View container logs
docker logs rdicidr-app

# Execute commands in container
docker exec -it rdicidr-app sh
```

## 🏗️ **Docker Architecture**

### **Production Dockerfile (Multi-stage):**
```
Stage 1: Builder
├── Node.js 15 Alpine
├── Install dependencies
├── Copy source code
├── Build application
└── Output: /app/build

Stage 2: Production
├── Nginx Alpine
├── Copy built files
├── Configure nginx
└── Serve on port 80
```

### **Development Dockerfile:**
```
Single Stage:
├── Node.js 15 Alpine
├── Install all dependencies
├── Copy source code
├── Hot reload enabled
└── Serve on port 3000
```

## 📊 **Performance Optimizations**

### **Multi-stage Build Benefits:**
- ✅ **Smaller final image** (nginx vs node)
- ✅ **No development dependencies** in production
- ✅ **Optimized for serving static files**
- ✅ **Security improvements**

### **Nginx Configuration Features:**
- ✅ **Gzip compression** for faster loading
- ✅ **Static asset caching** (1 year)
- ✅ **Security headers** (XSS, CSRF protection)
- ✅ **React Router support** (SPA routing)
- ✅ **Health check endpoint** (/health)

## 🔍 **Health Checks**

### **Production Health Check:**
```bash
# Check if application is running
curl http://localhost/health

# Expected response: "healthy"
```

### **Container Health Status:**
```bash
# View health status
docker ps --format "table {{.Names}}\t{{.Status}}\t{{.Health}}"

# View health check logs
docker inspect --format='{{json .State.Health}}' rdicidr-app
```

## 🛠️ **Development Workflow**

### **1. Start Development Environment:**
```bash
docker-compose up app-dev
```

### **2. Make Code Changes:**
- Edit files in your local directory
- Changes are automatically reflected in the container
- Hot reload will restart the development server

### **3. Test Production Build:**
```bash
# Build production image
docker build -t rdicidr-test .

# Run production container
docker run -p 8080:80 rdicidr-test

# Test at: http://localhost:8080
```

### **4. Stop Development:**
```bash
docker-compose down
```

## 🚀 **CI/CD Integration**

### **Docker Build in CI Pipeline:**
```yaml
# Add to your CI workflow
- name: Build Docker image
  run: docker build -t rdicidr:${{ github.sha }} .

- name: Push to registry
  run: |
    docker tag rdicidr:${{ github.sha }} your-registry/rdicidr:${{ github.sha }}
    docker push your-registry/rdicidr:${{ github.sha }}
```

### **Kubernetes Deployment:**
```yaml
# Example Kubernetes deployment
apiVersion: apps/v1
kind: Deployment
metadata:
  name: rdicidr
spec:
  replicas: 3
  selector:
    matchLabels:
      app: rdicidr
  template:
    metadata:
      labels:
        app: rdicidr
    spec:
      containers:
      - name: rdicidr
        image: your-registry/rdicidr:latest
        ports:
        - containerPort: 80
        livenessProbe:
          httpGet:
            path: /health
            port: 80
```

## 🔧 **Troubleshooting**

### **Common Issues:**

1. **Port Already in Use:**
   ```bash
   # Check what's using port 80
   netstat -tulpn | grep :80
   
   # Use different port
   docker run -p 8080:80 rdicidr:latest
   ```

2. **Build Fails:**
   ```bash
   # Check build logs
   docker build -t rdicidr:latest . --progress=plain
   
   # Clean build cache
   docker builder prune
   ```

3. **Container Won't Start:**
   ```bash
   # Check container logs
   docker logs rdicidr-app
   
   # Run with interactive shell
   docker run -it rdicidr:latest sh
   ```

4. **Permission Issues:**
   ```bash
   # Fix file permissions
   sudo chown -R $USER:$USER .
   
   # Run with proper user
   docker run -u $(id -u):$(id -g) rdicidr:latest
   ```

## 📈 **Monitoring and Logs**

### **View Application Logs:**
```bash
# Follow logs in real-time
docker logs -f rdicidr-app

# View last 100 lines
docker logs --tail 100 rdicidr-app

# View logs with timestamps
docker logs -t rdicidr-app
```

### **Nginx Access Logs:**
```bash
# View nginx access logs
docker exec rdicidr-app tail -f /var/log/nginx/access.log

# View nginx error logs
docker exec rdicidr-app tail -f /var/log/nginx/error.log
```

## 🎯 **Next Steps**

1. **Test the Docker setup** with the commands above
2. **Integrate with your CI/CD pipeline**
3. **Deploy to your preferred platform** (Kubernetes, Docker Swarm, etc.)
4. **Set up monitoring and logging**
5. **Configure production environment variables**

---

## 🎉 **Ready to Deploy!**

Your application is now containerized and ready for:
- ✅ **Local development** with hot reload
- ✅ **Production deployment** with nginx
- ✅ **CI/CD integration**
- ✅ **Kubernetes deployment**
- ✅ **Scalable architecture**

**Start with `docker-compose up app-dev` for development!** 🚀
