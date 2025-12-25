# Prompt Templates

Reusable prompt structures for common tasks.

---

## Analytical Tasks

### Root Cause Analysis
```
I'm investigating [problem description].

Observed symptoms:
- [Symptom 1]
- [Symptom 2]

Please help me:
1. List possible root causes
2. Rank by likelihood given [context]
3. Suggest tests to confirm/rule out each cause
4. Recommend next diagnostic steps
```

### Data Analysis
```
I have data showing: [summary of data]

Please:
1. Identify interesting patterns
2. Suggest hypotheses to explain patterns
3. Recommend statistical tests
4. Generate Python code for analysis
5. Flag potential confounding factors
```

---

## Creative Tasks

### Brainstorming
```
I need ideas for [goal/project].

Context:
- Target audience: [audience]
- Constraints: [constraints]
- Success criteria: [criteria]

Generate 15 ideas across different approaches:
- 5 safe/proven ideas
- 5 creative variations
- 5 bold/experimental ideas
```

### Content Drafting
```
Write [content type] about [topic].

Requirements:
- Length: [X words]
- Tone: [professional/casual/etc]
- Audience: [description]
- Key points to include: [list]
- Call to action: [CTA]

Style reference: [paste example if available]
```

---

## Automation Tasks

### Code Generation with Tests
```
Generate [programming language] code for:

Functionality: [description]
Inputs: [specify]
Outputs: [specify]
Edge cases to handle: [list]

Please provide:
1. Implementation code
2. Unit tests
3. Usage example
4. Error handling
```

### Workflow Design
```
I want to automate: [task description]

Current manual process:
[List steps]

Please:
1. Identify automatable parts
2. Suggest tools/APIs
3. Design workflow
4. Outline implementation
5. Flag potential issues
```

---

## Research Tasks

### Concept Explanation
```
Explain [concept] to me with increasing depth:

Level 1 (ELI5): [Simple explanation]
Level 2 (Practical): [How it's used]
Level 3 (Technical): [How it works]
Level 4 (Advanced): [Edge cases, limitations, alternatives]

Include:
- Key examples
- Common misconceptions
- Further reading suggestions
```

### Comparative Analysis
```
Compare [Option A] vs [Option B] for [use case]:

| Dimension | Option A | Option B |
|-----------|----------|----------|
| Core approach | | |
| Pros | | |
| Cons | | |
| Best for | | |
| Cost | | |
| Learning curve | | |
| Ecosystem | | |

Recommendation for [specific context]: ?
```

---

## Meta-Prompts

### Self-Verification
```
[After receiving AI response:]

"Please review your response for:
1. Factual errors
2. Logical inconsistencies
3. Unstated assumptions
4. Alternative perspectives
5. Confidence level on each major claim"
```

### Iterative Refinement
```
[After initial draft:]

"Improve this by:
1. Adding concrete examples
2. Removing jargon (or explain it)
3. Shortening by 20%
4. Making the intro more engaging
5. Adding a clear takeaway"
```

---

## Chain-of-Thought Templates

### Problem Solving
```
Let's solve this step-by-step:

Step 1: What do we know? [List given information]
Step 2: What do we need to find? [Define goal]
Step 3: What's our approach? [Outline strategy]
Step 4: Execute [Work through solution]
Step 5: Verify [Check answer makes sense]
```

### Debugging
```
I'm getting [error/unexpected behavior].

Let's debug systematically:
1. Reproduce: [Exact steps to trigger issue]
2. Expected: [What should happen]
3. Actual: [What actually happens]
4. Hypotheses: [Possible causes]
5. Tests: [How to verify each hypothesis]
6. Solution: [Fix + verification]
```

---

## Advanced Patterns

### Multi-Perspective Analysis
```
Analyze [situation] from multiple angles:

Perspective 1 (Technical): [Technical analysis]
Perspective 2 (Business): [Business implications]
Perspective 3 (User): [User impact]
Perspective 4 (Risk): [What could go wrong]

Synthesis: [Balanced recommendation]
```

### Constraint-Based Generation
```
Generate [content] with these constraints:

Required:
- Must include: [elements]
- Must avoid: [elements]
- Word limit: [number]

Style:
- Tone: [specification]
- Format: [specification]
- Audience: [specification]

Success criteria: [how to judge quality]
```

---

## Tips for Using Templates

1. **Customize**: Adapt templates to your specific needs
2. **Iterate**: Refine based on results
3. **Combine**: Mix templates for complex tasks
4. **Verify**: Always validate AI outputs
5. **Share**: Contribute successful templates back

---

*See also: [Example Workflows](../workflows/)*
