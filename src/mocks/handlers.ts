import { HttpResponse, http } from "msw";
import * as data from "./data";

const User = {
  userId: 1,
  userName: "이승학",
  image: "/noneProfile.jpg",
};

const posts = [
  {
    postId: 1,
    User: User,
    postTitle: "글 제목 부분",
    content: "글 내용 부분",
    category: "studies",
    updateTime: new Date(),
    numOfLike: 20,
    numOfComment: 5,
    tags: ["삼성", "네이버", "카카오", "BE"],
  },
  {
    postId: 2,
    User: User,
    postTitle: "글 제목 부분",
    content: "글 내용 부분",
    category: "studies",
    updateTime: new Date(),
    numOfLike: 20,
    numOfComment: 5,
    tags: ["삼성", "네이버", "카카오", "BE"],
  },
  {
    postId: 3,
    User: User,
    postTitle: "글 제목 부분",
    content: "글 내용 부분",
    category: "studies",
    updateTime: new Date(),
    numOfLike: 20,
    numOfComment: 5,
    tags: ["삼성", "네이버", "카카오", "BE"],
  },
  {
    postId: 4,
    User: User,
    postTitle: "글 제목 부분",
    content: "글 내용 부분",
    category: "reviews",
    updateTime: new Date(),
    numOfLike: 20,
    numOfComment: 5,
    tags: ["삼성", "네이버", "카카오", "BE"],
  },
  {
    postId: 5,
    User: User,
    postTitle: "글 제목 부분",
    content: "글 내용 부분",
    category: "reviews",
    updateTime: new Date(),
    numOfLike: 20,
    numOfComment: 5,
    tags: ["삼성", "네이버", "카카오", "BE"],
  },
  {
    postId: 6,
    User: User,
    postTitle: "글 제목 부분",
    content: "글 내용 부분",
    category: "reviews",
    updateTime: new Date(),
    numOfLike: 20,
    numOfComment: 5,
    tags: ["삼성", "네이버", "카카오", "BE"],
  },
  {
    postId: 7,
    User: User,
    postTitle: "글 제목 부분",
    content: "글 내용 부분",
    category: "reviews",
    updateTime: new Date(),
    numOfLike: 20,
    numOfComment: 5,
    tags: ["삼성", "네이버", "카카오", "BE"],
  },
];

const comments = [
  {
    postId: 1,
    commentId: 1,
    User: User,
    content: `게시글 댓글 내용1`,
    updateTime: new Date(),
  },
  {
    postId: 2,
    commentId: 2,
    User: User,
    content: `게시글 댓글 내용2`,
    updateTime: new Date(),
  },
  {
    postId: 3,
    commentId: 3,
    User: User,
    content: `게시글 댓글 내용3`,
    updateTime: new Date(),
  },
  {
    postId: 4,
    commentId: 4,
    User: User,
    content: `게시글 댓글 내용4`,
    updateTime: new Date(),
  },
];

const alerts = [
  {
    title: "알림 타입 (AI 피드백 완료 / 답글 알림)",
    description:
      "Lorem ipsum, dolor sit amet consectetur adipisicing elit. Molestias reprehenderit inventore, quos reiciendis delectus excepturi nemo vitae error harum aut deserunt debitis quo eligendi est iste, temporibus illum? Sequi, quisquam.",
    date: new Date(),
  },
  {
    title: "AI 피드백",
    description:
      "Lorem ipsum, dolor sit amet consectetur adipisicing elit. Molestias reprehenderit inventore, quos reiciendis delectus excepturi nemo vitae error harum aut deserunt debitis quo eligendi est iste, temporibus illum? Sequi, quisquam.",
    date: new Date(),
  },
  {
    title: "삼성전자 후기: 게시글에 답글이 달렸습니다.",
    description:
      "Lorem ipsum, dolor sit amet consectetur adipisicing elit. Molestias reprehenderit inventore, quos reiciendis delectus excepturi nemo vitae error harum aut deserunt debitis quo eligendi est iste, temporibus illum? Sequi, quisquam.",
    date: new Date(),
  },
];

