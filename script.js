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
	password1: $('#password1'),
	password2: $('#password2'),
}

Form.CheckEntry = function() {

	Form.Elements.inputCheck.each(function() {
	
		if($(this).val() === '') {
		
			$(this).next('.form__error').addClass('form__error--show');
			
			this.formOk = false;
		
		}
		
	});

}

Form.CheckEmail = function() {

	this.Elements.emailCheck.each(function() {
	
		var email = $(this).val();
		
		var re = /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
		
		if (email == '' || !re.test(email)) {
		
		    $(this).next('.form__error').addClass('form__error--show');
		    
		    this.formOk = false;
		   
		}
		
	});

}

Form.CheckPassword = function() {

	var pass1 = this.Elements.password1.val();
	var pass2 = this.Elements.password2.val();

	console.log('pass1 is ' + pass1);
	console.log('pass2 is ' + pass2);
	
	if(pass1 !== pass2 || pass1 == '' || pass2 == '') {
	
		this.Elements.password2.next('.form__error').addClass('form__error--show');
		
		this.formOk = false;
	
	}

	console.log("formOk is " + this.formOk);

}

Form.checkForm = function() {

	this.formOk = true;

	this.Elements.errorMessage.removeClass('form__error--show');

	// Seperate the fuunctions
	this.CheckEntry();

	this.CheckEmail();

	this.CheckPassword();

	if(this.formOk) alert('sent');

	else this.formErrorsFound = true;
	
};

$('.form').submit(function(e) {

	e.preventDefault();

	Form.checkForm();
  
}); 

Form.Elements.input.blur(function() {

	if(Form.formErrorsFound) Form.checkForm();

});