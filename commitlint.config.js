// commitlint.config.cjs 로 이름을 바꾸거나 내용을 아래처럼 수정
module.exports = {
  extends: ["@commitlint/config-conventional"],
  rules: {
    "type-enum": [
      2,
      "always",
      [
        "feat",
        "fix",
        "docs",
        "style",
        "refactor",
        "test",
        "chore",
        "revert",
        "perf",
      ],
    ],
  },
};
