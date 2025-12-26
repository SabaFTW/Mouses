# Tool Use

How AI systems interact with external tools, APIs, and execution environments to perform actions beyond text generation.

---

## What Tool Use Is

**Definition:**
The capability of AI models to invoke functions, call APIs, execute code, and interact with external systems based on natural language instructions.

**Why it matters:**
Transforms AI from "text generator" to "action-taker." Enables automation, data retrieval, and real-world integration.

**Common names:**
- Function calling
- Tool use
- Action execution
- API integration
- Agent capabilities

---

## Core Capabilities

### 1. Function Calling
**What it does:**
AI determines which function to call and what parameters to pass based on task requirements.

**How it works:**
1. You define available functions (schema)
2. AI analyzes user request
3. AI selects appropriate function
4. AI generates parameters in correct format
5. Your system executes the function
6. AI incorporates results into response

**Example:**
```
User: "What's the weather in San Francisco?"

AI decides to call:
get_weather(location="San Francisco, CA")

Your system executes, returns:
{"temp": 62, "condition": "partly cloudy"}

AI responds:
"It's currently 62°F and partly cloudy in San Francisco."
```

**Strengths:**
- Natural language → structured API calls
- Multi-parameter handling
- Context-aware function selection

**Limitations:**
- May choose wrong function for ambiguous requests
- Parameter extraction can be incorrect
- No retry logic built-in (you must implement)

---

### 2. Code Execution
**What it does:**
AI generates and runs code to perform computations, data transformations, or analysis.

**Typical environments:**
- Python notebooks
- JavaScript sandboxes
- SQL query engines
- Shell commands (with caution)

**Example use cases:**
- Data analysis and visualization
- Mathematical calculations
- File processing
- API integration testing

**Strengths:**
- Precise calculations (unlike text-based math)
- Access to libraries and tools
- Reproducible operations

**Limitations:**
- Security risks if not sandboxed
- Generated code may have bugs
- Execution errors need handling
- Resource constraints (memory, time)

**Best practices:**
```python
# ✅ Good: Sandboxed, limited permissions
result = execute_in_sandbox(ai_generated_code, timeout=5)

# ❌ Bad: Direct execution
exec(ai_generated_code)  # Security risk!
```

---

### 3. Data Retrieval
**What it does:**
AI fetches information from databases, APIs, files, or search engines.

**Common patterns:**
- **Search**: Web search, document search
- **Query**: Database queries, API calls
- **Read**: File access, document loading
- **Retrieve**: RAG (Retrieval-Augmented Generation)

**Example workflow:**
```
User: "Analyze our Q4 sales"
AI: Calls get_sales_data(quarter="Q4", year=2024)
System: Returns sales data
AI: Generates analysis based on actual data
```

**Advantages over hallucination:**
- Factual accuracy from real data
- Up-to-date information
- Grounded responses

**Challenges:**
- API rate limits
- Data format inconsistencies
- Authentication/authorization
- Error handling

---

### 4. Multi-Step Workflows
**What it does:**
AI chains multiple tool calls together to accomplish complex tasks.

**Example:**
```
Task: "Find the cheapest flight to Tokyo next week and add it to my calendar"

Step 1: search_flights(destination="Tokyo", date_range="next week")
Step 2: get_cheapest_option(results)
Step 3: add_to_calendar(flight_details)
Step 4: Respond with confirmation
```

**Strengths:**
- Autonomous task completion
- Adaptive workflows
- Natural language interface to complex operations

**Limitations:**
- Can get stuck in loops
- May make wrong decisions at intermediate steps
- Debugging is harder
- Cost accumulates with multiple calls

**Orchestration strategies:**
- **Sequential**: One step at a time, human-in-the-loop
- **Autonomous**: AI decides all steps (higher risk)
- **Hybrid**: AI proposes plan, human approves

---

## Tool Types

### Read-Only Tools (Safe)
**Examples:**
- Search (web, database)
- Data retrieval
- File reading
- API queries

**Risk level:** Low
**Best for:** Information gathering

### Write Tools (Moderate Risk)
**Examples:**
- File writing
- Database inserts
- Email sending
- Calendar updates

**Risk level:** Medium
**Requires:** Validation, user confirmation

### Destructive Tools (High Risk)
**Examples:**
- File deletion
- Database drops
- Financial transactions
- System commands

**Risk level:** High
**Requires:** Strict safeguards, human approval, rollback capability

---

## Implementation Patterns

### Pattern 1: Direct Function Calling
```javascript
// Define available tools
const tools = [
  {
    name: "get_weather",
    description: "Get current weather for a location",
    parameters: {
      type: "object",
      properties: {
        location: { type: "string", description: "City name" }
      },
      required: ["location"]
    }
  }
];

// AI decides to call tool
const toolCall = {
  function: "get_weather",
  arguments: { location: "San Francisco" }
};

// Your code executes
const result = await executeToolCall(toolCall);

// AI incorporates result
```

### Pattern 2: Code Interpreter
```python
# AI generates code
code = """
import pandas as pd
data = pd.read_csv('sales.csv')
print(data.groupby('region')['revenue'].sum())
"""

# You execute in sandbox
result = sandbox.run(code, allowed_imports=['pandas'])

# AI uses output in response
```

### Pattern 3: RAG (Retrieval-Augmented Generation)
```
1. User asks question
2. AI generates search query
3. System retrieves relevant documents
4. AI generates answer based on retrieved docs
5. Response includes citations
```

---

## Error Handling

### Common Errors

