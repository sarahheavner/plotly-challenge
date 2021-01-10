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

  panelInfo("940");



//Create function that uses d3 to read json data and append metadata to panel
function panelInfo(personID) {
  d3.json("../data/samples.json").then((data) => {
    var metadata = data.metadata;
    var filterData = metadata.filter((firstObject) => firstObject.id == personID);
    var firstResult = filterData[0];
    console.log(firstResult);
      
    //Use d3 to create reference to panel
    var infoPanel = d3.select("#sample-metadata");
    //Clear any previous metadata
    infoPanel.html("");
    //Use object.entries to select key/value for object
    Object.entries(firstResult).forEach(([key, value]) => {
        //Append key/value to panel
      infoPanel.append("h6").text(`${key}:${value}`);
    });
  }); 
};

//Create function that uses d3 to read json data and append graphs
function chartInfo(personID) {
  d3.json("../data/samples.json").then((data) => {
    var otu_ids = data.otu_ids;
    var sample_values = data.sample_values;
    var otu_labels = data.otu_labels;

    var barTrace = {
      x: sample_values,
      y: otu_ids,
      text: otu_labels,
      type: "bar",
      orientation: "h"
    };

    var barData = [barTrace];

    var barLayout = {
      title: "Top 10",
      xaxis: { title: "Sample Values" },
      yaxis: { title: "OTU ID" }
    };
    
    Plotly.newPlot("plot", barData, barLayout);

  });
};