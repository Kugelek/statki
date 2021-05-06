FROM node:14

# Create app directory
WORKDIR /usr/src/app

# Install app dependencies
# A wildcard is used to ensure both package.json AND package-lock.json are copied
# where available (npm@5+)
COPY package*.json ./

RUN npm install
# If you are building your code for production
# RUN npm ci --only=production

# Bundle app source
COPY . .

EXPOSE 8080
CMD [ "node", "game.js" ]


# FROM node:latest

# # Create app directory
# RUN mkdir -p /usr/src/app
# WORKDIR /usr/src/app

# # Install app dependencies
# COPY package.json /usr/src/app/
# RUN npm install

# # Bundle app source
# COPY . /usr/src/app

# EXPOSE 8080
# CMD [ "npm", "start" ]

# WORKDIR /usr/src/app

# COPY . ./

# RUN npm install

# CMD ["npm", "start"]
# CMD "node Game.js"
# CMD "npm run start"

# COPY package*.json ./

# RUN npm install

# COPY . .

# EXPOSE 8080

# CMD [ "node", "server.js" ]