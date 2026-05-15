/** Speak the given text via the Web Speech API. Cancels any pending speech first. */
export function speakText(text: string, langCode: string): void {
  if (!('speechSynthesis' in window)) {
    alert("La synthèse vocale n'est pas supportée par votre navigateur.");
    return;
  }
  window.speechSynthesis.cancel();
  const utterance = new SpeechSynthesisUtterance(text);
  utterance.lang = langCode;
  window.speechSynthesis.speak(utterance);
}
