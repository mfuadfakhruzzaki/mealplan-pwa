# Stage 1: Build
FROM node:18-alpine AS builder

# Set direktori kerja
WORKDIR /app

# Salin file package dan install dependensi
COPY package*.json ./
RUN npm install

# Salin seluruh source code ke dalam container
COPY . .

# Build aplikasi untuk production
RUN npm run build

# Stage 2: Serve dengan Nginx
FROM nginx:stable-alpine

# Salin build output dari stage builder ke direktori yang digunakan Nginx
COPY --from=builder /app/dist /usr/share/nginx/html

# Salin konfigurasi Nginx (opsional, jika ingin custom konfigurasi)
# COPY nginx.conf /etc/nginx/conf.d/default.conf

EXPOSE 80

# Jalankan Nginx dalam mode foreground
CMD ["nginx", "-g", "daemon off;"]
