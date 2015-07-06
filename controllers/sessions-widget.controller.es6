import {Widget, Intent, Inject} from "interstellar-core";
import {Keypair} from "stellar-base";

@Widget("sessions", "SessionsWidgetController", "interstellar-test-app/sessions-widget")
@Inject("$scope", "$timeout", "interstellar-sessions.Sessions", "interstellar-network.Server", "interstellar-core.IntentBroadcast")
export default class SessionsWidgetController {
  constructor($scope, $timeout, Sessions, Server, IntentBroadcast) {
    this.$scope = $scope;
    this.$timeout = $timeout;
    this.Sessions = Sessions;
    this.Server = Server;
    this.IntentBroadcast = IntentBroadcast;

    let randomKeypair = Keypair.random();
    this.secret = randomKeypair.seed();
    this.data = '{}';
    this.friendbotSent = false;

    if (Sessions.hasDefault()) {
      this.session = Sessions.default;
    }

    IntentBroadcast.registerReceiver(Intent.TYPES.LOGOUT, () => this.session = null);
  }

  create() {
    let keypair = Keypair.fromSeed(this.secret);
    this.Sessions.createDefault({
      permanent: true,
      username: this.username,
      address: keypair.address(),
      secret: keypair.seed(),
      data: JSON.parse(this.data)
    }).then(() => {
      this.session = this.Sessions.default;
      this.$scope.$apply();
    });
  }

  friendbot() {
    this.Server.friendbot(this.session.getAddress())
      .then(() => {
        this.friendbotSent = true;
        this.$timeout(() => this.friendbotSent = false, 3000);
        this.$scope.$apply();
      })
  }

  destroy() {
    this.Sessions.destroyAll();
    this.session = null;
  }
}
