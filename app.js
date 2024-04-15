const express = require('express');
const app = express();

const fs = require('fs');
const path = require('path');
const bodyParser = require('body-parser');

// Config
const config = require('./config');

// Debug
const debug = require('./src/utils/debug.js');
const moduleLogger = debug('app:module');

// Initializers
const session = require('./src/initializers/session.js');
const database = require('./src/initializers/database.js');

const loadModules = async() => {
  for (const moduleName in config.modules) {
      if (config.modules[moduleName]) {
          const modulePath = path.join(__dirname, 'src', 'modules', moduleName);
          if (fs.existsSync(modulePath)) {
              const module = require(modulePath);
              if (module.init && typeof module.init === 'function') {
                await module.init(app);

                moduleLogger(`Successfully loaded module -> ${moduleName}`);
              }
          }
      }
  }
};

// Session
session.setupSession(app);

// Express settings
app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'src', 'views'));
app.use(express.static(path.join(__dirname, 'public')));
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.urlencoded({ extended: true }));

// Database
database.connectDatabase();

// Routes
const authRoutes = require('./src/routes/auth');
app.use('/auth', authRoutes);

const portalRoutes = require('./src/routes/portal');
app.use('/portal', (req, res, next) => {
  const isLogged = req.session.user && req.session.user != null;

  if (!isLogged) {
    res.redirect("/auth/login");
  } else {
    portalRoutes(req, res, next);
  }
});

// Page 404
app.use((req, res) => {
  res.status(404).render("index/404");
});

loadModules().then(() => {
  const port = config.port;
  app.listen(port, () => console.log(`Server running on port ${port}`));
});

