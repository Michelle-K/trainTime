//==========================   DATABASE   ===============================//
   // Initialize Firebase
  var config = {
    apiKey: "AIzaSyD9NP9hvOTFdtMZeEqX4y2-KaS0ThA2UZ4",
    authDomain: "train-time-f5667.firebaseapp.com",
    databaseURL: "https://train-time-f5667.firebaseio.com",
    projectId: "train-time-f5667",
    storageBucket: "",
    messagingSenderId: "983391407455"
  };
  firebase.initializeApp(config);



//==========================   VARIABLES   ===============================//


  var tFrequency = "";

  var firstTrainTime = "";

  var minsUntilTrain="";

  var data =[[
        
          ],
        [
         
        ]];

  database = firebase.database();



database.ref().on("child_added", function(childSnapshot) {
  
  var temp= [];
  temp.push(childSnapshot.val().name);
  temp.push(childSnapshot.val().destination);
  temp.push(childSnapshot.val().firstTrainTime);
  temp.push(childSnapshot.val().frequency);
  

  console.log(temp);
  data.push(temp);
  console.log(data);
 
  
// Assumptions
    tFrequency = childSnapshot.val().frequency;

    // Time is 3:30 AM
    var firstTime = childSnapshot.val().firstTrainTime;

    // First Time (pushed back 1 year to make sure it comes before current time)
    var firstTimeConverted = moment(firstTime, "hh:mm").subtract(1, "years");
    console.log(firstTimeConverted);

    // Current Time
    var currentTime = moment();
    console.log("CURRENT TIME: " + moment(currentTime).format("hh:mm"));

    // Difference between the times
    var diffTime = moment().diff(moment(firstTimeConverted), "minutes");
    console.log("DIFFERENCE IN TIME: " + diffTime);

    // Time apart (remainder)
    var tRemainder = diffTime % tFrequency;
    console.log(tRemainder);

    // Minute Until Train
    var tMinutesTillTrain = tFrequency - tRemainder;
    console.log("MINUTES TILL TRAIN: " + tMinutesTillTrain);

    // Next Train
    var nextTrain = moment().add(tMinutesTillTrain, "minutes");
    console.log("ARRIVAL TIME: " + moment(nextTrain).format("hh:mm"));
    var nextTrainTime = moment(nextTrain).format("hh:mm");

  
    $("#resultsBox").append(
        "<tr><td>" + childSnapshot.val().name 
        + "</td><td>" + childSnapshot.val().destination
        + "</td><td>" + childSnapshot.val().frequency
        + "</td><td>" + nextTrainTime //next arrival--------
        + "</td><td>" + tMinutesTillTrain  //minutes away-------
        + "</td></tr>"
      );
});    



  $("button").on("click",function(){


      var name = $("#name").val().trim();
      var destination = $("#destination").val().trim();
      var frequency = $("#frequency").val().trim();
      var firstTrainTime = $("#firstTrainTime").val().trim();

      


      database.ref().push({
        name: name,
        destination: destination,
        frequency: frequency,
        firstTrainTime: firstTrainTime,
        
      });

    
 // Clears all of the text-boxes
        $('#name').val("");
        $("#destination").val("");
        $("#frequency").val("");
        $("#firstTrainTime").val("");

    });









