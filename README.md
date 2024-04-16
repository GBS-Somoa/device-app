<div align="center"> 
    <img src="./docs-images/service-logo.png" width="500" />
    <h2>소모아 기기 테스트 앱</h2>
    <p>소모아 기기 테스트 앱은 메인 서비스인 소모아와 연결할 IoT 가전기기를 대체하는 웹 사이트입니다.</p>
    <p>관리자가 소모아 플랫폼에 연결할 다양한 IoT 기기들을 손쉽게 테스트하고 시뮬레이션할 수 있게 해줍니다.</p>
</div>
<br/>

# 기술 스택

-   Frontend

    |                           Next.js                            |                           Tailwind CSS                            |                         Zustand                         |
    | :----------------------------------------------------------: | :---------------------------------------------------------------: | :-----------------------------------------------------: |
    | <img src="./docs-images/icon/NextJS-Light.svg" height="100"> | <img src="./docs-images/icon/TailwindCSS-Light.svg" height="100"> | <img src="./docs-images/icon/Zustand.png" height="100"> |

-   Backend

    |                           Next.js                            |                         NextAuth                         |                         MongoDB                         |                         ts-jest                         |
    | :----------------------------------------------------------: | :------------------------------------------------------: | :-----------------------------------------------------: | :-----------------------------------------------------: |
    | <img src="./docs-images/icon/NextJS-Light.svg" height="100"> | <img src="./docs-images/icon/NextAuth.png" height="100"> | <img src="./docs-images/icon/MongoDB.png" height="100"> | <img src="./docs-images/icon/TS-Jest.png" height="100"> |

# 기능

-   **제조사 생성**: 사용자는 다양한 IoT 기기 제조사를 생성할 수 있습니다.
-   **모델 생성**: 특정 제조사의 기기 모델을 생성할 수 있습니다.
-   **기기 생성**: 실제 기기와 같은 가상의 기기를 생성할 수 있습니다.
-   **기기 동작**: 생성한 가상 기기를 실제와 같이 동작시킬 수 있습니다.

# 화면설계

<img src="./docs-images/figma.png"/>

# 화면

### 로그인

<img src="./docs-images/capture/화면1.PNG" height="500"/>

### 기기 모델 생성

<img src="./docs-images/capture/화면2.PNG" height="500"/>

### 기기 생성

<img src="./docs-images/capture/화면3.PNG" height="500"/>

### 기기 동작

<img src="./docs-images/capture/화면4.PNG" height="500"/>

# ERD

<img src="./docs-images/erd.png"/>

# API

## 기기

| 권한  | Method                                                                          | URI                                                               | 설명           | 우선순위                                                                        |
| ----- | ------------------------------------------------------------------------------- | ----------------------------------------------------------------- | -------------- | ------------------------------------------------------------------------------- |
| Admin | <img src="https://img.shields.io/badge/POST-7acaff?style=flat&logoColor=white"> | /api/device                                                       | 기기 생성      | <img src="https://img.shields.io/badge/High-ff281c?style=flat&logoColor=white"> |
| Admin | <img src="https://img.shields.io/badge/GET-ffd769?style=flat&logoColor=white">  | /api/device?manufacturer={manufacturer}&device_type={device_type} | 기기 모델 조회 | <img src="https://img.shields.io/badge/High-ff281c?style=flat&logoColor=white"> |
| All   | <img src="https://img.shields.io/badge/GET-ffd769?style=flat&logoColor=white">  | /api/device?device_id={device_id}                                 | 기기 단일 조회 | <img src="https://img.shields.io/badge/High-ff281c?style=flat&logoColor=white"> |

## 기기 모델

| 권한  | Method                                                                            | URI                               | 설명           | 우선순위                                                                        |
| ----- | --------------------------------------------------------------------------------- | --------------------------------- | -------------- | ------------------------------------------------------------------------------- |
| Admin | <img src="https://img.shields.io/badge/DELETE-ff8ff8?style=flat&logoColor=white"> | /api/device?device_id={device_id} | 기기 삭제      | <img src="https://img.shields.io/badge/Low-f4ff59?style=flat&logoColor=white">  |
| Admin | <img src="https://img.shields.io/badge/POST-7acaff?style=flat&logoColor=white">   | /api/device-model                 | 기기 모델 생성 | <img src="https://img.shields.io/badge/High-ff281c?style=flat&logoColor=white"> |
| Admin | <img src="https://img.shields.io/badge/DELETE-ff8ff8?style=flat&logoColor=white"> | /api/device-model?model={model}   | 기기 모델 삭제 | <img src="https://img.shields.io/badge/Low-f4ff59?style=flat&logoColor=white">  |

## 제조사

| 권한  | Method                                                                            | URI                                           | 설명             | 우선순위                                                                          |
| ----- | --------------------------------------------------------------------------------- | --------------------------------------------- | ---------------- | --------------------------------------------------------------------------------- |
| Admin | <img src="https://img.shields.io/badge/POST-7acaff?style=flat&logoColor=white">   | /api/manufacturer                             | 제조사 생성      | <img src="https://img.shields.io/badge/Middle-00ba3e?style=flat&logoColor=white"> |
| Admin | <img src="https://img.shields.io/badge/GET-ffd769?style=flat&logoColor=white">    | /api/manufacturer                             | 제조사 목록 조회 | <img src="https://img.shields.io/badge/High-ff281c?style=flat&logoColor=white">   |
| Admin | <img src="https://img.shields.io/badge/DELETE-ff8ff8?style=flat&logoColor=white"> | /api/manufacturer?manufacturer={manufacturer} | 제조사 삭제      | <img src="https://img.shields.io/badge/Low-f4ff59?style=flat&logoColor=white">    |

# API 테스트

<img src="./docs-images/api-test.png"/>
