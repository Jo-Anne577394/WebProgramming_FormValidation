// Jo-Anne van der Wath (577394)
// Henry Roux (577440)
// Leonard Vermeer (577309)

function setValid(fieldName) {
    let element = document.getElementById(fieldName.id);
    element.classList.remove("error");
    element.classList.add("valid");

    const errDiv = document.getElementById(`error${fieldName.id}`); //Clear the error messsage

    if (errDiv) {
        errDiv.innerHTML = '';
    }
}

function setError(fieldName, message) {
    let element = document.getElementById(fieldName.id);
    element.classList.remove("valid");
    element.classList.add("error");

    const errDiv = document.getElementById(`error${fieldName.id}`);

    if (errDiv) {
        errDiv.innerHTML = message;
    }
}

function injectionCheck(inputString) {
    const injectionKeywords = [
        // SQL injection keywords
        "SELECT",
        "UPDATE",
        "DELETE",
        "INSERT",
        "DROP",
        "ALTER",
        "TRUNCATE",
        "EXEC",
        "UNION",
        "OR",
        "AND",
        "WHERE",
        "FROM",
        "JOIN",
        "INTO",
        "VALUES",
        "HAVING",
        "LIKE",
        "LIMIT",

        // XSS injection keywords
        "SCRIPT",
        "ALERT",
        "ONCLICK",
        "ONLOAD",
        "ONERROR",
        "IMG",
        "IMG SRC",
        "A HREF",
        "LINK",
        "IFRAME",
        "SRC",
        "HTML",
        "BODY",
        "STYLE",
        "DIV",
        "FORM",
        "INPUT",
        "BUTTON"
        // Add more keywords as needed
    ];

    for (const keyword of injectionKeywords) {
        if (inputString.toUpperCase().includes(keyword)) {
            return true;
        }
    }

    return false;
}

function validateName(firstName) {
    // Check if the input field is empty or if the input contains only letters, spaces, and hyphens
    // Some names (like Jo-Anne's name) has a hyphen
    if (firstName.value.length === 0 || !/^[A-Za-z\s\-]+$/.test(firstName.value) || firstName.value.length >= 50 || injectionCheck(firstName.value)) {
        setError(firstName, 'Enter a valid name');
    }
    else {
        setValid(firstName);
    }
}

function validateLastName(lastName) {
    if (lastName.value.length === 0 || !/^[A-Za-z\s\-]+$/.test(lastName.value) || lastName.value.length >= 50 || injectionCheck(lastName.value)) {
        setError(lastName, 'Please enter a valid last name');
    } else {
        setValid(lastName);
    }
}

function validateEmail(emailID) {
    const email = emailID.value.trim(); //remove whitespace
    if (email.length === 0 || !/^[\w\.-]+@[a-zA-Z\d\.-]+\.[a-zA-Z]{2,}$/.test(email) || injectionCheck(email)) {
        statusIcon.innerHTML = '';
        setError(emailID, 'Enter a valid email address');
    } 
    else {
        statusIcon.innerHTML = '✓';
        setValid(emailID);
    }
}

function validateUserID(userIDInput) {
    const lockIcon = document.getElementById('lockIconUserID'); 
    const errDiv = document.getElementById('erroruserID');

    if (userIDInput.value.length === 0 || !isNaN(userIDInput.value) || injectionCheck(userIDInput.value)) {
        setError(userIDInput, 'Please check if your User ID is correct');
        lockIcon.style.display = 'none'; // Hide the lock icon
    } else {
        setValid(userIDInput);
        lockIcon.style.display = 'inline-block'; // Display the lock icon
        errDiv.innerHTML = '';
    }
}

function validateCountry(country) {
    if (country.value === 'Default') {
        setError(country, `Please select a valid country`);
    } 
    else {
        setValid(country);
    }
}

function validateState(state) {
    if (state.value === 'Default') {
        setError(state, `Please select a valid state`);
    } 
    else {
        setValid(state);
    }
}

function validateCity(city) {
    if (city.value === 'Default') {
        setError(city, `Please select a valid city`);
    } 
    else {
        setValid(city);
    }
}

