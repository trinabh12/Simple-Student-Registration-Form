document.getElementById('registrationForm').addEventListener('submit', function (e) {
    e.preventDefault();

    // Get form values
    const name = document.getElementById('studentName').value.trim();
    const id = document.getElementById('studentID').value.trim();
    const email = document.getElementById('email').value.trim();
    const contact = document.getElementById('contactNo').value.trim();

    // Validate inputs
    if (!name || !id || !email || !contact) {
        alert('All fields are required.');
        return;
    }

    if (!/^[A-Za-z\s]+$/.test(name)) {
        alert('Name must contain only letters.');
        return;
    }

    if (!/^\d+$/.test(id) || !/^\d{10}$/.test(contact)) {
        alert('Invalid ID or Contact No.');
        return;
    }

    // Save data in localStorage
    let students = JSON.parse(localStorage.getItem('students')) || [];
    students.push({ name, id, email, contact });
    localStorage.setItem('students', JSON.stringify(students));

    // Display updated data
    displayStudents();
    this.reset();
});

function displayStudents() {
    const students = JSON.parse(localStorage.getItem('students')) || [];
    const tableBody = document.getElementById('studentTable').querySelector('tbody');
    tableBody.innerHTML = '';

    students.forEach((student, index) => {
        const row = `
            <tr>
                <td>${student.name}</td>
                <td>${student.id}</td>
                <td>${student.email}</td>
                <td>${student.contact}</td>
                <td>
                    <button onclick="editStudent(${index})">Edit</button>
                    <button onclick="deleteStudent(${index})">Delete</button>
                </td>
            </tr>
        `;
        tableBody.innerHTML += row;
    });
}

function editStudent(index) {
    const students = JSON.parse(localStorage.getItem('students')) || [];
    const student = students[index];

    document.getElementById('studentName').value = student.name;
    document.getElementById('studentID').value = student.id;
    document.getElementById('email').value = student.email;
    document.getElementById('contactNo').value = student.contact;

    deleteStudent(index);
}

function deleteStudent(index) {
    let students = JSON.parse(localStorage.getItem('students')) || [];
    students.splice(index, 1);
    localStorage.setItem('students', JSON.stringify(students));
    displayStudents();
}

// Load students on page load
document.addEventListener('DOMContentLoaded', displayStudents);
