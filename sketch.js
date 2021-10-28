let maxPop;
let target;
let mutationRate;
let population;
let i = 0;

function setup() {
  maxPop = 200;
  target = "Survival of the fittest";
  mutationRate = 0.01;

  population = new Population(target, maxPop, mutationRate);
  console.log(population);
}

function draw() {
  
  population.calcFitness();
  
  population.naturalSelection();

  population.generate();

  population.evaluate();

  if(population.isFinished) {
    console.log("FOUND");
    console.log("Generations: " + population.getGenerations());
    console.log("Average fitness of last generation: " + population.getAverageFitness());
    noLoop();
  }
}
