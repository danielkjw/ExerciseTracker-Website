module.exports = function(){
var templates = {};
    //need tmpl to be name of handlebars file
var display_template = function(tmpl, data) {
        
        console.log('display');
        console.log("Inside display_tempalte");
        if (templates[tmpl] === undefined) {
          console.log("need");
          jQuery.get("./" + tmpl + ".handlebars", function(resp) {
              console.log(resp);
              templates[tmpl] = Handlebars.compile(resp); //handlebars creates 
              console.log("Create template display_tempalte");
              display_template(tmpl, data);
          });
          return;
        }
        // var r2 = data;
        console.log("2nd call to display_tempalte");
        var template = templates[tmpl];
        var html = template(data);
        console.log("about to attach template");
        console.log(templates);
       $("#"+ tmpl).html(html);
    };

var getFriendlist = function(id){
    console.log(id);
    $.ajax({
        url: '/friendlist/' + id,
        type: 'GET',
        success: function(result){
            // var r2 = JSON.stringify(result);
        var r2 = result;
        console.log(r2);
        display_template('friendlist', r2);
        }});
     };

var getMemExercise = function(id){
    console.log(id);
    $.ajax({
        url: '/memberexercise/' + id,
        type: 'GET',
        success: function(result){
            // var r2 = JSON.stringify(result);
        var r2 = result;
        console.log(r2);
        display_template('memberexercise', r2);
        $(function () {
            $('[data-toggle="popover"]').popover()
        });
        }});
     };

var updateMemExercise = function(id5){
    var id = id5;
    $.ajax({
        url: '/memberexercise/' + id,
        type: 'PUT',
        data: $('#memberExerciseUpdate').serialize(),
        success: function(result){
            $("#memberExerciseUpdateModal").modal('hide');
            window.location.reload();
        }
    });
};


var getMemExerciseUpdate = function(id6){
    var id = id6;
    $.ajax({
        url: '/memberexercise/exercise/'+ id,
        type: 'GET',
        success: function(result){
        var exercise = result;
        console.log(exercise);
        display_template('updateMemberExercise', exercise);
        }});
    };
    


var deleteMemExercise = function deleteMemberExercise(id7){
var id = id7;
$.ajax({
    url: '/memberexercise/' + id,
    type: 'DELETE',
    success: function(result){
        window.location.replace("./member");
    }
});
};   


var getAddMemberExercise = function(id1){
    var id = id1;
    // var id = $("#getAddMemberExerciseID").attr("id");
    console.log(id);
    $.ajax({
        url: '/memberexercise/add/'+ id,
        type: 'GET',
        success: function(result){
        var exercise = result;
        display_template('addMemberExercise', exercise);
        
        }});
     };


var addMemberExercise = function(id8){
    var id = id8;
    console.log("member page");
    $.ajax({
        url: '/memberexercise/' + id,
        type: 'POST',
        data: $('#addMemberExercise11').serialize(),
        success: function(result){
            // var r2 = JSON.stringify(result);
        
        $("#addMemExerciseModal").modal('hide');
        window.location.replace("./member");
        
        }});
     };

///////////////////BWEIGHT FUNCTIONS/////////////////////////////


var getBweight = function(id7){
    var id = id7;
    $.ajax({
        url: '/bweight/' + id,
        type: 'GET',
        success: function(result){
            // var r2 = JSON.stringify(result);
        var bweight = result;
        display_template('bweight', bweight);
     }
    });
};

var updateBweight = function(id8){
    var id = id8;
    $.ajax({
        url: '/bweight/' + id,
        type: 'PUT',
        data: $('#updateBweightForm').serialize(),
        success: function(result){
            $("#bweightUpdateModal").modal('hide');
            window.location.reload();
        }
    });
};


var getBweightUpdate = function(id1){
    var bid = id1;
    $.ajax({
        url: '/bweight/'+ bid,
        type: 'GET',
        success: function(result){
        var bweight = result;
        display_template('updatebweight', bweight);
        }});
    };
    


var deleteBweight = function(id1){
    var id = id1;
    $.ajax({
        url: '/bweight/'+ id,
        type: 'DELETE',
        success: function(result){
            window.location.replace("./member");
        }
    });
};   


var getAddBweight = function(id9){
    var id = id9;
    // var id = $("#getAddMemberExerciseID").attr("id");
    console.log(id);
    $.ajax({
        url: '/bweight/' + id,
        type: 'GET',
        success: function(result){
        var bweight = result;
        display_template('addbweight', bweight);
        }});
     };


var addBweight = function(id11){
    var id = id11;
    console.log("member page");
    $.ajax({
        url: '/bweight/' + id,
        type: 'POST',
        data: $('#addBweightForm').serialize(),
        success: function(result){
            // var r2 = JSON.stringify(result);
        $("#addBweightModal").modal('hide');
        window.location.replace("./member");

        }});
     };


////////////////// LOG DETAILS //////////////

var getLogUpdate = function(id10){
    var id = id10;
    $.ajax({
        url: '/logexercise/update/'+ id,
        type: 'GET',
        success: function(result){
        var memberlog = result;
        console.log(memberlog.mid);
        display_template('updatelog', memberlog);
        }});
    };

var updateLog = function(id12){
    var id = id12;
    $.ajax({
        url: '/logexercise/update/' + id,
        type: 'PUT',
        data: $('#updateLogForm').serialize(),
        success: function(result){
            $("#logUpdateModal").modal('hide');
            window.location.reload();
        }
    });
};


var getlogDetails = function(id13){
    var id = id13;
    $.ajax({
        url: '/logexercise/' + id,
        type: 'GET',
        success: function(result){
            // var r2 = JSON.stringify(result);
        var memberlog = result;
        display_template('logdetails', memberlog);
     }
    });
};

var deleteLog = function(id1){
    var id = id1;
    $.ajax({
        url: '/logexercise/'+ id,
        type: 'DELETE',
        success: function(result){
            window.location.replace("./logexercise");
        }
    });
};   

var getAddLog = function(){
    $.ajax({
        url: '/logexercise',
        type: 'GET',
        async : false,
        success: function(result){
            var memberlog = result;
            console.log(memberlog + " AND " + memberlog +  "This is the result");
            display_template('addlog', memberlog);
        }
    });
};
    

var addLog = function(id17){
    var id = id17;
    $.ajax({
        url: '/logexercise',
        type: 'POST',
        data: $('#addLogForm').serialize(),
        success: function(result){
            // var r2 = JSON.stringify(result);
        $("#addLogModal").modal('hide');
        window.location.replace("./logexercise");

        }});
     };






var getBweightUpdate = function(id18){
    var bid = id18;
    $.ajax({
        url: '/bweight/'+ bid,
        type: 'GET',
        success: function(result){
        var bweight = result;
        display_template('updatebweight', bweight);
        }});
    };
    




var getAddBweight = function(id21){
    var id = id21;
    // var id = $("#getAddMemberExerciseID").attr("id");
    console.log(id);
    $.ajax({
        url: '/bweight/' + id,
        type: 'GET',
        success: function(result){
        var bweight = result;
        display_template('addbweight', bweight);
        }});
     };


var addBweight = function(id1){
    var id = id1;
    console.log("member page");
    $.ajax({
        url: '/bweight/' + id,
        type: 'POST',
        data: $('#addBweightForm').serialize(),
        success: function(result){
            // var r2 = JSON.stringify(result);
        $("#addBweightModal").modal('hide');
        window.location.replace("./member");

        }});
     };





    
////////////////////Exercise Functions///////////////////////////


var getCategory = function(){
    $.ajax({
        url: '/category',
        type: 'GET',
        success: function(result){
            // var r2 = JSON.stringify(result);
        var r2 = result;
        console.log(r2);
        display_template('category', r2);
        }});
     };

var addCategory = function(){
    $.ajax({
        url: '/category',
        type: 'POST',
      data: $('#addCategory11').serialize(),
        success: function(result){
            // var r2 = JSON.stringify(result);
        $("#addCategoryeModal").modal('hide');
        window.location.replace("./exercise");
        }
    });
    }
    
var deleteCategory = function(idc){
    var id = idc;
    $.ajax({
        url: '/category/' + id,
        type: 'DELETE',
        success: function(result){
        window.location.replace("./exercise");
        }
    });
};

var getCategoryUpdate = function(ide){
    var id = ide;
    $.ajax({
        url: '/category/' + id,
        type: 'GET',
        success: function(result){
            // var r2 = JSON.stringify(result);
        var category = result;
        console.log(category);
        display_template('categoryupdate', category);
        }});
    };
    
var updateCategory = function(idd){
    var id = idd;
    $.ajax({
        url: '/category/' + id,
        type: 'PUT',
        data: $('#addCategory11').serialize(),
        success: function(result){
            $("#updateCategoryeModal").modal('hide');
           window.location.replace("./exercise");
        }
    });
};


var filterExerciseByCategory = function(){
    var id = $("#categoryFilterId option:selected").attr("id");
    if(id == 0){
        window.location.replace("./exercise");
     };
    console.log(id);
     $.ajax({
        url: '/exercise/category/' + id,
        type: 'GET',
        success: function(result){
            // var r2 = JSON.stringify(result);
        var r2 = result;
        console.log(r2);
        $("#oldtable").hide();
        display_template('getexercise', r2);
        }});
     };


     
var getExercise = function(){
    var id = $("#categoryFilterid option:selected").attr("id");
    console.log(id);
    $.ajax({
        url: '/exercise/' + id,
        type: 'GET',
        success: function(result){
            // var r2 = JSON.stringify(result);
        var r2 = result;
        console.log(r2);
        display_template('friendlist', r2);
        
        }});
     };
     
var addExercise = function(){
    console.log("exercise page");
    var id = $("#categoryFilterid2 option:selected").attr("id");
    console.log(id);
    
    $.ajax({
        url: '/exercise',
        type: 'POST',
        data: $('form').serialize(),
        success: function(result){
            // var r2 = JSON.stringify(result);
        var member = result;
        $("#adduserModal").modal('hide');
        window.location.replace("./exercise");
        
        }});
     };
     
var getExerciseUpdate = function(id){
    //  $("#updateExerciseModal").on('shown.bs.modal',function(event){
    // console.log(id);
    $.ajax({
        url: '/exercise/' + id,
        type: 'GET',
        success: function(result){
            // var r2 = JSON.stringify(result);
        var exercise = result;
        display_template('exerciseupdate', exercise);
        }});
    };
    
var updateExercise = function(id){
    $.ajax({
        url: '/exercise/' + id,
        type: 'PUT',
        data: $('#updateExercise').serialize(),
        success: function(result){
            $("#updateExerciseModal").modal('hide');
           window.location.replace("./exercise");
        }
    });
};

var deleteExercise = function(id1){
    var id = id1;
    $.ajax({
        url: '/exercise/' + id,
        type: 'DELETE',
        success: function(result){
           window.location.replace("./exercise");
        }
    });
};



/////////////////////////Category Functions ////////////////




////////////////////Member Functions///////////////////////////




var getMemberUpdate = function(id1){
    // $("#updateMemModal").on('shown.bs.modal',function(event){
    // console.log(id);
    var id = id1;
    $.ajax({
        url: '/member/' + id,
        type: 'GET',
        success: function(result){
            // var r2 = JSON.stringify(result);
        var member = result;
        console.log(member);
        display_template('updatemember', member);
        
        }});
    // });
    };

var getMemberPage = function(){
    console.log("member page");
    $.ajax({
        url: '/member',
        type: 'GET',
        success: function(result){
            // var r2 = JSON.stringify(result);
        var member = result;
         display_template('member', member);
        }});
     };

var addMember = function(){
    console.log("member page");
    $.ajax({
        url: '/member',
        type: 'POST',
        data: $('form').serialize(),
        success: function(result){
            // var r2 = JSON.stringify(result);
        var member = result;
        $("#adduserModal").modal('hide');
        window.location.replace("./member");
        
        }});
     };


var getMember = function(id77){
    var id = id77;
    console.log(id);
    $.ajax({
        url: '/member/' + id,
        type: 'GET',
        success: function(result){
            // var r2 = JSON.stringify(result);
        var r2 = result;
        console.log(r2);
        display_template('member', r2);
        }});
     };

    var updateMember = function updateMember(id99){
        var id = id99;
        $.ajax({
            url: '/member/' + id,
            type: 'PUT',
            data: $('#updateMember').serialize(),
            success: function(result){
                $("#updateMemModal").modal('hide');
               window.location.replace("./member");
            }
        });
    };
    
     var deleteMember = function updateMember(iid37){
         var id = iid37;
        $.ajax({
            url: '/member/' + id,
            type: 'DELETE',
            success: function(result){
                $("#updateMemModal").modal('hide');
               window.location.replace("./member");
            }
        });
    };
    var enablePop = function(){
        $('#popover123').on('click',function(){
          console.log("popover");
          $('#popover1').popover('enable'); 
      });
    }
}();
