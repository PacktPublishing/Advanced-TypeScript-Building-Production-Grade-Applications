const languages = ["java", "c", "go"] as const;

type JavaOrGo = (typeof languages)[0 | 1];
type Languages = (typeof languages)[number];
