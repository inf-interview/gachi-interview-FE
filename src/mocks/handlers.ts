import { HttpResponse, http } from "msw";

const User = {
  userId: 1,
  userName: "이승학",
  image: "/noneProfile.jpg",
};
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
    return HttpResponse.json([
      {
        postId: 1,
        User: User,
        postTitle: "글 제목 부분",
        postContent: "글 내용 부분",
        category: "study",
        updateTime: new Date(),
        numOfLike: 20,
        numOfComment: 5,
        tags: ["삼성", "네이버", "카카오", "BE"],
      },
      {
        postId: 2,
        User: User,
        postTitle: "글 제목 부분",
        postContent: "글 내용 부분",
        category: "study",
        updateTime: new Date(),
        numOfLike: 20,
        numOfComment: 5,
        tags: ["삼성", "네이버", "카카오", "BE"],
      },
      {
        postId: 3,
        User: User,
        postTitle: "글 제목 부분",
        postContent: "글 내용 부분",
        category: "study",
        updateTime: new Date(),
        numOfLike: 20,
        numOfComment: 5,
        tags: ["삼성", "네이버", "카카오", "BE"],
      },
      {
        postId: 4,
        User: User,
        postTitle: "글 제목 부분",
        postContent: "글 내용 부분",
        category: "study",
        updateTime: new Date(),
        numOfLike: 20,
        numOfComment: 5,
        tags: ["삼성", "네이버", "카카오", "BE"],
      },
    ]);
  }),

  http.get("/api/board/:postId", ({ request, params }) => {
    const { postId } = params;
    return HttpResponse.json({
      postId,
      User: User,
      postTitle: "글 제목 부분",
      postContent: "글 내용 부분",
      category: "reviews",
      updateTime: new Date(),
      numOfLike: 20,
      numOfComment: 5,
      tags: ["삼성", "네이버", "카카오", "BE"],
    });
  }),
  // http.get("/api/posts/:postId/comments", async ({ request, params }) => {
  //   const { postId } = params;
  //   return HttpResponse.json([
  //     {
  //       postId: 1,
  //       User: User[0],
  //       content: `${1} 게시글 ${postId}의 답글`,
  //       // Images: [{ imageId: 1, link: faker.image.urlLoremFlickr() }],
  //       createdAt: new Date(),
  //     },
  //     {
  //       postId: 2,
  //       User: User[1],
  //       content: `${2} 게시글 ${postId}의 답글`,
  //       // Images: [
  //       //   { imageId: 1, link: faker.image.urlLoremFlickr() },
  //       //   { imageId: 2, link: faker.image.urlLoremFlickr() },
  //       // ],
  //       createdAt: new Date(),
  //     },
  //     {
  //       postId: 3,
  //       User: User[2],
  //       content: `${3} 게시글 ${postId}의 답글`,
  //       Images: [],
  //       createdAt: new Date(),
  //     },
  //     {
  //       postId: 4,
  //       User: User[2],
  //       content: `${4} 게시글 ${postId}의 답글`,
  //       Images: [],
  //       createdAt: new Date(),
  //     },
  //   ]);
  // }),
];
