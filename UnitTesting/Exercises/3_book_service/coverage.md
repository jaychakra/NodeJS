### collectCoverage: 
This configuration tells Jest whether to collect code coverage information when running tests.

### coverageThreshold
- This option allows you to enforce a minimum threshold of code coverage. It sets the minimum percentage of coverage required for each metric (e.g., statements, branches, functions, and lines).
- You can configure coverage thresholds per file or globally. If your code coverage falls below these thresholds, Jest will fail the test run, signaling that you need to improve test coverage.
```{
  "coverageThreshold": {
    "global": {
      "branches": 80,
      "functions": 85,
      "lines": 90,
      "statements": 95
    },
    "src/components/button.js": {
      "branches": 100,
      "lines": 100
    }
  }
}
```
```
function processNumbers(a, b) {
  let result = a + b; 
  if (result > 10) { 
    result = result * 2; return result; 
  } else {  
    result = (a * b) + 
    (a - b);
  }
  return result; 
}
```

### coverageReporters
- This configuration defines the type of reports Jest will generate for code coverage.
- Jest supports different types of coverage reporters, such as text, lcov, json, html, and more. You can specify one or more reporters, and Jest will generate the corresponding coverage reports.

* The config can be stored in a standalone jest.config.js file or can also be stored in package.json




