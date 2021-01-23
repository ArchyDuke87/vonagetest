// replace these values with those generated in your TokBox Account
var apiKey = "47090174";
var sessionId = "1_MX40NzA5MDE3NH5-MTYxMTM2MTg4MTQ0MH5oRWNUMG9RL3grWFBDeVNzYkREM1EvMXF-fg";
var token = "T1==cGFydG5lcl9pZD00NzA5MDE3NCZzaWc9Nzk1ODg3NjJiYTYxMGU2MTYzOTFlZGI3N2Q1Mjc3ODVhNjY1MDZhOTpzZXNzaW9uX2lkPTFfTVg0ME56QTVNREUzTkg1LU1UWXhNVE0yTVRnNE1UUTBNSDVvUldOVU1HOVJMM2dyV0ZCRGVWTnpZa1JFTTFFdk1YRi1mZyZjcmVhdGVfdGltZT0xNjExMzYxOTk5Jm5vbmNlPTAuNjU4MzIxMzM2NTc4MDYwNyZyb2xlPXB1Ymxpc2hlciZleHBpcmVfdGltZT0xNjExMzY1NTk3JmluaXRpYWxfbGF5b3V0X2NsYXNzX2xpc3Q9";

// Handling all of our errors here by alerting them
function handleError(error) {
  if (error) {
    alert(error.message);
  }
}

// (optional) add server code here
var SERVER_BASE_URL = 'https://nitolenode.herokuapp.com';
fetch(SERVER_BASE_URL + '/session').then(function(res) {
  return res.json()
}).then(function(res) {
  apiKey = res.apiKey;
  sessionId = res.sessionId;
  token = res.token;
  initializeSession();
}).catch(handleError);


function initializeSession() {
  var session = OT.initSession(apiKey, sessionId);

  // Subscribe to a newly created stream
  session.on('streamCreated', function(event) {
    session.subscribe(event.stream, 'subscriber', {
      insertMode: 'append',
      width: '100%',
      height: '100%'
    }, handleError);
  });

  // Create a publisher
  var publisher = OT.initPublisher('publisher', {
    insertMode: 'append',
    width: '100%',
    height: '100%'
  }, handleError);

  // Connect to the session
  session.connect(token, function(error) {
    // If the connection is successful, initialize a publisher and publish to the session
    if (error) {
      handleError(error);
    } else {
      session.publish(publisher, handleError);
    }
  });
}
