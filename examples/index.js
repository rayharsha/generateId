import { GenerateId } from "../src/index.js";

const generator = new GenerateId();

const id = generator.generate((id) => {
    // console.log("Candidate ID:", id);
    return true;
});

console.log("Generated ID:", id);