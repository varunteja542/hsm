# Use the official Node.js image as the base
FROM node:16 AS development

# Set the working directory in the container
WORKDIR /usr/src/app

# Copy package.json and package-lock.json
COPY package*.json ./

# Install development dependencies
RUN npm install

# Copy the rest of your application code
COPY . .



# Expose the port your app runs on
EXPOSE 3000

# Command to run your application
CMD ["node", "startserver.js"]
