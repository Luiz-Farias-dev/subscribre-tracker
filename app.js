import express from "express";

const app = express();

app.get("/", (req, res) => {
  res.send("Esse é o app subscribe tracker.");
});

app.listen(3000, () => {
  console.log(
    "Subscriptiion Tracker API está rodando em: http://localhost:3000"
  );
});
