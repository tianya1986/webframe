// include jquery

function showProgress() { // 显示进度
	var $progress = $('.answer_progress');
	$progress.fadeIn();
	document.body.scrollTop = document.body.clientHeight;
}
function hideProgress() {
	var $progress = $('.answer_progress');
	$progress.hide();
}