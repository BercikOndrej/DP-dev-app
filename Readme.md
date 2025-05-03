# WEBOVÁ APLIKACE SPOLKU LESNÍ DĚTSKÝ KLUB POJDTĚ VEN

- Webová aplikace reprezentující spolek Lesního dětského klubu Pojďte ven
- Jedná se o development verzi vhodnou pro lokální testování
- DB je taktéž lokální a nezávislá na ostatních verzích aplikace
- Aplikace obsahuje 3 části: Frontend, Backend a databázi -> tedy 3 kontejnery

## Požadavky

- [Docker](https://www.docker.com/products/docker-desktop/)
- `docker compose` (dnes již součástí nástroje Docker)

## Spuštění aplikace

- `docker compose up` -> spuštení aplikace (kontejnerů)
- `docker compose up -d` -> spuštění aplikace (kontejnerů) na pozadí

- Nejprve je nutné rozbalit src.zip archiv -> výsledkem je nová složka 'src', která obsahuje zdrojový kód aplikace
- Ujisti se, že se nacházíš ve složce se souborem `docker-compose.yml` a že je spuštěný `Docker Desktop`
- Aplikace je po spuštění dostupná ve webovém prohlížeči na adrese `http://localhost:5173` (FE) a `http://localhost:3000` (BE)

## Ukončení aplikace

- `docker compose down` -> ukončení aplikace (kontejnerů)
- Ujisti se, že se nacházíš ve složce se souborem `docker-compose.yml` a že je spuštěný Docker Desktop

## Přístup

**admin**

- email: upol.test@seznam.cz
- heslo: Password1

**user**

- email: pojdteven.itpodpora@gmail.com
- heslo: Password1

## Testovací data + testování

- Po spuštění aplikace jsou k dispozici testovací data
- Test user má přidělené 2 děti na spravování docházky
- Docházka je určena pro měsíc červen roku 2025 (zde lze spatřit již zapsanou a naplánovanou docházku)
- Pro otestování funkcionality resetování hesla je k dispozici i testovací email účet (admin)
