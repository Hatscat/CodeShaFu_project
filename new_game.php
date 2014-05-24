<!-- *** CodShaFu Editor ! :p *** -->

<!DOCTYPE html>
<html>

<head>
	<meta charset="utf-8" />
	<meta name="viewport" content="width=device-width, initial-scale=1.0" />
	<title>Foundation | Welcome</title>
	<link rel="stylesheet" href="css/foundation.css" />
	<script src="js/vendor/modernizr.js"></script>
</head>

<body> <!-- id="cleanScreen" to remove some stuffs -->

	<div class="row">
		<div class="large-5 large-offset-4 columns">
			<h1>New Map</h1>
		</div>
	</div>

	<div class="row">
		<div class="large-6 large-offset-3 columns">
			<form>
				<div class="row">
					<div class="large-3 columns"
						<label for="mapName" class="right inline" >Map Name :</label>
					</div>

					<div class="large-7 columns">
						<input id="mapName" type="text" placeholder="nameOfTheYear" />
					</div>
				</div>

				<br/>

				<div class="row">
					<div class="large-3 columns"
						<label for="blueprint"  class="right inline" >Blueprint :</label>
					</div>

					<div class="large-7 columns">
						<select id="blueprint">
							<option value="none" selected>None</option>
							<option value="loren">Husker</option>
							<option value="ipsum">Starbuck</option>
							<option value="conais">Hot Dog</option>
							<option value="pas">Apollo</option>
							<option value="la">Apollo</option>
							<option value="suite">Apollo</option>
						</select>
					</div>
				</div>
			</form>
		</div>
	</div>
	<br/>
	<div class="row">
		<div class="large-3 large-centered columns">
			<a href="editor.php" class="large radius round button">Get Started</a><br/>
		</div>
	</div>

	<script src="js/libs/vendor/jquery.js"></script>
	<script src="js/libs/foundation.min.js"></script>
	<script>
	$(document).foundation();
	</script>

</body>


</html>