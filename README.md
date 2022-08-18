

## Blind Link BLINK (시대 최적화 블라인드 미팅 )

<img src="assets/image-20220818201926112.png" alt="image-20220818201926112" style="zoom:25%;" />

#### Overview

----

**오프라인에서 새로운 만남을 가지기 부담스러우신가요? Blink 을 통해 부담없이 새로운친구를 사귀어 보세요!!!**



#### Blink 의 모토

---

**진짜 너를 보여줘, BLINK✨**



#### Blink 서비스 화면

----



#### 주요 기능 

----

- **서비스 설명 : 얼굴을 가린채 쉽게 온라인상에서 부담없이 새로운 친구를 사귈수 있는 미팅 프로그램**

- **주요기능:**
  - **webRTC(openvidu) 와 Face API 을 통한 얼굴인식 블라인드 미팅**
  - **MBTI 맞추기 게임과 첫인상 평가를 통한 서로의 호감 표시**
  - **최종선택 일치시  블라인트 필터 제거 후 만남 진행**

​			

#### 사용 기술스택

---

**Backend**

- **sts-3.9.14.RELEASE**

- **Gradle 6.8.3**

- **Spring-boot-jpa**

- **Spring Security**

- **Java 8**

- **mysql**

- **JWT**

  

**Frontend**

- **Visual Studio Code**
- **React.js 18.2.0**
- **Material-UI 5.9.2**
- **redux 4.2.0**
- **face-api.js 0.22.2**
-  **socket.io 4.5.1**
- **node.js**



**Web RTC**

-  **openvidu 2.22.0**



**Face recognition**

- **face-api.js 0.22.2**



**CI/CD**

- **aws ec2**
- **docker**
- **nginx**



#### 서비스 아키텍쳐

---

![image-20220818213333195](assets/image-20220818213333195.png)



#### 포팅 메뉴얼

---

**포팅 메뉴얼은 "여기"를 참고하세요**



#### 기술 특이점

---

- **face-api.js**

  **얼굴 블라인드 처리를 위해 사용한 face recognition javaScript API 입니다.**
  
  ****
  
  ![image-20220818224941407](assets/image-20220818224941407.png)
  
  **위 사진과 같이 본인의 얼굴은 블라인드 처리하고 실시간으로 얼굴 포인트를 확인해 표정만 확인 할 수 있도록 서비스에 맞게 구현하였습니다.**
  
  



- **WebRTC (Openvidu)**

   **Openvidu 기본 기능뿐만 아니라 Openvidu  백엔드와 연결하는 과정을 통해 여러가지 기능을 커스터 마이징했습니다. 인원 수 를 지정하거나 , 컴포넌트 안에서 첫인상 선택과 , 최종선택 과 같은 부분을 백엔드와의 연동을 통해 진행 할수 있게 처리하였고 , 아이스브레이킹 을 할수있는 시간인 MBTI 을 맞추는 게임 구현을 통해  비대면 상황이지만 서로를 빠르게 알아 갈 수 있습니다.**

  

- **FrontEnd**

  **Reatc 와 Redux 사용을 통해 상태관리와 구현을  진행하였고 , Material-UI 을 통해 CSS 을 구성하였습니다.** (소켓서버내용써줘) 

  

- **BackEnd**

  **Spring-boot 와 Spring Security 을 이용해 백엔드를 구성했고 JPA와 JWT 토큰을 사용하였습니다.**

- 배포

  (배포내용 써줘)



#### API 기능 명세서

---



#### 화면 설계서

---

https://www.figma.com/file/ZFwXvp9pnDf8uTQIsCI8d0/%EC%99%80%EC%9D%B4%EC%96%B4%ED%94%84%EB%A0%88%EC%9E%84FIN



#### 협업툴

---

- Git
- Jira
- Notion
- Mattermost
- Webex
- figma

#### GIT 컨벤션

---

### Commit Convention

- `Feat` : 새로운 기능을 추가할 경우
- `Fix` : 버그를 고친 경우
- `Update` : 코드 수정

### branch Convention

- `master` : 제품 출시될 수 있는 브랜치
- `develop` : 다음 출시 버전 개발하는 브랜치
- `feature` : 기능을 개발하는 브랜치 (기능 별 생성후 병합)



#### Notion

---

협업과 모두가 봐야할  공지나 명세서를 모아 관리하고 , 주마다 기록한 회의록 , 모두가 보면 좋은 공부내용을 정리해 올렸습니다. 



#### JIra

----

협업과 일정 관리를 위해 Jira 을 이용했습니다. 매주 월요일 오전 회의를 통해 한주동안 진행할 계획을 짜고 이슈들을 등록해 일주일 단위로 스프린트를 만들어 등록했습니다. 



#### **ER Diagram**

---

![image-20220818234805871](assets/image-20220818234805871.png)



#### EC2 포트 정리

----

(지호형 도와줘)

| **PORT** | **이름**                                                |
| -------- | ------------------------------------------------------- |
| 443      | HTTPS                                                   |
| 80       | HTTP - HTTPS로 리다이렉트(프론트 페이지지로 리다이렉트) |
| 8443     | Openvidu                                                |
| 8379     | Redis                                                   |
| 3306     | MySQL                                                   |
| 8081     | Jenkins                                                 |
| 8080     | Spring boot Docker Container                            |
| 3000     | React, NginX Docker Container                           |



#### SSAFINITE 의 팀원을 소개합니다.

----

|                          **하규진**                          |                          **전민재**                          |                          **김준우**                          |                          **박지호**                          |                            유재열                            |                          **김도훈**                          |
| :----------------------------------------------------------: | :----------------------------------------------------------: | :----------------------------------------------------------: | :----------------------------------------------------------: | :----------------------------------------------------------: | :----------------------------------------------------------: |
| <img src="C:\Users\xogh0\OneDrive\Desktop\readme\assets\image-20220819010030745.png" alt="image-20220819010030745" style="zoom: 33%;" /> | <img src="assets/image-20220819010116816.png" alt="image-20220819010116816" style="zoom:33%;" /> | <img src="assets/image-20220819035004115.png" alt="image-20220819035004115" style="zoom: 50%;" /> | <img src="assets/image-20220819011023796.png" alt="image-20220819011023796" style="zoom:33%;" /> | <img src="assets/image-20220819011010521.png" alt="image-20220819011010521" style="zoom: 25%;" /> | <img src="assets/image-20220819010902030.png" alt="image-20220819010902030" style="zoom:33%;" /> |
|                      Leader & FrontEnd                       |                           Frontend                           |                           Frontend                           |                           BackEnd                            |                           BackEnd                            |                           BackEnd                            |



#### 팀원역할

유재열 

- Face-api .js을 이용한 face recognition  필터구현 

- 회원가입 CRUD API 구현

- 로그인 CRUD API 구현

- openvidu 방 입장 백엔드 구현

- React 로그인 회원가입 Axios 연결 , Redux 연결 

- JWT 토큰을 이용한 로그인

- DB설계

  

#### BLINK 개발회고

----



