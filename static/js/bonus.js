//bonus
//create gauge
var data = [
    {
        
        value: 270,
        title: { text: "Belly Button Washing Frequency <br> Scrubs per Week", font: {size: 18} },
        type: "indicator",
        mode: "gauge+number"
    }
];

var layout = { 
    width: 600, 
    height: 500, 
    margin: { t: 130, b: 0 } };

Plotly.newPlot('gauge', data, layout);