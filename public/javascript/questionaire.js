function myfunction(){

  var selected = $("#questionType option:selected").val();

  if(selected === 'select'){
    confirm('질문 유형을 선택해 주세요');
  }
  else if(selected === 'short'){
    $(".form-group.select").append('<div><input type="text" name="answer" class="form-control" placeholder="답변"></div>');
    return ;
  }
  else if(selected === 'long'){
    $(".form-group.select").append('<div><textarea rows="10" cols="80"></textarea></div>');
    return ;
  }
  else if(selected === 'multiple'){
    $(".form-group.select").append('<div><input type="checkbox" name="vehicle1" value="Bike">option</div>');
    return ;
  }
}

function addQuestionFunction(){
  $(".form-actions").before('<div class="form-group"><label for="question">질문 제목</label><input type="text" id="question" name="question" placeholder="질문 제목" class="form-control"></div>');
  $(".form-actions").before('<div class=.form-group.select><label for="questionType" id="questionTypeLabel">질문 유형 <select id="questionType" name="questionType" onchange="myfunction(this.value)" class="qusetionTypeSelect"><option value="select">선택</option><option value="short">단일 입력</option><option value="long">long text</option><option value="multiple">객관식 질문</option></select></label></div>');
}

function addButton(){
  alert("here");
}
