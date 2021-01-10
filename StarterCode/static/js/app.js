// Fetch the JSON data and console log it
d3.json("../data/samples.json").then(function(data) {
    console.log(data);
  });


// Use d3 to read json data and append names to dropdown menu
d3.json("../data/samples.json").then((data) => {
  data.names.forEach((person) => {
  d3.select("#selDataset").append("option")
                          .text(person)
                          .property("value", person);
    });
  });


//Create function that uses d3 to read json data and append metadata to panel
function panelInfo(personID) {
  d3.json("../data/samples.json").then((data => {
      //Use d3 to create reference to panel
    var infoPanel = d3.select("#sample-metadata");
      //Use object.entries to select key/value for object
    Object.entries(data).forEach(([key, value]) => {
        //Append key/value to panel
      infoPanel.append("p").text(`${key}:${value}`);
    });
  })); 
};


