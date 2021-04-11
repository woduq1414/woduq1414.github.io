---

layout: post
title:  "프레임워크 없이 딥러닝 구현해보기 14일차"
date:   2021-04-11 11:50:37 +0900
categories: 1인_1프로젝트
tags: 딥러닝 1인1프로젝트
typora-root-url: ..
comments: true
---

밑바닥부터 시작하는 딥러닝(사이토 고키)라는 책을 읽으면서 딥러닝을 다시 공부해보고 있습니다. 



### 오늘의 배운 것

가중치 초기화는 정말 중요하다.



------

### 해본 것

CNN에서 가중치 초기화를 He Initializer 로 했는데 왜 성능이 이상하지 싶었는데, Convolution 계층에서 이전 노드와 연결되는 개수를 이전 노드의 input_size * filter_num 으로 잘못 계산하고 있었다. (Affine 계층에서는 이렇다..)

그래서 아래와 같이 바꿔주었다. 

```python
if self.prevConvLayer is None:
    pre_node_nums = np.prod(layer.filter_size)
else:
    pre_node_nums = self.prevConvLayer.filter_num * np.prod(layer.filter_size)
```



그리고 실행시켜보았다. (저번보다 모델은 더 복잡하게 만들었다.)

```python
def main():
    (x_train, t_train), (x_test, t_test) = load_mnist(flatten=False)

    net = MultiLayerNet(is_use_dropout=False)
    net.add_layer(Layer.Conv2D(16, (3, 3), pad=1, input_size=(1, 28, 28)), initializer=Initializer.He(),
                  activation=Layer.Relu())
    net.add_layer(Layer.Conv2D(16, (3, 3), pad=1, initializer=Initializer.He(), activation=Layer.Relu()))
    net.add_layer(Layer.Pooling(pool_h=2, pool_w=2, stride=2))
    net.add_layer(Layer.Conv2D(32, (3, 3), pad=1, initializer=Initializer.He(), activation=Layer.Relu()))
    net.add_layer(Layer.Conv2D(32, (3, 3), pad=2, initializer=Initializer.He(), activation=Layer.Relu()))
    net.add_layer(Layer.Pooling(pool_h=2, pool_w=2, stride=2))
    net.add_layer(Layer.Conv2D(64, (3, 3), pad=1, initializer=Initializer.He(), activation=Layer.Relu()))
    net.add_layer(Layer.Conv2D(64, (3, 3), pad=1, initializer=Initializer.He(), activation=Layer.Relu()))
    net.add_layer(Layer.Pooling(pool_h=2, pool_w=2, stride=2))
    net.add_layer(Layer.Dense(50, initializer=Initializer.He(), activation=Layer.Relu()))
    net.add_layer(Layer.Dropout(0.5))
    net.add_layer(Layer.Dense(50))
    net.add_layer(Layer.Dropout(0.5))
    net.add_layer(Layer.SoftmaxWithLoss())

    for k, v in net.params.items():
        print(k, v.shape)

    result = net.train(
        x_train, t_train, x_test, t_test, batch_size=200, iters_num=2500, print_epoch=1, evaluate_limit=500,
        is_use_progress_bar=True,
        optimizer=Optimizer.Adam(lr=0.001))

    import pickle
    import datetime
    ## Save pickle
    with open(f"train_data_{str(datetime.datetime.now())[:-7].replace(':', '')}.pickle", "wb") as fw:
        pickle.dump(result, fw)
    net.save_model()

    print("============================================")
```



![2](/assets/images/post/20210411/1.png)

![2](/assets/images/post/20210411/2.png)

무려 99.2%의 test 정확도를 기록하였다!!



------

실습한 코드는 [https://github.com/woduq1414/deep-learning-without-tensorflow](https://github.com/woduq1414/deep-learning-without-tensorflow) 에 있습니다.