export const handlers = [
  http.post("/api/login", () => {
    console.log("로그인");
    return HttpResponse.json(
      {
        userId: 1,
        username: "이승학",
        image: "/noneProfile.jpg",
      },
      {
        headers: {
          "Set-Cookie": "connect.sid=msw-cookie;HttpOnly;Path=/",
        },
      },
    );
  }),

  http.post("/api/logout", () => {
    console.log("로그아웃");
    return HttpResponse.json(null, {
      headers: {
        "Set-Cookie": "connect.sid=;HttpOnly;Path=/;Max-Age=0",
      },
    });
  }),

  http.get("/api/board/list", async ({ request }) => {
    const queryParams = new URLSearchParams(request.url);
    const category = queryParams.get("category");
    console.log(category);
    const filteredPosts = posts.filter((post) => post.category === category);

    if (category === null) {
      return HttpResponse.json([]);
    }

    return HttpResponse.json(filteredPosts);
  }),

  http.get("/api/board/:postId", ({ request, params }) => {
    const { postId } = params;
    const queryParams = new URLSearchParams(request.url);
    const category = queryParams.get("category");

    return HttpResponse.json({
      postId,
      User: User,
      postTitle: "글 제목 부분",
      content: "글 내용 부분",
      category,
      updateTime: new Date(),
      numOfLike: 20,
      numOfComment: 5,
      tags: ["삼성", "네이버", "카카오", "BE"],
    });
  }),

  http.post("/api/board/write", async ({ request }) => {
    const bodyString = await request.text();
    const { postTitle, content, tag, category } = JSON.parse(bodyString);

    const newPost = {
      postId: posts.length + 1,
      User: User,
      postTitle,
      content,
      category,
      updateTime: new Date(),
      numOfLike: 20,
      numOfComment: 5,
      tags: Array.isArray(tag) ? tag : [tag],
    };

    posts.push(newPost);

    return HttpResponse.json({
      ...newPost,
    });
  }),

  http.get("/api/board/:postId/comments", ({ request, params }) => {
    const { postId } = params;
    const filteredComments = comments.filter((post) => post.postId === +postId);
    return HttpResponse.json(filteredComments);
  }),

  http.post("/api/board/:postId/submit", async ({ request, params }) => {
    const { postId } = params;
    const bodyString = await request.text();
    const { content } = JSON.parse(bodyString);

    const newComment = {
      postId: +postId,
      commentId: 1,
      User: User,
      content,
      updateTime: new Date(),
    };

    comments.unshift(newComment);

    return HttpResponse.json({
      ...newComment,
    });
  }),

  http.get("/api/alert", () => {
    return HttpResponse.json(alerts);
  }),

  http.post("/api/alert", async ({ request }) => {
    const newAlert = {
      title: "삼성전자 후기: 게시글에 답글이 달렸습니다.",
      description:
        "Lorem ipsum, dolor sit amet consectetur adipisicing elit. Molestias reprehenderit inventore, quos reiciendis delectus excepturi nemo vitae error harum aut deserunt debitis quo eligendi est iste, temporibus illum? Sequi, quisquam.",
      date: new Date(),
    };

    alerts.unshift(newAlert);

    return HttpResponse.json({
      ...newAlert,
    });
  }),

  http.get("/api/interview/question/list", async () => {
    return HttpResponse.json(data.questionList);
  }),

  http.get("/api/interview/question/:listId", async ({ params }) => {
    const { listId } = params;

    if (typeof listId !== "string" || isNaN(+listId)) {
      return new HttpResponse(null, {
        status: 400,
        statusText: "Bad Request",
      });
    }

    const existQuestions = data.questions.hasOwnProperty(listId);

    if (!existQuestions) {
      return new HttpResponse(null, {
        status: 404,
        statusText: "Not Found",
      });
    }

    return HttpResponse.json(data.questions[listId]);
  }),

  http.post("/api/interview/question", async ({ request }) => {
    const bodyString = await request.text();
    const { userId, title } = JSON.parse(bodyString);

    const nextId =
      data.questionList.reduce((acc, cur) => {
        if (acc < cur.listId) {
          return cur.listId;
        }
        return acc;
      }, 0) + 1;

    const newQuestionList = {
      listId: nextId,
      userId,
      title,
    };

    data.questionList.push(newQuestionList);

    return HttpResponse.json({
      ...newQuestionList,
    });
  }),

  http.post("/api/interview/question/:listId", async ({ request, params }) => {
    const { listId } = params;
    const bodyString = await request.text();
    const { userId, questionContent, answerContent } = JSON.parse(bodyString);

    if (typeof listId !== "string" || isNaN(+listId)) {
      return new HttpResponse(null, {
        status: 400,
        statusText: "Bad Request",
      });
    }

    let nextId = 1;
    for (const key in data.questions) {
      nextId = Math.max(
        data.questions[key].reduce((acc: any, cur: any) => {
          if (acc < cur.questionId) {
            return cur.questionId;
          }
          return acc;
        }, 0),
        nextId,
      );
    }
    nextId += 1;

    const newQuestion = {
      questionId: nextId,
      answerId: nextId,
      questionContent,
      answerContent,
    };

    data.questions[listId] = data.questions[listId] || [];
    data.questions[listId].push(newQuestion);

    return HttpResponse.json({
      ...newQuestion,
    });
  }),

  http.post("api/interview/complete", async ({ request }) => {
    const bodyString = await request.text();
    const {
      userId,
      public: isPublic,
      videoLink,
      thumbnailLink,
      videoTitle,
      questions,
      tags,
    } = JSON.parse(bodyString);

    const newVideoId =
      data.interviews.reduce((acc, cur) => {
        if (acc < cur.videoId) {
          return cur.videoId;
        }
        return acc;
      }, 0) + 1;

    const newInterview = {
      videoId: newVideoId,
      userName: "이영재",
      userId,
      numOfLike: 0,
      updateTime: null,
      time: new Date().toISOString(),
      public: isPublic,
      videoLink,
      thumbnailLink,
      videoTitle,
      questions,
      tags,
    };

    data.interviews.push(newInterview);

    return HttpResponse.json({
      videoId: newInterview.videoId,
    });
  }),

  // 영상 목록 조회
  http.get("/api/video/list", async ({ request }) => {
    const url = new URL(request.url);
    const page = url.searchParams.get("page");
    const sortType = url.searchParams.get("sortType");

    if (!page) {
      return new HttpResponse(null, {
        status: 400,
        statusText: "Bad Request",
      });
    }
    const publicVideos = data.interviews.filter((interview) => interview.public);

    let result = publicVideos;
    if (sortType === "like") {
      result.sort((a, b) => b.numOfLike - a.numOfLike);
    } else {
      result.sort((a, b) => new Date(b.time).getTime() - new Date(a.time).getTime());
    }
    const start = (Number(page) - 1) * 10;
    const end = start + 10;

    // sortType이 바뀐 경우 page를 1로 초기화해야함

    return HttpResponse.json(result.slice(start, end));
  }),

  http.get("/api/video/:videoId", async ({ params }) => {
    const { videoId } = params;

    if (typeof videoId !== "string" || isNaN(+videoId)) {
      return new HttpResponse(null, {
        status: 400,
        statusText: "Bad Request",
      });
    }

    const existVideo = data.interviews.find((interview) => interview.videoId === +videoId);

    if (!existVideo) {
      return new HttpResponse(null, {
        status: 404,
        statusText: "Not Found",
      });
    }

    const video = {
      userId: existVideo.userId,
      userName: existVideo.userName,
      videoId: existVideo.videoId,
      exposure: existVideo.public,
      videoTitle: existVideo.videoTitle,
      time: existVideo.time,
      updateTime: existVideo.updateTime,
      numOfLike: existVideo.numOfLike,
      tags: existVideo.tags,
      videoLink: existVideo.videoLink,
    };

    return HttpResponse.json(video);
  }),

  http.post("/api/video/:videoId/like", async ({ params, request }) => {
    const { videoId } = params;

    const bodyString = await request.text();
    const { userId } = JSON.parse(bodyString);

    if (typeof videoId !== "string" || isNaN(+videoId)) {
      return new HttpResponse(null, {
        status: 400,
        statusText: "Bad Request",
      });
    }

    const existVideo = data.interviews.find((interview) => interview.videoId === +videoId);

    if (!existVideo) {
      return new HttpResponse(null, {
        status: 404,
        statusText: "Not Found",
      });
    }

    existVideo.numOfLike += 1;

    return HttpResponse.json(null, {
      status: 201,
    });
  }),

  // 영상 댓글 목록 조회
  http.get("/api/video/:videoId/comments", async ({ params }) => {
    const { videoId } = params;

    if (typeof videoId !== "string" || isNaN(+videoId)) {
      return new HttpResponse(null, {
        status: 400,
        statusText: "Bad Request",
      });
    }

    const existVideo = data.interviews.find((interview) => interview.videoId === +videoId);

    if (!existVideo) {
      return new HttpResponse(null, {
        status: 404,
        statusText: "Not Found",
      });
    }

    const existComments = data.comments.filter((comment) => comment.videoId === +videoId);
    if (!existComments || existComments.length === 0) {
      return HttpResponse.json({ content: [] });
    }

    const comments = data.comments.filter((comment) => comment.videoId === +videoId)[0]?.content;
    const result = {
      content: comments,
    };

    return HttpResponse.json(result);
  }),

  // 영상 댓글 작성
  http.post("/api/video/:videoId/submit", async ({ params, request }) => {
    const { videoId } = params;
    const bodyString = await request.text();
    const { userId, content } = JSON.parse(bodyString);

    if (typeof videoId !== "string" || isNaN(+videoId)) {
      return new HttpResponse(null, {
        status: 400,
        statusText: "Bad Request",
      });
    }

    const existVideo = data.interviews.find((interview) => interview.videoId === +videoId);

    if (!existVideo) {
      return new HttpResponse(null, {
        statusText: "Not Found",
        status: 404,
      });
    }

    const newCommentId =
      data.comments.reduce((acc, cur) => {
        const max = cur.content.reduce((acc, cur) => {
          return acc < cur.commentId ? cur.commentId : acc;
        }, 0);

        return acc < max ? max : acc;
      }, 0) + 1;

    const newComment = {
      commentId: newCommentId,
      userId,
      content,
      userName: "이영재",
      createdAt: new Date().toISOString(),
    };

    const targetComment = data.comments.find((comment) => comment.videoId === +videoId);
    if (!targetComment) {
      data.comments.push({
        videoId: +videoId,
        content: [newComment],
      });
    } else {
      targetComment.content.push(newComment);
    }

    return HttpResponse.json(
      {
        newComment,
      },
      {
        status: 201,
      },
    );
  }),

  http.patch("/api/video/:videoId/comments/:commentId", async ({ params, request }) => {
    const { videoId, commentId } = params;
    const bodyString = await request.text();
    const { userId, content } = JSON.parse(bodyString);

    if (
      typeof videoId !== "string" ||
      isNaN(+videoId) ||
      typeof commentId !== "string" ||
      isNaN(+commentId)
    ) {
      return new HttpResponse(null, {
        status: 400,
        statusText: "Bad Request",
      });
    }

    const existVideo = data.interviews.find((interview) => interview.videoId === +videoId);

    if (!existVideo) {
      return new HttpResponse(null, {
        statusText: "Not Found",
        status: 404,
      });
    }

    const targetComment = data.comments.find((comment) => comment.videoId === +videoId);
    if (!targetComment) {
      return new HttpResponse(null, {
        statusText: "Not Found",
        status: 404,
      });
    }

    const targetContent = targetComment.content.find((comment) => comment.commentId === +commentId);
    if (!targetContent) {
      return new HttpResponse(null, {
        statusText: "Not Found",
        status: 404,
      });
    }

    targetContent.content = content;

    return HttpResponse.json(
      {
        content: targetContent,
      },
      {
        status: 201,
      },
    );
  }),

  // 영상 댓글 삭제
  http.delete("/api/video/:videoId/comments/:commentId", async ({ params }) => {
    const { videoId, commentId } = params;

    if (
      typeof videoId !== "string" ||
      isNaN(+videoId) ||
      typeof commentId !== "string" ||
      isNaN(+commentId)
    ) {
      return new HttpResponse(null, {
        status: 400,
        statusText: "Bad Request",
      });
    }

    const existVideo = data.interviews.find((interview) => interview.videoId === +videoId);

    if (!existVideo) {
      return new HttpResponse(null, {
        statusText: "Not Found",
        status: 404,
      });
    }

    const targetComment = data.comments.find((comment) => comment.videoId === +videoId);
    if (!targetComment) {
      return new HttpResponse(null, {
        statusText: "Not Found",
        status: 404,
      });
    }

    const targetContent = targetComment.content.find((comment) => comment.commentId === +commentId);
    if (!targetContent) {
      return new HttpResponse(null, {
        statusText: "Not Found",
        status: 404,
      });
    }

    targetComment.content = targetComment.content.filter(
      (comment) => comment.commentId !== +commentId,
    );

    return new HttpResponse(null, {
      status: 204,
    });
  }),
];
