# Build Stage 1
# This build created a staging docker image 
#
FROM 116915543549.dkr.ecr.us-east-1.amazonaws.com/node:18.14.0-alpine3.17  AS edibuilder
WORKDIR /usr/app
COPY package*.json ./
#--production is not getting tsc build
COPY . .
RUN npm install 
RUN npm run build

# Build Stage 2
# This build takes the production build from staging build
#
# stage 2
FROM 116915543549.dkr.ecr.us-east-1.amazonaws.com/node:18.14.0-alpine3.17
ENV NODE_ENV production
COPY package*.json ./
RUN npm install --omit=dev
COPY --from=edibuilder /usr/app/dist ./dist
EXPOSE 8080
CMD [ "node", "dist/app.js" ]
