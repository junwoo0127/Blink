# Front-end

## 멤버

- 하규진
- 김준우
- 전민재



# 프론트 리드미

*** 빌드 및 배포 가이드를 먼저 보고 환경 구성 완료 후 볼 것 ***

# 프로젝트 기술 스택 - 버전 및 툴

- VSCode
- React
- Openvidu 2.22.0 OnPremises
- Node v10.19.0 / NPM v6.14.4
- nginx 1.18.0

# Git Clone 후 배포

`git clone https://lab.ssafy.com/s07-webmobile1-sub2/S07P12A402.git`

*** SSL 인증서 및 OPENVIDU 등 사전 작업 후 진행 ***

- Front

  1. `sudo apt-get install nginx` ⇒ NginX 설치

  2. /etc/nginx/site-available/nginx.conf   파일 내용 수정 ( 없다면 생성 후 아래와 같이 작성)

     ```
     server {
     listen 443;
     
     ssl on;
     server_name i7a402.p.ssafy.io;
     
     ssl_certificate /etc/letsencrypt/live/i7a402.p.ssafy.io/fullchain.pem;
     ssl_certificate_key /etc/letsencrypt/live/i7a402.p.ssafy.io/privkey.pem;
     
     root   /home/ubuntu/FrontEnd/build;
     index  index.html index.htm;
     
     location / {
     	try_files $uri $uri/ /index.html;
     	}
     }
     ```

  3. sudo apt-get install -y nodejs  /  sudo apt install npm  ⇒ 노드 및 npm 설치

  4. 프론트 폴더로 가서 npm i   ⇒   npm run build  를 통해 빌드 실행

  5. sudo service nginx start   ⇒ NginX를 이용해 React 프로젝트 실행

  ***    안 될 경우 높은 확률로 경로의 문제이므로 잘 살펴볼 것!!! 

     nginx.conf 의 root 경로가 프로젝트 실행 경로이므로 root를 build 된 폴더로 설정해주자!!!
