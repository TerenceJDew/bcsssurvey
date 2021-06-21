// Lookup table for page routes. Key is the current 
// page uri and value is the next page.
const selectNextPage = (page, answers) => {
    let uriLookup = {
      index: "treattype",
      treattype:
        answers.treattype === "Hard(Scooped)" ? "scoopflavor" : "flavor",
      scoopflavor: "cupcone",
      flavor: "cupcone",
      cupcone: "topping",
      topping: answers.topping === "Dip" ? "dip" : "confirmation",
      dip: "confirmation",
    };
    let uri = uriLookup[page];
    return uri
  };

  export default selectNextPage