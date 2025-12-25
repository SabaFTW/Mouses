# Reasoning

Understanding AI's capabilities and limitations in logical inference, problem-solving, and planning.

---

## What AI Reasoning Is (And Isn't)

**What AI can do:**
- Follow logical patterns seen in training data
- Decompose problems into steps
- Apply heuristics and algorithms
- Generate reasoning-like text

**What AI cannot do:**
- True causal reasoning (understanding "why")
- Novel reasoning outside training patterns
- Guarantee logical correctness
- Understand reasoning like humans do

**Key insight:** AI "reasoning" is sophisticated pattern matching, not human-like understanding.

---

## Reasoning Capabilities

### 1. Deductive Reasoning
**What it is:**
Drawing specific conclusions from general principles.

**Example:**
```
Premise 1: All mammals are warm-blooded
Premise 2: A whale is a mammal
Conclusion: A whale is warm-blooded
```

**AI strengths:**
- Following clear logical rules
- Standard syllogisms
- Formal logic patterns

**AI limitations:**
- May fail on complex multi-step proofs
- Can make logical errors confidently
- Struggles with novel logical structures

**Best for:**
- Simple logical inference
- Pattern-based deduction
- Well-structured problems

---

### 2. Inductive Reasoning
**What it is:**
Drawing general conclusions from specific observations.

**Example:**
```
Observation 1: The sun rose yesterday
Observation 2: The sun rose today
Observation 3: The sun rose every day I've been alive
Conclusion: The sun will rise tomorrow
```

**AI strengths:**
- Identifying patterns in data
- Generalizing from examples
- Finding correlations

**AI limitations:**
- Correlation ≠ causation
- May overgeneralize
- Biased by training data patterns

**Best for:**
- Pattern identification
- Trend analysis
- Hypothesis generation

---

### 3. Abductive Reasoning
**What it is:**
Inference to the best explanation.

**Example:**
```
Observation: The grass is wet
Possible explanations: It rained, sprinklers ran, dew formed
Best explanation (given context): It rained
```

**AI strengths:**
- Generating plausible explanations
- Considering multiple hypotheses
- Contextual inference

**AI limitations:**
- May miss non-obvious explanations
- Biased toward common scenarios
- Cannot verify hypotheses empirically

**Best for:**
- Diagnostic tasks
- Root cause analysis
- Hypothesis generation

---

### 4. Analogical Reasoning
**What it is:**
Transferring knowledge from one domain to another based on similarity.

**Example:**
```
Problem: Atom structure
Analogy: Like solar system (nucleus = sun, electrons = planets)
Transfer: Understanding orbital patterns
```

**AI strengths:**
- Identifying structural similarities
- Cross-domain pattern matching
- Generating creative analogies

**AI limitations:**
- May draw inappropriate analogies
- Cannot validate analogy applicability
- Misses important disanalogies

**Best for:**
- Explanatory analogies
- Creative problem-solving
- Teaching and communication

---

## Advanced Reasoning Techniques

### Chain-of-Thought (CoT)
**What it is:**
Explicitly showing reasoning steps before answering.

**How to use:**
```
Prompt: "Think step-by-step:
1. What information do we have?
2. What do we need to find?
3. What steps will get us there?
4. Execute each step
5. Verify the answer"
```

**Benefits:**
- Improves accuracy on complex problems
- Makes reasoning visible for debugging
- Reduces certain types of errors

**Limitations:**
- Adds latency and cost (more tokens)
- Steps may still contain errors
- Not guaranteed to improve all tasks

**Best for:**
- Math problems
- Multi-step logic
- Complex analysis

---

### Tree-of-Thought
**What it is:**
Exploring multiple reasoning paths and selecting the best.

**How it works:**
```
1. Generate multiple potential next steps
2. Evaluate each path
3. Pursue most promising
4. Backtrack if path fails
5. Continue until solution found
```

**Benefits:**
- Better for complex problem-solving
- More robust than single-path reasoning
- Can recover from wrong turns

**Limitations:**
- Expensive (multiple inference calls)
- Slower
- Requires orchestration

**Best for:**
- Creative problem-solving
- Strategy games
- Complex planning

---

### Self-Consistency
**What it is:**
Generate multiple reasoning paths and take majority vote.

**How it works:**
```
1. Ask same question multiple times
2. AI generates different reasoning paths
3. Compare final answers
4. Select most common answer
```

**Benefits:**
- Improves accuracy
- Reduces impact of random errors
- Provides confidence estimate

**Limitations:**
- 3-5x cost increase
- Slower
- Majority may still be wrong

**Best for:**
- High-stakes decisions
- Factual questions with clear answers
- When accuracy > cost

---

## Mathematical Reasoning

### Arithmetic
**Capabilities:**
- Basic operations (if showing work)
- Simple calculations

**Limitations:**
- Direct calculation often wrong
- Floating point errors
- Large number issues

**Solution:**
```
❌ AI calculates directly
✅ AI generates code, executes in sandbox
```

### Algebra
**Capabilities:**
- Symbolic manipulation
- Equation solving (simple cases)
- Step-by-step solutions

**Limitations:**
- May make algebraic errors
- Struggles with complex systems
- Verification needed

### Proof Writing
**Capabilities:**
- Following proof templates
- Standard proof techniques
- Explaining proof steps

