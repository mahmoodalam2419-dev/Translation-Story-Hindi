// Runs once per build, right after `npx cap add android` freshly generates
// the native project (so there's never anything stale to clean up first).
// Inserts what the TTS and AdMob plugins need into AndroidManifest.xml and
// strings.xml, using only the closing tags as anchors (</application>,
// </manifest>, </resources>) since those never vary between Capacitor
// versions, unlike the opening tags' attributes.
const fs = require('fs');

const manifestPath = 'android/app/src/main/AndroidManifest.xml';
let manifest = fs.readFileSync(manifestPath, 'utf8');

const metaData = `        <meta-data android:name="com.google.android.gms.ads.APPLICATION_ID" android:value="@string/admob_app_id" />\n    </application>`;
if (!manifest.includes('com.google.android.gms.ads.APPLICATION_ID')) {
  manifest = manifest.replace('    </application>', metaData);
}

const queriesBlock = `    <queries>\n        <intent>\n            <action android:name="android.intent.action.TTS_SERVICE" />\n        </intent>\n    </queries>\n</manifest>`;
if (!manifest.includes('TTS_SERVICE')) {
  manifest = manifest.replace('</manifest>', queriesBlock);
}

fs.writeFileSync(manifestPath, manifest);
console.log('Patched AndroidManifest.xml');

const stringsPath = 'android/app/src/main/res/values/strings.xml';
let strings = fs.readFileSync(stringsPath, 'utf8');

// Google's TEST AdMob App ID — safe for development, never causes invalid
// traffic. Change ADMOB_APP_ID below to your real App ID (from the AdMob
// console — the one with a ~, not a /) before publishing.
const ADMOB_APP_ID = 'ca-app-pub-3940256099942544~3347511713';
if (!strings.includes('admob_app_id')) {
  strings = strings.replace('</resources>', `    <string name="admob_app_id">${ADMOB_APP_ID}</string>\n</resources>`);
  fs.writeFileSync(stringsPath, strings);
  console.log('Patched strings.xml');
}
