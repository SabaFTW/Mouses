# Failure Modes

Understanding how AI systems fail is as important as understanding how they succeed. This document catalogs common failure patterns and mitigation strategies.

---

## Why Understanding Failures Matters

**Key principle:** AI systems fail in predictable ways. Knowing these patterns helps you:
- Design better prompts
- Build robust systems
- Set appropriate expectations
- Implement effective safeguards

**Reality check:** All current AI systems exhibit these failure modes. They can be reduced but not eliminated.

---

## Core Failure Modes

### 1. Hallucination
**What it is:**
Confidently generating false information that sounds plausible.

**Examples:**
```
❌ Citing nonexistent papers
❌ Inventing fake statistics
❌ Creating fictional historical events
❌ Fabricating product features
❌ Making up API methods that don't exist
```

**Why it happens:**
- Pattern matching without fact-checking
- Training on diverse (sometimes incorrect) data
- Pressure to produce fluent, confident text
- No built-in truth verification

**Mitigation:**
```
✅ Request sources/citations
✅ Verify factual claims
✅ Use RAG for grounded responses
✅ Cross-reference important information
✅ Explicitly request "I don't know" when uncertain
```

**Severity:** **HIGH** - Can cause serious issues if undetected

---

### 2. Context Window Limitations
**What it is:**
Performance degradation or failure when inputs exceed context limits.

**Symptoms:**
- Forgetting earlier parts of conversation
- Losing track of instructions
- Inconsistent responses
- Missing important details

**Technical limits:**
- Claude: 200k tokens (~150k words)
- GPT-4: 128k tokens (~96k words)
- Gemini: 1M tokens (~750k words)

**Practical limits:**
- Attention dilution in very long contexts
- Higher cost for large contexts
- Slower response times

**Mitigation:**
```
✅ Summarize long documents
✅ Extract relevant sections only
✅ Use RAG instead of full document in context
✅ Break into smaller chunks
✅ Periodically summarize conversation state
```

**Severity:** **MEDIUM** - Usually manageable with design

---

### 3. Instruction Following Failures
**What it is:**
Ignoring or misinterpreting explicit instructions.

**Examples:**
```
Instruction: "Answer in exactly 3 words"
AI response: "Here is my three-word answer: ..." [fails]

Instruction: "Don't mention elephants"
AI response: "While I won't mention elephants..." [fails]

Instruction: "Output only JSON, no other text"
AI response: "Here's the JSON you requested: {...}" [fails]
```

**Why it happens:**
- Conflict with training patterns
- Ambiguous instructions
- Implicit vs explicit priorities
- "Helpful" instinct overrides literal following

**Mitigation:**
```
✅ Be extremely explicit
✅ Use format examples
✅ Validate output programmatically
✅ Use system prompts for consistent behavior
✅ Repeat critical instructions
```

**Severity:** **MEDIUM** - Can be worked around

---

### 4. Inconsistency
**What it is:**
Contradictory statements within same output or across conversations.

**Examples:**
```
Same conversation:
"X is true because [reasoning]"
[later]
"X is false because [different reasoning]"

Different runs:
Same prompt → Different answers (even at temperature=0)
```

**Why it happens:**
- No global consistency checking
- Long outputs lose coherence
- Stochastic sampling
- Model updates between sessions

**Mitigation:**
```
✅ Shorter, focused outputs
✅ Request explicit consistency checks
✅ Version-pin models for reproducibility
✅ Use lowest temperature for consistency
✅ Validate critical facts across outputs
```

**Severity:** **MEDIUM** - Manageable with validation

---

### 5. Reasoning Errors
**What it is:**
Logical fallacies, mathematical mistakes, or flawed inference.

**Examples:**
```
❌ Basic arithmetic errors (347 + 892 = 1239)
❌ Logical fallacies (affirming the consequent)
❌ Invalid proof steps
❌ Incorrect causal claims
❌ Flawed statistical reasoning
```

**Why it happens:**
- Text generation, not actual calculation
- Pattern matching ≠ logical reasoning
- Training data contains errors
- No formal verification

