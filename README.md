과일쇼핑몰_풋사과🍏
=================================


> **서비스 주소**

~~http://13.124.91.28/ &nbsp;&nbsp;-&nbsp;&nbsp;크롬 브라우저에서의 실행을 권장합니다.~~ (현재 EC2 인스턴스가 만료되었습니다.)
관리자 &nbsp;`ID : admin` &nbsp;`PW : realadmin`  
<br>


## 목차

0. [개요](#-%EA%B0%9C%EC%9A%94)  
1. [화면 소개](#-%EC%A3%BC%EC%9A%94-%ED%99%94%EB%A9%B4--%EA%B8%B0%EB%8A%A5-%EC%86%8C%EA%B0%9C)  
2. [ERD](#-erd)  
3. [회고](#-%ED%9A%8C%EA%B3%A0)  
<br/>



# 📝 개요 

> **설명**

과일 판매를 컨텐츠로 한 쇼핑몰입니다.   
**쇼핑몰의 전반적인 기능**을 구현하였습니다.   

> **기간** &nbsp;&nbsp; 22/10 ~ 22/12 **(9주)**

> **인원** &nbsp;&nbsp; 이현수(Front-End), 황은서(Back-End) **(2명)**

> **나의 역할**

 * 프로젝트 구조 설계
 * React를 이용한 화면 구현
 * AWS EC2 배포

> **사용 기술**

| 분류 | 종류 |
|:---:|---|
| **언어** | `JavaScript`, `HTML`, `CSS`, `Java` |
| **Lib & F/W** | `React`, `Spring Boot`, `SQL Developer` |
| **DB** | `Oracle` | 
| **서버** | `NGINX`, `Tomcat` |
| **배포** | `AWS EC2` |<br>
<br/>



# 💻 주요 화면 & 기능 소개

> ### **메인 화면**
<p align="center">
<img src="https://user-images.githubusercontent.com/112552585/210949661-418bd51a-cc8d-4eff-b894-ec7fee7efa9d.png" width="100%"></p>

* 서버 데이터를 **Axios**로 받아 처리
* 페이지네이션 대신, **무한 스크롤** 사용
* **sessionStorage**를 사용하여, 최근 본 상품 구현
* 탭, 검색 기능
<br/><br/><br/>


> ### **회원가입, 로그인**
<p align="center">
<img src="https://user-images.githubusercontent.com/112552585/210948687-297458ee-c12f-4ead-9153-97e519297954.png" width="100%"></p>
<p align="center">
<img src="https://user-images.githubusercontent.com/112552585/210948691-e3fa4cf4-00bb-4cce-aa75-aff8bbb584a7.png" width="100%"></p>

* **주소 api** 사용
* 핸드폰 번호 입력 시, **자동 하이픈**('-') 추가
* 로그인 성공 시, 서버에서 Session 발급
<br/><br/><br/>


> ### **상품 상세 화면**
<p align="center">
<img src="https://user-images.githubusercontent.com/112552585/210947391-ed0be725-29af-4a44-9f81-10927305792d.png" width="100%"></p>

* 상품 상세 화면에서 바로 구매, 장바구니 추가
* 리뷰 이미지는 **EC2 로컬에 업로드 처리**
<br/><br/><br/>


> ### **장바구니**
<p align="center">
<img src="https://user-images.githubusercontent.com/112552585/210952073-f5917216-031c-4160-b024-75edae20242c.png" width="100%"></p>

* **Redux**를 사용하여, 장바구니 데이터 관리
<br/><br/><br/>


> ### **주문서 & 주문 내역**
<p align="center">
<img src="https://user-images.githubusercontent.com/112552585/210974496-fb5cd48a-50ea-4166-b5a8-f811f7e6d72f.png" width="100%"></p>
<p align="center">
<img src="https://user-images.githubusercontent.com/112552585/210952158-099df9d6-60f8-469d-b05f-6cc10517200c.png" width="100%"></p>

* **결제 api** 사용
<br/><br/><br/>


> ### **관리자 페이지**
<p align="center">
<img src="https://user-images.githubusercontent.com/112552585/210952323-9244ddb3-8fe1-4b67-97e5-422fd482f303.png" width="100%"></p>

* 상품, 회원, 리뷰를 탭으로 나누어 한 페이지에서 관리
* **검색, 페이지네이션** 기능
* 상품 등록 가능
<br/><br/>
<br/>



# 📋 ERD
<p align="center">
<img src="https://user-images.githubusercontent.com/112552585/210970387-eca47bd5-a074-4936-aec6-e9370196ca2d.PNG" width="80%"></p>
<br/><br/>



# 💭 회고

> #### 아쉬운 부분

* 반응형 디자인을 고려하지 못하고, 웹 기준으로만 제작
* 아키텍처와 디자인패턴에 대한 낮은 이해
* 테스트케이스 미작성
* axios을 모듈화하지 못한 것
* 스토리지 서버로, S3 대신 EC2에 로컬에 파일을 업로드
<br/><br/>

> #### 느낀 점

자바 백엔드 과정에서 프로젝트를 진행하였습니다.  
이전 프로젝트까지는 배운 JSP를 사용하여 개발하였고,  
앞단에 대한 관심이 생겨 차기 프로젝트로 리액트 도입을 생각하게 되었습니다.  
이를 믿어준 팀원분과 팀을 꾸리게 되어, 책임감을 가지고 프로젝트에 임할 수 있었습니다.<br/>

어려움은 두 가지가 있었습니다.
* 첫 번째는 프로젝트를 시작함과 동시에 리액트 학습을 시작해야 했던 어려움이었고,
* 두 번째는 rest api, aws 서버 배포, 파일 업로드 처리, 세션 처리 등 모든 영역이 새로운 정보와 개념이었습니다.

특히, 그 기술을 왜 도입해야 하는지, 어느 부분에서 쓸모가 있는지 같은 정말 근본적인 부분부터 알지 못하는 것이 많았습니다.  
지금은 당연한 rest로 json을 주고받는다는 개념이 html 페이지만 주고받아 본 제게는 생각할 수 없던 정보였습니다.  
json이 무엇인지도 몰랐었습니다.<br/>

그렇게 학원에서는 팀원분과 많은 대화로 프로젝트를 짜나갔고,  
집에 돌아와서는 기술들을 학습하고 코드를 작성하였습니다.  
결국, 6개월 동안 함께했던 선생님의 평가 최종 1등으로 팀원분과 서로 만족하는 결과를 얻었습니다.  
더욱이 처음에 설정한 배포라는 목표까지 기한 내로 맞춰 끝내고, 발표할 수 있었던 것은 감사한 일이라고 생각합니다.

다만, 2개월이라는 짧은 시간 동안 쇼핑몰에 관한 전반적인 기능을 구현하느라, 넓은 영역을 얕게 구현한 것 같습니다.  
그래서 AWS S3, JWT, POSTMAN 같은 도입하고 싶은 기술이 있어도 팀원분과 시간적, 기술적 합의가 필요했던 아쉬움이 있습니다.  
다음 프로젝트는 바라건대 사용할 기술을 깊이 학습하고, 쓰임새대로 제대로 적용하고 싶은 욕심이 있습니다.
