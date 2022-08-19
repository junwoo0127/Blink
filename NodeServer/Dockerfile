FROM node:12-alpine
WORKDIR /app
COPY package*.json /app
RUN npm install
COPY . /app
COPY  /etc/letsencrypt/live/i7a402.p.ssafy.io/privkey.pem /etc/letsencrypt/live/i7a402.p.ssafy.io/privkey.pem
COPY /etc/letsencrypt/live/i7a402.p.ssafy.io/cert.pem /etc/letsencrypt/live/i7a402.p.ssafy.io/cert.pem
CMD [ "npm", "start" ]
EXPOSE 4000