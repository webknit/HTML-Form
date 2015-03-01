var Form = Form || {};

Form.formErrorsFound = false;

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

Form.checkForm = function() {

	Form.Submitted = true;
	var formOk = true;

	Form.Elements.errorMessage.removeClass('form__error--show');

	Form.Elements.inputCheck.each(function() {
	
		if($(this).val() === '') {
		
			$(this).next('.form__error').addClass('form__error--show');
			
			formOk = false;
		
		}
		
	});
	
	Form.Elements.emailCheck.each(function() {
	
		var email = $(this).val();
		
		var re = /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
		
		if (email == '' || !re.test(email)) {
		
		    $(this).next('.form__error').addClass('form__error--show');
		    
		    formOk = false;
		   
		}
		
	});
	
	var pass1 = Form.Elements.password1.val();
	var pass2 = Form.Elements.password2.val();
	
	if(pass1 !== pass2 || pass1 == '' || pass2 == '') {
	
		$('#password2').next('.form__error').addClass('form__error--show');
		
		formOk = false;
	
	}
	
	if(formOk) alert('sent');
	else Form.formErrorsFound = true;
	
};

$('.form').submit(function(e) {

	e.preventDefault();

	Form.checkForm();
  
}); 

Form.Elements.input.blur(function() {

	if(Form.formErrorsFound) Form.checkForm();

});