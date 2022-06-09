$(document).ready(function () {
	//Character limit js
	var maxLength = 100;
	$('textarea').keypress(function () {
		var length = $(this).val().length;
		var length = maxLength - length;
		$('#countdown').text(length);
	});
});
