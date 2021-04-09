---
layout: post
title:  "프레임워크 없이 딥러닝 구현해보기 12일차"
date:   2021-04-09 14:00:28 +0900
categories: 1인_1프로젝트
tags: 딥러닝 1인1프로젝트
typora-root-url: ..
comments: true
---

밑바닥부터 시작하는 딥러닝(사이토 고키)라는 책을 읽으면서 딥러닝을 다시 공부해보고 있습니다. 



### 오늘의 배운 것

이미지는 가로, 세로, 채널(RGB)이 존재하는 3차원 데이터이다. 

입력 데이터가 (C, H, W)일 때, 필터 1개 (C, FH, FW)와 합성곱을 하면 (1, OH, OW)의 출력 데이터가 만들어진다. 이 출력데이터는 한 장의 특징맵이고, 채널이 1개인 특징맵이라고 말할 수 있다.

FN개의 필터 (FN, C, FH, FW)와 합성곱을 하면, (FH, OH, OW)의 출력데이터가 만들어진다. 또한 합성곱 연산에서도 Affine 계층과 마찬가지로 편향이 쓰이는데, 편향의 모양은 (FN, 1, 1)이 되고, 편향을 더한 출력데이터의 모양은 그대로 (FH, OH, OW)이다.

만약 배치처리를 한다면, N개의 데이터가 배치일 때,

입력 데이터(N, C, H, W) * 필터(FN, C, FH, FW) + 편향(FN, 1, 1) => 출력 데이터(N, FN, OH, OW)가 된다.



------

### 느낀 점

행렬 간 계산을 할 때는 행렬의 모양을 파악하는 것이 정말 중요한 것 같다. 특히 CNN을 이해할 때 그런 것 같다. 저번에 CNN부분을 구현할 때 행렬의 shape 때문에 애를 먹었던 기억이 났다.



------

실습한 코드는 [https://github.com/woduq1414/deep-learning-without-tensorflow](https://github.com/woduq1414/deep-learning-without-tensorflow) 에 있습니다.