function validatePhoneNumber(phoneNumber) {
    if (phoneNumber.value.length === 0 ||  !/^(?:\+\d{11}|\d{10})$/.test(phoneNumber.value) || injectionCheck(phoneNumber.value)) {
        setError(phoneNumber, 'Enter a phone number in the format +xxxxxxxxxxx or xxxxxxxxxx');}
    else {
        setValid(phoneNumber);
    }
}

function validateReferenceCode(referenceCode) {
    if (referenceCode.value.length === 0 || !isNaN(referenceCode.value) || injectionCheck(referenceCode.value)) {
        setError(referenceCode, 'Please check if your reference code is correct');
    } else {
        setValid(referenceCode);
    }
}

function validateForm() {
    if (firstName.classList.contains('valid') &&
    lastName.classList.contains('valid') &&
    emailID.classList.contains('valid') &&
    userID.classList.contains('valid') &&
    country.classList.contains('valid') &&
    state.classList.contains('valid') &&
    city.classList.contains('valid') &&
    phoneNumber.classList.contains('valid') &&
    referenceCode.classList.contains('valid')
    ) {
        return true;
    }
    return false;
}

window.addEventListener("load", () => {
    const resetButton = document.getElementById("resetButton");
    const continueButton = document.getElementById("continueButton");
    const inputs = document.getElementsByTagName("input");
    const selects = document.getElementsByTagName("select");
    const box = document.getElementById("container");

    resetButton.addEventListener("click", () => {location.reload();})

    continueButton.addEventListener("click", () => {
        if (validateForm()) {                
            let values = {};
            values["Firstname"] = document.getElementById("firstName").value;
            values["Lastname"] = document.getElementById("lastName").value;
            values["Email-ID"] = document.getElementById("emailID").value;
            values["User-ID"] = document.getElementById("userID").value;
            values["Country"] = document.getElementById("country").value;
            values["State"] = document.getElementById("state").value;
            values["City"] = document.getElementById("city").value;
            values["Phone Number"] = document.getElementById("phoneNumber").value;
            values["Reference Code"] = document.getElementById("referenceCode").value;

            document.getElementById("content").remove();

            const outputHeading = document.createElement("h2");
            box.appendChild(outputHeading);
            outputHeading.innerText = "Details captured:";
            
            for (const key in values) {
                const output = document.createElement("p");
                box.appendChild(output);
                output.innerText = key + ": " + values[key];
            }

            box.style.backgroundColor = "rgb(232, 232, 232)";
        }
        else {
            if (firstName.classList.contains('error')) {
                document.getElementById("firstName").value = "";         
                document.getElementById("errorfirstName").innerHTML = 'Enter a valid name';
            }
            if (lastName.classList.contains('error')) {
                document.getElementById("lastName").value = "";
                document.getElementById("errorlastName").innerHTML = 'Please enter a valid last name';
            }
            if (emailID.classList.contains('error')) {
                document.getElementById("emailID").value = "";
                document.getElementById("erroremailID").innerHTML = 'Enter a valid email address';
            }
            if (userID.classList.contains('error')) {
                document.getElementById("userID").value = "";
                document.getElementById("erroruserID").innerHTML = 'Please check if your User ID is correct';
            }
            if (country.classList.contains('error')) {
                document.getElementById("country").value = "Default";
                document.getElementById("errorcountry").innerHTML = 'Please select a valid country';
            }
            if (state.classList.contains('error')) {
                document.getElementById("state").value = "Default";
                document.getElementById("errorstate").innerHTML = 'Please select a valid state';
            }
            if (city.classList.contains('error')) {
                document.getElementById("city").value = "Default";
                document.getElementById("errorcity").innerHTML = 'Please select a valid city';
            }
            if (phoneNumber.classList.contains('error')) {
                document.getElementById("phoneNumber").value = "";
                document.getElementById("errorphoneNumber").innerHTML = 'Enter a valid phone number';
            }
            if (referenceCode.classList.contains('error')) {
                document.getElementById("referenceCode").value = "";
                document.getElementById("errorreferenceCode").innerHTML = 'Please check if your reference code is correct';
            }
        }
    })
})