# Step 1: Build the React frontend
FROM node:18 AS front

# Set the working directory for the frontend
WORKDIR /app

# Copy frontend package files and install dependencies
COPY package*.json ./
RUN npm install

# Copy the entire frontend source code
COPY . .

# Build the React app
RUN npm run build

# Set the environment variable for the React app's port
ENV PORT=8000

# Expose the port for React app to run (port 8000)
EXPOSE 8000

# Serve the React build using a simple HTTP server
RUN npm install -g serve
CMD ["serve", "-s", "build", "-l", "8000"]
