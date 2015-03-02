var Form = Form || {};

Form.formErrorsFound = false;
Form.formOk = true;

Form.ErrorText = {
	input: 'This field is required',
	email: 'This email is incorrect'	
}

Form.Elements = {
	errorMessage: $('.form__error'),
	input: $('.form__input'),
	inputCheck: $('.form__input-check'),
	emailCheck: $('.form__email-check'),
	passwordCheck: $('.form__password-check'),
	matchingFields: $('input[data-match]')
}

Form.CheckEntry = function() {

	var form = this;
	Form.Elements.inputCheck.each(function() {
	
		if($(this).val() === '') {
		
			$(this).next('.form__error').addClass('form__error--show');

			form.formOk = false;
		
		}
		
	});

}

Form.CheckEmail = function() {

	var form = this;

	this.Elements.emailCheck.each(function() {
	
		var email = $(this).val();
		
		var re = /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
		
		if (email == '' || !re.test(email)) {
		
		    $(this).next('.form__error').addClass('form__error--show');
		    
		    form.formOk = false;
		   
		}
		
	});

}

Form.SameArrayValues = function(array) {
	
	return array.reduce(function(a, b){ 
		return (a.val() === b.val() && a.val() !== '') ? true : false;
	});
};

Form.CheckMatches = function() {

	var matchIds = {};

	var form = this;

	this.Elements.matchingFields.each(function(index, element){
		var $element = $(element);

		var dataMatch = $element.data('match');

		if(matchIds[dataMatch] === undefined) {

			matchIds[dataMatch] = [$element];

		} else {

			matchIds[dataMatch].push($element);

		}
		

	});

	for(var dataMatch in matchIds) {
		for (var i = matchIds[dataMatch].length - 1; i >= 0; i--) {

			if(Form.SameArrayValues(matchIds[dataMatch]) === false) {
				this.formOk = false;
				matchIds[dataMatch][matchIds[dataMatch].length - 1].next('.form__error').addClass('form__error--show');
			}
			
		};
	}

	// console.log(matchIds.password);
	// var pass1 = this.Elements.password1.val();
	// var pass2 = this.Elements.password2.val();
	
	// if(pass1 !== pass2 || pass1 == '' || pass2 == '') {
	
	// 	this.Elements.password2.next('.form__error').addClass('form__error--show');
		
	// 	this.formOk = false;
	
	// }

}

Form.checkForm = function() {

	this.formOk = true;

	this.Elements.errorMessage.removeClass('form__error--show');

	// Seperate the fuunctions
	this.CheckEntry();

	console.log(this.formOk);

	this.CheckEmail();

	this.CheckMatches();

	console.log("formOk is " + this.formOk);

	return this.formOk;
	
};

$('.form').submit(function() {

	//e.preventDefault();

	return Form.checkForm();
  
}); 

Form.Elements.input.blur(function() {

	if(!Form.formOk) Form.checkForm();

});