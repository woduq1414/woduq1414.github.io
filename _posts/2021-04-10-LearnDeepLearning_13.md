---
layout: post
title:  "프레임워크 없이 딥러닝 구현해보기 13일차"
date:   2021-04-10 17:12:08 +0900
categories: 1인_1프로젝트
tags: 딥러닝 1인1프로젝트
typora-root-url: ..
comments: true
---

밑바닥부터 시작하는 딥러닝(사이토 고키)라는 책을 읽으면서 딥러닝을 다시 공부해보고 있습니다. 



### 오늘의 배운 것

numpy 객체를 저장하는데에 특화된 함수 np.save_compressed 가 있다. 파이썬 객체를 저장하는데 주로 쓰는 pickle도 있지만, npz 파일이 훨씬 빠르다고 한다. [링크](https://frhyme.github.io/python-libs/numpy_npy_npz/)





------

### 해본 것

오늘은 학습한 모델의 weight를 저장하고 불러오는 것을 구현하였다.

저장하는 부분의 코드이다. Affine, Convolution 계층의 weight 뿐만 아니라 BatchNormalization 계층의 이동평균, 이동분산 또한 저장하였다.

각 레이어 클레스의 정보는 jsonpickle이라는 패키지를 사용해서 직렬화/역직렬화를 구현하였다.

```python
def save_model(self, path=None):
    save_data = OrderedDict()
    params = self.params

    save_data["NetConfig"] = {
        "weight_decay_lambda": self.weight_decay_lambda,
        "is_use_dropout": self.is_use_dropout,
        "dropout_ratio": self.dropout_ratio
    }
    layer_info = []
    for layer in self.added_layer_list:
        s = jsp.encode(layer)
        layer_info.append(s)

    save_data["LayerInfo"] = layer_info

    for layer_idx, layer in enumerate(self.layers):

        if isinstance(layer, Layer.BatchNormalization):
            params[f"BN_m{layer_idx}"] = layer.running_mean
            params[f"BN_v{layer_idx}"] = layer.running_var

    save_data["Params"] = params

    if path is None:
        path = f"train_weight_{str(datetime.datetime.now())[:-7].replace(':', '')}.npz"

    np.savez_compressed(path, **save_data)
    print(f"Weight was saved at {path}")
    
```

모델을 로딩하는 부분의 코드이다.

```python
def load_model(self, path):

    print(f"Loading Model... {path}")
    load_data = np.load(path, allow_pickle=True)
    other_config_data = dict(load_data.get("NetConfig").item())
    self.__init__(**other_config_data)
    layer_info = load_data.get("LayerInfo")
    for layer_encoded in layer_info:
        layer = jsp.decode(layer_encoded)
        self.add_layer(layer)

    self.params = load_data.get("Params").item()

    for param_name, param_value in self.params.items():
        layer_idx = int(re.findall(r'[0-9]+', param_name)[0])
        param_kind = re.sub(r'[0-9]+', '', param_name)
        target_layer = list(self.layers.items())[layer_idx][1]
        if param_kind == "W":
            target_layer.W = param_value
        elif param_kind == "b":
            target_layer.b = param_value
        elif param_kind == "BN_m":
            target_layer.running_mean = param_value
        elif param_kind == "BN_v":
            target_layer.running_var = param_value
            
```



이제 다른 파일에서 npz 파일을 로딩해 숫자 예측을 해보았다.

```python
from framework.network import MultiLayerNet
import random
from dataset.mnist import load_mnist
import numpy as np
import matplotlib.pyplot as plt

(x_train, t_train), (x_test, t_test) = load_mnist(flatten=False)

net = MultiLayerNet()
net.load_model("train_weight_2021-04-10 170307.npz")

for i in range(5):
    img_idx = random.randrange(0, 10000)

    plt.imshow(x_test[img_idx].reshape(28, 28), cmap='gray')
    plt.show()
    predict_num = np.argmax(net.predict(np.array([x_test[img_idx]]), train_flg=False), axis=1)[0]
    correct_num = t_test[img_idx]
    print(f"Predict : {predict_num}, Correct : {correct_num}")
```

![1](/assets/images/post/20210410/1.png)

![2](/assets/images/post/20210410/2.png)

잘 예측하는 것 같다!





------

실습한 코드는 [https://github.com/woduq1414/deep-learning-without-tensorflow](https://github.com/woduq1414/deep-learning-without-tensorflow) 에 있습니다.

