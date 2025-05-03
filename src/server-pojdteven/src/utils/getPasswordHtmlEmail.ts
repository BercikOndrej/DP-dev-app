import config from 'config';

function getResetPasswordHtmlEmail(token: string): string {
  const feUrl = `${config.get('frontendDomain') as string}/resetHesla/${token}`;
  const beDomain = config.get('backendDomain') as string;
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
      <h1>Resetování hesla</h1>
      <p>
        Dobrý den,
        <br />
        <br />
        Tento email byl zaslán na základě Vaší žádosti o resetování hesla.
      </p>
      <a href="${feUrl}" target="_blank"
        style="padding: 1em; padding-left: 3em; text-decoration: none; padding-right: 3em; width:auto; margin-top: 2em; margin-bottom: 2em; text-align: center; font-weight: 900; font-size:large; background-color: #A0C544; color: white; border: 0; border-radius: 0.5em; "
        onmouseover="this.style.background='#CE374A'" onMouseOut="this.style.background='#A0C544'">Resetovat heslo</a>
      <p>
        Pokud jste nežádal/a o resetování hesla, doporučujeme vám zkontrolovat Váš účet.
      </p>

      <div
      style="width: auto; background-color: #A0C544; border: 0; border-radius: 1em; margin-top: 1em; margin-bottom: 1em; height: 3px;">
    </div>
    <p>Váš tým Lesního dětského klubu Pojďte ven.</p>
    </div>
  </main>
</body>

</html>`;
}

export default getResetPasswordHtmlEmail;
