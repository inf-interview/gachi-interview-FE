import { HttpResponse, http } from "msw";

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
];
