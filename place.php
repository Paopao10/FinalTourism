<?php
if ($_SERVER["REQUEST_METHOD"] == "POST") {
  $name = $_POST['name'];
  $address = $_POST['address'];

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

  $sql = "INSERT INTO place (Name, Address) VALUES ('$name', '$address')";
  if (mysqli_query($conn, $sql)) {
    header('Location: tourist.html');
    exit();
  } else {
    echo "Error: " . $sql . "<br>" . mysqli_error($conn);
  }

  mysqli_close($conn);
}
?>
