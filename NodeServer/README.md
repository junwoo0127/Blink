# 노드 리드미

*** 빌드 및 배포 가이드를 먼저 보고 환경 구성 완료 후 볼 것 ***

- Node - server.js
    - server.js 가 있는 경로로 이동해서
        - cp /etc/letsencrypt/live/i7a402.p.ssafy.io/cert.pem /home/ubuntu/FrontEnd/src/testserver/cert.pem  실행 후
            
            cp /etc/letsencrypt/live/i7a402.p.ssafy.io/privkey.pem /home/ubuntu/FrontEnd/src/testserver/privkey.pem 실행
            
            ⇒ cert-bot 을 통해 발급받은 SSL 인증서를 node서버 사용을 위해 복사
            
        - nohup node server.js &  ⇒   백그라운드에서 노드 서버가 실행된다