function getURLParameter(name) {
    return decodeURIComponent((new RegExp('[?|&]' + name + '=' + '([^&;]+?)(&|#|;|$)').exec(location.search)||[,""])[1].replace(/\+/g, '%20'))||null;
}

/* -----------------------  Avalon ---------------------------*/

var $pager, $vm, $chooser;

$pager = avalon.define('pager', function(vm) {
	vm.state = 'choosing'; // choosing, examing, result
	vm.title = '练习';
	vm.loading = {
		get: function() { // 实际上这是不好的模式,pager不应该跟踪其他vm的状态
			var state = this.state // 需要读这个才可以根据这个刷新。get用this取。get跟controller函数还是不一样的 会先强制取值一次，要避免变量未初始化情况，get取值为了赋予初始值吗？
			if(!$chooser || !$vm) return true; // for first 强制取值
			$chooser.subjects && $vm.exams;
			switch(state) {
				case 'choosing':
					return !$chooser.subjects.length;
				case 'examing':
					return !$vm.exams.length;
				default:
					return false;
			}
		}
	};
	vm.goBack = function() {
		vm.state = 'choosing';
	};
});

$chooser = avalon.define("chooser", function(vm) {
	vm.subjects = [
		/*
			{
				title: '游泳池',
				id: 1, // 知识点类型
				checked: true
			}
		*/
	];
	vm.finishCount = 0; // 已完成
	vm.totalCount = 0; // 练习题数目
	vm.currentRatio = 0; // 正确率
	vm.checkall = {
		get: function() {
			var is_all_check = this.subjects.length ? true : false;
			avalon.each(this.subjects, function(i, subject) {
				if(!subject.checked) {
					is_all_check = false;
					return false;
				}
			});
			return is_all_check;
		}
	};
	vm.itemChoosed = {
		get: function() {
			var c = [];
			avalon.each(this.subjects, function(i,subject) {
				if(subject.checked) {
					c.push(subject.id);
				}
			});
			return c;
		}
	};

	vm.checkAllClick = function() {
		var state = !vm.checkall;
		avalon.each(vm.subjects, function(i, subject) { // getter 和 setter 在第一次获取vm定义所以只能用this才能引用到真实的vm吧？
			subject.checked = state;
		});
		vm.checkall = state;
		vm.updateChooseState();
		vm.$fire('itemChanged', vm.itemChoosed);
	};
	vm.itemClick = function(subject) {
		subject.checked = !subject.checked;
		vm.updateCheckState();
		vm.updateChooseState();
		vm.$fire('itemChanged', vm.itemChoosed);
	};
	vm.goExaming = function() {
		if(!vm.itemChoosed.length) return;
		vm.$fire('getTitles', vm.$model.itemChoosed);
		$pager.state = 'examing';
	};

	vm.updateCheckState = function() {
		vm.checkall = vm.checkall;
	};
	vm.updateChooseState = function() {
		vm.itemChoosed = vm.itemChoosed;
	};

	vm.fillSubjects = function(data) {
		
		$pager.title = data["project_name"];
		$vm.$project_id = data["project_id"]; // 赋予项目ID
		avalon.each(data.list, function(i, d) {
			vm.subjects.push({
				title: d["type_name"],
				id: d["type_id"], // 知识点类型
				checked: true
			});
		});
	};


});

