function toPolylineExpression(path){
	return path.map(function(it){
		return it.x + " " + it.y;
	}).join(" ");
}

Template.home.helpers({
	strokes : function(){
		return Strokes.find();
	},

	points : function(){
		return toPolylineExpression(this.points);
	},

	stroke : function(){
		if(this.active){
			return "red";
		}
		else{
			return "black";
		}
	}
});

Template.home.events({
	"mousedown #canvas" : function(e, t, d){
		t.activeStrokeId = Strokes.insert({
			picture : "home",
			points : [{
				x : e.offsetX,
				y : e.offsetY
			}],
			active : true
		});
	},
	"mousemove #canvas" : function(e, t, d){
		if(t.activeStrokeId === undefined){
			return;
		}

		var activeStroke = Strokes.findOne(t.activeStrokeId);

		Strokes.update(t.activeStrokeId, {
			$push: {
				points : {
					"x" : e.offsetX,
					"y" : e.offsetY
				}
			}
		});
	},

	"mouseleave #canvas" : function(e, t, d){
		if(t.activeStrokeId === undefined){
			return;
		}
		Strokes.update(t.activeStrokeId, {
			$set : {
				active : false
			}
		});
		delete t.activeStrokeId;
	},

	"mouseup #canvas" : function(e, t, d){
		if(t.activeStrokeId === undefined){
			return;
		}
		Strokes.update(t.activeStrokeId, {
			$set : {
				active : false
			}
		});
		delete t.activeStrokeId;
	},

	"click #clear-button" : function(e, t, d){
		Meteor.call("clearStrokes");
	}
});
