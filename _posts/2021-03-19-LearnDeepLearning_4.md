---
layout: post
title:  "프레임워크 없이 딥러닝 구현해보기 4일차"
date:   2021-03-19 19:35:17 +0800
categories: 1인_1프로젝트
tags: 딥러닝 1인1프로젝트
typora-root-url: ..
comments: true
---

밑바닥부터 시작하는 딥러닝(사이토 고키)라는 책을 읽으면서 딥러닝을 다시 공부해보고 있습니다. 



### 오늘의 배운 것

행렬곱(Affine) 계층을 역전파할 때는 전치행렬이 사용된다. 가중치 행렬에 대해 X 행렬의 모든 원소로 편미분을 진행하면 그 결과가 가중치 행렬의 전치행렬이 도출이 된다고 한다. 나중에 시간이 될 때 선형대수에 대해 공부해봐야겠다는 생각이 들었다. [참조](https://choosunsick.github.io/post/neural_network_backward_3/)

SoftMax 의 손실 함수로 교차 엔트로피 함수를 사용하면 역전파를 했을 때 (y1 - t1, y2 - t2, y3 - t3, ... ) 와 같이 현재 출력과 정답 레이블의 오차를 나타낸다. 이렇게 깨끗하게 떨어지는 것은 우연이 아니라 교차 엔트로피 함수가 이렇게 하기 위해 설계되었기 때문이다. 회귀를 할 때 출력층에서 사용되는 항등 함수의 손실함수로 오차제곱합을 사용하는 것도 그런 이유다.

역전파법으로 계산한 기울기와 수치미분법으로 계산한 기울기는 정말로 거의 동일하다.



------

실습한 코드는 [https://github.com/woduq1414/deep-learning-without-tensorflow](https://github.com/woduq1414/deep-learning-without-tensorflow) 에 있습니다.

