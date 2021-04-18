---

layout: post
title:  "프레임워크 없이 딥러닝 구현해보기 17일차"
date:   2021-04-18 17:25:18 +0900
categories: 1인_1프로젝트
tags: 딥러닝 1인1프로젝트
typora-root-url: ..
comments: true
---

밑바닥부터 시작하는 딥러닝(사이토 고키)라는 책을 읽으면서 딥러닝을 다시 공부해보고 있습니다. 



### 오늘의 배운 것

GPU는 빠르다.

[관련 링크](https://light-tree.tistory.com/25)



### 해본 것

오늘은 아이돌 사진 분류를 훈련시키려고 했는데, 너무 학습이 느린 느낌이 들었다. 그래서 cupy라는 라이브러리를 이용해 행렬계산 시 gpu를 사용할 수 있게 하였다.

똑같은 모델을 위는 cpu로, 아래는 gpu로 학습시키는 과정인데, gpu로 학습할 때 거의 cpu보다 7배는 빠르게 학습할 수 있었다.  (cpu : i7-8550U, gpu : Geforce GTX 1050)

![2](/assets/images/post/20210418/6.png)

![2](/assets/images/post/20210418/5.png)

그런데 gpu로 학습을 시키려고 보니까 gpu 메모리가 모자라서 도중에 학습이 멈추는 경우가 생겼고, 배치 사이즈를 줄이고 사진 크기를 줄여서 학습을 해봐도 갑자기 에러가 뜨고 멈춰버렸다.

그래서 대안으로 google colab을 이용해 학습시키기로 하였다.

colab에서는 노트북 gpu보다 훨씬 좋은 gpu를 지원하기 때문에 노트북에서 하는 것보다 5배는 빠르게 학습이 되었다. 



아래는 학습에 사용한 모델이다.

```python
def make_net1():
    net = MultiLayerNet(is_use_dropout=False)
    net.add_layer(Layer.Conv2D(16, (3, 3), pad=1, input_size=(1, 128, 128)), initializer=Initializer.He())
    net.add_layer(Layer.BatchNormalization())
    net.add_layer(Layer.Relu())
    net.add_layer(Layer.Pooling(pool_h=2, pool_w=2, stride=2))
    net.add_layer(Layer.Conv2D(32, (3, 3), pad=1, initializer=Initializer.He()))
    net.add_layer(Layer.BatchNormalization())
    net.add_layer(Layer.Relu())
    net.add_layer(Layer.Pooling(pool_h=2, pool_w=2, stride=2))
    net.add_layer(Layer.Conv2D(64, (3, 3), pad=1, initializer=Initializer.He()))
    net.add_layer(Layer.BatchNormalization())
    net.add_layer(Layer.Relu())
    net.add_layer(Layer.Pooling(pool_h=2, pool_w=2, stride=2))
    net.add_layer(Layer.Conv2D(128, (3, 3), pad=1, initializer=Initializer.He()))
    net.add_layer(Layer.BatchNormalization())
    net.add_layer(Layer.Relu())
    net.add_layer(Layer.Pooling(pool_h=2, pool_w=2, stride=2))
    net.add_layer(Layer.Dense(128, initializer=Initializer.He(), activation=Layer.Relu()))
    net.add_layer(Layer.Dropout(0.5))
    net.add_layer(Layer.Dense(3))
    net.add_layer(Layer.Dropout(0.5))
    net.add_layer(Layer.SoftmaxWithLoss())
    return net
```

```python
result = net.train(
    x_train, t_train, x_test, t_test, batch_size=64, iters_num=12000, print_epoch=1, evaluate_limit=500,
    is_use_progress_bar=True, save_model_each_epoch=1, save_model_path="./idol_result",
    optimizer=Optimizer.Adam(lr=0.0003))
```



예상했던 것보다는 잘 안 나왔지만, test 정확도를 80% 까지에 수렴시키는데에 성공했다. Image Augmentation을 더 강하게 하거나, 하이퍼파라미터를 수정해봐야할 것 같다. 90% 까지 안착하는 것이 목표가 될 것 같다.

![2](/assets/images/post/20210418/2.png)

![2](/assets/images/post/20210418/3.png)



이는 사진과 인공지능이 예측한 라벨인데, 첫 번째 줄은 아이유, 두 번째 줄은 아이린, 세 번째 줄은 아린이다. 여기서는 24개 중 2개를 제대로 예측하지 못하였다.

![2](/assets/images/post/20210418/4.png)

근데 데이터셋의 사진들을 보니까 인터넷에서 가져온 거라보니 몇몇 사진이 해당 아이돌이 아닌 다른 사람이 들어가 있는 것을 발견하였다. 언젠가 수작업으로 골라내야할 것 같다. 



------

실습한 코드는 [https://github.com/woduq1414/deep-learning-without-tensorflow](https://github.com/woduq1414/deep-learning-without-tensorflow) 에 있습니다.

