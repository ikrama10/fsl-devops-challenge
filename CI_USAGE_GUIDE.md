# 🚀 CI Pipeline Usage Guide

## ✅ **What You Can Do Now**

Your CI pipeline is fully set up and working! Here's what you can do:

## 📋 **1. Create Sample Pull Requests**

### **Step 1: Set up a Git Repository**
```bash
# Initialize git repository
git init
git add .
git commit -m "Initial commit with CI pipeline setup"

# Create a GitHub repository and push
git remote add origin https://github.com/yourusername/rdicidr.git
git push -u origin main
```

### **Step 2: Create Feature Branches**
```bash
# Create a feature branch
git checkout -b feature/new-ipv4-validation

# Make changes to your code
# ... edit files ...

# Commit your changes
git add .
git commit -m "Add new IPv4 validation feature"

# Push to GitHub
git push origin feature/new-ipv4-validation
```

### **Step 3: Create Pull Request**
1. Go to your GitHub repository
2. Click "Compare & pull request" for your feature branch
3. Fill out the PR template that appears
4. Submit the PR

## 🔄 **2. CI Pipeline Will Automatically Run**

When you create or update a PR, the CI pipeline will:

1. **Install Dependencies** ✅
2. **Run ESLint** ✅ (Code quality check)
3. **Run Prettier** ✅ (Code formatting check)
4. **Run Tests** ✅ (Unit tests with coverage)
5. **Build Application** ✅ (Production build)

## 📊 **3. Sample PR Scenarios to Test**

### **✅ Successful PR Example**
**Create a PR with clean code:**
```bash
# Make a simple, clean change
echo "// This is a clean comment" >> src/App.js
git add .
git commit -m "Add clean documentation"
git push origin feature/clean-docs
```

**Expected Result:**
- ✅ All CI checks pass
- ✅ PR can be merged
- ✅ Build artifacts uploaded

### **❌ Failed PR Examples**

#### **Example 1: ESLint Errors**
```bash
# Add code with linting issues
echo "var unusedVariable = 'test';" >> src/App.js
echo "console.log('debug info');" >> src/App.js
git add .
git commit -m "Add debug code"
git push origin feature/debug-code
```

**Expected Result:**
- ❌ ESLint fails
- ⏭️ Other steps skipped
- 🔒 PR blocked from merging

#### **Example 2: Prettier Formatting Issues**
```bash
# Add poorly formatted code
echo "function test(){return 'bad formatting'}" >> src/App.js
git add .
git commit -m "Add function"
git push origin feature/bad-formatting
```

**Expected Result:**
- ❌ Prettier fails
- ⏭️ Other steps skipped
- 🔒 PR blocked from merging

#### **Example 3: Test Failures**
```bash
# Break a test
echo "expect(1 + 1).toBe(3);" >> src/tests/ipv4.test.js
git add .
git commit -m "Update test"
git push origin feature/broken-test
```

**Expected Result:**
- ❌ Tests fail
- ⏭️ Build step skipped
- 🔒 PR blocked from merging

## 🛠️ **4. Local Development Workflow**

### **Before Creating a PR, Run Locally:**
```bash
# Install dependencies
npm ci

# Run all CI checks locally
npm run lint
npm run prettier
npm test -- --watchAll=false --coverage
npm run build
```

### **Fix Issues Locally:**
```bash
# Fix ESLint issues automatically
npm run lint -- --fix

# Fix Prettier formatting
npm run prettier:write

# Run tests in watch mode during development
npm test
```

## 🔒 **5. Set Up Branch Protection**

In your GitHub repository:

1. **Settings** → **Branches**
2. **Add rule** for `main` branch
3. **Enable**:
   - ✅ Require pull request reviews
   - ✅ Require status checks to pass
   - ✅ Require branches to be up to date
   - ✅ Require conversation resolution

## 📈 **6. Monitor CI Performance**

### **Check CI Status:**
- Go to **Actions** tab in GitHub
- View workflow runs
- Check build times and success rates

### **Review Test Coverage:**
- Tests show coverage percentage
- Identify untested code areas
- Improve test coverage over time

## 🎯 **7. Next Steps for DevOps Challenge**

### **Part 2: Continuous Deployment (CD)**
- Set up automated deployment to staging
- Configure production deployment pipeline
- Implement deployment strategies (blue-green, canary)

### **Part 3: Kubernetes Deployment**
- Create Kubernetes manifests
- Set up container registry
- Deploy to Kubernetes cluster

## 📝 **8. Best Practices**

### **Commit Messages:**
```bash
# Good commit messages
git commit -m "feat: add IPv4 validation function"
git commit -m "fix: resolve subnet calculation bug"
git commit -m "docs: update README with usage examples"
```

### **Branch Naming:**
```bash
# Good branch names
feature/user-authentication
bugfix/login-validation
hotfix/security-patch
```

### **PR Descriptions:**
- Use the provided PR template
- Describe what changes were made
- Include screenshots if UI changes
- Reference related issues

## 🚨 **9. Troubleshooting**

### **Common Issues:**

1. **Node.js Version Issues:**
   ```bash
   # Use the correct Node.js version
   nvm use 15.5.1
   ```

2. **Build Failures:**
   ```bash
   # Check for syntax errors
   npm run lint
   npm run build
   ```

3. **Test Failures:**
   ```bash
   # Run tests locally
   npm test
   # Check test output for specific failures
   ```

4. **Formatting Issues:**
   ```bash
   # Auto-fix formatting
   npm run prettier:write
   ```

## 🎉 **10. Success Metrics**

Your CI pipeline is successful when:

- ✅ **All PRs go through CI checks**
- ✅ **No broken code reaches main branch**
- ✅ **Test coverage improves over time**
- ✅ **Build times remain reasonable**
- ✅ **Developer feedback is fast and clear**

## 📞 **11. Getting Help**

If you encounter issues:

1. **Check CI logs** in GitHub Actions
2. **Run checks locally** to reproduce issues
3. **Review error messages** carefully
4. **Check documentation** in `CI_README.md`
5. **Update dependencies** if needed

---

## 🎯 **Ready to Start!**

Your CI pipeline is now ready for:
- ✅ **Automated code quality checks**
- ✅ **Consistent code formatting**
- ✅ **Reliable testing**
- ✅ **Production-ready builds**
- ✅ **Team collaboration**

**Start creating pull requests and watch your CI pipeline in action!** 🚀
