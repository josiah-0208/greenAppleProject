과일쇼핑몰_풋사과🍏
=================================

> **서비스 주소**

http://13.124.91.28/  &nbsp;&nbsp;-&nbsp;&nbsp;  관리자 `ID : admin` `PW : admin`<br><br>


## 📝 개요

> **설명**

과일 판매를 컨텐츠로 한 쇼핑몰입니다.   
쇼핑몰의 전반적인 기능을 구현하였습니다.   

> **기간** 22/10 ~ 22/12 *(9주)*

> **인원** 2명

> **나의 역할**

 * 프로젝트 모델 계획
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
<br>


## 💻 주요 화면 & 기능 소개

> **메인 화면**
<p align="center">
<img src="https://user-images.githubusercontent.com/112552585/210949661-418bd51a-cc8d-4eff-b894-ec7fee7efa9d.png" width="100%"></p>

* 서버 데이터를 Axios로 받아 처리
* 페이지네이션 대신, 무한 스크롤 사용
* sessionStorage를 사용하여, 최근 본 상품 구현
* 탭, 검색 기능
<br/><br/>


> **회원가입, 로그인**
<p align="center">
<img src="https://user-images.githubusercontent.com/112552585/210948687-297458ee-c12f-4ead-9153-97e519297954.png" width="100%"></p>
<p align="center">
<img src="https://user-images.githubusercontent.com/112552585/210948691-e3fa4cf4-00bb-4cce-aa75-aff8bbb584a7.png" width="100%"></p>

* 주소 api 사용
* 핸드폰 번호 입력 시, 자동 하이픈('-') 추가
<br/><br/>


> **상품 상세 화면**
<p align="center">
<img src="https://user-images.githubusercontent.com/112552585/210947391-ed0be725-29af-4a44-9f81-10927305792d.png" width="100%"></p>

* 상품 상세 화면에서 바로 구매, 장바구니 추가
* 리뷰 이미지 업로드는 Form-Data로 처리
<br/><br/>


> **장바구니**
<p align="center">
<img src="https://user-images.githubusercontent.com/112552585/210952073-f5917216-031c-4160-b024-75edae20242c.png" width="100%"></p>

* Redux를 사용하여, 장바구니 데이터 관리
<br/><br/>


> **주문서 & 주문 내역**
<p align="center">
<img src="https://user-images.githubusercontent.com/112552585/210974496-fb5cd48a-50ea-4166-b5a8-f811f7e6d72f.png" width="100%"></p>
<p align="center">
<img src="https://user-images.githubusercontent.com/112552585/210952158-099df9d6-60f8-469d-b05f-6cc10517200c.png" width="100%"></p>

* 결제 api 사용
<br/><br/>


> **관리자 페이지**
<p align="center">
<img src="https://user-images.githubusercontent.com/112552585/210952323-9244ddb3-8fe1-4b67-97e5-422fd482f303.png" width="100%"></p>

* 상품, 회원, 리뷰를 탭으로 나누어 한 페이지에서 관리
* 검색, 페이지네이션 기능
<br/><br/>


## 📋 ERD
<p align="center">
<img src="https://user-images.githubusercontent.com/112552585/210970387-eca47bd5-a074-4936-aec6-e9370196ca2d.PNG" width=100%"></p>


## 💭 보완 & 느낀점

#### 아쉬운 부분

* 반응형 디자인을 고려하지 못하고, 웹 기준으로만 제작
* JWT 대신 Session만을 사용
* 스토리지 서버로, S3 대신 EC2에 파일을 업로드
