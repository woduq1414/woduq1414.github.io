---

layout: post
title:  "프레임워크 없이 딥러닝 구현해보기 19일차"
date:   2021-06-05 20:00:14 +0900
categories: 1인_1프로젝트
tags: 딥러닝 1인1프로젝트
typora-root-url: ..
comments: true
---

밑바닥부터 시작하는 딥러닝(사이토 고키)라는 책을 읽으면서 딥러닝을 다시 공부해보고 있습니다. 



### 해본 것

오랜만에 1인 1프로젝트를 해보는 것 같다.

오늘은 케라스와 jjy 프레임워크의 성능을 비교해보았다. 사실 colab에서 편하게 쓸려고 4월에 pypi에 jjy라는 이름으로 패키지를 올려놓고 쓰고 있었다. ([pypi 링크](https://pypi.org/project/jjy/))

(알고계셨나요? jjy 프레임워크는 Jjang Joeun Yingongjineung : 짱 좋은 인공지능의 약자입니다! )



성능 비교는 Colab이 아닌 내 노트북에서 시행하였다.

우선 Dense(완전 연결 계층)만 있는 모델을 돌려봤다.

입력데이터는 계속 돌려왔던 (128,128) 사이즈의 흑백 아이돌 사진들이다.



케라스 : 

```python
net = Sequential()
net.add(Flatten(input_shape=(128, 128, 1)))
net.add(Dense(units=512, activation='relu', ))
net.add(Dropout(0.5))
net.add(Dense(units=1024, activation='relu'))
net.add(Dropout(0.5))
net.add(Dense(units=3, activation='softmax'))
```

![2](/assets/images/post/20210605/1.png)

2분 53초가 걸렸다.



jjy : 

```python
net = MultiLayerNet(is_use_dropout=False)
net.add_layer(Layer.Dense(512, input_size=(1, 128, 128)), initializer=Initializer.He(), activation=Layer.Relu())
net.add_layer(Layer.Dropout(0.5))
net.add_layer(Layer.Dense(1024, initializer=Initializer.He()), activation=Layer.Relu())
net.add_layer(Layer.Dropout(0.5))
net.add_layer(Layer.Dense(3))
net.add_layer(Layer.SoftmaxWithLoss())
```

![2](/assets/images/post/20210605/2.png)

2분 44초가 걸렸다.



별 차이는 없어보이긴하지만 의외로 jjy가 살짝 빨랐다.

그 다음으로는 Conv2D와 Pooling이 있는 모델을 돌려봤다.



케라스 : 

```python
net = Sequential()
net.add(Conv2D(32, (3, 3), input_shape=(128, 128, 1), activation='relu'))
net.add(Dropout(0.5))
net.add(MaxPooling2D(pool_size=(2, 2)))
net.add(Dropout(0.5))
net.add(Dense(units=3, activation='softmax'))
```

![2](/assets/images/post/20210605/4.png)

3분 33초가 걸렸다.



jjy :

```python
net = MultiLayerNet(is_use_dropout=False)
net.add_layer(Layer.Conv2D(32,(3,3), input_size=(1, 128, 128)), initializer=Initializer.He(), activation=Layer.Relu())
net.add_layer(Layer.Dropout(0.5))
net.add_layer(Layer.Pooling(pool_h=2, pool_w=2, stride=2))
net.add_layer(Layer.Dropout(0.5))
net.add_layer(Layer.Dense(3))
net.add_layer(Layer.SoftmaxWithLoss())
```

![2](/assets/images/post/20210605/3.png)

3분 50초가 걸렸다.



Dense에서는 jjy가 keras보다 살짝 빨랐지만 역시 Conv2D와 Pooling이 들어가니 케라스가 상대적으로 더 빨랐다. 

Conv2D와 Pooling이 4개 있고, 배치 정규화까지 시행하는 훨씬 더 복잡한 모델을 돌렸을 때는 그 차이가 더 커졌는데, jjy에서 한 epoch당 12분 정도 걸리는 일을 keras에서는 3분만에 처리할 수 있었다. 

뭔가 프로젝트를 하면 할수록 왜 인공지능 프레임워크를 직접 만들지 않고 이미 만들어진 프레임워크를 왜 쓰게 되는지 더 잘 알 것 같은 기분이지만.. 매우 긍정적으로 생각해보자면 jjy 프레임워크가 발전할 길이 아직 많이 열려있다는 것이었다.





------

실습한 코드는 [https://github.com/woduq1414/deep-learning-without-tensorflow](https://github.com/woduq1414/deep-learning-without-tensorflow) 에 있습니다.

