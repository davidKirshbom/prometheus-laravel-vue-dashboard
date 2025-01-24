# Use the Node.js base image
FROM node:18

# Set the working directory inside the container
WORKDIR /usr/src/app

# Copy package files and install dependencies
COPY package*.json ./
RUN npm install

# Copy the rest of the application code
COPY . .

# Set environment variables (can be overridden at runtime)


# Expose no specific port since it's a client, not a server
# No EXPOSE statement needed

# Start the load generator
CMD ["npm", "start"]