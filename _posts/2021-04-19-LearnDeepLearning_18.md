---

layout: post
title:  "프레임워크 없이 딥러닝 구현해보기 18일차"
date:   2021-04-24 19:55:58 +0900
categories: 1인_1프로젝트
tags: 딥러닝 1인1프로젝트
typora-root-url: ..
comments: true
---

밑바닥부터 시작하는 딥러닝(사이토 고키)라는 책을 읽으면서 딥러닝을 다시 공부해보고 있습니다. 



### 해본 것

아이돌 분류 정확도 90% 도전은 접어두고, 우선 어느 정도(테스트 정확도 84%) 잘 분류하는 모델을 웹에 올려보기로 하였다.

나는 파이썬 웹을 만들 때 늘 Flask 프레임워크만 써왔는데, 뭔가 다른 걸 써보고 싶어서 fastapi라는 프레임워크를 사용해보았다. Flask랑 거의 비슷한데, 비동기 처리를 기본적으로 지원하고, 좀 더 빠르다는 장점이 있다고 한다.

![2](/assets/images/post/20210424/1.png)

![2](/assets/images/post/20210424/2.png)

(이미지 자르기는 cropper.js라는 라이브러리를 사용하였다.)

![2](/assets/images/post/20210424/3.png)

![2](/assets/images/post/20210424/4.png)

크롤링한 데이터셋에 없을법 한, 유튜브 영상에서 캡쳐한 사진까지도 잘 분류하는 것을 볼 수 있었다.



 [http://idool.kro.kr/upload](http://idool.kro.kr/upload)

위 링크에서 직접 해볼 수 있다!




------

실습한 코드는 [https://github.com/woduq1414/deep-learning-without-tensorflow](https://github.com/woduq1414/deep-learning-without-tensorflow) 에 있습니다.

