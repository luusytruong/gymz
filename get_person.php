<?php
include 'config.php';
include 'database.php';

$sql = 'SELECT PersonID, FullName, DateOfBirth, PhoneNumber, Email FROM person ORDER BY PersonID DESC';
$result = $conn->query($sql);

$personData = array();
if ($result->num_rows > 0) {
    while ($rows = $result-> fetch_assoc()) {
        $personData[] = array(
            'personID' => $rows['PersonID'],
            'fullname' => $rows['FullName']
        );
    }
}
header('Content-Type: application/json');
echo json_encode($personData);

$conn->close();

?>