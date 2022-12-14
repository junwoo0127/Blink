# nginx 이미지를 사용합니다. 뒤에 tag가 없으면 latest 를 사용합니다.
FROM nginx

# root 에 app 폴더를 생성
RUN mkdir /app

# work dir 고정
WORKDIR /app

# work dir 에 build 폴더 생성 /app/build
RUN mkdir ./build

# host pc의 현재경로의 build 폴더를 workdir 의 build 폴더로 복사
ADD ./build ./build

# nginx 의 default.conf 를 삭제
RUN rm /etc/nginx/conf.d/default.conf

# host pc 의 nginx.conf 를 아래 경로에 복사
COPY ./nginx.conf /etc/nginx/conf.d
COPY  /etc/letsencrypt/live/i7a402.p.ssafy.io/privkey.pem /etc/letsencrypt/live/i7a402.p.ssafy.io/privkey.pem
COPY /etc/letsencrypt/live/i7a402.p.ssafy.io/cert.pem /etc/letsencrypt/live/i7a402.p.ssafy.io/cert.pem

# 80 포트 오픈
EXPOSE 80

# container 실행 시 자동으로 실행할 command. nginx 시작함
CMD ["nginx", "-g", "daemon off;"]

# FROM node:latest as builder

# # 작업 폴더를 만들고 npm 설치
# RUN mkdir /usr/src/app
# WORKDIR /usr/src/app
# ENV PATH /usr/src/app/node_modules/.bin:$PATH
# COPY package.json /usr/src/app/package.json
# RUN npm install --silent
# RUN npm install react-scripts@3.4.1 -g --silent

# # 소스를 작업폴더로 복사하고 빌드
# COPY . /usr/src/app
# RUN npm run build

# FROM nginx:latest
# # nginx의 기본 설정을 삭제하고 앱에서 설정한 파일을 복사
# RUN rm -rf /etc/nginx/conf.d
# COPY conf /etc/nginx

# # 위에서 생성한 앱의 빌드산출물을 nginx의 샘플 앱이 사용하던 폴더로 이동
# COPY --from=builder /usr/src/app/build /usr/share/nginx/html

# # 80포트 오픈하고 nginx 실행
# EXPOSE 80
# CMD ["nginx", "-g", "daemon off;"]
