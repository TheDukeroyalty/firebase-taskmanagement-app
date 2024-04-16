// Initialize Firebase with your config
firebase.initializeApp({
    apiKey: "AIzaSyDQiSw_44SDw8zaw6fhWoRnkUlM5Jaj6PA",
  authDomain: "myfirebase-project-70d06.firebaseapp.com",
  projectId: "myfirebase-project-70d06",
  storageBucket: "myfirebase-project-70d06.appspot.com",
  messagingSenderId: "506230418947",
  appId: "1:506230418947:web:7329faacc4f8af38b52836"
});

const db = firebase.firestore();

// Function to add a task
function addTask() {
    const taskInput = document.getElementById("task-input");
    const task = taskInput.value.trim();
    //check whether our task input is empty.
    if (task !== "") {
        db.collection("tasks").add({
            //column name and value
            task: task,
            // we can also do a timestamp column
            timestamp: firebase.firestore. FieldValue.serverTimestamp(),
        });
        taskInput.value = "";
        console.log('Task added successfully');
    }
}

// Function to render ||display tasks

function renderTasks(doc) {
    const taskList = document.getElementById("task-list");
    const taskItem = document.createElement("li");
    taskItem.className = "task-item"
    taskItem.innerHTML = `
    <span>${doc.data().task}</span>
    <button onclick="deleteTask('${doc.id}')">Delete</button>
    `;
    taskList.appendChild(taskItem);

}

// Real-time listener for tasks
db.collection("tasks")
.orderBy("timestamp", "desc")
.onSnapshot(snapshot => {
    const changes = snapshot.docChanges();
    changes.forEach(change => {
        if (change.type === "added") {
            renderTasks(change.doc);
        }
    });
});

// Function to delete a task

function deleteTask(id) {
    db.collection("tasks").doc(id).delete();
    location.reload();
}
