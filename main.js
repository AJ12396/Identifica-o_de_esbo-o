function preload(){
    classifier = ml5.imageClassifier("DoodleNet")
}

function setup() {
    canvas = createCanvas(280,280)
    canvas.center()
    background("white")
    canvas.mouseReleased(classifyCanvas)
    synth = window.speechSynthesis
}

function draw() {
    strokeWeight(6)
    stroke("black")
    if (mouseIsPressed) {
        line(pmouseX, pmouseY, mouseX, mouseY)
    }
}

function cleanCanvas() {
    background("white")
}

function classifyCanvas() {
    classifier.classify(canvas, gotResult)
}

function gotResult(error,results) {
    if (error) {
        console.log(error)
    }

    document.getElementById("label").innerHTML = "Legenda: "+ results[0].label
    document.getElementById("confidence").innerHTML = "Porcentagem de certeza: "+ Math.round(results[0].confidence*100) + "%"
    utterThis = new SpeechSynthesisUtterance(results[0].label)
    synth.speak(utterThis)
}