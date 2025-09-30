type SubscriptionPlan = "free" | "premium";
type UserRole = "user" | "admin";

// Decide if a user should be allowed to modify content:
type CanModify<P extends SubscriptionPlan, R extends UserRole> = [
  P,
  R
] extends ["premium", "admin"]
  ? true
  : false;

type BasicNote = {
  content: string;
};

type EditableNote = {
  content: string;
  updateContent: (newContent: string) => void;
};

type User = {
  plan: SubscriptionPlan;
  role: UserRole;
  // ... other properties
};

declare function fetchNote<U extends User>(
  user: U
): CanModify<U["plan"], U["role"]> extends true ? EditableNote : BasicNote;

function isAdmin(user: User): user is User & { role: "admin" } {
  return user.role === "admin";
}

function isPremium(user: User): user is User & { plan: "premium" } {
  return user.plan === "premium";
}

const currentUser: User = /* get user from database */ {
  plan: "premium",
  role: "admin",
};

if (isAdmin(currentUser) && isPremium(currentUser)) {
  // currentUser is now narrowed to a premium admin.
  const note = fetchNote(currentUser);
  // TypeScript infers note as EditableNote, so you can safely call updateContent.
  note.updateContent("Updated note content!");
} else {
  const note = fetchNote(currentUser);
  // Here, note is inferred as BasicNote.
  console.log(note.content);
}
