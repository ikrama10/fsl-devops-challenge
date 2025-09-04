# FSL DevOps Challenge - CI Pipeline Setup

This document describes the Continuous Integration (CI) pipeline setup for the rdicidr React application.

## CI Pipeline Overview

The CI pipeline is implemented using GitHub Actions and runs automatically on every pull request to the main/master branch. The pipeline ensures code quality and build integrity before merging.

## Pipeline Steps

The CI pipeline includes the following steps in order:

1. **Checkout Code**: Clones the repository
2. **Setup Node.js**: Installs Node.js 15.5.1 (as specified in .nvmrc)
3. **Install Dependencies**: Runs `npm ci` for clean dependency installation
4. **ESLint Check**: Runs `npm run lint` to check code quality
5. **Prettier Check**: Runs `npm run prettier` to verify code formatting
6. **Tests**: Runs `CI=true npm run test` with coverage reporting
7. **Build**: Runs `npm run build` to create production build
8. **Upload Artifacts**: Saves build artifacts for later use

## Configuration Files

### GitHub Actions Workflow
- **Location**: `.github/workflows/ci.yml`
- **Triggers**: Pull requests to main/master branch
- **Environment**: Ubuntu latest with Node.js 15.5.1

### ESLint Configuration
- **Location**: `.eslintrc.js`
- **Extends**: React app and Jest configurations
- **Additional Rules**: 
  - Warns on console.log usage
  - Warns on unused variables
  - Enforces const over let/var

### Prettier Configuration
- **Location**: `.prettierrc`
- **Settings**: 
  - Single quotes
  - 2-space indentation
  - 80 character line width
  - Semicolons enabled
  - Trailing commas in ES5 mode

## Available Scripts

```bash
# Development
npm start          # Start development server
npm run build      # Create production build
npm test           # Run tests in watch mode
npm run test:ci    # Run tests in CI mode

# Code Quality
npm run lint       # Run ESLint
npm run prettier   # Check code formatting
npm run prettier:write  # Fix code formatting
```

## Pull Request Requirements

For a pull request to be merged:

1. **All CI checks must pass** ✅
2. **Code review approval required** 👥
3. **No merge conflicts** 🔄

## Sample Pull Request Scenarios

### ✅ Successful PR Example
**Title**: "Add new IPv4 validation feature"

**CI Pipeline Results**:
- ✅ Install dependencies: PASSED
- ✅ ESLint: PASSED (0 errors, 0 warnings)
- ✅ Prettier: PASSED (all files properly formatted)
- ✅ Tests: PASSED (15 tests, 100% coverage)
- ✅ Build: PASSED (build created successfully)

**Result**: PR can be merged ✅

### ❌ Failed PR Examples

#### Example 1: ESLint Errors
**Title**: "Fix subnet calculation bug"

**CI Pipeline Results**:
- ✅ Install dependencies: PASSED
- ❌ ESLint: FAILED
  ```
  src/SubnetNumbersInput.js:15:5  error  'unusedVariable' is defined but never used
  src/SubnetNumbersInput.js:23:1  error  Unexpected console statement
  ```
- ⏭️ Prettier: SKIPPED (due to lint failure)
- ⏭️ Tests: SKIPPED
- ⏭️ Build: SKIPPED

**Result**: PR blocked until linting issues are fixed ❌

#### Example 2: Prettier Formatting Issues
**Title**: "Update UI components"

**CI Pipeline Results**:
- ✅ Install dependencies: PASSED
- ✅ ESLint: PASSED
- ❌ Prettier: FAILED
  ```
  src/App.js
  Code style issues found in the above file(s). Forgot to run Prettier?
  ```
- ⏭️ Tests: SKIPPED
- ⏭️ Build: SKIPPED

**Result**: PR blocked until formatting is fixed ❌

#### Example 3: Test Failures
**Title**: "Add new test cases"

**CI Pipeline Results**:
- ✅ Install dependencies: PASSED
- ✅ ESLint: PASSED
- ✅ Prettier: PASSED
- ❌ Tests: FAILED
  ```
  FAIL src/tests/ipv4.test.js
  ● IPv4 address validation
    expect(received).toBe(expected)
    Expected: true
    Received: false
  ```
- ⏭️ Build: SKIPPED

**Result**: PR blocked until tests pass ❌

#### Example 4: Build Failure
**Title**: "Update dependencies"

**CI Pipeline Results**:
- ✅ Install dependencies: PASSED
- ✅ ESLint: PASSED
- ✅ Prettier: PASSED
- ✅ Tests: PASSED
- ❌ Build: FAILED
  ```
  Failed to compile.
  ./src/App.js
  SyntaxError: Unexpected token (15:10)
  ```

**Result**: PR blocked until build issues are resolved ❌

## Local Development Setup

To run the same checks locally before creating a PR:

```bash
# Install dependencies
npm ci

# Run all checks
npm run lint
npm run prettier
npm run test -- --watchAll=false --coverage
npm run build
```

## Troubleshooting

### Common Issues

1. **ESLint Errors**: Run `npm run lint` locally to see issues
2. **Prettier Issues**: Run `npm run prettier:write` to auto-fix formatting
3. **Test Failures**: Check test output and fix failing assertions
4. **Build Errors**: Look for syntax errors or missing imports

### Node.js Version
Ensure you're using Node.js 15.5.1 as specified in `.nvmrc`:
```bash
nvm use 15.5.1
```

## Next Steps

After the CI pipeline is successfully implemented and tested:

1. Set up branch protection rules in GitHub
2. Configure required status checks
3. Set up automated deployment pipeline (Part 2)
4. Implement Kubernetes deployment (Part 3)
