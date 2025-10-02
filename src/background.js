import { invokeLLM } from "./llm_caller.js";

console.log("Background File Loaded");

browser.runtime.onMessage.addListener(async (message, sender, _) => {
  if (message.type === "TEXT_SELECTED") {
    console.log("From Tab: " + sender.tab.id + ", Message: " + message.content);

    const llmReply = await invokeLLM(message.content);
    sendMessage(sender.tab.id, llmReply);
  }

  return true;
});

function sendMessage(currentTabId, content) {
  browser.tabs.sendMessage(currentTabId, {
    type: "LLM_REPLY",
    content: content,
  });
}
