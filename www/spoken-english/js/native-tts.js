/* LearnWell native-voice bridge.
   Inside the Capacitor Android app, the WebView has no working Web Speech API.
   If the native Text-to-Speech plugin is present, this file provides a small
   speechSynthesis look-alike that speaks through the phone's own voices, so
   engine.js needs no changes. In a normal browser it does nothing. */
(function () {
  "use strict";
  function plugin() {
    try { var c = window.Capacitor || (window.parent && window.parent.Capacitor); return c && c.Plugins && c.Plugins.TextToSpeech || null; } catch (e) { return null; }
  }
  var P = plugin();
  if (!P) return;

  var queue = [], busy = false, token = 0, langs = null, handlers = [];

  function voice(lang) { return { lang: lang, name: "Phone voice " + lang, localService: true, default: false, voiceURI: "native-" + lang }; }
  function voiceList() {
    var out = [];
    if (!langs || langs.some(function (l) { return /^en/i.test(l); })) out.push(voice("en-IN"));
    if (!langs || langs.some(function (l) { return /^hi/i.test(l); })) out.push(voice("hi-IN"));
    return out;
  }
  function Utter(text) { this.text = text; this.lang = ""; this.voice = null; this.rate = 1; this.pitch = 1; this.volume = 1; }

  function next() {
    if (busy || !queue.length) return;
    var u = queue.shift(), my = token; busy = true;
    var lang = u.lang || (u.voice && u.voice.lang) || "en-IN";
    function done(err) {
      if (my !== token) return;
      busy = false;
      if (err && u.onerror) { try { u.onerror({ error: "synthesis-failed" }); } catch (e) { /* ignore */ } }
      else if (u.onend) { try { u.onend({}); } catch (e) { /* ignore */ } }
      next();
    }
    if (u.onstart) { try { u.onstart({}); } catch (e) { /* ignore */ } }
    try {
      P.speak({ text: u.text, lang: lang, rate: Math.max(0.5, Math.min(1.5, u.rate || 1)), pitch: u.pitch || 1, volume: 1, category: "ambient", queueStrategy: 0 })
        .then(function () { done(false); }, function () { done(true); });
    } catch (e) { done(true); }
  }

  var synth = {
    speaking: false, pending: false, paused: false, onvoiceschanged: null,
    getVoices: function () { return voiceList(); },
    speak: function (u) { queue.push(u); next(); },
    cancel: function () { token++; queue = []; busy = false; try { P.stop(); } catch (e) { /* ignore */ } },
    pause: function () {}, resume: function () {},
    addEventListener: function (n, f) { if (n === "voiceschanged") handlers.push(f); },
    removeEventListener: function () {}
  };
  try { Object.defineProperty(window, "speechSynthesis", { value: synth, configurable: true, writable: true }); } catch (e) { window.speechSynthesis = synth; }
  window.SpeechSynthesisUtterance = Utter;

  try {
    P.getSupportedLanguages().then(function (r) {
      langs = (r && r.languages) || null;
      if (synth.onvoiceschanged) { try { synth.onvoiceschanged(); } catch (e) { /* ignore */ } }
      handlers.forEach(function (f) { try { f(); } catch (e) { /* ignore */ } });
    }, function () { /* keep assuming both voices exist */ });
  } catch (e) { /* ignore */ }
})();
