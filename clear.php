<?php
session_start();
if (isset($_SESSION['data'])) {
    $_SESSION['data'] = array();
}
?>
<table align="center" class="result_table">
    <tr>
        <th>X</th>
        <th>Y</th>
        <th>R</th>
        <th>Result</th>
        <th>Submit time</th>
        <th>Calculation time</th>
    </tr>
</table>