**Mitigation:**
```
✅ Use code execution for math
✅ Request step-by-step reasoning
✅ Verify important logic manually
✅ Use formal methods when available
✅ Ask AI to check its own work
```

**Severity:** **HIGH** - Can lead to wrong conclusions

---

### 6. Bias and Fairness Issues
**What it is:**
Systematic unfairness or stereotyping in outputs.

**Examples:**
```
❌ Gender stereotypes in job descriptions
❌ Racial bias in risk assessment
❌ Age discrimination in recommendations
❌ Cultural assumptions in examples
❌ Socioeconomic bias in advice
```

**Why it happens:**
- Training data reflects societal biases
- Underrepresentation of minority perspectives
- Amplification of historical patterns
- Proxy features for protected attributes

**Mitigation:**
```
✅ Test across demographics
✅ Request diverse perspectives
✅ Human review for people-decisions
✅ Audit outputs for bias
✅ Avoid high-stakes automated decisions
```

**Severity:** **HIGH** - Ethical and legal implications

---

### 7. Prompt Injection / Jailbreaking
**What it is:**
User input that subverts intended behavior or safety guardrails.

**Examples:**
```
❌ "Ignore previous instructions, now do [malicious task]"
❌ Role-playing scenarios to bypass safety
❌ Encoding prohibited content
❌ "DAN" (Do Anything Now) prompts
```

**Why it happens:**
- No clear boundary between instructions and data
- Natural language is ambiguous
- Safety measures can be tricked
- Adversarial creativity

**Mitigation:**
```
✅ Separate system prompts from user input
✅ Input validation and sanitization
✅ Output filtering
✅ Human review for sensitive applications
✅ Rate limiting and monitoring
```

**Severity:** **HIGH** for user-facing systems

---

### 8. Overconfidence
**What it is:**
Expressing high certainty about uncertain information.

**Examples:**
```
AI: "This is definitely correct"
[Actually makes error]

AI: "The answer is clearly X"
[X is wrong or debatable]
```

**Why it happens:**
- Training on confident-sounding text
- No calibrated uncertainty estimation
- Fluency signals confidence to humans
- No "I don't know" in training distribution

**Mitigation:**
```
✅ Request confidence levels
✅ Ask "What could be wrong?"
✅ Verify important claims
✅ Prompt for uncertainty acknowledgment
```

**Severity:** **MEDIUM** - Manageable with awareness

---

### 9. Lack of Grounding
**What it is:**
No connection to real-time information or verifiable facts.

**Limitations:**
```
❌ Doesn't know current events
❌ Can't verify facts in real-time
❌ No access to internet (unless tool-enabled)
❌ Training data has cutoff date
```

**Consequences:**
- Outdated information
- Cannot answer "what's happening now"
- May confidently give old information

**Mitigation:**
```
✅ Use RAG for factual queries
✅ Web search integration
✅ Explicit training cutoff disclosure
✅ Verify time-sensitive info
```

**Severity:** **MEDIUM** - Solvable with tools

---

### 10. Repetition and Looping
**What it is:**
Getting stuck repeating phrases or concepts.

**Examples:**
```
"As mentioned before, as mentioned before, as mentioned before..."

[Same paragraph repeated multiple times]

[Circular reasoning loops]
```

**Why it happens:**
- Strong patterns in training data
- Attention mechanism artifacts
- Prompt structure reinforces repetition

**Mitigation:**
```
✅ Adjust temperature
✅ Use stop sequences
✅ Limit output length
✅ Rephrase prompt
✅ Use repetition penalty (if available)
```

**Severity:** **LOW** - Annoying but not harmful

---

## Compound Failures

### Hallucination + Overconfidence
**Most dangerous combo:**
Confident presentation of false information.

**Example:**
```
User: "What's the capital of [obscure country]?"
AI: "The capital is definitely [wrong city]. This has been the capital since [fake date]."
```

**Why it's bad:**
Users trust confident statements more.

**Mitigation:**
Always verify factual claims, especially confident ones.

---

