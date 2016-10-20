FROM   172.30.246.110:5000/costanzo-sandbox-dev/nodejs-4-rhel7-icc:latest
#FROM  172.30.246.110:5000/costanzo-sandbox-dev/rhel7-nodejs:latest

MAINTAINER Nick Costanzo <ncostanzo@ups.com>

# Switch to user root
USER root

# Create a working directory for the application to sit in
WORKDIR /app

# Copy the bundled Angular2 code and dependencies
COPY dist dist
COPY img img
COPY typings typings
#COPY public public

# Copy nodejs code and dependencies
COPY node_modules node_modules
COPY server.js server.js

# Copy package.json for start script
COPY package.json package.json

RUN npm install
RUN ng build
# Change permissions to all copied resources
# TODO: Change to proper permission octets - 777 is dangerous
RUN chmod 777 -R /app

# Expose the nodejs port
EXPOSE 8080

# Switch to default unelevated user for container process execution
USER 1001

# Run the start script
ENTRYPOINT ["npm", "start"]
