type Book = {
  title: string;
  author: string;
  price: number;
};

//const books = new Map<number, Book>();
const books: Map<number, Book> = new Map();

books.set(1, { title: "book #1", author: "superman", price: 99.99 });

books.set(2, { title: 123, author: true, price: "200" });

books.set(3, "taaa daaaa!");
