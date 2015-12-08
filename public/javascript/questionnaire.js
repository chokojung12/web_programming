$(document).ready(function()
{   
    $('#questionType').change(function(){
        var selected = $("#questionType option:selected").val();

        if(selected === 'select'){
          confirm('질문 유형을 선택해 주세요');
        }
        else if(selected === 'short'){
          $("#short").remove();
          $("#long").remove();
          $("#multiple").remove();
          $(".form-group.select").append('<div><input type="text" name="answer" class="form-control" id="short" placeholder="답변"></div>');
          return ;
        }
        else if(selected === 'long'){
          $("#short").remove();
          $("#long").remove();
          $("#multiple").remove();
          $(".form-group.select").append('<div><textarea rows="10" cols="80" name="answer" id="long" placeholder="답변"></textarea></div>');
          return ;
        }
        else if(selected === 'multiple'){
          $("#short").remove();
          $("#long").remove();
          $("#multiple").remove();
          $(".form-group.select").append('<div id="multiple"><input type="radio" name="radio" class="radio1"><input type="text" name="option" class="option1" id ="inputOption" placeholder="옵션"></div>');
          $("#multiple").append('<button type="button" class="btn btn-xs btn-default" id="addOption">추가</button><button type="button" class="btn btn-xs btn-default" id="deleteOption">삭제</button><button type="button" class="btn btn-xs btn-default" id="andSoOn">기타</button><br class="br1">');
          $(function(){
            $("#addOption").click(function(){
              var cnt = ($('input[name="radio"]').length)+1;
              $("#multiple").append('<input type="radio" name="radio" class="radio'+cnt+'"'+'><input type="text" name="option" id ="inputOption" class ="option'+cnt+'"'+'placeholder="옵션"><br class="br'+cnt+'"'+'>');
            });
          });
          $(function(){
            $("#deleteOption").click(function(){
              var cnt = ($('input[name="radio"]').length);
              if(cnt == 1){
                return ;
              }
              $(".radio"+cnt).remove();
              $(".option"+cnt).remove();
              $(".br"+cnt).remove();
            });
          });
          $(function(){
            $("#andSoOn").click(function(){
              var cnt = ($('.andSoOn').length);
              if(cnt == 1){
                return ;
              }
              $(".form-actions").before('<input type="text" name="andSoOn" class="andSoOn" id ="inputOption" placeholder="기타">');
            });
          });
          return ;
        }
    });
});

$(function(){
  $("#addQuestion").click(function(){
    var cnt = ($('.qusetionTypeSelect').length);
    $(".form-actions").before('<div class="form-group quesionName'+cnt+'"'+'><label for="question">질문 제목</label><input type="text" name="question" placeholder="질문 제목" class="form-control"></div>');
    $(".form-actions").before('<div class="form-group select"><label for="questionType">질문 유형 <select name="questionType" id="questionType'+cnt+'"'+'class="qusetionTypeSelect"><option value="select">선택</option><option value="short">단일 입력</option><option value="long">long text</option><option value="multiple">객관식 질문</option></select></label></div>');
  });
});
/*
function addQuestionFunction(){

  $(".form-actions").before('<div class="form-group"><label for="question">질문 제목</label><input type="text" id="question2" name="question2" placeholder="질문 제목" class="form-control"></div>');
  $(".form-actions").before('<div class="form-group select" id="question2"><label for="questionType" id="questionTypeLabel2">질문 유형 <select id="questionType2" name="questionType2" class="qusetionTypeSelect"><option value="select">선택</option><option value="short">단일 입력</option><option value="long">long text</option><option value="multiple">객관식 질문</option></select></label></div>');
}*/
