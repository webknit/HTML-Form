var Form = Form || {};

Form.Submitted = false;

Form.ErrorText = {
	input: 'This field is required',
	email: 'This email is incorrect'	
}

Form.Elements = {
	errorMessage: $('.form__error'),
	inputCheck: $('.form__input-check'),
	emailCheck: $('.form__email-check'),
	passwordCheck: $('.form__password-check'),
}

Form.checkForm = function() {

	var formOk = true;

	Form.Elements.errorMessage.removeClass('form__error--show');

	Form.Elements.inputCheck.each(function() {
	
		if($(this).val() === '') {
		
			$(this).next('.form__error').addClass('form__error--show');
			
			formOk == false;
		
		}
		
	});
	
	Form.Elements.emailCheck.each(function() {
	
		var email = $(this).val();
		
		var re = /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
		
		if (email == '' || !re.test(email)) {
		
		    $(this).next('.form__error').addClass('form__error--show');
		    
		    formOk == false;
		    
		}
		
	});
	
	var pass1 = $('#password1').val();
	var pass2 = $('#password2').val();
	
	console.log('pass1 ==' + pass1);
	
	if(pass1 !== pass1 || pass1 == '' || pass2 == '') {
	
		$('#password2').next('.form__error').addClass('form__error--show');
		
		formOk == false;
	
	}
	
	if(!formOk) return false;
	
};

$('.form').submit(function(e) {

	e.preventDefault();

	Form.checkForm();

    
}); 