/*jshint multistr: true */

function log(message,txt){
	var context = "'"+message +"'"+'¬ \n';
	if (message){
		console.log(context  + txt); 
	}else {
		console.log(txt); 
	}
}
//named for debugging purposes, self invoked, or auto invoked, function
// creating private functions
(function selfinvoked(){
var Notes = {
	// Create global vars within 'Notes'
	rowId : "",

	init: function(tableId){
		localStorage.setItem("loggedinuser", "Mr Super User");
		this.createId(tableId);
		this.clickFunc(tableId);
		this.formSubmit();
	},

	createId: function(tableId){
		var tbl = "#"+tableId;
		 $(tbl + " tr").each(function(i){
		 	$(this).attr("id", "id"+i);
		 });
		 Notes.populateNotes(tableId);
	},

	populateNotes: function(tableId){
		$("#" + tableId + " tr").each(function(){
			var rowId = $(this).closest("tr").attr("id");
			// If data is available then populate table notes column 
			if ((localStorage.getItem(rowId) !== null)&&(localStorage.getItem(rowId) !== "")){
				$(this).find(".notes").last().text(localStorage.getItem(rowId));
				$(this).find(".lastedited").text(" last edited by " + localStorage.loggedinuser);
				$(this).find(".date").last().text(" on " + localStorage.getItem("date"+rowId));
			}
		}); 
	},

	clickFunc: function(tableId){
		if(typeof(Storage) !== "undefined") {
		    // Browser has session storage - Code for localStorage
			var tbl = "#"+tableId;
			$("#"+tableId+" a").click(function(e){
				// open form
				$("#addNote").addClass("show");			
				var name = $(this).closest("tr").find("td").first().text();
				 	//Redefine global var 'rowID'
				 	Notes.rowId = $(this).closest("tr").attr("id");
//log("name + rowId + value", name+Notes.rowId+localStorage.getItem(Notes.rowId));
					// add name to form legend 
				 	$("#addNote #user").val(localStorage.loggedinuser);
					// if 'this' ID value has data then populate textarea with current data
				 	if ((localStorage.getItem(Notes.rowId) !== null)&&(localStorage.getItem(Notes.rowId) !== "")){
				 		$("#addNote textarea").val(localStorage.getItem(Notes.rowId));	
				 		// set legend to 'Edit not Add'
				 		$("#addNote legend").text("Edit "+ name +"'s note");
				 	} else{
				 		// set legend to 'Add not Edit' and empty text area
				 		$("#addNote textarea").val("");
				 		$("#addNote legend").text("Add a note for "+ name);
				 	}
	   			e.preventDefault();
			}); 
			
	    } else {
	        // Sorry! No Web Storage support..
	        alert("Sorry! No Web Storage support.. We can't continue this demo");
	    }
	},

	formSubmit: function(){
		$("#addNote button.btn").click(function(e){
			var d = new Date(),
				D = d.getDate(),
				M = d.getMonth(),
				Y= d.getFullYear();
			var that = $(this),
	        	txt = $("#addNote textarea").val();     
	        	$("#" + Notes.rowId + " .notes").last().text(txt);
	        	$("#" + Notes.rowId + " .lastedited").text(" last edited by " + localStorage.loggedinuser);
	        	$("#" + Notes.rowId + " .date").text(" on " + D+"/"+M+"/"+Y);
	        	
	        	localStorage.setItem(Notes.rowId, txt);
	        	localStorage.setItem("date"+Notes.rowId, D+"/"+M+"/"+Y);
	        	e.preventDefault();
	        	// a reset function after the form is submitted
	        	$(this).text($(this).attr("data-confirmtext"));
	        	setTimeout(Notes.formReset, 2000, that);
//log("Notes.rowId", Notes.rowId);
	        });
	},

	formReset: function(that){
		$("#addNote").removeClass("show");
		that.text(that.attr("data-origtext"));
	}
};
Notes.init("data_table");
}()); 