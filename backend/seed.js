const User = require("./models/user.model");
const Blog = require("./models/blog.model");
const connectDb = require("./config/connectDb");
const { default: mongoose } = require("mongoose");
const { ObjectId } = mongoose.Types;

const blogs = [
  {
    title: "Understanding JavaScript Closures",
    coverImage: {
      url: "https://dummyimage.com/800x450",
      id: "blog-001"
    },
    category: "technology",
    tags: ["javascript", "programming", "web"],
    public: true,
    admin: new ObjectId("6a9f7b469ecaf79f0e4452d6"),
    content: "<p>Closures are one of the most important concepts in JavaScript.</p>",
    likes: [
      new ObjectId("64a000000000000000000001"),
      new ObjectId("64a000000000000000000002"),
      new ObjectId("64a000000000000000000003")
    ],
    likedByUser: false,
    views: 120,
    comments: [
      new ObjectId("64b000000000000000000001")
    ],
    description: "A beginner-friendly explanation of JavaScript closures.",
    createdAt: new Date("2026-09-15T10:00:00Z"),
    updatedAt: new Date("2026-09-15T10:00:00Z")
  },

  {
    title: "Getting Started With Node.js",
    coverImage: {
      url: "https://dummyimage.com/800x450",
      id: "blog-002"
    },
    category: "technology",
    tags: ["nodejs", "backend", "javascript"],
    public: true,
    admin: new ObjectId("6a9f7b469ecaf79f0e4452d6"),
    content: "<p>Node.js allows JavaScript to run outside the browser.</p>",
    likes: [
      new ObjectId("64a000000000000000000004"),
      new ObjectId("64a000000000000000000005")
    ],
    likedByUser: false,
    views: 250,
    comments: [
      new ObjectId("64b000000000000000000002"),
      new ObjectId("64b000000000000000000003")
    ],
    description: "Learn the basics of Node.js and backend development.",
    createdAt: new Date("2026-09-14T10:00:00Z"),
    updatedAt: new Date("2026-09-14T10:00:00Z")
  },

  {
    title: "MongoDB Basics Every Developer Should Know",
    coverImage: {
      url: "https://dummyimage.com/800x450",
      id: "blog-003"
    },
    category: "database",
    tags: ["mongodb", "database", "mongoose"],
    public: true,
    admin: new ObjectId("6a9f7b469ecaf79f0e4452d6"),
    content: "<p>MongoDB is a popular NoSQL database used in modern applications.</p>",
    likes: [
      new ObjectId("64a000000000000000000006"),
      new ObjectId("64a000000000000000000007"),
      new ObjectId("64a000000000000000000008"),
      new ObjectId("64a000000000000000000009"),
      new ObjectId("64a000000000000000000010")
    ],
    likedByUser: false,
    views: 500,
    comments: [
      new ObjectId("64b000000000000000000004"),
      new ObjectId("64b000000000000000000005"),
      new ObjectId("64b000000000000000000006")
    ],
    description: "Learn MongoDB fundamentals with practical examples.",
    createdAt: new Date("2026-09-13T10:00:00Z"),
    updatedAt: new Date("2026-09-13T10:00:00Z")
  },

  {
    title: "How REST APIs Work",
    coverImage: {
      url: "https://dummyimage.com/800x450",
      id: "blog-004"
    },
    category: "backend",
    tags: ["api", "rest", "express"],
    public: true,
    admin: new ObjectId("6a9f7b469ecaf79f0e4452d6"),
    content: "<p>REST APIs allow frontend and backend applications to communicate.</p>",
    likes: [
      new ObjectId("64a000000000000000000011"),
      new ObjectId("64a000000000000000000012"),
      new ObjectId("64a000000000000000000013"),
      new ObjectId("64a000000000000000000014")
    ],
    likedByUser: false,
    views: 350,
    comments: [
      new ObjectId("64b000000000000000000007")
    ],
    description: "A simple explanation of REST APIs and HTTP methods.",
    createdAt: new Date("2026-09-12T10:00:00Z"),
    updatedAt: new Date("2026-09-12T10:00:00Z")
  },

  {
    title: "React State Management Explained",
    coverImage: {
      url: "https://dummyimage.com/800x450",
      id: "blog-005"
    },
    category: "frontend",
    tags: ["react", "state", "frontend"],
    public: true,
    admin: new ObjectId("6a9f7b469ecaf79f0e4452d6"),
    content: "<p>State management is an important part of building React applications.</p>",
    likes: [
      new ObjectId("64a000000000000000000015"),
      new ObjectId("64a000000000000000000016")
    ],
    likedByUser: false,
    views: 180,
    comments: [
      new ObjectId("64b000000000000000000008"),
      new ObjectId("64b000000000000000000009")
    ],
    description: "Understand local state and global state in React.",
    createdAt: new Date("2026-09-11T10:00:00Z"),
    updatedAt: new Date("2026-09-11T10:00:00Z")
  },

  {
    title: "Why Git Is Important",
    coverImage: {
      url: "https://dummyimage.com/800x450",
      id: "blog-006"
    },
    category: "development",
    tags: ["git", "github", "tools"],
    public: true,
    admin: new ObjectId("6a9f7b469ecaf79f0e4452d6"),
    content: "<p>Git helps developers track changes and collaborate on projects.</p>",
    likes: [
      new ObjectId("64a000000000000000000017")
    ],
    likedByUser: false,
    views: 90,
    comments: [],
    description: "Learn why Git is essential for modern software development.",
    createdAt: new Date("2026-09-10T10:00:00Z"),
    updatedAt: new Date("2026-09-10T10:00:00Z")
  },

  {
    title: "Introduction to Express.js",
    coverImage: {
      url: "https://dummyimage.com/800x450",
      id: "blog-007"
    },
    category: "backend",
    tags: ["express", "nodejs", "backend"],
    public: true,
    admin: new ObjectId("6a9f7b469ecaf79f0e4452d6"),
    content: "<p>Express makes it easier to build web servers with Node.js.</p>",
    likes: [
      new ObjectId("64a000000000000000000018"),
      new ObjectId("64a000000000000000000019"),
      new ObjectId("64a000000000000000000020"),
      new ObjectId("64a000000000000000000021"),
      new ObjectId("64a000000000000000000022"),
      new ObjectId("64a000000000000000000023")
    ],
    likedByUser: false,
    views: 420,
    comments: [
      new ObjectId("64b000000000000000000010"),
      new ObjectId("64b000000000000000000011")
    ],
    description: "Build your first Express.js server.",
    createdAt: new Date("2026-09-09T10:00:00Z"),
    updatedAt: new Date("2026-09-09T10:00:00Z")
  },

  {
    title: "What Is JWT Authentication",
    coverImage: {
      url: "https://dummyimage.com/800x450",
      id: "blog-008"
    },
    category: "security",
    tags: ["jwt", "authentication", "security"],
    public: true,
    admin: new ObjectId("6a9f7b469ecaf79f0e4452d6"),
    content: "<p>JWT is commonly used for authentication in web applications.</p>",
    likes: [
      new ObjectId("64a000000000000000000024"),
      new ObjectId("64a000000000000000000025"),
      new ObjectId("64a000000000000000000026")
    ],
    likedByUser: false,
    views: 300,
    comments: [
      new ObjectId("64b000000000000000000012"),
      new ObjectId("64b000000000000000000013")
    ],
    description: "Understand JSON Web Tokens and authentication.",
    createdAt: new Date("2026-09-08T10:00:00Z"),
    updatedAt: new Date("2026-09-08T10:00:00Z")
  },

  {
    title: "CSS Flexbox Made Easy",
    coverImage: {
      url: "https://dummyimage.com/800x450",
      id: "blog-009"
    },
    category: "frontend",
    tags: ["css", "flexbox", "frontend"],
    public: true,
    admin: new ObjectId("6a9f7b469ecaf79f0e4452d6"),
    content: "<p>Flexbox makes it easy to create responsive layouts.</p>",
    likes: [
      new ObjectId("64a000000000000000000027"),
      new ObjectId("64a000000000000000000028")
    ],
    likedByUser: false,
    views: 150,
    comments: [
      new ObjectId("64b000000000000000000014")
    ],
    description: "A practical guide to CSS Flexbox.",
    createdAt: new Date("2026-09-07T10:00:00Z"),
    updatedAt: new Date("2026-09-07T10:00:00Z")
  },

  {
    title: "Understanding Async Await",
    coverImage: {
      url: "https://dummyimage.com/800x450",
      id: "blog-010"
    },
    category: "javascript",
    tags: ["javascript", "async", "promise"],
    public: true,
    admin: new ObjectId("6a9f7b469ecaf79f0e4452d6"),
    content: "<p>Async and await make asynchronous JavaScript easier to understand.</p>",
    likes: [
      new ObjectId("64a000000000000000000029"),
      new ObjectId("64a000000000000000000030"),
      new ObjectId("64a000000000000000000031"),
      new ObjectId("64a000000000000000000032")
    ],
    likedByUser: false,
    views: 280,
    comments: [
      new ObjectId("64b000000000000000000015"),
      new ObjectId("64b000000000000000000016")
    ],
    description: "Learn asynchronous JavaScript using async and await.",
    createdAt: new Date("2026-09-06T10:00:00Z"),
    updatedAt: new Date("2026-09-06T10:00:00Z")
  },

  {
    title: "How MongoDB Aggregation Works",
    coverImage: {
      url: "https://dummyimage.com/800x450",
      id: "blog-011"
    },
    category: "database",
    tags: ["mongodb", "aggregation", "database"],
    public: true,
    admin: new ObjectId("6a9f7b469ecaf79f0e4452d6"),
    content: "<p>MongoDB aggregation allows you to process and transform documents.</p>",
    likes: [
      new ObjectId("64a000000000000000000033"),
      new ObjectId("64a000000000000000000034"),
      new ObjectId("64a000000000000000000035"),
      new ObjectId("64a000000000000000000036"),
      new ObjectId("64a000000000000000000037"),
      new ObjectId("64a000000000000000000038"),
      new ObjectId("64a000000000000000000039")
    ],
    likedByUser: false,
    views: 600,
    comments: [
      new ObjectId("64b000000000000000000017"),
      new ObjectId("64b000000000000000000018"),
      new ObjectId("64b000000000000000000019"),
      new ObjectId("64b000000000000000000020")
    ],
    description: "Learn the basics of MongoDB aggregation pipelines.",
    createdAt: new Date("2026-09-05T10:00:00Z"),
    updatedAt: new Date("2026-09-05T10:00:00Z")
  },

  {
    title: "Introduction to TypeScript",
    coverImage: {
      url: "https://dummyimage.com/800x450",
      id: "blog-012"
    },
    category: "programming",
    tags: ["typescript", "javascript", "programming"],
    public: true,
    admin: new ObjectId("6a9f7b469ecaf79f0e4452d6"),
    content: "<p>TypeScript adds static typing to JavaScript.</p>",
    likes: [
      new ObjectId("64a000000000000000000040"),
      new ObjectId("64a000000000000000000041")
    ],
    likedByUser: false,
    views: 220,
    comments: [],
    description: "An introduction to TypeScript for JavaScript developers.",
    createdAt: new Date("2026-09-04T10:00:00Z"),
    updatedAt: new Date("2026-09-04T10:00:00Z")
  },

  {
    title: "How HTTP Requests Work",
    coverImage: {
      url: "https://dummyimage.com/800x450",
      id: "blog-013"
    },
    category: "backend",
    tags: ["http", "web", "backend"],
    public: true,
    admin: new ObjectId("6a9f7b469ecaf79f0e4452d6"),
    content: "<p>HTTP is the foundation of communication between clients and servers.</p>",
    likes: [
      new ObjectId("64a000000000000000000042"),
      new ObjectId("64a000000000000000000043"),
      new ObjectId("64a000000000000000000044")
    ],
    likedByUser: false,
    views: 340,
    comments: [
      new ObjectId("64b000000000000000000021"),
      new ObjectId("64b000000000000000000022")
    ],
    description: "Understand HTTP requests, responses and status codes.",
    createdAt: new Date("2026-09-03T10:00:00Z"),
    updatedAt: new Date("2026-09-03T10:00:00Z")
  },

  {
    title: "Responsive Web Design",
    coverImage: {
      url: "https://dummyimage.com/800x450",
      id: "blog-014"
    },
    category: "frontend",
    tags: ["responsive", "css", "design"],
    public: true,
    admin: new ObjectId("6a9f7b469ecaf79f0e4452d6"),
    content: "<p>Responsive design makes websites work across different screen sizes.</p>",
    likes: [
      new ObjectId("64a000000000000000000045"),
      new ObjectId("64a000000000000000000046"),
      new ObjectId("64a000000000000000000047"),
      new ObjectId("64a000000000000000000048")
    ],
    likedByUser: false,
    views: 450,
    comments: [
      new ObjectId("64b000000000000000000023")
    ],
    description: "Learn how to build websites for mobile and desktop screens.",
    createdAt: new Date("2026-09-02T10:00:00Z"),
    updatedAt: new Date("2026-09-02T10:00:00Z")
  },

  {
    title: "Understanding Database Indexes",
    coverImage: {
      url: "https://dummyimage.com/800x450",
      id: "blog-015"
    },
    category: "database",
    tags: ["database", "indexes", "mongodb"],
    public: true,
    admin: new ObjectId("6a9f7b469ecaf79f0e4452d6"),
    content: "<p>Indexes help databases find data faster.</p>",
    likes: [
      new ObjectId("64a000000000000000000049"),
      new ObjectId("64a000000000000000000050"),
      new ObjectId("64a000000000000000000051"),
      new ObjectId("64a000000000000000000052"),
      new ObjectId("64a000000000000000000053")
    ],
    likedByUser: false,
    views: 700,
    comments: [
      new ObjectId("64b000000000000000000024"),
      new ObjectId("64b000000000000000000025"),
      new ObjectId("64b000000000000000000026")
    ],
    description: "Learn how database indexes improve query performance.",
    createdAt: new Date("2026-09-01T10:00:00Z"),
    updatedAt: new Date("2026-09-01T10:00:00Z")
  },

  {
    title: "Clean Code Principles",
    coverImage: {
      url: "https://dummyimage.com/800x450",
      id: "blog-016"
    },
    category: "programming",
    tags: ["clean-code", "programming", "development"],
    public: true,
    admin: new ObjectId("6a9f7b469ecaf79f0e4452d6"),
    content: "<p>Clean code makes software easier to maintain and understand.</p>",
    likes: [
      new ObjectId("64a000000000000000000054"),
      new ObjectId("64a000000000000000000055")
    ],
    likedByUser: false,
    views: 190,
    comments: [
      new ObjectId("64b000000000000000000027")
    ],
    description: "Simple principles for writing maintainable code.",
    createdAt: new Date("2026-08-30T10:00:00Z"),
    updatedAt: new Date("2026-08-30T10:00:00Z")
  },

  {
    title: "What Is Redis",
    coverImage: {
      url: "https://dummyimage.com/800x450",
      id: "blog-017"
    },
    category: "backend",
    tags: ["redis", "cache", "backend"],
    public: true,
    admin: new ObjectId("6a9f7b469ecaf79f0e4452d6"),
    content: "<p>Redis is an in-memory data store commonly used for caching.</p>",
    likes: [
      new ObjectId("64a000000000000000000056"),
      new ObjectId("64a000000000000000000057"),
      new ObjectId("64a000000000000000000058"),
      new ObjectId("64a000000000000000000059"),
      new ObjectId("64a000000000000000000060"),
      new ObjectId("64a000000000000000000061")
    ],
    likedByUser: false,
    views: 800,
    comments: [
      new ObjectId("64b000000000000000000028"),
      new ObjectId("64b000000000000000000029")
    ],
    description: "Understand Redis and how caching improves performance.",
    createdAt: new Date("2026-08-29T10:00:00Z"),
    updatedAt: new Date("2026-08-29T10:00:00Z")
  },

  {
    title: "Introduction to Docker",
    coverImage: {
      url: "https://dummyimage.com/800x450",
      id: "blog-018"
    },
    category: "devops",
    tags: ["docker", "devops", "deployment"],
    public: true,
    admin: new ObjectId("6a9f7b469ecaf79f0e4452d6"),
    content: "<p>Docker packages applications and their dependencies into containers.</p>",
    likes: [
      new ObjectId("64a000000000000000000062"),
      new ObjectId("64a000000000000000000063"),
      new ObjectId("64a000000000000000000064")
    ],
    likedByUser: false,
    views: 380,
    comments: [
      new ObjectId("64b000000000000000000030")
    ],
    description: "Learn Docker fundamentals and containerization.",
    createdAt: new Date("2026-08-28T10:00:00Z"),
    updatedAt: new Date("2026-08-28T10:00:00Z")
  },

  {
    title: "How Authentication Sessions Work",
    coverImage: {
      url: "https://dummyimage.com/800x450",
      id: "blog-019"
    },
    category: "security",
    tags: ["authentication", "sessions", "security"],
    public: true,
    admin: new ObjectId("6a9f7b469ecaf79f0e4452d6"),
    content: "<p>Sessions allow servers to maintain authentication state for users.</p>",
    likes: [
      new ObjectId("64a000000000000000000065"),
      new ObjectId("64a000000000000000000066"),
      new ObjectId("64a000000000000000000067"),
      new ObjectId("64a000000000000000000068")
    ],
    likedByUser: false,
    views: 520,
    comments: [
      new ObjectId("64b000000000000000000031"),
      new ObjectId("64b000000000000000000032"),
      new ObjectId("64b000000000000000000033")
    ],
    description: "Understand sessions and session-based authentication.",
    createdAt: new Date("2026-08-27T10:00:00Z"),
    updatedAt: new Date("2026-08-27T10:00:00Z")
  },

  {
    title: "Building a Blog With MERN",
    coverImage: {
      url: "https://dummyimage.com/800x450",
      id: "blog-020"
    },
    category: "technology",
    tags: ["mern", "react", "nodejs", "mongodb"],
    public: true,
    admin: new ObjectId("6a9f7b469ecaf79f0e4452d6"),
    content: "<p>The MERN stack combines MongoDB, Express, React and Node.js.</p>",
    likes: [
      new ObjectId("64a000000000000000000069"),
      new ObjectId("64a000000000000000000070"),
      new ObjectId("64a000000000000000000071"),
      new ObjectId("64a000000000000000000072"),
      new ObjectId("64a000000000000000000073"),
      new ObjectId("64a000000000000000000074"),
      new ObjectId("64a000000000000000000075"),
      new ObjectId("64a000000000000000000076"),
      new ObjectId("64a000000000000000000077"),
      new ObjectId("64a000000000000000000078")
    ],
    likedByUser: false,
    views: 1500,
    comments: [
      new ObjectId("64b000000000000000000034"),
      new ObjectId("64b000000000000000000035"),
      new ObjectId("64b000000000000000000036"),
      new ObjectId("64b000000000000000000037"),
      new ObjectId("64b000000000000000000038")
    ],
    description: "A practical overview of building a complete MERN blog application.",
    createdAt: new Date("2026-08-26T10:00:00Z"),
    updatedAt: new Date("2026-08-26T10:00:00Z")
  }
];

  
async function seedBlogs() {
  try {
    // Find an existing user to use as admin
    await connectDb();
    const admin = await User.findOne();

    if (!admin) {
      console.log("No user found in database.");
      return;
    }

    const blogsWithAdmin = blogs.map((blog) => ({
      ...blog,
      admin: admin._id,
    }));

    await Blog.insertMany(blogsWithAdmin);

    console.log("20 blogs inserted successfully.");
  } catch (error) {
    console.error("Error while seeding blogs:", error);
  }
}

seedBlogs();