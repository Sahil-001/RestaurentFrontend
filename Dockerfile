# Step 1: Build the React frontend
FROM node:18 AS front

# Set the working directory for the frontend
WORKDIR /app/frontend

# Copy frontend package files and install dependencies
COPY frontend/restaurent_app/package*.json ./
RUN npm install

# Copy the entire frontend source code
COPY frontend/restaurent_app/ ./

# Set the environment variable for the React app's port
ENV PORT=8000

# Build the React app
RUN npm run build

# Expose the port for React app to run (port 8000)
EXPOSE 8000

# Command to run the React app
CMD ["npm", "start"]
