# Utilizar una imagen base de Node.js para construir la aplicación
FROM node:22 AS build


WORKDIR /app

# Copiar package.json y package-lock.json
COPY package*.json ./



# Instalar dependencias
RUN npm i --force

# Copiar el código fuente
COPY . .

# Construir la aplicación con un base-href personalizado
ARG BASE_HREF=/browser/
RUN npm run build -- --configuration production  --base-href=$BASE_HREF
# RUN ng build build

# Etapa 2: Servir con NGINX
FROM nginx:latest

COPY nginx.conf /etc/nginx/nginx.conf
COPY ssl.conf /etc/nginx/conf.d/default.conf
COPY entrypoint.sh /entrypoint.sh
RUN chmod +x /entrypoint.sh


COPY --from=build /app/dist/apptest /usr/share/nginx/html

# Copiar el archivo de configuración de Nginx
# COPY nginx.conf /etc/nginx/nginx.conf


# Instalar Certbot para manejar certificados SSL
#RUN apt-get update && apt-get install -y certbot python3-certbot-nginx



EXPOSE 80
EXPOSE 443
ENTRYPOINT ["/entrypoint.sh"]
CMD ["nginx", "-g", "daemon off;"]
