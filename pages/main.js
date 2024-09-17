const firebaseConfig = {
    apiKey: "AIzaSyBstrpCu_ThYMZbUFIdHLpAvYvwUV4pz7s",
    authDomain: "tuitionfeetracker.firebaseapp.com",
    projectId: "tuitionfeetracker",
    storageBucket: "tuitionfeetracker.appspot.com",
    messagingSenderId: "174468857983",
    appId: "1:174468857983:web:a6effa686b43616044bf4a",
    measurementId: "G-N4C5G6T72G"
  };

  // Initialize Firebase
firebase.initializeApp(firebaseConfig);
const auth = firebase.auth();
const db = firebase.firestore();


// Login Functionality
const loginForm = document.getElementById('login-form');
if (loginForm) {
    loginForm.addEventListener('submit', (e) => {
        e.preventDefault();
        const email = loginForm['email'].value;
        const password = loginForm['password'].value;

        auth.signInWithEmailAndPassword(email, password)
            .then(userCredential => {
                const user = userCredential.user;
                // Redirect based on user role (simple role check can be done here)
                if (user.email === "admin@example.com") {
                    window.location.href = "admin.html";
                } else {
                    window.location.href = "student.html";
                }
            })
            .catch(error => {
                console.error('Error logging in:', error);
            });
    });
}

//add Student
const addStudentForm = document.getElementById('add-student-form');
if (addStudentForm) {
    addStudentForm.addEventListener('submit', (e) => {
        e.preventDefault();
        const email = addStudentForm['student-email'].value;
        const name = addStudentForm['student-name'].value;
        const defaultPassword = "defaultPassword123"; // Default password for students
        const registrationDate = new Date();


        auth.createUserWithEmailAndPassword(email, defaultPassword)
            .then(userCredential => {
                const user = userCredential.user;
                // Add student details to Firestore
                db.collection('students').doc(user.uid).set({
                    email: email,
                    name: name,
                    paymentHistory: {},
                    registrationDate : registrationDate
                }).then(() => {
                    console.log('Student added to Firestore');
                });
            })
            .catch(error => {
                console.error('Error adding student:', error);
            });
    });
}