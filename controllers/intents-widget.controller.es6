import {Intent} from "interstellar-core";
import {Widget, Inject} from "interstellar-core";
import {Keypair} from "stellar-base";

@Widget("intents", "IntentsWidgetController", "interstellar-test-app/intents-widget")
@Inject("$scope", "interstellar-core.IntentBroadcast")
export default class IntentsWidgetController {
  constructor($scope, IntentBroadcast) {
    this.$scope = $scope;
    this.IntentBroadcast = IntentBroadcast;
    this.types = Intent.TYPES;
    this.data = '{}';
    this.receivedIntents = [];

    IntentBroadcast.registerGlobalReceiver(intent => {
      let time = new Date();
      this.receivedIntents.push({time, intent});
    });
  }

  broadcast() {
    let intent = new Intent(Intent.TYPES[this.type], JSON.parse(this.data));
    this.IntentBroadcast.sendBroadcast(intent);
  }
}
