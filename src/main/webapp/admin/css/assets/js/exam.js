function getURLParameter(name) {
    return decodeURIComponent((new RegExp('[?|&]' + name + '=' + '([^&;]+?)(&|#|;|$)').exec(location.search)||[,""])[1].replace(/\+/g, '%20'))||null;
}

String.prototype.toHHMMSS = function () {
    var sec_num = parseInt(this, 10); // don't forget the second param
    var hours   = Math.floor(sec_num / 3600);
    var minutes = Math.floor((sec_num - (hours * 3600)) / 60);
    var seconds = sec_num - (hours * 3600) - (minutes * 60);

    if (hours   < 10) {hours   = "0"+hours;}
    if (minutes < 10) {minutes = "0"+minutes;}
    if (seconds < 10) {seconds = "0"+seconds;}
    var time    = hours+':'+minutes+':'+seconds;
    return time;
}

/* -----------------------  Avalon ---------------------------*/

var $pager, $vm, $chooser;

$pager = avalon.define('pager', function(vm) {
	vm.state = 'examing'; // choosing, examing, result
	vm.title = '考试';
	vm.loading = true;
	vm.showPop = false;
	vm.hidePop = function() {
		vm.showPop = false;
	};
	vm.errorMsg = '错误';
	vm.navback = function(e) {
		if($pager.state == 'result') {
			$pager.state = 'examing';
		} else {
			$backpop.showing = true;
		}
		
	}
});

$backpop = avalon.define('backpop', function(vm) {
	vm.showing = false;
	vm.close = function() {
		vm.showing = false;
	};
	vm.back = function(url) {
		location.href = url
	}
});


