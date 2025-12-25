# Research Workflow Examples

End-to-end examples of using AI for research tasks.

---

## Workflow 1: Learning a New Technology

### Goal
Understand a new framework/tool well enough to evaluate for project use.

### Steps

**1. Initial Overview (5 min)**
```
Prompt: "What is [Technology X]? Explain:
- What problem does it solve?
- How does it differ from [alternatives]?
- One simple example use case"
```

**2. Deeper Understanding (15 min)**
```
Prompt: "Explain how [Technology X] works:
- Core architecture
- Key concepts
- Common patterns
- Integration points"
```

**3. Practical Evaluation (30 min)**
```
Prompt: "For a project that needs [requirements],
help me evaluate [Technology X]:
- Would it fit our use case?
- What are the trade-offs?
- What's the learning curve?
- What are alternatives?"
```

**4. Proof of Concept (1-2 hours)**
```
Prompt: "Generate a minimal working example of [Technology X] that:
- [Core requirement]
- Includes comments explaining key parts
- Has error handling
- Can run locally"

[Test the generated code yourself]
```

**5. Decision Documentation (15 min)**
```
Prompt: "Based on our exploration, help me write:
- Summary of [Technology X]
- Pros/cons for our use case
- Recommendation (adopt/experiment/skip)
- If adopt: next steps
- If skip: alternatives to investigate"
```

### Verification Steps
- ✅ Test generated code examples
- ✅ Check official documentation
- ✅ Verify claims about alternatives
- ✅ Search for real-world experiences

---

## Workflow 2: Literature Review

### Goal
Synthesize findings from multiple research papers.

### Steps

**1. Find Papers (Manual - AI doesn't do this well)**
- Use Google Scholar, PubMed, arXiv
- Collect 5-10 relevant papers
- Read abstracts yourself

**2. Extract Key Information (30-60 min)**
```
For each paper:

Prompt: "Here's a research paper abstract and key sections: [paste]

Extract:
- Main hypothesis
- Methodology
- Key findings
- Limitations stated by authors
- How this relates to [your research question]"

[Verify extraction against paper]
```

**3. Identify Patterns (20 min)**
```
Prompt: "I've researched [topic]. Here are summaries of key papers:

[Paste your verified summaries]

Please:
1. Identify common themes
2. Note contradictions or debates
3. Highlight methodological approaches
4. Point out gaps in current research"
```

**4. Synthesize (30 min)**
```
Prompt: "Based on these papers, help me write a literature review section covering:
1. Current state of [topic]
2. Major findings and consensus
3. Areas of disagreement
4. Gaps and future directions
5. How this informs [my research question]

Include citations like [Author et al., Year]"
```

**5. Verify and Cite (Critical!)**
- ✅ Check every citation exists
- ✅ Verify claims are in cited papers
- ✅ Add proper bibliography
- ✅ Ensure no hallucinated sources

---

## Workflow 3: Competitive Analysis

### Goal
Understand competitor landscape for strategic planning.

### Steps

**1. Identify Competitors (Manual)**
- Research 3-5 main competitors
- Gather public information (websites, reviews, docs)

**2. Feature Matrix (45 min)**
```
Prompt: "I'm analyzing competitors in [market].

Competitor 1: [Description + key info]
Competitor 2: [Description + key info]
...

Create a comparison matrix for:
- Core features
- Pricing model
- Target audience
- Technology stack (if known)
- Strengths/weaknesses
- Market positioning"
```

**3. Differentiation Analysis (30 min)**
```
Prompt: "Based on this competitive landscape, analyze:
- What gaps exist in the market?
- What are competitors doing well?
- What are common complaints/limitations?
- What opportunities exist for differentiation?

Our product/service: [description]
How could we position against these competitors?"
```

**4. Strategic Recommendations (20 min)**
```
Prompt: "Given this analysis, suggest:
- Which competitor most threatens our position?
- What features should we prioritize?
- What messaging would differentiate us?
- What risks should we monitor?"
```

**5. Verification**
- ✅ Verify features claims (try competitors' products)
- ✅ Check pricing (actual websites)
- ✅ Validate assumptions about gaps
- ✅ Get second opinions from team

---

## Best Practices Across Workflows

### Do:
- ✅ Verify all factual claims
- ✅ Check sources exist
- ✅ Cross-reference important points
- ✅ Use AI to organize, not replace research
- ✅ Provide context from your actual research

### Don't:
- ❌ Trust AI-provided sources without checking
- ❌ Skip reading primary sources
- ❌ Accept analysis without verification
- ❌ Use AI as sole source for research
- ❌ Ignore training data cutoff dates

---

*See also: [Research Path](../../docs/paths/research.md), [Analytical Path](../../docs/paths/analytical.md)*
