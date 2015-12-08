$(document).ready(function()
{
    $('#questionType').change(function(){
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
          $(".form-group.select").append('<div><input type="checkbox" name="vehicle1" value="Bike">option</div>');
          return ;
        }
    });
});


function addQuestionFunction(){
  /*var num = Math.random();
  var string1 = '<div class="form-group"><label for="question">질문 제목</label><input type="text" id="question'+num+'"';
  var string2 = 'name="question" placeholder="질문 제목" class="form-control"></div>'
  var string3 = '<div class=.form-group.select><label for="questionType" id="questionTypeLabel'+num+'"';
  var string4 = '>질문 유형 <select id="questionType'+num+'"';
  var string5 = 'name="questionType" onchange="myfunction(this.value)" class="qusetionTypeSelect"><option value="select">선택</option><option value="short">단일 입력</option><option value="long">long text</option><option value="multiple">객관식 질문</option></select></label></div>';
  $(".form-actions").before(string1 + string2);
  $(".form-actions").before(string3 + string4 + string5);*/
  $(".form-actions").before('<div class="form-group"><label for="question">질문 제목</label><input type="text" id="question" name="question" placeholder="질문 제목" class="form-control"></div>');
  $(".form-actions").before('<div class="form-group select" id="question"'+count+'><label for="questionType" id="questionTypeLabel">질문 유형 <select id="questionType" name="questionType" onchange="myfunction(this.value)" class="qusetionTypeSelect"><option value="select">선택</option><option value="short">단일 입력</option><option value="long">long text</option><option value="multiple">객관식 질문</option></select></label></div>');
}
