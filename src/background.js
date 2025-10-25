import { invokeLLM } from "./llm_caller.js";

chrome.runtime.onMessage.addListener(async (message, sender, _) => {
  if (message.type === "TEXT_MARKED") {
    await invokeLLM(sender.tab.id, message.popupId, message.content);
  }
});

export function sendMessage(type, tabId, popupId, content) {
  chrome.tabs.sendMessage(tabId, {
    type: type,
    popupId: popupId,
    content: content,
  });
}
