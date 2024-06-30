const express = require('express');
const exphbs = require('express-handlebars');
const routes = require('./controllers');
const sequelize = require('./config/connection');
const helpers = require('./utils/helpers');
const session = require('express-session');
const SequelizeStore = require('connect-session-sequelize')(session.Store);
require ('dotenv').config();

const app = express();
const path = require("path");

const PORT = process.env.PORT || 3001;

// if helpers functions are created later { helpers } needs to be an option exphbs.create({ helpers })
const hbs = exphbs.create( {helpers} );

app.engine('handlebars', hbs.engine);
app.set('view engine', 'handlebars');

const sesh = {
  secret: process.env.SESSION_SECRET,
  cookie: {
    maxAge: 1000 * 60 * 60,
    // secure: process.env.NODE_ENV === "production",
    httpOnly: true,
  },
  resave: false,
  saveUninitialized: false,
  store: new SequelizeStore({
    db: sequelize,
  }),
};

app.use(session(sesh));

app.use(express.json());
app.use(express.urlencoded({extended: true}));
app.use(express.static(path.join(__dirname, 'public')));
//bootstrap
app.use("/css", express.static(__dirname + "/node_modules/bootstrap/dist/css"));
app.use("/js", express.static(__dirname + "/node_modules/bootstrap/dist/js"));

app.use(routes);

sequelize.sync({ force: false }).then(() => {
    app.listen(PORT, () => console.log(`Listening on http://localhost:${PORT}`))
})