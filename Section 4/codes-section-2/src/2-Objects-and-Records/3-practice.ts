type BlogPost = {
  id: string;
  title: string;
  content: string;
  author: string;
  publishedAt: string;
};

export const updatePost = (id: number, postInfo: Omit<BlogPost, "id">) => {
  // Some logic for updating the post...
};

// Can update individual properties
updatePost(1, {
  title: "Bla Bla Bla!",
});

// Can update more than one property
updatePost(1, {
  title: "Bla!",
  author: "Someone",
});
