#!/bin/bash

# Build the Docker image
echo "Building Docker image..."
docker build -t fsl-challenge-app:latest ../codebase/rdicidr-0.1.0/

# Create namespace
echo "Creating production namespace..."
kubectl apply -f namespace.yml

# Create secret
echo "Creating secret..."
kubectl apply -f secret.yml

# Deploy StatefulSet
echo "Deploying StatefulSet..."
kubectl apply -f statefulset.yml

# Deploy service
echo "Deploying service..."
kubectl apply -f service.yml

# Deploy ingress
echo "Deploying ingress..."
kubectl apply -f ingress.yml

# Wait for pods to be ready
echo "Waiting for pods to be ready..."
kubectl wait --for=condition=ready pod -l app=fsl-challenge-app -n production --timeout=300s

echo "Deployment complete!"
echo "Check the status with: kubectl get all -n production"
echo "Access the application at: http://fsl-challenge.me"
