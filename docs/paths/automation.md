# Automation Path

Building workflows, scripts, integrations, and automated systems with AI assistance.

---

## Core Techniques

### 1. Workflow Design
Map out automation before building.

**Prompt pattern:**
```
"I want to automate [task].

Current manual process:
1. [Step 1]
2. [Step 2]
...

Help me:
- Identify automatable steps
- Suggest tools/APIs needed
- Design error handling
- Plan testing strategy"
```

### 2. Code Generation with Testing
Generate code with built-in validation.

**Workflow:**
```
1. Describe requirements clearly
2. AI generates code
3. AI generates tests
4. Run tests locally
5. Fix failures
6. Deploy with monitoring
```

### 3. Tool Integration
Connect multiple services.

**Prompt pattern:**
```
"I need to integrate:
- Input: [Source A]
- Process: [Transformation]
- Output: [Destination B]

Please:
1. Suggest architecture
2. Write integration code
3. Include error handling
4. Add logging
5. Handle rate limits"
```

### 4. Progressive Automation
Start simple, build up.

**Approach:**
```
Phase 1: Manual with AI assistance
Phase 2: Semi-automated (human approval)
Phase 3: Fully automated (monitoring)
Phase 4: Self-healing (advanced)
```

---

## Best Practices

**DO:**
- ✅ Test thoroughly before deploying
- ✅ Handle errors gracefully
- ✅ Log everything
- ✅ Start simple, iterate
- ✅ Monitor in production
- ✅ Plan rollback procedures

**DON'T:**
- ❌ Deploy untested code
- ❌ Skip error handling
- ❌ Ignore security
- ❌ Forget rate limiting
- ❌ Over-engineer initially

---

## Example Workflows

### Data Pipeline
```
1. Define input sources
2. AI generates extraction code
3. AI generates transformation logic
4. AI generates validation tests
5. Test on sample data
6. Deploy with monitoring
7. Set up alerts
```

### API Integration
```
1. Provide API documentation
2. AI generates client code
3. AI adds retry logic
4. AI writes tests
5. Verify with mock API
6. Test with real API
7. Deploy
```

### Report Automation
```
1. Define report requirements
2. AI generates data query
3. AI generates visualization code
4. AI creates formatting logic
5. Test with historical data
6. Schedule execution
7. Monitor for failures
```

### CI/CD Pipeline
```
1. Define deployment steps
2. AI generates pipeline config
3. AI adds test stages
4. AI includes rollback logic
5. Test in staging
6. Deploy to production
```

---

## Security Considerations

```
✅ Validate all inputs
✅ Use environment variables for secrets
✅ Implement least privilege
✅ Audit AI-generated code for vulnerabilities
✅ Use sandboxes for untrusted execution
✅ Rate limit and monitor
```

---

*See also: [Tool Use](../rows/tool-use.md), [Analytical Path](analytical.md)*
