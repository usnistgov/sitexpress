FROM node AS sitexpress

WORKDIR /app
RUN npm install -g pnpm

COPY package.json /app
COPY e3-sdk-1.0.10.tgz /app
RUN pnpm install

COPY . .
RUN pnpm run build

FROM scratch

COPY --from=sitexpress /app/dist /public/dist

EXPOSE 8080