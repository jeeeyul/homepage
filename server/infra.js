Meteor.startup(function(){
	var homePicture = Pictures.findOne("home");
	if(homePicture === undefined){
		Pictures.insert({
			_id : "home",
			"name" : "Home"
		});
	}
});

