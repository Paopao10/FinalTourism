<?php
$host = "sql12.freemysqlhosting.net";
$dbusername = "sql12621883";
$dbpassword = "QgMZz25riu";
$dbname = "sql12621883";
$port = 3306;

// Database Connection
$conn = mysqli_connect($host, $dbusername, $dbpassword, $dbname, $port);
if (!$conn) {
  die("Connection failed: " . mysqli_connect_error());
}


$id = $_POST['id'];
$data = json_decode($_POST['data'], true);


$sql = "UPDATE touristregistration SET ";
foreach ($data as $column => $value) {
  $value = mysqli_real_escape_string($conn, $value);
  $sql .= $column . "='" . $value . "', ";
}
$sql = rtrim($sql, ", ");
$sql .= " WHERE id=" . $id;


if (mysqli_query($conn, $sql)) {

  http_response_code(200);
} else {
  
  http_response_code(500);
}

mysqli_close($conn);
?>
