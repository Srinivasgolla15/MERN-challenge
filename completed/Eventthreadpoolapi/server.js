const express = require("express");
const fs = require("fs");
const crypto = require("crypto");

const app = express();

console.log("Server file loaded");


// basic route

app.get("/", (req, res) => {
  res.send("Event Loop Lab Running");
});

app.listen(3000, () => {
  console.log("Server running on port 3000");
});

// timers phase

app.get("/timers", (req, res) => {
  setTimeout(() => {
    console.log("setTimeout");
  }, 0);

  setImmediate(() => {
    console.log("setImmediate");
  });

  res.send("Check console for order");
});

//poll phase

app.get("/poll", (req, res) => {
  fs.readFile(__filename, () => {
    console.log("fs.readFile callback");

    setTimeout(() => {
      console.log("setTimeout");
    }, 0);

    setImmediate(() => {
      console.log("setImmediate");
    });
  });

  res.send("Triggered fs.readFile");
});


//cryto phase

app.get("/crypto", (req, res) => {
  const start = Date.now();

  for (let i = 0; i < 6; i++) {
    crypto.pbkdf2("pass", "salt", 100000, 64, "sha512", () => {
      console.log("Crypto done in", Date.now() - start);
    });
  }

  res.send("Crypto tasks started");
});

// nextTick and Promises

app.get("/nexttick", (req, res) => {
  process.nextTick(() => {
    console.log("process.nextTick");
  });
    Promise.resolve().then(() => {
    console.log("Promise resolved");
    });

  res.send("Check console for nextTick and Promise order");
});

//blocking code
app.get("/block", (req, res) => {
  const start = Date.now();
  while (Date.now() - start < 5000) {}

  res.send("Blocking finished");
});


//non-blocking code

app.get("/non-block", (req, res) => {
  setTimeout(() => {
    res.send("Non-blocking done");
  }, 5000);
});

//microtasks vs macrotasks

app.get("/microtask", (req, res) => {
  Promise.resolve().then(() => console.log("Promise"));

  setTimeout(() => console.log("Timeout"), 0);

  res.send("Check console");
});
