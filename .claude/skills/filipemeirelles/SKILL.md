# filipemeirelles Development Patterns

> Auto-generated skill from repository analysis

## Overview

This skill teaches the development patterns and workflows used in filipemeirelles' JavaScript projects. The codebase follows a personal project structure with mixed conventions and focuses on regular documentation updates and profile maintenance. The repository demonstrates a long-term personal development approach with consistent but infrequent updates over a 6-year period.

## Coding Conventions

### File Naming
- **Convention:** camelCase
- **Examples:**
  ```
  userProfile.js
  projectHelpers.js
  dataUtils.js
  ```

### Import/Export Patterns
- **Style:** Mixed (CommonJS and ES6 modules)
- **Import examples:**
  ```javascript
  // CommonJS style
  const utils = require('./utils');
  
  // ES6 style
  import { helper } from './helpers';
  import React from 'react';
  ```
- **Export examples:**
  ```javascript
  // CommonJS
  module.exports = { function1, function2 };
  
  // ES6
  export default MyComponent;
  export { utility, helper };
  ```

### Commit Style
- **Format:** Freeform messages
- **Length:** ~25 characters average
- **Examples:**
  ```
  Update README
  Fix profile info
  Add new project
  ```

## Workflows

### readme-updates
**Trigger:** When someone wants to update personal profile or project information
**Command:** `/update-readme`

1. Open the README.md file in the root directory
2. Modify relevant sections such as:
   - Personal information updates
   - Skills and technologies
   - Project descriptions
   - Contact information
3. Review changes for accuracy and completeness
4. Commit with a descriptive update message
5. Push changes to update the public profile

**Example changes:**
```markdown
## Skills
- JavaScript ✓
- React ✓
- Node.js ✓ (newly added)

## Recent Projects
- [Project Name](link) - Brief description
```

## Testing Patterns

### Test Structure
- **File pattern:** `*.test.*`
- **Framework:** Unknown/Varied
- **Naming convention:** Follows camelCase pattern
- **Example test files:**
  ```
  userProfile.test.js
  helpers.test.js
  components.test.js
  ```

### Test Organization
```javascript
// Typical test structure (framework-agnostic)
describe('Component/Function Name', () => {
  test('should perform expected behavior', () => {
    // Test implementation
  });
});
```

## Commands

| Command | Purpose |
|---------|---------|
| `/update-readme` | Update personal profile information, skills, and project documentation |
| `/commit-update` | Create a freeform commit message for profile updates |
| `/review-profile` | Review current README.md content for accuracy and completeness |