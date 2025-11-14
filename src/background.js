import { streamControllers, invokeLLM } from "./llm_caller.js";

chrome.runtime.onMessage.addListener(async (message, sender, _) => {
  if (message.type === "WEB_TEXT_GEN") {
    await invokeLLM(sender.tab.id, message.popupId, message.content);
  } else if (message.type === "WEB_CANCEL_STREAM") {
    streamControllers[`${sender.tab.id}-${message.popupId}`].abort();
  }
});

chrome.commands.onCommand.addListener(async (command) => {
  const tabs = await chrome.tabs.query({ currentWindow: true, active: true });

  if (tabs === undefined || tabs.length == 0) {
    return;
  }

  if (command === "text-generation") {
    const tabId = tabs[0]["id"];

    chrome.tabs.sendMessage(tabId, {
      type: "SER_TEXT_GEN_KEY_TRIGGERED",
    });
  }
});

export function sendMessage(type, tabId, popupId, content) {
  chrome.tabs.sendMessage(tabId, {
    type: type,
    popupId: popupId,
    content: content,
  });
}
