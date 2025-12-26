# Glossary

Quick reference for terms used throughout GroundUp documentation.

---

## AI/ML Fundamentals

**AI (Artificial Intelligence)**
Broad term for computer systems that perform tasks typically requiring human intelligence. Includes ML, rule-based systems, search algorithms, etc.

**LLM (Large Language Model)**
Neural networks trained on massive text datasets to predict and generate language. Examples: GPT-4, Claude, Gemini.

**Foundation Model**
Large pre-trained model that can be adapted to various downstream tasks. Base layer for specialized applications.

**Fine-tuning**
Training a pre-trained model on specific data to specialize its behavior for particular tasks or domains.

**Prompt**
Input text given to an AI system. The query, instruction, or context that guides the model's response.

**Completion**
The model's generated response to a prompt. Also called "output" or "generation."

**Token**
Basic unit of text processing. Roughly 0.75 words in English. Used for pricing and context limits.

**Context Window**
Maximum amount of text (in tokens) that a model can process at once. Includes both prompt and completion.

**Temperature**
Parameter controlling randomness in generation. Lower = more deterministic, higher = more creative/random.

**Top-p (Nucleus Sampling)**
Alternative to temperature for controlling randomness. Samples from the smallest set of tokens whose cumulative probability exceeds p.

---

## Capabilities and Limitations

**Hallucination**
When AI generates false information presented as fact. Common failure mode of LLMs.

**Grounding**
Techniques to anchor AI outputs in verifiable facts, sources, or retrieved information. Reduces hallucination.

**RAG (Retrieval-Augmented Generation)**
Architecture that retrieves relevant documents before generating responses. Improves factual accuracy.

**Tool Use / Function Calling**
Ability of AI to invoke external functions, APIs, or tools to perform actions beyond text generation.

**Reasoning**
AI's ability to perform logical inference, planning, and problem-solving. Often refers to chain-of-thought or step-by-step approaches.

**Alignment**
The degree to which an AI system's behavior matches intended human values and instructions.

**Jailbreaking**
Techniques to bypass safety guardrails or get AI to produce prohibited content. Generally considered harmful.

---

## Interaction Patterns

**Zero-shot**
Asking AI to perform a task without providing examples. Relies on pre-training knowledge.

**Few-shot**
Providing examples of desired behavior before asking for similar output. Improves accuracy.

**Chain-of-Thought (CoT)**
Prompting technique that asks AI to show reasoning steps. Improves complex problem-solving.

**System Prompt**
Initial instruction that sets behavior, role, or constraints for the entire conversation. Often hidden from users.

**Multi-turn Conversation**
Back-and-forth dialogue where context accumulates across messages.

**Stateless**
Each API call is independent, with no memory of previous interactions (unless explicitly provided).

---

## GroundUp Framework Terms

**Rows**
GroundUp's framework for categorizing AI capability dimensions (language, tools, reasoning, etc.).

**Paths**
Human usage strategies for different types of tasks (analytical, creative, automation, research).

**Pantheon**
**Metaphorical** taxonomy of interaction styles. NOT a claim about AI consciousness or personality. Organizational framework only.

**Gang**
Tool comparison framework for objectively analyzing different AI systems (Claude, GPT, Gemini, etc.).

---

## Technical Infrastructure

**API (Application Programming Interface)**
Programmatic interface for accessing AI systems. Allows software integration.

**Endpoint**
Specific URL where API requests are sent. Different endpoints for different models/capabilities.

**Rate Limit**
Maximum number of API requests allowed in a time period. Prevents abuse and manages load.

**Latency**
Time between request and response. Critical for real-time applications.

**Batch Processing**
Processing multiple requests together, usually for better efficiency and lower cost.

**Embeddings**
Numerical vector representations of text. Used for semantic search, clustering, and similarity.

**Vector Database**
Database optimized for storing and searching embeddings. Common in RAG architectures.

**Streaming**
Returning model output incrementally as it's generated, rather than waiting for completion.

---

## Model Architectures

**Transformer**
Neural network architecture that powers modern LLMs. Uses self-attention mechanisms.

**Attention Mechanism**
Component of transformers that weighs importance of different parts of input when generating output.

**Parameters**
Numerical values learned during training. Model size often measured in billions of parameters (B).

**Inference**
Running a trained model to generate outputs. Distinct from training.

**Quantization**
Reducing precision of model parameters to decrease size and increase speed. Trade-off with quality.

---

## Safety and Ethics

**Bias**
Systematic errors or unfairness in AI outputs, often reflecting training data biases.

**Fairness**
Ensuring AI systems don't discriminate unfairly across demographic groups.

**Transparency**
Clarity about AI involvement, capabilities, and limitations in a system.

**Accountability**
Clear assignment of responsibility for AI system behavior and outcomes.

**Red-teaming**
Adversarial testing to find vulnerabilities, biases, or harmful behaviors in AI systems.

**RLHF (Reinforcement Learning from Human Feedback)**
Training technique where humans rate model outputs to improve alignment and safety.

---

## Development Terms

**Prompt Engineering**
Crafting effective prompts to elicit desired model behavior. More art than science.

**Prompt Chaining**
Breaking complex tasks into steps, using output of one prompt as input to the next.

**Agent**
AI system that can take actions, use tools, and pursue goals with some autonomy.

**Orchestration**
Coordinating multiple AI calls, tools, or services to accomplish complex workflows.

**Deterministic Output**
Consistent results for the same input. Difficult with LLMs even at temperature=0.

---

## Deployment Terms

**Serverless**
Running code without managing servers. Common for AI API integrations.

**Cold Start**
Delay when initializing a serverless function after period of inactivity.

**Webhook**
HTTP callback that allows services to notify your application of events.

**Idempotency**
Property where repeating an operation produces the same result. Important for retry logic.

---

## Cost and Optimization

**Token Pricing**
Charging model based on number of tokens processed (usually separate for input and output).

**Caching**
Storing previous results to avoid redundant API calls. Saves cost and latency.

**Prompt Caching**
Model-level feature that caches prefix of prompts for faster repeated queries.

**Context Optimization**
Techniques to minimize token usage while maintaining necessary information.

---

## Evaluation Terms

**Benchmark**
Standardized test for measuring model capabilities across tasks.

**Accuracy**
Percentage of correct predictions or generations. Context-dependent metric.

**Precision/Recall**
Metrics for evaluating classification tasks. Precision = correctness of positive predictions, Recall = coverage of actual positives.

**BLEU Score**
Metric for evaluating machine translation and text generation quality.

**Human Evaluation**
Using human raters to judge model outputs. Often gold standard for quality.

---

## Common Acronyms

- **NLP**: Natural Language Processing
- **NLU**: Natural Language Understanding
- **NLG**: Natural Language Generation
- **API**: Application Programming Interface
- **JSON**: JavaScript Object Notation (common data format)
- **REST**: Representational State Transfer (API architecture)
- **SDK**: Software Development Kit
- **UI/UX**: User Interface / User Experience
- **SOTA**: State of the Art (current best performance)

---

## Metaphorical Terms (GroundUp-specific)

**IMPORTANT:** These terms are explicitly metaphorical and organizational only. They do NOT imply AI consciousness, personality, or communication.

**Pantheon**
Metaphorical framework for interaction styles. Named after Greek gods for memorability, not because AI has divine properties.

**Gang**
Informal term for comparing different AI tools. Named for accessibility, not because AI systems form social groups.

---

**Can't find a term?**
Open an issue on GitHub to request additions to this glossary.

---

*This glossary focuses on practical definitions for working with AI systems. For academic/theoretical definitions, consult ML textbooks.*
