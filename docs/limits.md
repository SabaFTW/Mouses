# Limits - What AI Can't or Shouldn't Do

Understanding AI limitations is as important as understanding capabilities. This document outlines technical boundaries, practical constraints, and ethical guardrails.

---

## Technical Limitations

### 1. No Real-Time Information
**What AI systems cannot do:**
- Access current news or events (beyond training cutoff)
- Know today's date, weather, or stock prices
- Browse the internet in real-time (unless explicitly tool-enabled)
- Update their knowledge automatically

**What this means for you:**
- Always verify time-sensitive information
- Provide context about current events
- Use search tools for recent developments

### 2. No True Memory
**What AI systems cannot do:**
- Remember conversations across sessions (unless using RAG/vector stores)
- Learn from your corrections permanently
- Build long-term relationship context

**What this means for you:**
- Provide context each session
- Save important patterns externally
- Don't expect the model to "remember" you

### 3. No Reasoning About Uncertainty
**What AI systems struggle with:**
- Accurately estimating their own confidence
- Knowing what they don't know
- Declining tasks they can't perform well

**What this means for you:**
- Verify important claims
- Use multiple sources
- Don't trust confident-sounding wrong answers

### 4. No Execution Environment (Base Models)
**What AI systems cannot do without tools:**
- Run code
- Access files
- Make API calls
- Perform calculations (accurately)

**What this means for you:**
- Use tool-enabled systems for automation
- Verify mathematical calculations
- Test generated code before deployment

---

## Cognitive Limitations

### 1. Pattern Matching, Not Understanding
AI systems excel at:
- Recognizing patterns in training data
- Generating statistically likely continuations
- Mimicking styles and formats

AI systems struggle with:
- True causal reasoning
- Novel situations far from training data
- Deep conceptual understanding

### 2. Context Window Constraints
**Limitations:**
- Fixed maximum input length (8k-200k tokens)
- Performance degrades with very long contexts
- Cannot process infinite information

**Workarounds:**
- Summarize long documents
- Use RAG for large knowledge bases
- Break complex tasks into chunks

### 3. Hallucination Risk
**What happens:**
- AI confidently generates false information
- Cites nonexistent sources
- Fabricates plausible-sounding details

**Mitigation:**
- Verify factual claims
- Request sources
- Use grounding techniques
- Cross-check critical information

---

## What AI Shouldn't Do (Ethical Boundaries)

### 1. Decisions About People
**Avoid using AI for:**
- Hiring/firing decisions (bias amplification risk)
- Medical diagnosis without human oversight
- Legal judgments (accountability issues)
- Creditworthiness assessment (fairness concerns)

**Why:** AI systems can perpetuate and amplify biases present in training data.

### 2. Autonomous High-Stakes Actions
**Avoid fully autonomous:**
- Financial transactions
- Medical treatments
- Legal filings
- Infrastructure control

**Why:** Lack of true understanding and accountability.

### 3. Replacing Human Connection
**AI is not appropriate for:**
- Replacing therapy (can supplement, not replace)
- Substituting genuine relationships
- Sole source of emotional support for vulnerable people

**Why:** No genuine empathy or understanding of human experience.

### 4. Surveillance or Manipulation
**Unethical uses:**
- Mass surveillance systems
- Manipulative persuasion
- Deepfakes for deception
- Automated social engineering

**Why:** Violates privacy and autonomy.

---

## Practical Constraints

### 1. Cost and Latency
- API calls cost money
- Large contexts are expensive
- Real-time applications may be too slow
- Batch processing is more economical

### 2. Reproducibility Challenges
- Non-deterministic outputs (even with temperature=0)
- Model updates change behavior
- Prompt sensitivity

### 3. Integration Complexity
- API rate limits
- Error handling requirements
- Version management
- Monitoring and logging needs

---

## When NOT to Use AI

### Use traditional software when you need:
- Deterministic behavior
- Guaranteed correctness
- Regulatory compliance
- Explainable decisions
- Real-time performance
- Low latency (< 100ms)

### Use humans when you need:
- Ethical judgment
- Creative breakthroughs
- Emotional intelligence
- Accountability
- Domain expertise verification
- High-stakes decisions

### Use databases when you need:
- Exact retrieval
- Structured queries
- ACID guarantees
- Efficient lookups

---

## Future Limitations (Speculative)

Things AI may never do well:
- True causal reasoning
- Common sense in novel situations
- Genuine creativity (vs. recombination)
- Understanding consciousness/qualia
- Making ethical judgments

Things that may improve:
- Factual accuracy
- Reasoning steps
- Context window size
- Tool integration
- Multimodal capabilities

---

## Grounding Principles

**When working with AI:**
1. Verify important claims
2. Understand technical constraints
3. Respect ethical boundaries
4. Use appropriate tools for tasks
5. Maintain human oversight
6. Plan for failure modes

**Remember:** AI is a powerful tool with real limitations. Understanding both is essential for effective use.

---

*See also: [Ethics](ethics.md), [Failure Modes](rows/failure-modes.md)*
