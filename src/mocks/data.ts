export const questionList = [
  {
    listId: 1,
    title: "이것만 알면 FE면접 끝!",
  },
  {
    listId: 2,
    title: "이것만 알면 BE면접 끝!",
  },
  {
    listId: 3,
    title: "이것만 알면 FullStack면접 끝!",
  },
];

export const questions = {
  "1": [
    {
      questionId: 1,
      questionContent: "질문내용입니다.1",
      answerId: 1,
      answerContent: "답변내용입니다.1",
    },
    {
      questionId: 2,
      questionContent: "질문내용입니다.2",
      answerId: 2,
      answerContent: "답변내용입니다.2",
    },
    {
      questionId: 3,
      questionContent: "질문내용입니다.3",
      answerId: 3,
      answerContent: "답변내용입니다.3",
    },
    {
      questionId: 4,
      questionContent: "질문내용입니다.4",
      answerId: 4,
      answerContent: "답변내용입니다.4",
    },
    {
      questionId: 5,
      questionContent: "질문내용입니다.5",
      answerId: 5,
      answerContent: "답변내용입니다.5",
    },
    {
      questionId: 6,
      questionContent: "질문내용입니다.6",
      answerId: 6,
      answerContent: "답변내용입니다.6",
    },
    {
      questionId: 7,
      questionContent: "질문내용입니다.7",
      answerId: 7,
      answerContent: "답변내용입니다.7",
    },
    {
      questionId: 8,
      questionContent: "질문내용입니다.8",
      answerId: 8,
      answerContent: "답변내용입니다.8",
    },
    {
      questionId: 9,
      questionContent: "질문내용입니다.9",
      answerId: 9,
      answerContent: "답변내용입니다.9",
    },
    {
      questionId: 10,
      questionContent: "질문내용입니다.10",
      answerId: 10,
      answerContent: "답변내용입니다.10",
    },
    {
      questionId: 11,
      questionContent: "질문내용입니다.11",
      answerId: 11,
      answerContent: "답변내용입니다.11",
    },
    {
      questionId: 12,
      questionContent: "질문내용입니다.12",
      answerId: 12,
      answerContent: "답변내용입니다.12",
    },
    {
      questionId: 13,
      questionContent: "질문내용입니다.13",
      answerId: 13,
      answerContent: "",
    },
  ],
  "2": [
    {
      questionId: 14,
      questionContent: "프론트엔드 질문입니다.",
      answerId: 14,
      answerContent: "답변내용입니다.14",
    },
    {
      questionId: 15,
      questionContent: "프론트엔드 질문입니다.",
      answerId: 15,
      answerContent: "답변내용입니다.15",
    },
    {
      questionId: 16,
      questionContent: "프론트엔드 질문입니다.",
      answerId: 16,
      answerContent: "답변내용입니다.16",
    },
    {
      questionId: 17,
      questionContent: "프론트엔드 질문입니다.",
      answerId: 17,
      answerContent: "답변내용입니다.17",
    },
    {
      questionId: 18,
      questionContent: "프론트엔드 질문입니다.",
      answerId: 18,
      answerContent: "답변내용입니다.18",
    },
    {
      questionId: 19,
      questionContent: "프론트엔드 질문입니다.",
      answerId: 19,
      answerContent: "답변내용입니다.19",
    },
    {
      questionId: 20,
      questionContent: "프론트엔드 질문입니다.",
      answerId: 20,
      answerContent: "답변내용입니다.20",
    },
    {
      questionId: 21,
      questionContent: "프론트엔드 질문입니다.",
      answerId: 21,
      answerContent: "답변내용입니다.21",
    },
    {
      questionId: 22,
      questionContent: "프론트엔드 질문입니다.",
      answerId: 22,
      answerContent: "답변내용입니다.22",
    },
    {
      questionId: 23,
      questionContent: "프론트엔드 질문입니다.",
      answerId: 23,
      answerContent: "답변내용입니다.23",
    },
    {
      questionId: 24,
      questionContent: "프론트엔드 질문입니다.",
      answerId: 24,
      answerContent: "",
    },
  ],
} as any;

