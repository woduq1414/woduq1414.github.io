---

layout: post
title:  "프레임워크 없이 딥러닝 구현해보기 15일차"
date:   2021-04-16 19:21:45 +0900
categories: 1인_1프로젝트
tags: 딥러닝 1인1프로젝트
typora-root-url: ..
comments: true
---

밑바닥부터 시작하는 딥러닝(사이토 고키)라는 책을 읽으면서 딥러닝을 다시 공부해보고 있습니다. 



### 오늘의 배운 것

이미지 분류를 할 때 Data Augmentation을 통해 이미지의 불변하는 표현을 학습할 수 있다. 대상의 크기, 각도, 위치와 관계없이 대상을 인식할 수 있어야하기 때문에 필요하다. 또한 train data를 늘리므로써 Overfitting을 줄일 수도 있다.

------

### 해본 것

MNIST 분류는 할만큼 한 것 같으니, 이제 개 vs 고양이 분류를 해보려고 한다.

데이터셋은 캐글([링크](https://www.kaggle.com/tongpython/cat-and-dog))에서 구해왔는데, train 셋으로 고양이와 개 각각 4000장의 사진이 제공된다. 



Image Augmentation을 직접 구현해보려고 생각은 해봤지만 너무 힘들것 같아서 Augmentor라는 라이브러리를 사용해서 10000개의 변형된 이미지를 생성하였다.

```python
base_dir = 'C:\\Users\\User\\deep-learning-without-tensorflow\\src\\jjy\\jjy\\dataset\\dog_cat'

train_dir = os.path.join(base_dir, 'training_set\\training_set')
test_dir = os.path.join(base_dir, 'test_set\\test_set')

# 훈련에 사용되는 고양이/개 이미지 경로
train_cats_dir = os.path.join(train_dir, 'cats')
train_dogs_dir = os.path.join(train_dir, 'dogs')

p = Augmentor.Pipeline(train_cats_dir)
p.random_distortion(probability=1, grid_width=4, grid_height=4, magnitude=8)
p.flip_left_right(probability=0.5)
p.zoom(probability=0.5, min_factor=1.1, max_factor=1.25)
p.rotate(probability=0.7, max_left_rotation=10, max_right_rotation=10)
p.crop_random(probability=0.5, percentage_area=0.9)
p.sample(10000)
```

![2](/assets/images/post/20210416/1.png)

그리고 훈련 시간을 줄이기 위해 (64, 64)로 resize하고, 흑백으로 만들어 놓았다. (일단 학습이 잘 되는지 테스트해보고 잘 되면 사이즈를 늘려서 다시 학습시킬 예정이다.)

또한 생성된 이미지들을 나중에 불러올 때 빠르게 불러오기 위해 이미지를 numpy array로 만들고 npz파일로 저장하였다. 



------

실습한 코드는 [https://github.com/woduq1414/deep-learning-without-tensorflow](https://github.com/woduq1414/deep-learning-without-tensorflow) 에 있습니다.

