function loginFunction() {
  $.ajax({
    type: "get",
    url: "/generateToken",
    data: {
      username: document.querySelector("#email").value,
      password: document.querySelector("#password").value
    },
    success: function(tokenResponse) {
      if (tokenResponse.result == "redirect") {
        //redirecting to main page from here
        $.ajax({
          type: "get",
          beforeSend: function(request) {
            request.setRequestHeader("auth-token", tokenResponse.token);
          },
          url: "/homepage",
          success: function(response) {
            console.log(response.id);
            localStorage.setItem("payDayAppUid", tokenResponse.uid);
            document.write(response);
          }
        });
      }
    },
    error: function(err) {
      window.alert("Please enter valid credentials");
    }
  });
}
