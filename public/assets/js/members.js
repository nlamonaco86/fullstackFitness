// GET user and cloud info on page load
function personalizePage() {
    $.ajax("/api/user_data/", {
        type: "GET"
    }).then(function (response) {
        //fill out the user's profile section
        $("#profilePic").attr("src", response.profilePic);
        $("#userName").text(response.name);
        $("#proficiency").text(response.proficiency);
        $("#canUse").text("Barbell");
        console.log(response);

        let blankRow = `<tr class="text-light">
        <td scope="col">.</td>
        <td scope="col">.</td>
        <td scope="col">.</td>
        <td scope="col">.</td>
        <td scope="col">.</td>
    </tr>`
        //append blank rows to the tables for aesthetics
        for (let i = 0; i < 6; i++) {
            $("#results").append(blankRow);
            $("#workoutGen").append(blankRow);
        }
    });
}
personalizePage();

// UPDATE PROFILE FORM
let updateForm = $("form.update");

updateForm.on("submit", function (event) {
    event.preventDefault();
    console.log("update");
})

// EXERCISE SEARCH FORM
let searchForm = $("form.search")
// Append Exercise Results
function appendResults(exercise) {
    $("#results").empty();
    for (let i = 0; i < exercise.length; i++) {
        $("#results").append(`<tr>
                    <td scope="col">${exercise[i].exerName}</td>
                    <td scope="col">${exercise[i].main}</td>
                    <td scope="col">${exercise[i].alternate}</td>
                    <td scope="col">${exercise[i].auxillary}</td>
                    <td scope="col">${exercise[i].equipment}</td>
                    </tr>`);
    }
}
function appendWorkout(resultArray, sets, reps) {
    $("#workoutGen").empty();
    for (let i = 0; i < resultArray.length; i++) {
        $("#workoutGen").append(`<tr>
                <td scope="col">${sets}</td>
                <td scope="col">${resultArray[i].exerName}</td>
                <td scope="col">${reps}</td>
                <td scope="col">${resultArray[i].main}</td>
                <td scope="col">${resultArray[i].alternate}</td>
                </tr>`);
    }
}

searchForm.on("submit", function (event) {
    event.preventDefault();

    let muscle = $("#muscle").val();
    let secondaryMuscle = $("#secondaryMuscle").val();
    let equipReq = $("#equipReq").val();

    if (secondaryMuscle === "Any" && equipReq === "Any") {
        // search for all exercises where primary muscle = user choice
        $.ajax("/api/exercises/" + muscle, {
            type: "GET"
        }).then(function (response) {
            appendResults(response)
        });
    };
    if (secondaryMuscle != "Any" && equipReq === "Any") {
        $.ajax("/api/exercises/" + muscle + "/" + secondaryMuscle + "/anyEquip", {
            type: "GET"
        }).then(function (response) {
            appendResults(response);
        });
    }
    if (secondaryMuscle === "Any" && equipReq != "Any") {
        $.ajax("/api/exercises/" + muscle + "/anySecondary/" + equipReq, {
            type: "GET"
        }).then(function (response) {
            appendResults(response);
        });
    }
    if (secondaryMuscle != "Any" && equipReq != "Any") {
        $.ajax("/api/exercises/" + muscle + "/" + secondaryMuscle + "/" + equipReq, {
            type: "GET"
        }).then(function (response) {
            appendResults(response);
        });
    }
});

// Workout Generator
let genForm = $("form.genWorkout")

genForm.on("submit", function (event) {
    event.preventDefault();

    //Array contains each muscle group criteria needed for the eventual workout of that type
    let full = ["Quad", "Chest", "Ham", "Back", "Bicep", "Calves"]
    let arnold = ["Chest", "Back", "Quad", "Front Delt", "Bicep", "Tricep", "Ham", "Trap", "Calves"]
    let bro = ["Chest", "Tricep", "Back", "Bicep", "Front Delt", "Core", "Quad", "Ham", "Trap", "Calves"]
    let ppl = ["Chest", "Tricep", "Front Delt", "Back", "Core", "Trap", "Bicep", "Quad", "Ham", "Calves"]
    let ul = ["Chest", "Back", "Front Delt", "Bicep", "Tricep", "Quad", "Ham", "Core", "Calves"]

    // grab desired split from user input
    let split = $("#split").val();
    let sets = $("#volume").val();
    let reps = $("#weight").val();

    // determine which array to use
    if (split === "Full Body") {
        input = full
    }
    if (split === "Arnold Split") {
        input = arnold
    }
    if (split === "Bro Split") {
        input = bro
    }
    if (split === "Push Pull Legs") {
        input = ppl
    }
    if (split === "Upper Lower") {
        input = ul
    }
    //The choices from the ajax loop get pushed here
    let resultArray = [];
    // run API request on loop based on input array length
    for (let i = 0; i < input.length; i++) {

        $.ajax("/api/exercises/" + input[i], {
            type: "GET"

        }).then((response) => {
            // variable to get a random index 
            let random = Math.floor(Math.random() * Math.floor(response.length));
            resultArray.push(response[random]);
            appendWorkout(resultArray, sets, reps);
        });
    }
})