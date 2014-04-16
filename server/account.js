Accounts.onCreateUser(function(options, user) {
	console.log(JSON.stringify(user, null, "  "));
	return user;
});