var EVENT_SUBMIT_ANSWER = 'submitAnswer';
var EVENT_TIMES_UP = 'timeUp';
var EVENT_SAVE_RESULT = 'saveResult';
var EVENT_REPORT_TIME = 'reportTime';
var $exam = $vm = avalon.define("main", function(vm){
    $.extend(vm, { //练习题的vm结构
	    //title: '考试',
	    $project_id: 0, //项目id
	    $paper_id: 0, //试卷id
	    $paper_module_id: 0, //模板id
	    $heart_beat: 60,
	    time_left: 1000,


		exams: [],
		shownIndex: 0, // 当前正作答的index
		isProgressShowing: false, // 显示答题进度
		shownType: {
			get: function() {
				var idx = this.shownIndex; //根据shownIndex触发
				if(!this.exams.length) return '';
				switch(this.exams[idx].$quest_type) { // shownIndex is the updater
					case 1:
						return '单选题'
					case 2:
						return '多选题'
					case 3:
						return '判断题'
					case 4:
						return '不定项'
				}
			}
		},
		nextQuest: function(){
			if($vm.shownIndex == $vm.exams.length - 1) {
				//if($vm.exams.length !== $vm.answeredCount) 
				toast('已经是最后一题');
				return;
			} 
			$vm.jumpTo($vm.shownIndex + 1);
		},
		prevQuest: function(){
			if($vm.shownIndex == 0) {
				toast('已经是第一题');
			}
			$vm.jumpTo($vm.shownIndex - 1);
		},
		answeredCount: {
			get: function() {
				var count = 0;
				avalon.each(this.exams, function(i, exam) {
					(exam.had_answered) && count++;
				});
				return count;
			}
		},
		jumpTo: function(index) {
			if(index < 0 || (index >= $vm.exams.length|| $vm.time_left == 0)) {
				return;
			}

				
			var originalIdx = $vm.shownIndex;
			$vm.shownIndex = index;
			$vm.isProgressShowing = false;
			$pager.state = 'examing';
			document.body.scrollTop = 0;
			$vm.submitAnswer(originalIdx);
			$vm.answeredCount = $vm.answeredCount; // 更新已答数
		},
		submitAnswer: function(index) {
			// 判断用户是否作答
			var exam = $vm.exams[index];
			var submitObj = {
				paperId: $vm.$paper_id,
				paperModuleId: $vm.$paper_module_id,
				projectId: $vm.$project_id,
				optionId:[],
				titleId: exam['$exam_id'],
				titleNo: exam['$title_no']
			};

			if(exam.$quest_type == 3) {
				if(exam.checked_state == 'true' || exam.checked_state == 'false') {
					submitObj.optionId.push(exam.checked_state == 'true' ? 1 : 0);
					$vm.$fire(EVENT_SUBMIT_ANSWER, submitObj);
				}
			} else {
				avalon.each(exam.options, function(index, option) {
					if(option.checked) {
						submitObj.optionId.push(option.id);
					}
				});
				if(submitObj.optionId.length) {
					$vm.$fire(EVENT_SUBMIT_ANSWER, submitObj);
				}
			}
		},
		triggerProgress: function(){
			$vm.isProgressShowing = !$vm.isProgressShowing;
			//if($vm.isProgressShowing)
				//document.body.scrollTop = document.body.clientHeight;
		},
		optClick: function(opt, exam){ // 选某个答案
			// TODO: 单选情况排除其它
			exam.had_answered = true;
			if(exam.$quest_type == 1) {
				if(opt.checked) return;
				avalon.each(exam.options, function(i, option) {
					option.checked = false;
				});
				opt.checked = true;
				$vm.nextQuest();
				$vm.answeredCount = $vm.answeredCount; // 更新已答数
				$vm.showIfFinished();
			} else {
				opt.checked = !opt.checked;
				var haveAnswer = exam.options.some(function(opt) {
					return opt.checked;
				});
				if(!haveAnswer){ 
					exam.had_answered = false;
				
				} else {
					$vm.answeredCount = $vm.answeredCount; // 更新已答数
					$vm.showIfFinished();
				 }
			}
					
		},
		judgeClick: function(opt_type, exam){
			if(opt_type) {
				exam.checked_state = 'true'
			} else {
				exam.checked_state = 'false'
			}
			exam.had_answered = true;
			$vm.answeredCount = $vm.answeredCount; // 更新已答数
			$vm.showIfFinished();
			$vm.nextQuest();
		},
		questSubmit: function(exam) { // 复选框的提交
			vm.nextQuest();
			$vm.answeredCount = $vm.answeredCount; // 更新已答数
			$vm.showIfFinished();
		},
		showResult: function() {
			$vm.submitAnswer($vm.shownIndex);
			$vm.isProgressShowing = false;
			$pager.state='result';
			$vm.answeredCount = $vm.answeredCount; // 更新已答数
		},
		fillExams: function(data) {
			avalon.each(data, function(i, exam) {
				var o = {
					$exam_id: exam['id'], //题目id
					$title: exam['title_name'],
					$title_no: exam['title_no'],
					$quest_type: exam['title_type'], // （1：单选，2：多选，3：判断，4：不定项）
					options: exam['items'],
					checked_state: '',
					had_answered: false
				};
				var answers = exam.answer !== null ? exam.answer.split(',') : [];
					
				if(o.options) {
					avalon.each(o.options, function(i, option) {
						option.checked = !!~answers.indexOf(option.id + "");
						if(option.checked) o.had_answered = true;
					});
				}

				if(o.$quest_type == 3 && exam.answer !== null) {
					o.checked_state = !!exam.answer ? 'true' : 'false';
					o.had_answered = true;
				}
			
				$vm.exams.push(o);				
			});
			$vm.$fire('filled');
		},
		startCounting: function() {
			$vm.timer = setInterval(function() {
				if($vm.time_left <= 0) {
					$vm.$fire(EVENT_TIMES_UP);
					clearInterval($vm.timer);
					clearInterval($vm.report_timer);
					$vm.time_left = 0;
					return;
				}
				$vm.time_left--;
			}, 1000);
			$vm.report_timer = setInterval(function() {
				$vm.$fire(EVENT_REPORT_TIME, $vm.$paper_id);
			}, $vm.$heart_beat * 1000);
		},
		showIfFinished: (function() {
			var showed = false
			return function() {
				if(showed || $vm.exams.length !== $vm.answeredCount) return;
				toast('已全部答完')
				showed = true
			}
		})(),
		saveResult: function() {
			submitAsync=false;
			$vm.submitAnswer($vm.shownIndex);//按钮提交前保存最后一题
			submitAsync=true;
			$vm.isProgressShowing = false;			
			if($vm.exams.length !== $vm.answeredCount) {
				$pager.showPop = true;
			} else {
				$vm.fireSave();
			}
		},
		fireSave: function() {
			$pager.showPop = false;
			$vm.$fire(EVENT_SAVE_RESULT, {
				paperId: $vm.$paper_id,
				paperModuleId: $vm.$paper_module_id,
				projectId: $vm.$project_id
			});
		}
	});
});

$vm.$watch('isProgressShowing', function(shown) {
	if(shown) {
		$('.answer_progress').fadeIn('slow').find('.lay-btm').css('bottom', '-100%').animate({bottom: 0}, {duration: 400})
	} else {
		$('.answer_progress').fadeOut().find('.lay-btm').animate({'bottom': '-100%'});
	}
});
avalon.scan();

$(function() {
	$('.lay-swiper').on('swipeleft', function() {
		$vm.nextQuest();
	}).on('swiperight', function() {
		$vm.prevQuest();
	});
	jQuery('.lay-swiper')
	.on('movestart', function(e) {
	  // If the movestart is heading off in an upwards or downwards
	  // direction, prevent it so that the browser scrolls normally.
	  if ((e.distX > e.distY && e.distX < -e.distY) ||
	      (e.distX < e.distY && e.distX > -e.distY)) {
	    e.preventDefault();
	  }
	});
})

function toast(msg, timeout) {
	var html = (function() {
		/*
		<div id="showmsg" class="lay-pop" style="display:none">
			<div class="PopWrap">
				<div class="Pop">
					<div align="center" class="lay-alert"><p id="msgcontent">{{msg}}</p></div>
				</div>
			</div>
		</div>
		*/
	}).toString().match(/\/\*([\s\S]*)\*\//)[1].replace('{{msg}}', msg);
	var $html = $(html).appendTo(document.body).fadeIn('fast')
	setTimeout(function() {
		$html.fadeOut('fast', function() {
			$html.remove();
		})
	}, timeout || 1100);
	
}