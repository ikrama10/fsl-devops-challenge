# Multi-stage build for production
FROM node:15-alpine as builder

# Set working directory
WORKDIR /app

# Copy package files
COPY package*.json ./

# Install dependencies with better network settings
RUN npm config set registry https://registry.npmjs.org/ && \
    npm config set timeout 300000 && \
    npm config set fetch-retries 5 && \
    npm install

# Copy source code
COPY . .

# Build the application
RUN npm run build

# Production stage
FROM node:15-alpine

# Set working directory
WORKDIR /app

# Copy package files
COPY package*.json ./

# Install only production dependencies
RUN npm config set registry https://registry.npmjs.org/ && \
    npm config set timeout 300000 && \
    npm config set fetch-retries 5 && \
    npm install --only=production

# Copy built application and server from builder stage
COPY --from=builder /app/build ./build
COPY --from=builder /app/server.js ./

# Expose port 8080
EXPOSE 8080

# Start the server
CMD ["node", "server.js"] 