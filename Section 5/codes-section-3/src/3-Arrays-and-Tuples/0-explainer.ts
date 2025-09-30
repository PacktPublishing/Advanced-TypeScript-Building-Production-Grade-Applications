function logMessages(messages: readonly string[]) {
  for (const message of messages) {
    console.log(message);
  }

  messages.push("new message...");
  messages[1] = "Bla bla bla";
}

type NameParts = readonly [string, string, string];
const myName: NameParts = ["John", "", "Doe"];

const unsafeFunction = (nameParts: string[]) => {
  nameParts.pop();
  nameParts.pop();
  nameParts.pop();
};

unsafeFunction(myName);

type MyTuple = [1, 2, 3, 4];

type MyTupleLength = MyTuple["length"];

type NextIndex<T extends unknown[]> = [...T, unknown]["length"];

type test = NextIndex<MyTuple>;
