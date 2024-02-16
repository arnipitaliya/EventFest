$(document).ready(function () {
    document.addEventListener('DOMContentLoaded', function () {
        document.getElementById('event-form').addEventListener('submit', function (event) {
            event.preventDefault(); // Prevent the default form submission

            var firstName = document.getElementById('first-name').value.trim();
            var lastName = document.getElementById('last-name').value.trim();
            var phone = document.getElementById('phone').value.trim();
            var email = document.getElementById('email').value.trim();
            var guests = document.getElementById('guests').value.trim();
            var eventDetails = document.getElementById('event-details').value.trim();

            // Check if all fields are filled out
            if (!firstName || !lastName || !phone || !email || !guests || !eventDetails) {
                alert('Kindly fill all the information.');
            } else {
                // Check if the phone and email fields are valid
                var phonePattern = /^\d{3}-\d{3}-\d{4}$/;
                var emailPattern = /.+@gmail\.com$/;

                if (!phonePattern.test(phone)) {
                    alert('Please enter a valid phone number in the format: 111-111-1111.');
                } else if (!emailPattern.test(email)) {
                    alert('Please enter a valid Gmail address.');
                } else {
                    // If all validations pass

                    addBookingData(email,firstName);
                    alert('Thank you for registering for the event. We will contact you shortly!');
                    window.location.href = "about.html"
                }
            }
        });
    });
});