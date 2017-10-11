$(document).ready(function() {

    $('.digit').click(function() {
        if ($('#input').text().substr(-1) !== ')') {
            $('#input').append($(this).val());
        }
    });
  
    $('.parenthesisL').click(function() {
        if (/.*[0-9]$|--$|[\.)]$/.test($('#input').text())) {
            return;
        }
        $('#input').append('(');
    });
  
    $('.parenthesisR').click(function() {
        var str = $('#input').text();
        var arrClosed=str.match(/\)/g);
        var arrOpened=str.match(/\(/g);
        var counterClosed = arrClosed === null ? 0 : arrClosed.length;
        var counterOpened = arrOpened=== null ? 0 : arrOpened.length;
        if (counterClosed >= counterOpened) {
            return;
        }
        if (/.*[+-/*(]$|^$|\.$/.test(str)) {
            return;
        }
        $('#input').append(')');
    });
  
    $('.butMathOperation').click(function() {
        if (/.*[+-/*(]$|^$|\.$/.test($('#input').text())) {
            return;
        }
        $('#input').append($(this).val());
    });
  
    $('.minus').click(function() {
        if (/[\.-]$/.test($('#input').text())) {
            return;
        }
        $('#input').append("-");
    });
  
    $(".dot").click(function() {
        var str = $('#input').text();
        if (/.*\d+\.\d*$|\)$/.test(str)) {
            return;
        }
        var sAppend = /.*[+-/*(]$|^$/.test(str) ? '0.' : '.';
        $('#input').append(sAppend);
    });
  
    $('.delete').click(() => $('#input').text($('#input').text().slice(0, -1)));
  
    $('.clear').click(function() {
        var m = "https://corroboratory-appre.000webhostapp.com/1/04715.mp3";
        audio = new Audio(m);
        audio.play();
        $('#input,#output').text("").show(500);
        $("#input2").val('');
    });

    $(".equally").click(() => eqall());
    $("#input2").keyup(function(e) {
        $("#input").hide(500);
        (e.keyCode === 13) ? eqall(): 0;
        ($("#input2").val().length === 0) ? $("#input").show(500): 0;

    });


    function eqall() {
      
        var str = $('#input').text().replace(/[+-/*]$/, '');
        $('#input').text(str);
        if ($("#input2").val().length > 0) {
            str = $("#input2").val();
        }
        var equally, index1, index2, cutINquotes;
        if (str.indexOf('(') !== -1) {
            if (str.match(/\)/g).length !== str.match(/\(/g).length) {
                alert("the expression does not have a closing or opening quotation mark");
                return;
            }
            var closeQutes = str.match(/\)/g).length;

            do {
                index1 = str.lastIndexOf("(");
                index2 = str.indexOf(")", index1);
                cutINquotes = str.slice(index1 + 1, index2);
                str = str.replace(str.slice(index1, index2 + 1), computeSimpleExpression(cutINquotes));
                closeQutes--;

            } while (closeQutes > 0);
        }
        equally = computeSimpleExpression(str);
        console.log(equally);
        $("#output").text(equally);
    }

    function computeSimpleExpression(string) {

        if (string.match(/\.\d+|\d+\.?\d*|./g).length === 1) {
            return string;
        }
        var expression = string.replace(/--/g, '+').replace(/\+-/g, '-');
        var result = '/*+-'.split('').reduce((acc, curr) => compute_sign(acc, curr), expression);

    
        function compute_sign(sExpression, sign) {
            var re = new RegExp('\\+*(-*\\d+\\.*\\d*)(\\' + sign + ')\\+*(-*\\d+\\.*\\d*)');
            var newExpr = sExpression;
            do {
                var current = newExpr;
                newExpr = current.replace(re, f_op);
            } while (current !== newExpr);
            return newExpr;
        }

        function f_op(match, p1, p2, p3) {
          var  op_res;  
            switch (p2) {
                case '/':
                     op_res = parseFloat(p1) / parseFloat(p3);
                    break;
                case '*':
                     op_res = parseFloat(p1) * parseFloat(p3);
                    break;
                case '+':
                    op_res = parseFloat(p1) + parseFloat(p3);
                    break;
                case '-':
                    op_res = parseFloat(p1) - parseFloat(p3);
                    break;
                default:
                     op_res = 0;
            }
            return (( op_res >= 0) ? '+' : '') +  op_res;
        }
        return (result >= 0) ? result.slice(1) : result;
    }
});