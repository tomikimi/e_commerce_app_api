const express = require("express");
const session = require("express-session");
const passport = require("passport");
const authenticateRouter = require("./routes/authenticate");
const categoryRouter = require("./routes/category");
const userRouter = require("./routes/users");
const productRoute = require("./routes/products");
const app = express();

const store = new session.MemoryStore();

app.use(
  session({
    secret: "Atn3@071090",
    cookie: { maxAge: 1000 * 60 * 60 * 24, secure: false, sameSite: "none" },
    resave: false,
    saveUninitialized: false,
    store,
  }),
);

app.use(passport.initialize());
app.use(passport.session());

app.use(express.json());

app.use("/authenticate", authenticateRouter);
app.use("/category", categoryRouter);
app.use("/users", userRouter);
app.use("/products", productRoute);

module.exports = { app };
