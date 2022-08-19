# 백 리드미

*** 빌드 및 배포 가이드를 먼저 보고 환경 구성 완료 후 볼 것 ***

# 프로젝트 기술 스택 - 버전 및 툴

- SpringBoot
- sts-3.9.14.RELEASE
- Gradle 6.8.3
- JVM 11.0.16 (Ubuntu 11.0.16+8-post-Ubuntu-0ubuntu120.04)
- JPA
- openjdk version "11.0.16" 
OpenJDK Runtime Environment (build 11.0.16+8-post-Ubuntu-0ubuntu120.04)
OpenJDK 64-Bit Server VM (build 11.0.16+8-post-Ubuntu-0ubuntu120.04, mixed mode, sharing)
- MySQL 8.0.30 / MySQL Workbench 8.0

# Git Clone 후 배포

`git clone https://lab.ssafy.com/s07-webmobile1-sub2/S07P12A402.git`

- `sudo apt install gradle` ⇒ gradle 설치 후
- 백 폴더 경로로 이동해서
    
    ⇒ sudo gradle build   를 통해 build 실행
    
- 백엔드 jar 파일이 있는 경로에서 (통상 프로젝트 내 build/libs)
    
    ⇒ nohup java -jar 압축파일이름 &      백그라운드에서 백엔드 서버가 실행된다
    

*** SSL 인증서 발급 및 PKC12 파일 생성 후 Springboot 프로젝트에 적용시킨 후 진행해야 오류가 없다!!! 반드시 사전환경설정을 해준 다음 프로젝트를 실행하자!!! ***