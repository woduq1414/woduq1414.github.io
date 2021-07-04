---

layout: post
title:  "프레임워크 없이 딥러닝 구현해보기 22일차"
date:   2021-06-09 21:38:32 +0900
categories: 1인_1프로젝트
tags: 딥러닝 1인1프로젝트
typora-root-url: ..
comments: true
---

밑바닥부터 시작하는 딥러닝(사이토 고키)라는 책을 읽으면서 딥러닝을 다시 공부해보고 있습니다. 



### 해본 것



이미지 가져오기 버튼을 통해 이미지를 가져오면, 아래와 같이 로컬에서 가져온 이미지들을 썸네일로 보여주도록 하였다. 또한 Ctrl+V를 눌러서 클립보드에 저장된 이미지를 추가할 수도 있게하였다.

![2](/assets/images/post/20210609/1.png)



업로드 버튼을 누르면 로딩 인디케이터와 현재 어디까지 진행되었는지 실시간으로 보여준다. 이는 Websocket 통신을 통해 구현했는데, fastapi에서의 소켓 통신에 대한 자료가 별로 없어 약간 애먹은 부분이었다.

![2](/assets/images/post/20210609/2.png)



처리가 완료되면 아래와 같이 아이돌별로 테두리가 그려지고(아이유 : 빨강, 아이린 : 파랑, 아린 : 보라), 압축파일 다운로드 버튼이 생긴다.

![2](/assets/images/post/20210609/3.png)



아래 버튼을 누르면 다운로드가 된다.

![2](/assets/images/post/20210609/4.png)



한편, 서버에 이미지가 계속 쌓여서 공간을 차지하는 것을 방지하기 위해 zip파일이 만들어진 후 3시간이 지나면 삭제되도록 하였다.



비록 지금은 아이유, 아이린, 아린 세 아이돌만 지원하지만, 만약 나중에 더 많은 아이돌들을 지원한다면, 여러 아이돌 사진을 갤러리에 수집하는 아이돌 팬이라면 유용하게 쓸 수 있을 것 같다!



[https://idol.upstack.tech/multi](https://idol.upstack.tech/multi) 에서 직접 해볼 수 있다!

------

실습한 코드는 [https://github.com/woduq1414/deep-learning-without-tensorflow](https://github.com/woduq1414/deep-learning-without-tensorflow) 에 있습니다.

