# Analytical Path

Systematic approaches for investigation, problem-solving, and data analysis using AI.

---

## Core Techniques

### 1. Problem Decomposition
Break complex problems into manageable parts.

**Prompt pattern:**
```
"I need to solve [complex problem]. Help me:
1. Identify the key sub-problems
2. Determine dependencies between them
3. Suggest an order of attack
4. Highlight potential pitfalls"
```

### 2. Root Cause Analysis
Investigate why something happened.

**Prompt pattern:**
```
"[Problem description]

Help me find the root cause:
- What are possible explanations?
- Which is most likely given [context]?
- How can we test each hypothesis?
- What evidence would confirm/refute each?"
```

### 3. Data Analysis
Extract insights from data.

**Workflow:**
```
1. Provide data summary (not raw data if large)
2. Ask for analysis approach
3. AI generates code for analysis
4. Execute code in sandbox
5. AI interprets results
6. Verify conclusions
```

### 4. Systematic Reasoning
Step-by-step logical analysis.

**Prompt pattern:**
```
"Let's think through this systematically:

Given:
- [Fact 1]
- [Fact 2]

Question: [What we want to know]

Please:
1. List what we know
2. List what we need to find out
3. Show logical steps from known → unknown
4. State assumptions explicitly
5. Check for errors in reasoning"
```

---

## Best Practices

**DO:**
- ✅ Request step-by-step reasoning
- ✅ Verify calculations with code
- ✅ Check logical validity
- ✅ Test assumptions
- ✅ Use multiple approaches

**DON'T:**
- ❌ Trust arithmetic without verification
- ❌ Skip validation steps
- ❌ Ignore stated assumptions
- ❌ Accept correlation as causation

---

## Example Workflows

### Debugging Complex Code
```
1. Describe symptoms clearly
2. Share relevant code sections
3. Ask AI to hypothesize causes
4. Test each hypothesis systematically
5. Verify the fix
```

### Market Analysis
```
1. Provide market data summary
2. Request trend identification
3. AI generates analytical code
4. Execute and visualize
5. Interpret results critically
```

### Scientific Literature Analysis
```
1. Summarize key papers
2. Ask AI to identify patterns/contradictions
3. Request synthesis
4. Verify citations
5. Form evidence-based conclusions
```

---

*See also: [Reasoning](../rows/reasoning.md), [Research Path](research.md)*
