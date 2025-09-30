const values = {
  Int: 23,
  String: "A String.",
  Boolean: false,
  obj: {
    key: "a string",
  },
};

type Values = typeof values;

type IntType = Values["Int"];
type StringType = Values["String"];
type BooleanType = Values["Boolean"];
type ObjectFirstType = Values["obj"]["key"];