**API Errors:**
```
- Rate limits exceeded
- Authentication failures
- Network timeouts
- Invalid parameters
```

**Execution Errors:**
```
- Code runtime errors
- Timeout exceeded
- Resource limits
- Permission denied
```

**Logic Errors:**
```
- Wrong function selected
- Incorrect parameters
- Invalid workflow steps
```

### Handling Strategies

**Retry logic:**
```python
max_retries = 3
for attempt in range(max_retries):
    try:
        result = execute_tool(tool_call)
        break
    except RateLimitError:
        time.sleep(2 ** attempt)  # Exponential backoff
    except PermissionError:
        # Don't retry, fail immediately
        raise
```

**Fallbacks:**
```python
try:
    result = primary_tool()
except ToolError:
    result = fallback_tool()  # Alternative approach
```

**Graceful degradation:**
```
If tool unavailable → Inform user and offer alternative
If partial success → Return what worked + explain failure
If total failure → Clear error message + suggested fix
```

---

## Security Considerations

### Input Validation
```python
# ✅ Validate AI-generated parameters
def validate_location(loc):
    if len(loc) > 100:  # Prevent injection
        raise ValueError("Location too long")
    if contains_special_chars(loc):
        raise ValueError("Invalid characters")
    return sanitize(loc)

location = validate_location(ai_params["location"])
```

### Sandboxing
```python
# ✅ Limited execution environment
sandbox = CodeSandbox(
    allowed_imports=['pandas', 'numpy'],
    max_memory_mb=512,
    timeout_seconds=30,
    network_access=False
)
```

### Permission Scoping
```python
# ✅ Limit AI to specific actions
allowed_tools = {
    "read_data": PermissionLevel.USER,
    "write_data": PermissionLevel.ADMIN,
    "delete_data": PermissionLevel.NONE  # Never allow
}
```

### Audit Logging
```python
# ✅ Track all tool usage
log_tool_call(
    user_id=current_user,
    tool_name=tool_call.function,
    parameters=tool_call.arguments,
    result=execution_result,
    timestamp=now()
)
```

---

## Best Practices

### Tool Design

**Clear descriptions:**
```
❌ "Get data"
✅ "Retrieves sales data for specified date range and region. Returns JSON with revenue, units sold, and top products."
```

**Explicit parameters:**
```json
{
  "name": "search_products",
  "parameters": {
    "query": "string (required) - search keywords",
    "category": "string (optional) - filter by category",
    "max_results": "integer (optional, default 10) - max items to return"
  }
}
```

**Error responses:**
```json
{
  "success": false,
  "error": "Rate limit exceeded",
  "retry_after": 60,
  "user_message": "Please try again in 1 minute"
}
```

### Workflow Design

**Progressive disclosure:**
```
1. Start with simple, safe tools
2. Add complex tools as needed
3. Require confirmation for destructive actions
4. Log everything for debugging
```

**Human-in-the-loop:**
```
For high-stakes decisions:
- AI proposes action
- Show user what will happen
- Require explicit approval
- Execute only after confirmation
```

**Cost management:**
```
- Set per-user tool call limits
- Implement caching for repeated queries
- Use cheaper tools when possible
- Monitor and alert on unusual usage
```

---

## Model Comparison

| Capability | Claude | GPT-4 | Gemini | Notes |
|-----------|---------|-------|---------|-------|
| Function calling | Excellent | Excellent | Good | Top models very capable |
| Code generation | Excellent | Excellent | Good | Similar quality |
| Multi-step workflows | Very Good | Very Good | Good | Requires orchestration |
| Error recovery | Good | Good | Fair | You must implement retry logic |
| Parameter extraction | Excellent | Very Good | Good | Claude slightly better at complex params |

---

## Real-World Examples

### Example 1: Customer Support Bot
```
User: "When is my order arriving?"

Tool flow:
1. extract_order_id(from user context)
2. get_order_status(order_id)
3. get_shipping_eta(tracking_number)
4. Format response with actual data
```

### Example 2: Data Analysis Agent
```
User: "Show me sales trends by region"

Tool flow:
1. query_database("SELECT region, SUM(sales) FROM orders WHERE date > '2024-01-01' GROUP BY region")
2. generate_chart(data)
3. analyze_trends(data)
4. Return analysis + visualization
```

### Example 3: Automation Workflow
```
User: "Email me a summary of unread messages"

Tool flow:
1. get_unread_emails()
2. summarize_emails(emails)
3. send_email(to=user, subject="Email Summary", body=summary)
```

---

## Common Pitfalls

### Pitfall 1: Over-Autonomous Systems
```
❌ Letting AI make irreversible decisions
✅ Require confirmation for destructive actions
```

### Pitfall 2: Poor Error Handling
```
❌ Showing technical errors to end users
✅ Graceful fallbacks with clear messaging
```

### Pitfall 3: Insufficient Validation
```
❌ Trusting AI-generated parameters blindly
✅ Validate all inputs before execution
```

### Pitfall 4: No Rate Limiting
```
❌ Unlimited tool calls per user
✅ Implement quotas and throttling
```

---

## Key Takeaways

1. **Tool use transforms AI** from text generator to action-taker
2. **Security is critical** - validate, sandbox, log everything
3. **Error handling matters** - APIs fail, plan accordingly
4. **Start simple** - Read-only tools first, write tools with care
5. **Human oversight** for high-stakes actions

---

*See also: [Reasoning](reasoning.md), [Failure Modes](failure-modes.md), [Automation Path](../paths/automation.md)*
