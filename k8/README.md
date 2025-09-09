

This directory contains Kubernetes manifests for deploying the FSL Challenge application.

## Prerequisites

1. **Docker Desktop** - [Download here](https://www.docker.com/products/docker-desktop)
2. **Minikube** - [Download here](https://minikube.sigs.k8s.io/docs/start/)
3. **kubectl** - [Download here](https://kubernetes.io/docs/tasks/tools/)
4. **NGINX Ingress Controller** (automatically installed with minikube)

## Manual Deployment Guide

### Step 1: Start Minikube

```powershell
# Start minikube cluster
minikube start

# Verify it's running
minikube status
```

**Expected Output:**
```
minikube
type: Control Plane
host: Running
kubelet: Running
apiserver: Running
kubeconfig: Configured
```

### Step 2: Configure Docker for Minikube

```powershell
# Point Docker to minikube's daemon
minikube docker-env | Invoke-Expression

# Verify Docker is working
docker ps
```

### Step 3: Build Docker Image

```powershell
# Navigate to project root
cd ..

# Build the Docker image
docker build -t fsl-challenge-app:latest .\codebase\rdicidr-0.1.0\
```

**Expected Output:**
```
[+] Building 1.5s (14/14) FINISHED
 => [internal] load build definition from Dockerfile
 => [internal] load metadata for docker.io/library/node:15-alpine
 => [internal] load .dockerignore
 => [builder 1/6] FROM docker.io/library/node:15-alpine
 => [builder 2/6] WORKDIR /app
 => [builder 3/6] COPY package*.json ./
 => [builder 4/6] RUN npm install
 => [builder 5/6] COPY . .
 => [builder 6/6] RUN npm run build
 => [stage-1 4/6] COPY --from=builder /app/build ./build
 => [stage-1 5/6] COPY --from=builder /app/server.js ./
 => [stage-1 6/6] EXPOSE 8080
 => exporting to image
 => => writing image sha256:...
 => => naming to docker.io/library/fsl-challenge-app:latest
```

### Step 4: Deploy Kubernetes Resources (In Order)

Navigate to the k8 directory:
```powershell
cd k8
```

#### 4.1 Create Namespace
```powershell
kubectl apply -f namespace.yml
```

#### 4.2 Create Secret
```powershell
kubectl apply -f secret.yml
```

#### 4.3 Deploy StatefulSet
```powershell
kubectl apply -f statefulset.yml
```

#### 4.4 Create Service
```powershell
kubectl apply -f service.yml
```

#### 4.5 Deploy Ingress
```powershell
kubectl apply -f ingress.yml
```

### Step 5: Wait for Pods to be Ready

```powershell
# Wait for all pods to be ready
kubectl wait --for=condition=ready pod -l app=fsl-challenge-app -n production --timeout=300s
```

### Step 6: Configure Access

#### 6.1 Add Host Entry (Run as Administrator)

1. **Open Notepad as Administrator**
2. **Open file:** `C:\Windows\System32\drivers\etc\hosts`
3. **Add this line:** `127.0.0.1 fsl-challenge.me`
4. **Save the file**

#### 6.2 Start Minikube Tunnel

```powershell
# Start tunnel in a separate terminal
minikube tunnel
```

**Expected Output:**
```
✅  Tunnel successfully started
📌  NOTE: Please do not close this terminal as this process must stay alive for the tunnel to be accessible
🏃  Starting tunnel for service fsl-challenge-ingress.
```

### Step 7: Test Application

```powershell
# Test the application
Invoke-WebRequest -Uri "http://fsl-challenge.me"
```

**Expected Output:**
```
StatusCode        : 200
StatusDescription : OK
Content           : <!doctype html><html lang="en">...
```

## Alternative Deployment Methods

### Method 1: Automated Script

```bash
# Make the deployment script executable
chmod +x deploy.sh

# Run the deployment script
./deploy.sh
```

### Method 2: Port Forwarding (For Testing)

```powershell
# Start port forwarding
kubectl port-forward svc/fsl-challenge-service 8080:8080 -n production

# Access at: http://localhost:8080
```

## Access Methods

### Local Access
- **Domain:** `http://fsl-challenge.me`
- **Localhost:** `http://localhost:8080` (with port forwarding)
- **IP Access:** `http://127.0.0.1:8080`

### External Access (From Another PC)
- **Network IP:** `http://192.168.0.50:8080` (replace with your PC's IP)
- **Requirements:** Both PCs on same network, Windows Firewall configured

## Verification

Check the deployment status:

```bash
# Check all resources in production namespace
kubectl get all -n production

# Check StatefulSet status
kubectl get statefulset -n production

# Check pods
kubectl get pods -n production

# Check services
kubectl get svc -n production

# Check ingress
kubectl get ingress -n production
```

## Application Features

- **StatefulSet**: 3 replicas for high availability
- **Service**: Exposes port 8080
- **Secret**: Contains MY_SECRET environment variable
- **Ingress**: Routes traffic from fsl-challenge.me to the application
- **Environment Variable**: MY_SECRET is displayed in the application header

## Troubleshooting

### Common Issues and Solutions

#### Issue 1: "Site Can't Be Reached"
**Cause:** Wrong IP in hosts file or minikube tunnel not running
**Solution:**
```powershell
# Check hosts file
Get-Content C:\Windows\System32\drivers\etc\hosts | Select-String "fsl-challenge"

# Should show: 127.0.0.1 fsl-challenge.me
# If wrong, edit hosts file and change to: 127.0.0.1 fsl-challenge.me

# Restart minikube tunnel
taskkill /F /IM minikube.exe
minikube tunnel
```

#### Issue 1.1: "TUNNEL_ALREADY_RUNNING" Error
**Cause:** Another minikube tunnel process is already running
**Solution:**
```powershell
# Stop all minikube processes
taskkill /F /IM minikube.exe

# Verify tunnel is stopped
tasklist | findstr minikube

# Start new tunnel
minikube tunnel
```

#### Issue 2: Docker Connection Error
**Cause:** Docker Desktop not running
**Solution:**
```powershell
# Start Docker Desktop
Start-Process "C:\Program Files\Docker\Docker\Docker Desktop.exe"

# Wait for Docker to start, then:
minikube start
```

#### Issue 3: Pods Not Starting
**Cause:** Image pull issues or resource constraints
**Solution:**
```powershell
# Check pod status
kubectl get pods -n production

# Check pod logs
kubectl logs fsl-challenge-app-0 -n production

# Rebuild image if needed
minikube docker-env | Invoke-Expression
docker build -t fsl-challenge-app:latest ..\codebase\rdicidr-0.1.0\
```

#### Issue 4: Port Forwarding Not Working
**Cause:** Port already in use or service not ready
**Solution:**
```powershell
# Kill existing port forwarding
Get-Process | Where-Object {$_.ProcessName -eq "kubectl"} | Stop-Process

# Start new port forwarding
kubectl port-forward svc/fsl-challenge-service 8080:8080 -n production
```

#### Issue 5: External Access Not Working
**Cause:** Windows Firewall or network configuration
**Solution:**
```powershell
# Check if port is accessible
Test-NetConnection -ComputerName localhost -Port 8080

# Configure Windows Firewall to allow port 8080
# Or temporarily disable firewall for testing
```

### Diagnostic Commands

```powershell
# Check all resources
kubectl get all -n production

# Check pod status
kubectl get pods -n production

# Check service
kubectl get svc -n production

# Check ingress
kubectl get ingress -n production

# Check minikube status
minikube status

# Check minikube IP
minikube ip

# Check Docker status
docker ps

# Check hosts file
Get-Content C:\Windows\System32\drivers\etc\hosts | Select-String "fsl-challenge"
```

### Reset and Redeploy

```powershell
# Delete all resources
kubectl delete namespace production

# Stop minikube
minikube stop

# Start fresh
minikube start
minikube docker-env | Invoke-Expression
docker build -t fsl-challenge-app:latest ..\codebase\rdicidr-0.1.0\

# Redeploy
cd k8
kubectl apply -f namespace.yml
kubectl apply -f secret.yml
kubectl apply -f statefulset.yml
kubectl apply -f service.yml
kubectl apply -f ingress.yml

# Wait for pods
kubectl wait --for=condition=ready pod -l app=fsl-challenge-app -n production --timeout=300s

# Start tunnel
minikube tunnel
```

## AWS Deployment

For AWS deployment, you can use:

1. **Amazon EKS** (Elastic Kubernetes Service)
2. **Amazon ECS** (Elastic Container Service)
3. **AWS App Runner**
4. **Amazon EC2** with Docker

### EKS Deployment

1. Create an EKS cluster
2. Configure kubectl for EKS
3. Install NGINX Ingress Controller
4. Run the same deployment commands as above

### ECS Deployment

1. Create an ECS cluster
2. Create a task definition
3. Create a service
4. Configure Application Load Balancer

The application will be available at your AWS endpoint during the challenge recording.

## Quick Reference

### Complete Manual Deployment Sequence
```powershell
# 1. Start minikube
minikube start

# 2. Configure Docker
minikube docker-env | Invoke-Expression

# 3. Build image
docker build -t fsl-challenge-app:latest ..\codebase\rdicidr-0.1.0\

# 4. Deploy resources
cd k8
kubectl apply -f namespace.yml
kubectl apply -f secret.yml
kubectl apply -f statefulset.yml
kubectl apply -f service.yml
kubectl apply -f ingress.yml

# 5. Wait for pods
kubectl wait --for=condition=ready pod -l app=fsl-challenge-app -n production --timeout=300s

# 6. Start tunnel (separate terminal)
minikube tunnel

# 7. Add to hosts file: 127.0.0.1 fsl-challenge.me
# 8. Test: http://fsl-challenge.me
```

### Working URLs
- **Local:** `http://localhost:8080` (port forwarding)
- **Domain:** `http://fsl-challenge.me` (minikube tunnel)
- **External:** `http://192.168.0.50:8080` (from other PCs)

### Minikube Tunnel Management
```powershell
# Start tunnel
minikube tunnel

# Stop tunnel (if "TUNNEL_ALREADY_RUNNING" error)
taskkill /F /IM minikube.exe

# Check if tunnel is running
tasklist | findstr minikube

# Restart tunnel
taskkill /F /IM minikube.exe
minikube tunnel
```

### Key Files
- `namespace.yml` - Creates production namespace
- `secret.yml` - Contains application secrets
- `statefulset.yml` - Main application deployment
- `service.yml` - Service for pod communication
- `ingress.yml` - External access configuration

---

**🎉 Your Kubernetes application is now ready for deployment!**