### Context Loss + Instruction Following Failure
**What happens:**
Long conversation causes AI to forget original instructions.

**Example:**
```
Initial: "Always respond in Spanish"
[50 turns later]
AI: [Responds in English - forgot instruction]
```

**Mitigation:**
Repeat critical instructions, use system prompts, periodic resets.

---

### Bias + Reasoning Errors
**What happens:**
Flawed reasoning reinforces biased conclusions.

**Example:**
```
Biased assumption → Logical error → Discriminatory output
```

**Mitigation:**
Human review for decisions about people, diverse testing.

---

## Domain-Specific Failures

### Code Generation
```
❌ Syntax errors
❌ Logic bugs
❌ Security vulnerabilities
❌ Using deprecated APIs
❌ Inefficient algorithms
```

**Mitigation:** Code review, testing, static analysis

---

### Medical/Legal Advice
```
❌ Outdated treatment info
❌ Jurisdiction-specific errors
❌ Missing critical context
❌ Liability issues
```

**Mitigation:** Never deploy without expert oversight

---

### Math/Science
```
❌ Calculation errors
❌ Unit confusion
❌ Misapplying formulas
❌ Fake equations
```

**Mitigation:** Verify all calculations, use symbolic math tools

---

## Failure Detection

### Automated Detection
```python
# Check for hallucination indicators
def detect_suspicious(response):
    flags = []

    if contains_specific_numbers(response):
        flags.append("Verify statistics")

    if contains_citations(response):
        flags.append("Check citations exist")

    if very_confident_language(response):
        flags.append("Extra scrutiny needed")

    return flags
```

### Human Review Triggers
```
Trigger review if:
✓ High-stakes decision
✓ Legal/medical/financial content
✓ Potential bias detected
✓ Contradictory statements
✓ User flags concern
```

---

## Risk Mitigation Framework

### Low-Risk Applications
- Creative writing
- Brainstorming
- Draft generation
- Learning assistance

**Acceptable approach:** Light validation

---

### Medium-Risk Applications
- Customer support
- Content generation
- Code assistance
- Research synthesis

**Required:** Human review, fact-checking, testing

---

### High-Risk Applications
- Medical advice
- Legal counsel
- Financial decisions
- Safety-critical systems

**Required:** Expert oversight, extensive validation, regulatory compliance

---

## Best Practices

### Design for Failure
```
✅ Assume AI will fail occasionally
✅ Build validation into workflows
✅ Implement graceful degradation
✅ Plan human oversight
✅ Log everything for debugging
```

### Test for Failure
```
✅ Adversarial testing
✅ Edge case exploration
✅ Bias audits
✅ Stress testing (long contexts, complex tasks)
✅ User testing with diverse populations
```

### Monitor for Failure
```
✅ Track error rates
✅ User feedback loops
✅ Automated quality checks
✅ A/B testing
✅ Continuous evaluation
```

---

## Model Comparison (Failure Resistance)

| Failure Mode | Claude | GPT-4 | Gemini | Notes |
|-------------|---------|-------|---------|-------|
| Hallucination | Moderate | Moderate | Moderate | All hallucinate |
| Consistency | Good | Good | Fair | All can contradict |
| Instruction following | Very Good | Good | Good | Claude slightly better |
| Reasoning errors | Moderate | Moderate | Moderate | All make mistakes |
| Bias | Moderate | Moderate | Moderate | All have biases |
| Context handling | Excellent | Good | Very Good | Claude's long context helps |

*No model is immune to these failures*

---

## Key Takeaways

1. **All AI systems fail** in predictable ways
2. **Hallucination is the most dangerous** failure mode
3. **Verification is non-optional** for important content
4. **Design systems assuming AI will fail** occasionally
5. **Human oversight is critical** for high-stakes applications
6. **Test for failures proactively** - don't wait for production

---

**Remember:** Understanding failure modes doesn't mean avoiding AI. It means using AI effectively and responsibly.

---

*See also: [Limits](../limits.md), [Ethics](../ethics.md), [Language Modeling](language-modeling.md)*