var $exam = $vm = avalon.define("main", function(vm){
    $.extend(vm, { //练习题的vm结构
	    //title: '考试',
	    $project_id: 0,
	    $user_id: 0,

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
		analysis_open: { // 解题按钮状态
			get: function() {
				var idx = this.shownIndex;
				if(!this.exams.length) return false;
				return this.exams[idx].analysis_open;
			}
		}, 
		rightCount: { // 获得正确的题目数
			get: function() {
				var count = 0;
				avalon.each(this.exams, function(i, exam) {
					(exam.valid_state == 'valid') && count++;
				});
				return count;
			}
		},
		wrongCount: {
			get: function() {
				var count = 0;
				avalon.each(this.exams, function(i, exam) {
					(exam.valid_state == 'invalid') && count++;
				});
				return count;
			}
		},
		rightCountUntil: function(index) {
			if(!vm.exams.length) return;
			var count = 0, exam;
			for(var i = 0, l = vm.exams.length; i <= index; i++) {
				exam = vm.exams[i];
				if(exam.valid_state == 'valid') count++;
			}
			return count;
		},
		initCount: {
			get: function() {
				var count = 0;
				avalon.each(this.exams, function(i, exam) {
					(exam.valid_state == 'initial') && count++;
				});
				return count;
			}
		},
		updateCounts: function() {
			vm.rightCount = vm.rightCount;
			vm.wrongCount = vm.wrongCount;
			vm.initCount = vm.initCount;
			$exam.showIfFinished();
		},
		nextQuest: function(){
			document.body.scrollTop = 0;
			if($vm.shownIndex == $vm.exams.length - 1) {
				toast('已经是最后一题');
				return;
			} 
			$vm.shownIndex++;
		},
		prevQuest: function(){
			document.body.scrollTop = 0;
			if($vm.shownIndex <= 0) {
				toast('已经是第一题');
				return;
			}
			$vm.shownIndex--;
		},
		jumpTo: function(index) {
			document.body.scrollTop = 0;
			$vm.shownIndex = index;
			$vm.isProgressShowing = false;
			$pager.state = 'examing';
		},
		openAnalysis: function() {
			if($vm.analysis_open) return;
			$vm.exams[$vm.shownIndex].valid_state = 'invalid';
			$vm.analysis_open = $vm.exams[$vm.shownIndex].analysis_open = true;
		},
		triggerProgress: function(){
			$vm.isProgressShowing = !$vm.isProgressShowing;
			//if($vm.isProgressShowing)
				//document.body.scrollTop = document.body.clientHeight;
			//else
			//	$pager.state = 'examing';
		},
		optClick: function(opt, exam){ // 选某个答案
			if(exam.analysis_open) return;
			if(exam.$quest_type == 1) { // 单选题
				opt.checked = !opt.checked;
				$vm.analysis_open = exam.analysis_open = true;

				if(!!~exam.$opt_answers.indexOf(opt.id)) {
					exam.valid_state = 'valid';
				} else {
					exam.valid_state = 'invalid';
				}
				vm.updateCounts();
			} else if (exam.$quest_type == 2 || exam.$quest_type == 4) { //多选或不定项
				opt.checked = !opt.checked;
			}
		},
		judgeClick: function(opt_type, exam){
			if(exam.analysis_open) return;
			if(opt_type) {
				exam.checked_state = 'true'
			} else {
				exam.checked_state = 'false'
			}
			exam.valid_state = opt_type == exam.$judge_answer ? 'valid' : 'invalid';
			$vm.analysis_open = exam.analysis_open = true;
			vm.updateCounts();
		},
		questSubmit: function(exam) { // 复选框的提交
			$vm.analysis_open = exam.analysis_open = true;
			avalon.each(exam.options, function(i, option){ //判断是否勾选错误
				if((option.checked && !~exam.$opt_answers.indexOf(option.id)) || (!option.checked && !!~exam.$opt_answers.indexOf(option.id)) ) {
					exam.valid_state = 'invalid';
					return false;
				}
			});
			if(exam.valid_state == 'initial') exam.valid_state = 'valid';
			vm.updateCounts();
		},
		getAnswerChar: function(exam) { // 返回正确答案所属的ABCD
			var ansstr = '';
			switch(exam.$quest_type) {
				case 1: 
				case 2:
				case 4:
					avalon.each(exam.options, function(index, option) {
						if(!!~exam.$opt_answers.indexOf(option.id)) {
							ansstr += ['A','B','C','D','E','F','G','H','I','J'][index] + ' '
						}
					});
					break;
				case 3:
					ansstr += exam.$judge_answer ? 'A' : 'B'
			}
			return ansstr;
		},
		getUserAnswerChar: function(exam) {
			var ansstr = '';
			switch(exam.$quest_type) {
				case 1: 
				case 2:
				case 4:
					avalon.each(exam.options, function(index, option) {
						if(option.checked) {
							ansstr += ['A','B','C','D','E','F','G','H','I','J'][index] + ' '
						}
					});
					break;
				case 3:
					if(exam.checked_state == 'true') {
						ansstr += 'A';
					} else if(exam.checked_state == 'false') {
						ansstr += 'B';
					}
					break;
				default:
					break;
			}
			return ansstr;
		},
		showResult: function() {
			$pager.state='result';
		},
		showIfFinished: (function() {
			var showed = false
			return function() {
				if($exam.initCount) return;
				toast('已全部答完')
				showed = true
			}
		})(),
		fillExams: function(data) {
			avalon.each(data, function(i, srv_exam) {
				var exam = srv_exam["titleinfo"];
				var o = {
					$exam_id: exam['id'], //题目id
					$title: exam['title_name'],
					$quest_type: exam['title_type'], // （1：单选，2：多选，3：判断，4：不定项）
					$belong_id: exam['type_id'], //知识点id
					valid_state: 'initial',
					analysis_open: false, // 打开题解否
					$opt_answers: exam['answerList'],
					$analysis: exam['title_analysis'],
					$judge_answer: exam["judgeTrue"], // 正确答案为 “是”
					options: exam['items'],
					checked_state: ''
				};
				if(o.options) {
					avalon.each(o.options, function(i, option) {
						option.checked = false;
					});
				}
				
				$vm.exams.push(o);				
			});		
			avalon.each($vm.exams, function(e, exam) {
				exam.$watch('valid_state', function(state) {
					if(state == 'valid') {
						setTimeout(function() {
							$vm.nextQuest();
						}, 700);
					}
				});
			});
		},
		saveResult: function(restart) {
			var answers = [];
			var model = vm;
			toast('请稍候..')
			avalon.each(vm.$model.exams, function(i, exam) {
				if(exam.valid_state !== 'initial') {
					var answerArr = [];
					if(exam.options) {
						answerArr = $.map(exam.options, function(value, index) {
							if(value.checked) return value.id;
						});
					}

					if(!answerArr.length && exam['$quest_type'] == 3) {
						answerArr.push(exam.checked_state == 'true' ? 1 : 0);
					} 
					
					answers.push({
						user_id: model['$user_id'],
						type_id: exam['$belong_id'],
						project_id: model['$project_id'],
						title_id: exam['$exam_id'],
						answer: answerArr.join(','),
						option_id: exam.$opt_answers ? exam.$opt_answers.join(',') : '',
						flag: exam.valid_state == 'valid' ? 1 : 0
					});
				}
			});
			if(restart) {
				vm.$fire('restart', answers);
			} else {
				if($pager.state !== 'result') {
				    return window.location.href="/client/paper/paperModuleList.html";
				}
				vm.$fire('saveResult', answers);
			}
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

function toast(msg) {
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
	}, 1100);
	
}