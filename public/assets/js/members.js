// GET user info on page load
function personalizePage(){
$.ajax("/api/user_data/", {
    type: "GET"
}).then(function (response) {
        $.ajax("api/personalize/" + response.id, {
        type: "GET"
    }).then(function(response){
        console.log(response)
    })
});
}
personalizePage();

// EXERCISE SEARCH FORM
let searchForm = $("form.search")

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
            appendResults(response)
        });
    }
    if (secondaryMuscle === "Any" && equipReq != "Any") {
        $.ajax("/api/exercises/" + muscle + "/anySecondary/" + equipReq, {
            type: "GET"
        }).then(function (response) {
            appendResults(response)
        });
    }
    if (secondaryMuscle != "Any" && equipReq != "Any") {
        $.ajax("/api/exercises/" + muscle + "/" + secondaryMuscle + "/" + equipReq, {
            type: "GET"
        }).then(function (response) {
            appendResults(response)
        });
    }
});

let updateForm = $("form.update");
// UPDATE PROFILE FORM
// When the signup button is clicked, we validate the email and password are not blank
updateForm.on("submit", function (event) {
    event.preventDefault();
    console.log("update")
})
