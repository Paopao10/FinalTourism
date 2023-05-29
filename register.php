<?php
if ($_SERVER["REQUEST_METHOD"] == "POST") {
  $firstName = $_POST['firstName'];
  $lastName = $_POST['lastName'];
  $gender = $_POST['gender'];
  $nationality = $_POST['nationality'];
  $email = $_POST['email'];
  $phonenumber = $_POST['phonenumber'];
  $birthdate = $_POST['birthdate'];
  $visitortype = $_POST['visitortype'];
  // Database Connection
  $host = "sql12.freemysqlhosting.net";
  $dbusername = "sql12621883";
  $dbpassword = "QgMZz25riu";
  $dbname = "sql12621883";
  $port = 3306;

  $conn = mysqli_connect($host, $dbusername, $dbpassword, $dbname, $port);
  if (!$conn) {
    die("Connection failed: " . mysqli_connect_error());
  }

  $sql = "INSERT INTO touristregistration (firstName, lastName, gender, nationality, email, phonenumber, birthdate, visitortype) VALUES ('$firstName', '$lastName', '$gender', '$nationality', '$email', '$phonenumber', '$birthdate', '$visitortype')";
  if (mysqli_query($conn, $sql)) {
    header('Location: tourist.html');
    exit();
  } else {
    echo "Error: " . $sql . "<br>" . mysqli_error($conn);
  }

  mysqli_close($conn);
}
?>
