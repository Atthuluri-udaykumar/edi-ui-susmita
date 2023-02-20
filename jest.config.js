module.exports = {
    preset: "ts-jest",
    transform: {
        "^.+\\.[tj]s$": "ts-jest"
    },
    testRegex: "(/__tests__/.*| (\\.| /)(test|spec))\\.(jsx?|tsx?)$",
    moduleFileExtensions: ["ts", "tsx", "js", "jsx", "json", "node"],
    modulePaths: ['<rootDir>'],
    moduleDirectories: ['node_modules'],
    collectCoverage: true,
    collectCoverageFrom: [
        "src/**/*.ts",
        "!src/models/**",
        "!src/**/**.config.ts",
        "!src/app.ts",
        "!src/app-server.ts"
      ],
    coverageReporters: [
        "text",
        "cobertura"
      ],
    verbose: true,
    testEnvironment: "node"
};