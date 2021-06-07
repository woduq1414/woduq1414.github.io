---

layout: post
title:  "프레임워크 없이 딥러닝 구현해보기 20일차"
date:   2021-06-06 21:21:37 +0900
categories: 1인_1프로젝트
tags: 딥러닝 1인1프로젝트
typora-root-url: ..
comments: true
---

밑바닥부터 시작하는 딥러닝(사이토 고키)라는 책을 읽으면서 딥러닝을 다시 공부해보고 있습니다. 



### 해본 것

오늘은 미뤄뒀던 아이돌 모델 정확도 90% 도전을 해보았다.

우선 Layer Freeze 기능을 구현해보았다. Keras에서는 trainable 파라미터와 같다. Freeze(trainable가 false)된 레이어는 역전파시 가중치가 변하지 않게 만들었다. VGG16의 파라미터를 가지고 전이학습 같은 걸 해보고 싶어 만들어봤는데 그러기에는 GPU 메모리 초과 에러만 뜰 것 같아서 보류했다. GPU 메모리 초과 에러를 보지 않고 깊은 층을 학습 시키는 방법을 연구해봐야할 것 같다.

모델은 아래와 같이 구성했다. 저번에 했던 모델보다 더 복잡해졌고, 노트북에서는 돌리는 데 한 세월 걸려서 코랩에서 돌렸다.

```python
net = MultiLayerNet(is_use_dropout=False)
net.add_layer(Layer.Conv2D(24, (4, 4), pad=1, input_size=(1, 128, 128)), initializer=Initializer.He())
net.add_layer(Layer.BatchNormalization())
net.add_layer(Layer.Relu())
net.add_layer(Layer.Dropout(0.2))
net.add_layer(Layer.Conv2D(24, (3, 3), pad=1, initializer=Initializer.He()))
net.add_layer(Layer.BatchNormalization())
net.add_layer(Layer.Relu())
net.add_layer(Layer.Dropout(0.2))
net.add_layer(Layer.Pooling(pool_h=2, pool_w=2, stride=2))
net.add_layer(Layer.Conv2D(64, (3, 3), pad=1, initializer=Initializer.He()))
net.add_layer(Layer.BatchNormalization())
net.add_layer(Layer.Relu())
net.add_layer(Layer.Dropout(0.2))
net.add_layer(Layer.Conv2D(64, (3, 3), pad=1, initializer=Initializer.He()))
net.add_layer(Layer.BatchNormalization())
net.add_layer(Layer.Relu())
net.add_layer(Layer.Dropout(0.2))
net.add_layer(Layer.Pooling(pool_h=2, pool_w=2, stride=2))
net.add_layer(Layer.Conv2D(128, (3, 3), pad=1,  initializer=Initializer.He()))
net.add_layer(Layer.BatchNormalization())
net.add_layer(Layer.Relu())
net.add_layer(Layer.Dropout(0.2))
net.add_layer(Layer.Conv2D(128, (3, 3), pad=1,  initializer=Initializer.He()))
net.add_layer(Layer.BatchNormalization())
net.add_layer(Layer.Relu())
net.add_layer(Layer.Dropout(0.2))
net.add_layer(Layer.Pooling(pool_h=2, pool_w=2, stride=2))
net.add_layer(Layer.Conv2D(180, (3, 3), pad=1,  initializer=Initializer.He()))
net.add_layer(Layer.BatchNormalization())
net.add_layer(Layer.Relu())
net.add_layer(Layer.Dropout(0.2))
net.add_layer(Layer.Conv2D(180, (3, 3), pad=1,  initializer=Initializer.He()))
net.add_layer(Layer.BatchNormalization())
net.add_layer(Layer.Relu())
net.add_layer(Layer.Dropout(0.2))
net.add_layer(Layer.Conv2D(180, (3, 3), pad=1,  initializer=Initializer.He()))
net.add_layer(Layer.BatchNormalization())
net.add_layer(Layer.Relu())
net.add_layer(Layer.Dropout(0.2))
net.add_layer(Layer.Dense(512, initializer=Initializer.He(), activation=Layer.Relu()))
net.add_layer(Layer.Dropout(0.4))
net.add_layer(Layer.Dense(512, initializer=Initializer.He(), activation=Layer.Relu()))
net.add_layer(Layer.Dropout(0.4))
net.add_layer(Layer.Dense(3))
net.add_layer(Layer.SoftmaxWithLoss())
```

 

코랩에서 오늘 오전 11시부터 돌렸는데, 1epoch마다 Save되게 해놓고, Test Accuracy가 더 이상 오르지 않고 진동하면 learning_rate를 줄여서 수동으로 다시 학습을 시작하였다. (처음에는 0.0003 이었고 현재는 0.0001 이다.)

또한 학습을 어느 정도 진행하고 나니 train_acc가 0.8에서 더 이상 안 올라가서, Dropout 계층의 dropout_ratio를 0.15씩 줄여서 학습을 시켰더니 train_acc와 test_acc를 올릴 수 있었다.

그래서 test_acc 0.89까지 도달하여 오늘 정확도 90%까지 찍을 수 있겠다고 생각하던 찰나에..

![2](/assets/images/post/20210606/2.png)



Colab 사용량 제한이 떠버렸다. GPU를 7시간 정도 연속으로 돌리면 GPU 정지가 된다는 사실을 알게되었다. 아름다운 인생..

![2](/assets/images/post/20210606/1.png)



![2](/assets/images/post/20210606/3.png)

아무튼 오늘은 89%까지 올릴 수 있었고, Colab이 다시 돌아온다면 그 때 90%를 넘겨보도록 할 것이다!



------

실습한 코드는 [https://github.com/woduq1414/deep-learning-without-tensorflow](https://github.com/woduq1414/deep-learning-without-tensorflow) 에 있습니다.