export const interviews = [
  {
    videoId: 1,
    userId: 1,
    public: true,
    videoLink: "https://inf-video.s3.ap-northeast-2.amazonaws.com/2024-05-02test.mp4",
    thumbnailLink: "https://inf-video.s3.ap-northeast-2.amazonaws.com/2024-05-02test-thumbnail.png",
    videoTitle: "프론트엔드 면접 영상",
    questions: [3, 4, 5],
    tags: ["프론트엔드", "면접"],
    numOfLike: 20,
    updateTime: null,
    time: "2024-05-02 15:41:00",
    userName: "이영재",
  },
  {
    userId: 4,
    userName: "퍼블릭 false",
    public: false,
    videoId: 888,
    videoLink: "idrive 올린 링크",
    videoTitle: "면접 연습 영상4",
    time: "2024-04-01 15:44:00",
    updateTime: null,
    numOfLike: 5,
    tags: ["삼성", "네이버", "카카오", "BE"],
    thumbnailLink: "https://buffer.com/library/content/images/size/w1200/2023/10/free-images.jpg",
  },
  {
    userId: 5,
    userName: "권우현",
    videoId: 999,
    public: true,
    videoLink: "idrive 올린 링크",
    videoTitle: "면접 연습 영상5",
    time: "2024-04-01 15:45:00",
    updateTime: null,
    numOfLike: 0,
    tags: ["삼성", "네이버", "카카오", "BE"],
    thumbnailLink: "https://buffer.com/library/content/images/size/w1200/2023/10/free-images.jpg",
  },
  {
    userId: 6,
    userName: "권우현",
    videoId: 101010,
    public: true,
    videoLink: "idrive 올린 링크",
    videoTitle: "면접 연습 영상6",
    time: "2024-04-01 15:46:00",
    updateTime: null,
    numOfLike: 0,
    tags: ["삼성", "네이버", "카카오", "BE"],
    thumbnailLink: "https://buffer.com/library/content/images/size/w1200/2023/10/free-images.jpg",
  },
  {
    userId: 7,
    userName: "comment test",
    videoId: 31,
    public: true,
    videoLink: "https://inf-video.s3.ap-northeast-2.amazonaws.com/2024-05-02test.mp4",
    thumbnailLink: "https://inf-video.s3.ap-northeast-2.amazonaws.com/2024-05-02test-thumbnail.png",
    videoTitle: "코멘트 테스트용",
    time: "2024-05-02 15:41:00",
    updateTime: null,
    numOfLike: 20,
    tags: ["프론트엔드", "면접"],
  },
];

export const comments = [
  {
    videoId: 1,
    content: [
      {
        commentId: 1,
        userId: 1,
        userName: "이영재",
        content: "잘했어요!",
        createdAt: "2024-05-02 15:41:00",
      },
      {
        commentId: 2,
        userId: 2,
        userName: "김영재",
        content: "잘했어요!",
        createdAt: "2024-05-02 15:41:00",
      },
    ],
  },
  {
    videoId: 888,
    content: [
      {
        commentId: 3,
        userId: 1,
        userName: "이영재",
        content: "잘했어요!",
        createdAt: "2024-05-02 15:41:00",
      },
      {
        commentId: 4,
        userId: 2,
        userName: "김영재",
        content: "잘했어요!",
        createdAt: "2024-05-02 15:41:00",
      },
    ],
  },
  {
    videoId: 999,
    content: [
      {
        commentId: 5,
        userId: 1,
        userName: "이영재",
        content: "잘했어요!",
        createdAt: "2024-05-02 15:41:00",
      },
      {
        commentId: 6,
        userId: 2,
        userName: "김영재",
        content: "잘했어요!",
        createdAt: "2024-05-02 15:41:00",
      },
    ],
  },
  {
    videoId: 101010,
    content: [
      {
        commentId: 7,
        userId: 1,
        userName: "이영재",
        content: "잘했어요!",
        createdAt: "2024-05-02 15:41:00",
      },
      {
        commentId: 8,
        userId: 2,
        userName: "김영재",
        content: "잘했어요!",
        createdAt: "2024-05-02 15:41:00",
      },
    ],
  },
];

const User = {
  userId: 1,
  userName: "이승학",
  image: "/noneProfile.jpg",
};

export const PostComments = [
  {
    postId: 1,
    content: [
      {
        commentId: 1,
        User: User,
        content: "잘했어요!",
        createdAt: "2024-05-02 15:41:00",
      },
      {
        commentId: 2,
        User: User,
        content: "잘했어요!",
        createdAt: "2024-05-02 15:41:00",
      },
    ],
  },
  {
    postId: 2,
    content: [
      {
        commentId: 3,
        User: User,
        content: "잘했어요!",
        createdAt: "2024-05-02 15:41:00",
      },
      {
        commentId: 4,
        User: User,
        content: "잘했어요!",
        createdAt: "2024-05-02 15:41:00",
      },
    ],
  },
  {
    postId: 3,
    content: [
      {
        commentId: 5,
        User: User,
        content: "잘했어요!",
        createdAt: "2024-05-02 15:41:00",
      },
      {
        commentId: 6,
        User: User,
        content: "잘했어요!",
        createdAt: "2024-05-02 15:41:00",
      },
    ],
  },
  {
    postId: 4,
    content: [
      {
        commentId: 7,
        User: User,
        content: "4번 게시글의 7번 댓글",
        createdAt: "2024-05-02 15:41:00",
      },
      {
        commentId: 8,
        User: User,
        content: "4번 게시글의 8번 댓글",
        createdAt: "2024-05-02 15:41:00",
      },
    ],
  },
];
