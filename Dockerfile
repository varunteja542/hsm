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

# Run tests
RUN npm test

# Prepare for production
FROM node:16 AS production

# Set the working directory in the production container
WORKDIR /usr/src/app

# Copy package.json and package-lock.json to install only production dependencies
COPY package*.json ./

# Install only production dependencies
RUN npm install --only=production

# Copy the built application from the development stage
COPY --from=development /usr/src/app .

# Expose the port your app runs on
EXPOSE 3000

# Command to run your application
CMD ["npm", "startserver"]
