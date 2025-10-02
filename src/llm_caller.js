console.log("LLM Caller Loaded");

export async function invokeLLM(userSelectionContext) {
  const API_KEY = "";

  const request = await fetch("https://openrouter.ai/api/v1/chat/completions", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: "Bearer " + API_KEY,
    },
    body: JSON.stringify({
      model: "openai/gpt-oss-20b:free",
      messages: [
        {
          role: "system",
          content: [
            {
              type: "text",
              text: "Explain the user what he asks for. **Important** kkep responses to less than 2 lines",
            },
          ],
        },
        {
          role: "user",
          content: [
            {
              type: "text",
              text: userSelectionContext,
            },
          ],
        },
      ],
    }),
  });

  const response = await request.json();

  if (request.ok) {
    const data = response.choices[0].message.content;

    return data;
  } else {
    return false;
  }
}
