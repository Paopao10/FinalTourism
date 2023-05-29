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

$sql = "SELECT * FROM touristregistration";
$result = mysqli_query($conn, $sql);

if (!$result) {
  die("Invalid query: " . mysqli_error($conn));
}

$data = array();
while ($row = mysqli_fetch_assoc($result)) {
  $data[] = $row;
}

mysqli_close($conn);

header('Content-Type: application/json');
echo json_encode($data);
?>
