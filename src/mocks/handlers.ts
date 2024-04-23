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
    const filteredPosts = posts.filter((post) => post.category === category);

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
];
