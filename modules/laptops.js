const fs = require('fs');
let read_json_file = () => {
    let file = './data/Laptopsjson.json';
    return fs.readFileSync(file);
}

let read_json_team = () => {
    let file = './data/team.json';
    return fs.readFileSync(file);
}

exports.list = function () {
    return JSON.parse(read_json_file());
};


exports.query_by_arg = (arg, value) => {
    let json_result = JSON.parse(read_json_file()); 
    let currencyConversion;
    let tax;
    console.log("query by arg: " + arg + " " + value);
    if (value == "ie" || value == "IE") {
        tax = 1.23;
        currencyConversion = 1;
    } else if (value == "US-NC") {
        tax = 1.08;
        currencyConversion = 1;
    }else if (value == "in" || value == "IN"){
        tax = 1.18;
        currencyConversion = 82.44;
    }else{
        return null;
    }

    for (let i = 0; i < json_result.length; i++) {
        let laptop = json_result[i];
        laptop.price = ((laptop.price * currencyConversion) * tax).toFixed(2);
        
    }
    return json_result;
};

exports.team = function () {
    return JSON.parse(read_json_team());
};
