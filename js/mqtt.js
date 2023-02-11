var mqtt;

function onConnect() {
    console.log("Connected");
    sub('rohi2/rasberry_coordination/scheduler/available')
    sub('feed')
}
function onFailure() {
    console.log("Failed");
}

function sub(topic) { mqtt.subscribe(topic); }
function pub(msg, topic) {
    message = new Paho.MQTT.Message(msg);
    message.destinationName = topic;
    mqtt.send(message);
}

function onMessageArrived(msg){
    console.log("Message arrived from " + msg.destinationName);

    console.log(msg);
    data = msg.payloadString;
    topic = msg.destinationName;

    console.log("Attaching to <div id='feed'>");
    feed = document.getElementById("feed");
    feed.innerHTML = data;
}

function onConnectionLost(responseObject) {
  if (responseObject.errorCode !== 0) {
    console.log("onConnectionLost:"+responseObject.errorMessage);
  }
}

// Call this function to begin connection process
function MQTTconnectBtn() {
    inp = document.getElementById("urlIn");
    MQTTconnect(inp.value);
}
function MQTTconnect(url="ws://10.5.39.140:8883/") {
    console.log("connecting...");

    mqtt = new Paho.MQTT.Client(url, "client_name");

    console.log(mqtt)
    console.log(mqtt.client_id)

    var options = {onSuccess:onConnect, onFailure:onFailure};
    mqtt.onMessageArrived = onMessageArrived;
    mqtt.onConnectionLost = onConnectionLost;

    mqtt.connect(options);
}


//    LCAS broker:
//    ------------
//    mqtt = new Paho.MQTT.Client(  "ws://mqtt.lcas.group:8883/", "client_name");    //x  (no)   (maybe not configured?)
//    mqtt = new Paho.MQTT.Client( "wss://mqtt.lcas.group:8883/", "client_name");    //   (no)   (not configured anyway?)
//    mqtt = new Paho.MQTT.Client("mqtt://mqtt.lcas.group:1883/", "client_name");    //o  ERROR

//    Local broker:
//    -------------
//    mqtt = new Paho.MQTT.Client(  "ws://localhost:8883/", "client_name");          //o  (yes)
//    mqtt = new Paho.MQTT.Client( "wss://localhost:8883/", "client_name");          //   (fail) (not configured?)
//    mqtt = new Paho.MQTT.Client("mqtt://localhost:8884/", "client_name");          //o  ERROR (CRITICAL ONE)

//    Notes:
//    ------
//    If we can get mqtt://local, we can get mqtt://lcas
//    ws://lcas may be on a different port or inactive/inaccesisble
//    The Paho Javascript driver requires the broker to support and be configured to accept connections from clients using MQTT over WebSockets.


