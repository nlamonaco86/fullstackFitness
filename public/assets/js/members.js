$(document).ready(function () {
    // EXERCISE SEARCH FORM
    let searchForm = $("form.search")

    searchForm.on("submit", function (event) {
        event.preventDefault();
        // console.log("search")
        let muscle = $("#muscle").val();
        let secondaryMuscle = $("#secondaryMuscle").val();
        let equipReq = $("#equipReq").val();
        console.log(muscle, secondaryMuscle, equipReq)

        if (secondaryMuscle === "Any" && equipReq === "Any") {
            // search for all exercises where primary muscle = user choice
            $.ajax("/api/exercises/" + muscle, {
                type: "GET"
            }).then(
                function (response) {
                    // append them all to a table to view
                    $("#results").empty();
                    for (let i = 0; i < response.length; i++) {
                        $("#results").append(`<tr>
                    <td scope="col">${response[i].exerName}</td>
                    <td scope="col">${response[i].main}</td>
                    <td scope="col">${response[i].alternate}</td>
                    <td scope="col">${response[i].auxillary}</td>
                    <td scope="col">${response[i].equipment}</td>
                    </tr>`);
                    }
                }
            )
        };
        // this one doesn't work, why not?
        if (secondaryMuscle != "Any" && equipReq === "Any"){
            $.ajax("/api/exercises/" + muscle + "/" + secondaryMuscle + "/anyEquip", {
                type: "GET"
            }).then(
                function (response) {
                    // append them all to a table to view
                    $("#results").empty();
                    for (let i = 0; i < response.length; i++) {
                        $("#results").append(`<tr>
                    <td scope="col">${response[i].exerName}</td>
                    <td scope="col">${response[i].main}</td>
                    <td scope="col">${response[i].alternate}</td>
                    <td scope="col">${response[i].auxillary}</td>
                    <td scope="col">${response[i].equipment}</td>
                    </tr>`);
                    }
                }
            )
        }
        if (secondaryMuscle === "Any" && equipReq != "Any"){
            $.ajax("/api/exercises/" + muscle + "/anySecondary/" + equipReq, {
                type: "GET"
            }).then(
                function (response) {
                    // append them all to a table to view
                    $("#results").empty();
                    for (let i = 0; i < response.length; i++) {
                        $("#results").append(`<tr>
                    <td scope="col">${response[i].exerName}</td>
                    <td scope="col">${response[i].main}</td>
                    <td scope="col">${response[i].alternate}</td>
                    <td scope="col">${response[i].auxillary}</td>
                    <td scope="col">${response[i].equipment}</td>
                    </tr>`);
                    }
                }
            )
        }
        if (secondaryMuscle != "Any" && equipReq != "Any"){
            $.ajax("/api/exercises/" + muscle + "/" + secondaryMuscle + "/" + equipReq, {
                type: "GET"
            }).then(
                function (response) {
                    // append them all to a table to view
                    $("#results").empty();
                    for (let i = 0; i < response.length; i++) {
                        $("#results").append(`<tr>
                    <td scope="col">${response[i].exerName}</td>
                    <td scope="col">${response[i].main}</td>
                    <td scope="col">${response[i].alternate}</td>
                    <td scope="col">${response[i].auxillary}</td>
                    <td scope="col">${response[i].equipment}</td>
                    </tr>`);
                    }
                }
            )
        }
    });
})

let updateForm = $("form.update");
// UPDATE PROFILE FORM
// When the signup button is clicked, we validate the email and password are not blank
updateForm.on("submit", function (event) {
    event.preventDefault();
    console.log("update")
})
    //   event.preventDefault();

    //   $(this).find('input[type=checkbox]:not(:checked)').prop('checked', true).val(0);

    //   var userData = {
    //     email: $("input#email-input").val().trim(),
    //     password: $("input#password-input").val().trim(),
    //     dumbbell: $("input#check1").val(),
    //     barbell: $("input#check2").val(),
    //     universal: $("input#check3").val(),
    //     proficiency: "intermediate"
    //   };

    //   console.log(userData)

    //   if (!userData.email || !userData.password) {
    //     return;
    //   }
    //   // If we have an email and password, run the signUpUser function
    //   signUpUser(userData.email, userData.password, userData.dumbbell, userData.barbell, userData.universal, userData.proficiency );
    //   $("input#email-input").val("");
    //   $("input#password-input").val("");
    // });

    // // Does a post to the signup route. If successful, we are redirected to the members page
    // // Otherwise we log any errors
    // function signUpUser(email, password, dumbbell, barbell, universal, proficiency) {
    //   $.post("/api/signup", {
    //     email: email,
    //     password: password,
    //     dumbbell: dumbbell,
    //     barbell: barbell, 
    //     universal: universal,
    //     proficiency: proficiency
    //   })
    //     .then(function (data) {
    //       window.location.replace("/members");
    //       // If there's an error, handle it by throwing up a bootstrap alert
    //     })
    //     .catch(handleLoginErr);
    // }

    // function handleLoginErr(err) {
    //   $("#alert .msg").text(err.responseJSON);
    //   $("#alert").fadeIn(500);
    // }
