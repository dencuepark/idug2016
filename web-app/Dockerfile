FROM   172.30.246.110:5000/costanzo-sandbox-dev/nodejs-4-rhel7-idug:latest

MAINTAINER Nick Costanzo <ncostanzo@ups.com>

# Switch to user root
USER root

# Create a working directory for the application to sit in
WORKDIR /app

COPY e2e e2e
COPY img img
COPY src src

COPY .editorconfig .editorconfig
COPY angular-cli.json angular-cli.json
COPY karma.conf.js karma.conf.js
COPY package.json package.json
COPY protractor.conf.js protractor.conf.js
COPY server.js server.js
COPY tslint.json tslint.json
COPY typings.json typings.json

#Run the build steps
RUN npm install
RUN npm install couchbase
RUN typings install
RUN ng build --prod

# Change permissions to all copied resources
# TODO: Change to proper permission octets - 777 is dangerous
RUN chmod 777 -R /app

# Expose the nodejs port
EXPOSE 8080

# Switch to default unelevated user for container process execution
USER 1001

# Run the start script
ENTRYPOINT ["npm", "start"]