**Limitations:**
- May generate invalid proofs
- Cannot verify correctness reliably
- Novel proofs are challenging

**Best practice:** Always verify mathematical reasoning, especially for important results.

---

## Planning and Problem-Solving

### Task Decomposition
**What AI can do:**
- Break complex tasks into steps
- Identify dependencies
- Suggest execution order

**Example:**
```
Task: "Plan a trip to Japan"

AI decomposition:
1. Set dates and budget
2. Book flights
3. Arrange accommodations
4. Plan itinerary
5. Handle logistics (visa, insurance, etc.)
```

**Strengths:**
- Good at standard decomposition patterns
- Considers multiple factors
- Generates comprehensive lists

**Limitations:**
- May miss domain-specific steps
- Cannot account for unknown unknowns
- Generic plans may miss your specific needs

---

### Constraint Satisfaction
**What AI can do:**
- Identify constraints
- Find solutions satisfying multiple constraints
- Explain trade-offs

**Example:**
```
Constraints:
- Budget: $1000
- Time: 3 days
- Must include museum visit
- Prefers vegetarian restaurants

AI generates: Plan satisfying all constraints
```

**Limitations:**
- May miss implicit constraints
- Cannot optimize perfectly
- Trade-off decisions may not match your preferences

---

### Strategic Thinking
**What AI can do:**
- Analyze game positions
- Suggest strategies
- Predict opponent moves

**Limitations:**
- Not as strong as specialized algorithms (chess engines)
- Cannot "see" far ahead like humans can
- May suggest illegal/invalid moves

**Best for:**
- Brainstorming strategies
- Explaining strategic concepts
- Analysis (not execution)

---

## Common Reasoning Failures

### Failure 1: Logical Fallacies
**Examples AI makes:**
- Affirming the consequent
- False dichotomies
- Hasty generalizations
- Correlation→causation

**Mitigation:**
- Request explicit reasoning steps
- Challenge assumptions
- Verify logic manually

---

### Failure 2: Inconsistency
**What happens:**
AI contradicts itself within same response.

**Example:**
```
AI: "X is true because..."
[500 words later]
AI: "X is false because..."
```

**Mitigation:**
- Shorter responses
- Explicit consistency checks
- Ask AI to verify its own reasoning

---

### Failure 3: Overconfidence
**What happens:**
AI presents uncertain reasoning as certain.

**Example:**
```
AI: "This is definitely true because..." [makes logical error]
```

**Mitigation:**
- Request confidence levels
- Ask "What could be wrong with this reasoning?"
- Verify important conclusions

---

### Failure 4: Missing Context
**What happens:**
AI makes assumptions not warranted by context.

**Example:**
```
User: "Should I invest in stocks?"
AI: [gives advice without knowing user's age, risk tolerance, financial situation]
```

**Mitigation:**
- Provide full context upfront
- AI should ask clarifying questions
- Recognize when more info needed

---

## Improving AI Reasoning

### Technique 1: Explicit Step-by-Step
```
❌ "What's the answer?"
✅ "Let's think step-by-step. First, identify what we know. Second..."
```

### Technique 2: Request Self-Verification
```
After AI answers:
"Can you check this reasoning for errors? What assumptions did you make?"
```

### Technique 3: Provide Examples
```
"Here's an example of the reasoning process I want:
[example]
Now apply this to [new problem]"
```

### Technique 4: Break Down Complex Problems
```
Instead of:
"Solve this complex multi-step problem"

Do:
Step 1: "First, let's identify the sub-problems"
Step 2: "Now solve sub-problem 1"
Step 3: "Now combine solutions"
```

---

## Model Comparison

| Capability | Claude | GPT-4 | Gemini | Notes |
|-----------|---------|-------|---------|-------|
| Logical reasoning | Excellent | Excellent | Very Good | Top models similar |
| Mathematical reasoning | Very Good | Excellent | Very Good | GPT-4 slightly ahead |
| Code reasoning | Excellent | Excellent | Good | Claude/GPT-4 strong |
| Planning | Very Good | Very Good | Good | All require human oversight |
| Consistency | Good | Good | Fair | All can contradict themselves |
| Novel reasoning | Fair | Fair | Fair | All struggle with truly novel situations |

---

## Best Practices

### DO:
- ✅ Request step-by-step reasoning
- ✅ Verify important logical conclusions
- ✅ Provide full context
- ✅ Use tools (code execution) for math
- ✅ Ask AI to check its own work
- ✅ Break complex problems into steps

### DON'T:
- ❌ Trust reasoning blindly
- ❌ Assume arithmetic is correct without verification
- ❌ Skip verification for high-stakes decisions
- ❌ Expect perfect logic on complex problems
- ❌ Forget that AI patterns ≠ true understanding

---

## Key Takeaways

1. **AI reasoning is pattern-based**, not true causal understanding
2. **Chain-of-thought improves accuracy** but doesn't guarantee correctness
3. **Always verify important logical conclusions**
4. **Use code execution for accurate math**
5. **Provide explicit reasoning structure** for best results
6. **AI can seem logical while making subtle errors** - stay vigilant

---

*See also: [Language Modeling](language-modeling.md), [Tool Use](tool-use.md), [Failure Modes](failure-modes.md)*
