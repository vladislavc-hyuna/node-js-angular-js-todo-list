function Route(context, connection){
	this.app = context;
}

Route.prototype.init = function(connection) {
	this.app.route('/api/tasks')
	  .get(function(req, res) {
	  	connection.query('SELECT * FROM vladc_todo_list ORDER BY id DESC', function(err, rows, fields) {
	  		res.send({body: rows, error:err});
	    });
	  })
	  .post(function(req, res) {
	  	connection.query('INSERT INTO `nodejs_test_db`.`vladc_todo_list` (`title`, `description`) VALUES ("' + req.body.title + '", "' + req.body.title + '")', function(err, rows, fields){
	  		res.send({body: rows, error:err});  	
	  	});
	  });

	this.app.route('/api/tasks/:id')
	  .get(function(req, res){
	    connection.query('SELECT * FROM vladc_todo_list WHERE id = ' + req.params.id, function(err, rows, fields) {
	        if(rows.length > 0){
	       	 res.send({body: rows, error:err});
		    }else {
		     res.send(404);
		  	}
	    });
	  })
	  .put(function(req, res){
	    var fields = Object.keys(req.body.data);
	    var sqlStr = "";
	    for(var i = 0; i < fields.length; i++) {
	      sqlStr += "`" + fields[i] + "` = '" + req.body.data[fields[i]] + "'," ;
	    }  
	    sqlStr += "updated_at = " + Date.now();
	    console.log(sqlStr);
	    connection.query('UPDATE vladc_todo_list SET ' + sqlStr + ' WHERE id = ' + req.params.id, function(err, rows, fields) {
	    	if(rows.changedRows > 0){
	    		res.send({body: rows, error:err});
	    	} else {
	    		res.send(404);
	    	}
	    });
	  })
	  .delete(function(req, res){
	    connection.query('DELETE FROM vladc_todo_list WHERE id = ' + req.params.id, function(err, rows, fields) {	  
	       if(rows.affectedRows == 1){
	       	 res.send({body: rows, error:err});
		    }else {
		      res.send(404);
		  	}
	    });
	  });

};

module.exports = Route;