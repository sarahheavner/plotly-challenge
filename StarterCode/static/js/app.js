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
  chartInfo("940");



//Create function that uses d3 to read json data and append metadata to panel
function panelInfo(personID) {
  d3.json("../data/samples.json").then((data) => {
    //store metadata into variable
    var metadata = data.metadata;
    //Filter data by personID
    var filterData = metadata.filter((firstObject) => firstObject.id == personID);
    //Set first result as variable and log in console
    var firstResult = filterData[0];
    console.log(firstResult);
    //Use d3 to create reference to metadata panel
    var infoPanel = d3.select("#sample-metadata");
    //Clear any previous metadata
    infoPanel.html("");
    //Use object.entries to select key/value for initial result
    Object.entries(firstResult).forEach(([key, value]) => {
        //Append key/value to panel
      infoPanel.append("h6").text(`${key}:${value}`);
    });
  }); 
};

//Create function that uses d3 to read json data and append graphs
function chartInfo(personID) {
  d3.json("../data/samples.json").then((data) => {
    //store bacteria sample data into variable
    var chartData = data.samples;
    //filter data by personID
    var filterChart = chartData.filter((firstSample) => firstSample.id == personID);
    //set result as variable and log in console
    var firstChart = filterChart[0];
    console.log(firstChart);

    //create variables for charts 
    var otu_ids = firstChart.otu_ids;
    var yticks = otu_ids.slice(0, 10).map(otuID => `OTU ${otuID}`).reverse();
    var sample_values = firstChart.sample_values;
    var otu_labels = firstChart.otu_labels;
    


    //Trace for bar chart
    var barTrace = {
      x: sample_values.slice(0, 10).reverse(),
      y: yticks,
      text: otu_labels,
      type: "bar",
      orientation: "h"
    };

    //Data for bar chart
    var barData = [barTrace];

    //Layout for bar chart
    var barLayout = {
      title: "Top 10 Bacterial Samples",
      xaxis: { title: "Sample Values" },
      yaxis: { title: "OTU ID" }
    };
    
    //Plot bar chart
    Plotly.newPlot("bar", barData, barLayout);

    //Create trace for bubble chart
    var bubbleTrace = {
      x: otu_ids,
      y: sample_values,
      mode: "markers",
      marker: {
        size: sample_values,
        color: otu_ids,
      }, 
      text: otu_labels
    };

    //Data for bubble chart
    var bubbleData = [bubbleTrace];

    //Layout for bubble chart
    var bubbleLayout = {
      title: "Bacteria Cultures Per Sample",
      hovermode: "closest",
      xaxis: { title: "OTU ID" },
    };
    
    //Plot bubble chart
    Plotly.newPlot("bubble", bubbleData, bubbleLayout);

  });
};