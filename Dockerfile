# Use the official Node.js image for building the app
FROM node:20 AS build

# Set the working directory
WORKDIR /app

# Copy package.json and package-lock.json
COPY package*.json ./

# Install dependencies
RUN npm install

# Copy the rest of the application files
COPY . .

# Build the Vue.js app
RUN npm run build

# Use a lightweight web server to serve the app
FROM nginx:alpine

# Copy the built files from the build stage
COPY --from=build /app/dist /usr/share/nginx/html

# Expose the port for the web server
EXPOSE 80

# Start nginx
CMD ["nginx", "-g", "daemon off;"]
