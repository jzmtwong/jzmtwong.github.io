//bonus
//create gauge
var dataGauge = [
    {
        domain: { x: [0, 1], y: [0, 1] },
        value: 270,
        title: { text: "Belly Button Washing Frequency Per Week" },
        type: "indicator",
        mode: "gauge+number"
    }
];

var layoutGauge = { 
    width: 600, 
    height: 500, 
    margin: { t: 0, b: 0 } };
Plotly.newPlot('gauge', dataGauge, layoutGauge);