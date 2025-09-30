export type Action =
  | {
      method: "GET";
      description: "Fetch users.";
    }
  | {
      method: "POST";
      description: "Add a user.";
    }
  | {
      method: "DELETE";
      description: "Delete a user.";
    };

type AllActionsButDelete = Exclude<Action, { method: "DELETE" }>;
