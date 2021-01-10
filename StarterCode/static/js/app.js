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
