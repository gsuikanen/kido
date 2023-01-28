var plate = document.getElementById("plate");
var bacon = document.getElementById("bacon");

plate.addEventListener("drop", function(event) {
    event.preventDefault();
    var data = event.dataTransfer.getData("text");
    event.target.appendChild(document.getElementById(data));
});

plate.addEventListener("dragover", function(event) {
    event.preventDefault();
});

bacon.addEventListener("dragstart", function(event) {
    event.dataTransfer.setData("text", event.target.id);
});

document.body.addEventListener("drop", function(event) {
    event.preventDefault();
    var data = event.dataTransfer.getData("text");
    event.target.appendChild(document.getElementById(data));
});

document.body.addEventListener("dragover", function(event) {
    event.preventDefault();
});
