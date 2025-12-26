# Rows - AI Capability Dimensions

"Rows" is the GroundUp framework for understanding what AI systems can actually do. Each "row" represents a dimension of capability with documented strengths, limitations, and failure modes.

---

## The Four Core Rows

### 1. [Language Modeling](language-modeling.md)
**What it covers:**
- Text generation and completion
- Understanding and interpretation
- Translation and summarization
- Style and tone control

**Key insight:** LLMs excel at pattern matching in language but don't truly "understand" like humans.

---

### 2. [Tool Use](tool-use.md)
**What it covers:**
- Function calling and API integration
- Code execution environments
- External data retrieval
- Multi-step workflows

**Key insight:** Tool use transforms LLMs from text generators into action-takers, but requires careful orchestration.

---

### 3. [Reasoning](reasoning.md)
**What it covers:**
- Logical inference and deduction
- Planning and problem-solving
- Chain-of-thought approaches
- Mathematical and analytical tasks

**Key insight:** AI can follow reasoning patterns but struggles with novel situations requiring true causal understanding.

---

### 4. [Failure Modes](failure-modes.md)
**What it covers:**
- Hallucinations and confabulation
- Context limitations
- Adversarial vulnerabilities
- Bias and fairness issues

**Key insight:** Understanding how AI fails is as important as understanding how it succeeds.

---

## Why "Rows"?

The metaphor comes from thinking of AI capabilities as a spreadsheet:
- **Rows** = Capability dimensions (what AI can do)
- **Columns** = Specific tools/models (Claude, GPT, Gemini, etc.)
- **Cells** = Performance on specific capability with specific tool

This framework helps you:
1. **Assess fit** - Does this AI capability match my task?
2. **Set expectations** - What can I realistically expect?
3. **Choose tools** - Which model is best for this capability?
4. **Plan workflows** - How do I combine capabilities?

---

## How to Use This Framework

### For Task Planning
1. Identify which Row(s) your task requires
2. Check the limitations section
3. Review failure modes
4. Design prompts accordingly

**Example:**
- Task: "Analyze quarterly sales data"
- Rows needed: Reasoning (analysis) + Tool Use (data access)
- Limitations: No direct DB access, context window limits
- Approach: Provide summarized data, ask for step-by-step analysis

### For Tool Selection
1. Check Gang comparison matrix
2. See which tool excels in needed Rows
3. Consider cost vs. performance trade-offs

**Example:**
- Need: Fast code generation
- Row: Language Modeling (code domain)
- Tool comparison: Claude (strong), GPT-4 (strong), Gemini (fast/cheap)
- Choice: Depends on budget and quality needs

### For Debugging
1. Identify the Row where failure occurred
2. Check that Row's failure modes
3. Apply mitigation strategies

**Example:**
- Problem: AI invented a fake citation
- Row: Language Modeling (hallucination)
- Failure mode: Confabulation
- Fix: Request sources, verify facts, use grounding

---

## Interaction Between Rows

Capabilities often combine:

**Language + Reasoning**
- Code generation with debugging
- Creative writing with plot consistency
- Technical writing with accuracy checking

**Language + Tools**
- Web search + summarization
- Database query + natural language explanation
- API call + response formatting

**Reasoning + Tools**
- Multi-step workflows
- Autonomous agents
- Data analysis pipelines

**All Three + Failure Awareness**
- Production-ready systems
- Error handling and fallbacks
- Robust workflows

---

## Capability Evolution

AI capabilities improve over time, but unevenly:

**Rapidly improving:**
- Context window size
- Reasoning steps
- Tool integration
- Multimodal understanding

**Slowly improving:**
- Factual accuracy
- Bias mitigation
- True causal reasoning
- Edge case handling

**Mostly static:**
- Hallucination tendency (still present, even if reduced)
- Need for human oversight in high-stakes scenarios
- Fundamental limitations of pattern matching

**Keep this in mind:** Check capability updates when new models release, but don't assume all limitations are solved.

---

## Advanced: Capability Measurement

How to assess AI performance on each Row:

### Language Modeling
- **Test**: Generate variations, check coherence
- **Metrics**: Fluency, relevance, consistency
- **Benchmark**: Write sample prompts, compare outputs

### Tool Use
- **Test**: Multi-step workflows with tools
- **Metrics**: Success rate, error handling, efficiency
- **Benchmark**: Build test harness with mock APIs

### Reasoning
- **Test**: Logic puzzles, math problems, planning tasks
- **Metrics**: Correctness, step validity, novel situations
- **Benchmark**: Use standard reasoning datasets

### Failure Modes
- **Test**: Adversarial prompts, edge cases
- **Metrics**: Hallucination rate, bias detection
- **Benchmark**: Red-teaming exercises

---

## Practical Examples

### Example 1: Content Creation
**Primary Row:** Language Modeling
**Supporting Rows:** Reasoning (structure/logic)
**Failure Modes to Watch:** Factual hallucinations, style inconsistency
**Best Practices:** Verify facts, edit for voice, provide examples

### Example 2: Data Analysis
**Primary Row:** Reasoning
**Supporting Rows:** Tool Use (data access), Language (explanation)
**Failure Modes to Watch:** Calculation errors, overfitting patterns
**Best Practices:** Verify math, provide context, request step-by-step

### Example 3: Automation
**Primary Row:** Tool Use
**Supporting Rows:** Reasoning (workflow logic), Language (interface)
**Failure Modes to Watch:** API errors, edge cases, rate limits
**Best Practices:** Error handling, testing, human oversight

---

## Next Steps

1. **Deep dive**: Read individual Row documents
2. **Compare tools**: Check Gang comparison for your use case
3. **Plan workflow**: Combine Rows with Paths (usage strategies)
4. **Test & iterate**: Build with awareness of limitations

---

**Remember:** These capabilities are tools, not magic. Understanding how they work—and how they fail—is key to effective use.

---

*See also: [Paths](../paths/), [Gang](../gang/), [Failure Modes](failure-modes.md)*
