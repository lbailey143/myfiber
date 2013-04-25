<?php

$fiberdb = new mysqli("localhost", "lbailey_admin", "RQBsvitJ", "lbailey");
if ($fiberdb->connect_errno) {
    echo "Failed to connect to MySQL: (" . $fiberdb->connect_errno . ") " . $fiberdb->connect_error;
}

?>
