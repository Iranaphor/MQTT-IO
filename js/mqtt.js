var mqtt;

function onConnect() { console.log("Connected"); }
function onFailure() { console.log("Failed to connected"); }

function sub(topic) { mqtt.subscribe(topic); }
function pub(msg, topic) {
    message = new Paho.MQTT.Message(msg);
    message.destinationName = topic;
    mqtt.send(message);
}

const feed=document.getElementById("feed");
function onMessageArrived(msg){
    data = msg.payloadString;
    topic = msg.destinationName;
    console.log(data);
    feed.innerHTML = out_msg;
}

function onConnectionLost(responseObject) {
  if (responseObject.errorCode !== 0) {
    console.log("onConnectionLost:"+responseObject.errorMessage);
  }
}

// Call this function to begin connection process
function MQTTconnect() {
    console.log("connecting...");

    mqtt = new Paho.MQTT.Client("ws://localhost:8883/", "client_name");
    console.log(mqtt)
    console.log(mqtt.client_id)

    var options = {onSuccess:onConnect, onFailure:onFailure};
    mqtt.onMessageArrived = onMessageArrived;
    mqtt.onConnectionLost = onConnectionLost;

    mqtt.connect(options);
}
