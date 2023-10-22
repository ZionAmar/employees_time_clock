async function AddNewLine() {
    let firstName = document.getElementById("firstName").value;
    firstName = firstName.replace(/[.,\/#!$%^&*;:{}=\-_\s`~()]/g, '');
    let lastName = document.getElementById("lastName").value;
    lastName = lastName.replace(/[.,\/#!$%^&*;:{}=\-_\s`~()]/g, '');
    let phone = document.getElementById("phone").value;
    let id = document.getElementById("id").value;
    let address = document.getElementById("address").value;
    let email = document.getElementById("email").value;
    let jobTitle = document.getElementById("jobTitle").value;
    let startDate = document.getElementById("startDate").value;
    let hourlyRate = document.getElementById("hourlyRate").value;
    let bankDetails = document.getElementById("bankDetails").value;
    let image = document.getElementById("fileInput").files[0];

    // if (!firstName || !lastName || !image) {
    //     alert("יש למלא את כל השדות");
    //     return;
    // }

    let formData = new FormData();
    formData.append('firstName', firstName);
    formData.append('lastName', lastName);
    formData.append('phone', phone);
    formData.append('id', id);
    formData.append('address', address);
    formData.append('email', email);
    formData.append('jobTitle', jobTitle);
    formData.append('startDate', startDate);
    formData.append('hourlyRate', hourlyRate);
    formData.append('bankDetails', bankDetails);
    formData.append('image', image);


    // כאן אתה משתמש ב-try/catch עבור הבקשה fetch
    try {
        const response = await fetch('/Add_Emp/Add', {
            method: 'POST',
            body: formData
        });

        if (response.status === 200) {
            // alert('עובד נוסף בהצלחה!');
        } else if (response.status === 400) {
            // אם יש כבר עובד בשם זה
            alert('שם עובד כבר קיים');
        } else {
            // אם יש שגיאה אחרת מצד השרת
            console.error('שגיאה בהעלאת התמונה: ');
        }
    } catch (error) {
        console.error('שגיאה:', error);
    }
    clearInputs();
}
function clearInputs() {
    document.getElementById("firstName").value = '';
    document.getElementById("lastName").value = '';
    document.getElementById("phone").value = '';
    document.getElementById("id").value = '';
    document.getElementById("address").value = '';
    document.getElementById("email").value = '';
    document.getElementById("jobTitle").value = '';
    document.getElementById("startDate").value = '';
    document.getElementById("hourlyRate").value = '';
    document.getElementById("bankDetails").value = '';
    document.getElementById("fileInput").value = ''; // או שנקה גם כאן, אם זה אפשרי בהקשר שלך
}
function loadImage() {
    const fileInput = document.getElementById("fileInput");
    const imagePreview = document.getElementById("image-preview");
    const fileInputLabel = document.getElementById("fileInputLabel");
    const imagePreviewContainer = document.getElementById(
        "image-preview-container"
    );
    const file = fileInput.files[0];
    if (file && file.type.startsWith("image/")) {
        const reader = new FileReader();
        reader.onload = (event) => {
            imagePreview.src = event.target.result;
            imagePreviewContainer.style.display = "block";
            fileInputLabel.style.display = "none";
        };
        reader.readAsDataURL(file);
    }
}
function updateTime() {
    document.getElementById("title").innerHTML="פרטי העובד";
    document.querySelector(".signature-image").src="photos/Question_mark.png";
}
updateTime();