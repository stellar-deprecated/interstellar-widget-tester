require("file?name=index.html!./index.html");

require('./styles/main.header.scss');
require('./styles/main.footer.scss');

import interstellarCore, {App, Intent} from "interstellar-core";
import interstellarNetwork from "interstellar-network";
import interstellarSessions from "interstellar-sessions";

import interstellarNetworkWidgets from "interstellar-network-widgets";

let config = require('./config.json');
const app = new App("interstellar-test-app", config);

app.use(interstellarCore);
app.use(interstellarNetwork);
app.use(interstellarSessions);

app.use(interstellarNetworkWidgets);

app.templates   = require.context("raw!./templates", true);
app.controllers = require.context("./controllers",   true);

app.routes = ($stateProvider) => {
  $stateProvider.state('main', {
    url: "/",
    templateUrl: "interstellar-test-app/main"
  });
};

app.bootstrap();
