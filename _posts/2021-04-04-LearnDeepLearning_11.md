---
layout: post
title:  "프레임워크 없이 딥러닝 구현해보기 11일차"
date:   2021-04-04 15:12:01 +0900
categories: 1인_1프로젝트
tags: 딥러닝 1인1프로젝트
typora-root-url: ..
comments: true
---

밑바닥부터 시작하는 딥러닝(사이토 고키)라는 책을 읽으면서 딥러닝을 다시 공부해보고 있습니다. 



### 오늘의 배운 것

CNN(합성곱 신경망)은 이미지 인식과 음성 인식 등 다양한 곳에서 사용된다. 

완전연결 계층(Affine 계층)의 문제점은 데이터의 형상이 무시된다는 것이다. 이미지는 세로, 가로, 채널(색상)로 구성된 3차원 데이터인데, Affine 계층에 들어갈 때는 1차원 데이터로 Flatten 해줘야한다. 이때 3차원 속에서 의미를 갖는 본질적인 패턴(예 : 공간적으로 가까운 픽셀의 값은 비슷하다)이 무시된다. 

대신 합성곱(Convolution) 계층을 사용한다. 합성곱 연산은 입력 데이터에 필터를 적용한다. 필터의 윈도우를 일정 간격으로 이동해가며, 입력과 필터에서 대응하는 원소끼리 곱한 후 그 총합을 구하고, 그 결과를 출력의 해당 장소에 저장한다. 합성곱 연산을 수행하기 전에 입력 데이터의 가장자리에 padding(0으로 채움)을 줘서 출력 데이터의 크기를 조절할 수도 있다. 또한, 윈도우가 움직이는 간격을 stride라고 한다. 

입력 크기를 (H, W), 필터 크기를 (FH, FW), 출력 크기를 (OH, OW), padding을 P, stride를 S라고 하면, 출력 크기는 아래와 같이 계산 된다.


$$
OH = \frac {H + 2P - FH} {S} + 1
$$

$$
OW = \frac {W + 2P - FW} {S} + 1
$$

CNN에서는 Pooling 계층 또한 사용한다. 합성곱 연산과 비슷하게 윈도우를 움직이며 결과를 만들어내는데, 윈도우 안에 있는 입력 데이터의 원소 중 가장 큰 것만을 뽑아 출력의 해당 장소에 저장한다. (최대 풀링의 경우) 보통 풀링의 윈도우 크기와 스트라이드는 같은 값으로 설정한다. 



------

### 해본 것

원리를 더 정확히 이해하고 구현할 수 있으면 좋았겠지만, 모의고사가 곧이라 다음 주는 코딩을 하기가 애매해질 것 같아서 이론적으로 간단하게만 이해하고, 코드를 따라쳐보면서 일단 구현부터 해보기로 하였다.  



Conv2D와, Pooling 계층을 추가하였다. 

```python
(x_train, t_train), (x_test, t_test) = load_mnist(flatten=False)

net = MultiLayerNet(is_use_dropout=False)
net.add_layer(Layer.Conv2D(16, (5, 5), input_size=(1, 28, 28)), activation=Layer.Relu())
net.add_layer(Layer.Conv2D(16, (5, 5)), activation=Layer.Relu())
net.add_layer(Layer.Pooling(pool_h=2, pool_w=2, stride=2))
net.add_layer(Layer.Dense(50, activation=Layer.Relu()))
net.add_layer(Layer.Dropout(0.5))
net.add_layer(Layer.Dense(50))
net.add_layer(Layer.Dropout(0.5))
net.add_layer(Layer.SoftmaxWithLoss())

print(net.layers)

for k, v in net.params.items():
	print(k, v.shape)

result = net.train(
x_train, t_train, x_test, t_test, batch_size=100, iters_num=10000, print_epoch=1, evaluate_limit=500,
        optimizer=Optimizer.Adam(lr=0.01))
```



net.train 에서는 evaluate_limit 를 추가해주었는데, 정확도를 계산할 때 모든 데이터(60000개)를 가지고 틀렸는지 맞았는지 확인해보는 방식인데, CNN의 연산이 이전의 신경망보다 더 부담이 되는 작업이라서 그런지 파이썬이 메모리를 10GB까지 잡아먹더니 노트북이 멈추는 상황이 발생하였다. 그래서 일단 임시적으로 일부만 가지고 정확도를 계산하도록 만들었다.



아래는 위 코드를 돌렸을 때의 결과이다. 반복 횟수를 10000회로 잡아버렸더니 2시간이나 걸렸다.

![1](/assets/images/post/20210404/1.png)

![1](/assets/images/post/20210404/2.png)

초반부에 정확도는 97%까지 무난하게 올라가는 모습을 보여줬는데,  5000 step 쯤부터 인공지능이 졸았는지 loss가 갑자기 치솟는 기현상을 연출하였다.

찾아보니 이런 현상이 일어나는 경우는 Adam Optimizer의 문제([링크](https://stackoverflow.com/questions/42327543/adam-optimizer-goes-haywire-after-200k-batches-training-loss-grows)), 정규화가 안 됐을 때 등이라고 한다.

이를 해결하기 위해 learning rate를 줄이거나, batch size를 늘리는 방법이 있고, 아니면 훈련을 할 때 콜백을 걸어 일정 정확도 위로 올라가거나 급격히 loss가 떨어졌을 때 학습을 종료하도록 만들 수도 있다고 한다.

앞으로는 다른 모델로 CNN을 돌려보면서 더 높은 정확도를 얻어보고 싶다.

------

실습한 코드는 [https://github.com/woduq1414/deep-learning-without-tensorflow](https://github.com/woduq1414/deep-learning-without-tensorflow) 에 있습니다.

