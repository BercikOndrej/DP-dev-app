"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const tslib_1 = require("tslib");
const config_1 = tslib_1.__importDefault(require("config"));
function getTeacherChangeInfoHtmlEmail(originTeacher, nextTeacher, date) {
    const beDomain = config_1.default.get('backendDomain');
    const datum = date.format('D. M. YYYY');
    return `<!DOCTYPE html>
<html lang="en">

<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <meta name="author" content="Ondřej Berčík" />
  <title>Email</title>
</head>

<body style="margin: 0;">
  <main>
    <div style="display: flex; flex-direction: column; padding: 1em; margin: auto; width: max-content;">
      <img src="${beDomain}/static/Logo.webp" width="500" height="150" />
      <h1>Hlásíme změnu průvodce</h1>
      <p>
        Dobrý den,
        <br />
        <br />
        Tento email Vám byl zaslán za účelem oznámení, že naposlední chvíli měníme obsazení průvodců na den ${datum}.
      </p>
      <br />
      <br />
      <p>Změna:</p>

      <div
        style="width: auto; display: grid; grid-template-columns: 1fr 1fr; grid-template-rows: 1fr 1fr; gap: 1em; background: #A0C544; border-radius: 1em; margin-top: 2em; margin-bottom: 2em; padding: 1em; color: white; font-weight: 900;">
        <p style="margin: 0; display: flex; justify-self: center;">Původní průvodce</p>
        <p style="margin: 0; display: flex; justify-self: center;">Nový průvodce</p>
        <p style="margin: 0; color: red; display: flex; justify-self: center">${originTeacher}</p>
        <p style="margin: 0; color: saddlebrown; display: flex; justify-self: center">${nextTeacher}</p>
      </div>
      <div style="width: auto; display: flex; flex-direction: row;   justify-content: center; gap: 1em;">
      </div>
      <div style="width: auto; display: flex; flex-direction: row;   justify-content: center; gap: 1em;">
      </div>

      <div
        style="width: auto; background-color: #A0C544; border: 0; border-radius: 1em; margin-top: 1em; margin-bottom: 1em; height: 3px;">
      </div>
      <p>Váš tým Lesního dětského klubu Pojďte ven.</p>
    </div>
  </main>
</body>
</html>`;
}
exports.default = getTeacherChangeInfoHtmlEmail;
//# sourceMappingURL=getTeacherChangeInfoHtmlEmail.js.map