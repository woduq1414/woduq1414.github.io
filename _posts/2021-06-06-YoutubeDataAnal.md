---
layout: post
title:  "유튜브 급상승 동영상 데이터 분석"
date:   2021-06-06 9:24:30 +0900
categories: 데이터분석
tags: 데이터분석
typora-root-url: ..
comments: true
---

유튜브 실시간 급상승 동영상 데이터셋을 분석해보았습니다.

### 개요

- 조사 범위 : 2020년 8월 12일 ~ 2021년 4월 27일(259일 간)
- 동영상 개수 : 47594개



### 1. 하루에 집계되는 급상승 동영상 수

![1](/assets/images/post/youtube_anal/1.png)

2020년 9월 28일까지는 130~150개 전후로 일정하지 않게 급상승 동영상이 집계되었는데, 그 이후로는 하루에 200±3 개 정도의 급상승 동영상이 집계되었다. 



### 2. 급상승 동영상에 올라간 전체 영상 수

![1](/assets/images/post/youtube_anal/2.png)

급상승 동영상은 인기있는 영상의 경우, 오랫동안 급상승 동영상 자리를 유지하고 있는 경우가 많다. 중복된 영상을 제거하면 순 총 영상 수는 7454개가 있었다.



### 3. 급상승 동영상 유지 기간

![1](/assets/images/post/youtube_anal/3.png)

한 번 급상승 동영상에 올라가면 7일 전후 간 유지되는 경우가 가장 많았고, 최대 14일(2주)까지 연속으로 급상승 동영상이 유지될 수 있었다.



### 4. 급상승 동영상은 며칠 전에 업로드 된 영상일까?

![1](/assets/images/post/youtube_anal/4.png)

(영상 별 최초 급상승 동영상으로 집계된 시점 기준)

대부분이 업로드 다음 날에 급상승 동영상으로 집계되었고, 업로드 4일 이후부터는 급상승 동영상으로 잘 집계되지 않는다. 하지만 업로드 10일 이후에 급상승 동영상으로 올라가는 드문 케이스도 존재하였다. 



### 5. 어떤 카테고리가 많이 오를까?

![1](/assets/images/post/youtube_anal/5.png)

Entertainment - People & Blogs - Music - Sport - Comedy 순으로 실시간 급상승 동영상에 많이 올랐다.



### 6. 카테고리에 따른 댓글, 좋아요, 싫어요 비율은?

카테고리로 groupby하여 좋아요 / 싫어요 비율, 조회수 / 좋아요 비율, 조회수 / 싫어요 비율을 평균을 내보았다.

![1](/assets/images/post/youtube_anal/6.png)

좋아요 / 싫어요 비율은 Music, Non-profits & Activism, People & blogs 순으로 높고, Science & Technology, Cars & Vehicles가 낮았다.

조회수 / 좋아요 비율(n명에 한 명꼴로 좋아요)는 Gaming이 가장 높고, Music이 가장 낮다.

조회수 / 싫어요 비율(n명에 한 명꼴로 싫어요)는 Non-profits & Activism이 가장 높고, Science & Technology가 가장 낮다.



Science & Technology 분야의 급상승 동영상은 애플과 삼성의 전자제품에 관한 영상이 주를 이뤘는데  이상하게 타동영상에 비해 조회수 대비 싫어요가 많이 찍혔다. 

![1](/assets/images/post/youtube_anal/7.png)

Music과 관련된 부분에서 좋아요 비율이 유독 높았는데, 좋아요 1회당 조회수를 순서로 나열해보니 아이돌의 음악 영상이 주를 이뤘다. 아이돌 팬덤 사이에서 영상이 공유되면서 좋아요를 많이 누르는 것 같아 보인다. 

![1](/assets/images/post/youtube_anal/8.png)



### 7. 한 채널에서 몇 개의 급상승 동영상이 나왔을까?

우선 1969개의 채널의 영상이 급상승 동영상으로 올라갔다.

![1](/assets/images/post/youtube_anal/13.png)

아래 그래프는 급상승동영상에 많이 올라간 채널 Top 50이다. 방송국, 연예인 계정이 많이 눈에 띄는데, 100회 이상 급상승 동영상에 올라간 채널도 있었다.

![1](/assets/images/post/youtube_anal/12.png)

한편, 급상승 동영상에 한 번만 올라간 채널이 40%가 되고, 5번 이하로 올라간 채널이 80%를 차지하였다.

![1](/assets/images/post/youtube_anal/14.png)





### 99. 롤린은 언제 역주행했을까?

![1](/assets/images/post/youtube_anal/9.png)

![1](/assets/images/post/youtube_anal/10.png)

우선, 급상승 동영상에 처음 뜬 날짜는 3월 4일이었는데, 제목이 "잠시 역주행에 탑승하겠습니다 ..."인 것을 보아하니, 그로부터 최소 일주일 전부터 유행한 것 같다.

![1](/assets/images/post/youtube_anal/11.png)

사실 롤린은 2월 23일 경 올린 한 유튜버의 댓글모음 영상으로부터 역주행이 일어났다고 알려져있는데, 급상승 동영상에는 올라가지 않았다. 차트 역주행이 일어날 정도면 분명 많은 유입이 일어났을텐데 급상승 동영상으로 집계는 되지 않은 것을 보면, 유튜브 알고리즘에서 기존에 있던 원본 영상과 유사한 영상으로 판단하여 댓글모음 시리즈의 영상은 급상승 동영상으로 올라가지 않은 것으로 추측된다.