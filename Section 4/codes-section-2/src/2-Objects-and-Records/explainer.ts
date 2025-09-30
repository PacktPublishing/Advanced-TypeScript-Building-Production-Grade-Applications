interface IDInt {
  id: string;
}

interface CreateAtInt {
  postedAt: Date;
}

interface Articl extends IDInt, CreateAtInt {
  headline: string;
  content: string;
}

interface Feedback extends IDInt, CreateAtInt {
  username: string;
  comment: string;
}

interface BookDetails {
  isbn: string;
  title: string;
  author: string;
}

interface BookInventory {
  isbn: number;
  availableCopies: number;
}

interface Book extends BookDetails, BookInventory {}

const book: Book = {
  isbn: "9783161484100",
  title: "Advanced TypeScript",
  author: "Advanced Tutorials",
  availableCopies: 10,
};
