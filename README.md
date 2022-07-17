: UPTOWN
업사이클링 제품을 사용한 경험을 공유하고(Review), 이용자 간 물품을 거래(Market)할 수 있는 커뮤니티 사이트

👀 Summary
NCS 기반 디지털 훈련기관에서 진행한 협업 프로젝트입니다. 개발인원은 총 3명입니다. 업사이클링(Upcycling)을 주제로 선정해서, 공통의 관심사를 가진 사람들이 자신의 이야기를 공유할 수 있는 커뮤니티를 구현했습니다.

Login: 로그인 전/후로 렌더링되는 페이지를 따로 설정했습니다.
Home: Youtube API로 받아온 upcycling 비디오와 신규 작성 게시글을 슬라이더로 보여주었습니다.
About: 업사이클링의 정보와 사이트의 취지를 안내하기 위한 페이지입니다.
Review: 페이지는 사이트의 메인 서비스 중 하나로, 이용자들이 자신이 사용하고 있는 업사이클링 제품을 공유할 수 있는 페이지입니다.
Market: 페이지는 당근마켓처럼 개인과 개인이 물품을 사고팔 수 있는 페이지입니다.
MyPage: 기본 프로필을 수정할 수 있고, 본인이 작성한 게시글과 좋아요(❤)한 게시글, 작성 댓글을 보여줍니다.

🖥️ 담당 역할
1. 거래에 특화된 게시판인 <Market>에 관한 전반적인 내용을 담당했습니다.

- Firebase의 FireStore를 사용해서 게시글 CRUD기능을 구현했습니다.
- 이미지 파일은 Firebase의 Storage를 이용해서 저장했습니다.
- 각 게시물의 댓글 작성,삭제,수정기능을 구현했습니다.
- '❤'인스타그램의 좋아요 기능을 구현했습니다.

2. <MyPage>에서는 본인이 작성한 게시물, 댓글, '❤'게시물만 볼수있도록 구현했습니다.

3. <Home>에서는 Youtube API를 이용해 upcycling과 관련된 동영상 5개를 이용자들이 볼 수 있도록 했습니다. 


⚒️Technology Stacks
<img src="https://img.shields.io/badge/react-61DAFB?style=for-the-badge&logo=react&logoColor=black">
<img src="https://img.shields.io/badge/firebase-FFCA28?style=for-the-badge&logo=firebase&logoColor=white">
<img src="https://img.shields.io/badge/github-181717?style=for-the-badge&logo=github&logoColor=white">
