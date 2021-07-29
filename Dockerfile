FROM node:16-alpine as dependencies
WORKDIR /usr/app
COPY package*.json ./
RUN npm install --ignore-scripts && mv node_modules dev_node_modules
RUN npm install --only=production --ignore-scripts && mv node_modules prod_node_modules 

FROM node:16-alpine as build
WORKDIR /usr/app
COPY --from=dependencies /usr/app/dev_node_modules ./node_modules
COPY package*.json ./
COPY src src
COPY tsconfig* ./
RUN npm run build

FROM node:16-alpine as release
RUN apk --no-cache add tini
ENTRYPOINT ["/sbin/tini", "--"]
WORKDIR /usr/app
COPY package*.json ./
COPY --from=dependencies /usr/app/prod_node_modules ./node_modules
COPY --from=build /usr/app/dist/ ./dist
USER node
CMD ["node", "dist/main.js"]

FROM node:16-alpine as test
WORKDIR /usr/app
COPY --from=dependencies /usr/app/dev_node_modules ./node_modules
COPY --from=build /usr/app/ ./
COPY test test
CMD ["npm", "test"];

FROM release