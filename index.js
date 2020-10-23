import express from "express";
import { promises as fs } from "fs";
import shortid from "shortid";
import cors from "cors";

const app = express();

const { readFile, writeFile } = fs;

app.use(cors());
app.use(express.json());
app.set("view engine", "ejs");
app.use(express.urlencoded({ extended: false }));

app.get("/", async (req, res) => {
  res.render("index", { shortUrls: data.Urls, urlServer: req.url });
});

app.get("/shortUrl", async (req, res) => {
  res.send(data);
});

app.post("/", async (req, res) => {
  try {
    if (req.body.addr) {
      const { addr } = req.body;
      const findIndex = data.Urls.filter((url) => url.addr === addr);
      if (findIndex.length < 1) {
        let Url = {
          id: data.NextId++,
          shortUrl: `${shortid.generate()}`,
          addr: addr,
          numAccess: 0,
        };

        data.Urls.push(Url);

        await writeFile("./db/bancoUrl.json", JSON.stringify(data, null, 2));
        res.render("index", { shortUrls: data.Urls, urlServer: req.url });
      } else {
        res.send("O link enviado já esta cadastrado no banco de dados");
      }
    } else {
      res.render("error", {
        errorMessage: "O campo de link deve ser preenchido!",
      });
    }
  } catch (err) {
    console.log(err.message);
  }
});

app.get("/:shortUrl", async (req, res) => {
  const findIndex = data.Urls.filter(
    (url) => url.shortUrl === req.params.shortUrl
  );
  if (findIndex < 1) return res.sendStatus(404);
  findIndex[0].numAccess++;

  await writeFile("./db/bancoUrl.json", JSON.stringify(data, null, 2));
  res.redirect(findIndex[0].addr);
});

app.listen(process.env.PORT || 3000, async () => {
  console.log("Subiu o APP");

  try {
    await readFile("./db/bancoUrl.json");
  } catch (err) {
    try {
      const base = {
        NextId: 1,
        Urls: [],
      };

      await writeFile("./db/bancoUrl.json", JSON.stringify(base, null, 2));
    } catch (err) {
      console.log(err.message);
    }
  }
  global.data = JSON.parse(await readFile("./db/bancoUrl.json"));
});
