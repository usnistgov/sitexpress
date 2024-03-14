# node runtime as base image
FROM node:20-alpine AS sitexpress

# make /app as working directory
WORKDIR /app

# copy files to working directory
COPY package.json ./
COPY e3-sdk-1.0.10.tgz ./

# install packages from package.json
RUN npm install

# copy all files to working directory
COPY . .
RUN npm run build

# Use Nginx as the production server
FROM nginx:alpine

# Copy the built React app to Nginx's web server directory
COPY --from=sitexpress /app/dist /usr/share/nginx/html

# Add your custom NGINX configuration
COPY custom_headers.conf /etc/nginx/conf.d/custom_headers.conf

# Expose port 80 for the Nginx server
EXPOSE 80

# Start Nginx when the container runs
CMD ["nginx", "-g", "daemon off;"]