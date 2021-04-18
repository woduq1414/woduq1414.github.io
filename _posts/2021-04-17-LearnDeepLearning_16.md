---

layout: post
title:  "프레임워크 없이 딥러닝 구현해보기 16일차"
date:   2021-04-17 12:34:44 +0900
categories: 1인_1프로젝트
tags: 딥러닝 1인1프로젝트
typora-root-url: ..
comments: true
---

밑바닥부터 시작하는 딥러닝(사이토 고키)라는 책을 읽으면서 딥러닝을 다시 공부해보고 있습니다. 



### 어제 한 것

어제 모델을 아래와 같이 짜고 야자 끝날 때 즈음에 훈련을 돌리고 기숙사로 들어갔다.

```python
net = MultiLayerNet(is_use_dropout=False)
net.add_layer(Layer.Conv2D(32, (3, 3), pad=1, input_size=(1, 64, 64)), initializer=Initializer.He())
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
net.add_layer(Layer.Dense(50, initializer=Initializer.He(), activation=Layer.Relu()))
net.add_layer(Layer.Dropout(0.5))
net.add_layer(Layer.Dense(2))
net.add_layer(Layer.Dropout(0.5))
net.add_layer(Layer.SoftmaxWithLoss())

result = net.train(
    x_train, t_train, x_test, t_test, batch_size=64, iters_num=6250, print_epoch=1, evaluate_limit=100,
    is_use_progress_bar=True, save_model_each_epoch=1, save_model_path="./dog_cat_result",
    optimizer=Optimizer.Adam(lr=0.001))
```

오전 6시 즈음에 20epoch 학습이 끝났었다.

test 정확도는 0.85까지 올랐는데, learning rate 0.001이 커서인지는 모르겠는데 loss와 정확도가 진동하는 모습을 보였다.. 다음번 학습에는 learning rate를 줄여봐야겠다.

![2](/assets/images/post/20210417/1.png)

![2](/assets/images/post/20210417/2.png)

근데 BatchNormalization 계층의 이동평균, 표준편차가 저장이 안 된 오류가 있어서 실제 이미지에 테스트는 못해보았다..ㅠㅠ 나중에 다시 돌려봐야겠다. 





### 해본 것

사실 개 고양이 분류는 목표가 아니고, 중간고사 전까지 연예인 얼굴 분류기를 만들어 보는 것이 목표이다.

대상은 [아이유, 아이린, 아린],'아'자 돌림 여자 아이돌들로 정하였다.

아이돌 사진을 가장 쉽고 빠르게 구할 수 있는 방법은 구글 크롤링일 것 같아서 google_images_download라는 라이브러리를 사용하였다.

```python
from google_images_download import google_images_download

response = google_images_download.googleimagesdownload()

name = "아린,아린 직캠,아린 콘서트,오마이걸 아린 비밀정원,오마이걸 아린 돌핀"

arguments = {"keywords": f"{name}", "limit": 100, "print_urls": True, "format": "jpg", "output_directory" : "./downloads/arin/",
             "chromedriver": "C:\\Users\\User\\google-image-crawler\\chromedriver.exe"}  # creating list of arguments
paths = response.download(arguments)
print(paths)
```

위와 같이 한 아이돌에 대해 여러 키워드로 검색해 크롤링하여 각 아이돌별로 1300장 정도를 가져왔다.

![2](/assets/images/post/20210417/3.png)



face_recognition 라이브러리를 통해 얼굴만 추출해서 이미지로 저장하였고(뭔가 스토커라도 된 것 같았다..), ImageDupeless라는 소프트웨어로 중복 이미지를 삭제하였다. 

![2](/assets/images/post/20210417/4.png)



그리고 이전 개 고양이 분류와 같이 Image Augmentation을 진행하여 train 이미지를 10배로 불렸고, 흑백처리 후 numpy array로 바꿔 npz 파일에 저장하였다.





------

실습한 코드는 [https://github.com/woduq1414/deep-learning-without-tensorflow](https://github.com/woduq1414/deep-learning-without-tensorflow) 에 있습니다.

