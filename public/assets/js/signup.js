$(document).ready(function () {
  // Getting references to our form and input
  var signUpForm = $("form.signup");

  // When the signup button is clicked, we validate the email and password are not blank
  signUpForm.on("submit", function (event) {
    event.preventDefault();

    $(this).find('input[type=checkbox]:not(:checked)').prop('checked', true).val(0);

    var userData = {
      name: $("input#name").val().trim(),
      age: $("input#age").val(),
      goal: $("input#goal").val().trim(),
      email: $("input#email-input").val().trim(),
      password: $("input#password-input").val().trim(),
      dumbbell: $("input#check1").val(),
      barbell: $("input#check2").val(),
      universal: $("input#check3").val(),
      proficiency: $("select#proficiency").val()
    };

    console.log(userData)

    if (!userData.email || !userData.password) {
      return;
    }
    // If we have an email and password, run the signUpUser function
    signUpUser(userData.name, userData.age, userData.goal, userData.email, userData.password, userData.dumbbell, 
      userData.barbell, userData.universal, userData.proficiency );
    $("input#email-input").val("");
    $("input#password-input").val("");
  });

  // Does a post to the signup route. If successful, we are redirected to the members page
  // Otherwise we log any errors
  function signUpUser(name, age, goal, email, password, dumbbell, barbell, universal, proficiency) {
    $.post("/api/signup", {
      name: name,
      age: age,
      goal: goal,
      email: email,
      password: password,
      dumbbell: dumbbell,
      barbell: barbell, 
      universal: universal,
      proficiency: proficiency
    })
      .then(function (data) {
        window.location.replace("/members");
        // If there's an error, handle it by throwing up a bootstrap alert
      })
      .catch(handleLoginErr);
  }

  function handleLoginErr(err) {
    $("#alert .msg").text(err.responseJSON);
    $("#alert").fadeIn(500);
  }
});
