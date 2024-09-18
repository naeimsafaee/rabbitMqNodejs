# Use the official Node.js image as base
FROM node:18-alpine as build

# Set the working directory in the container
WORKDIR /usr/src/app

# Install a specific npm version
RUN npm install -g npm@8.1.2

RUN npm cache clean --force

# Copy package.json and package-lock.json to the working directory
COPY package*.json ./

# Install dependencies
RUN npm install --force

# Copy the rest of the application code to the working directory
COPY . .

# Expose the port that the app runs on
EXPOSE 3000

# Command to run the application
CMD ["node", "server.js"]
