# Gunakan image Nixpacks (atau base image yang sesuai)
FROM ghcr.io/railwayapp/nixpacks:ubuntu-1731369831 AS builder

WORKDIR /app

# Salin file package dan package-lock (jika ada)
COPY package*.json ./

# Atur environment variable untuk meningkatkan timeout npm
ENV NPM_CONFIG_FETCH_TIMEOUT=120000
ENV NPM_CONFIG_FETCH_RETRY_MINTIMEOUT=20000
ENV NPM_CONFIG_FETCH_RETRY_MAXTIMEOUT=120000

# Instal dependensi dengan cache mount (jika menggunakan Docker BuildKit)
RUN --mount=type=cache,id=npm,target=/root/.npm npm i

# Salin seluruh source code dan build aplikasi
COPY . .
RUN npm run build

# Stage untuk menyajikan file statis (misalnya menggunakan Nginx)
FROM nginx:stable-alpine

COPY --from=builder /app/dist /usr/share/nginx/html

EXPOSE 80
CMD ["nginx", "-g", "daemon off;"]
