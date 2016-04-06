module.exports = function(grunt){

grunt.initConfig({
		pkg: grunt.file.readJSON('package.json'),

		// Start of style grunt 
		sass_globbing: {
			your_target: {
				files: {
					'assets/sass/main.scss': [
									'assets/sass/common/**/*.scss',
									'assets/sass/pages/**/*.scss'
								]
					},
				options: {
					useSingleQuotes: true
				}
			}
		},
		sass: {
			dist: {
				options: {
				  "sourcemap=none": '',
				  // nested, compact, compressed, expanded
				  'style':'expanded'
				},
				files: {
					'assets/build/style.css' : 'assets/sass/main.scss'
				}
			}
		},

		autoprefixer:{
			options: {
			  	browsers: ['last 2 versions', 'ie 8', 'ie 9']
			},
	      	dist:{
	        	files:{
	          	'assets/build/style.css':'assets/build/style.css'
	        	}
	      	}
	    },

		watch: {
			options: {
				livereload: true,
			},
			html: {
				files: ['*.html'],
				tasks: ['copy']
			},
			js: {
				files: ['assets/js/**/*.js'],
				tasks: ['copy']
			},
			sass: {
		    files: 'assets/sass/**/*.scss',
		    tasks: ['sass_globbing','sass','autoprefixer','cssmin','copy','clean']
		  },
		  bower_component: {
				files: ['assets/js/dist/**/*.js'],
				tasks: ['bower']
			},
		},
		
		 // End of style grunt 

		 

		concat: {
			js_vendor: {
				src: 'assets/js/dist/**/*.js',
				dest: 'assets/build/vendor.min.js',
			},
			js_user: {
				src: 'assets/js/user/**/*.js',
				dest: 'assets/build/user.min.js',
			},
			
			// css: {
			// 	src: 'style/*.css',
			// 	dest: 'build/css/concat.css'
			// }
		},//End of concat

		cssmin: {
			target: {
				files: [{
					expand: true,
					cwd: 'assets/build',
					src: ['*.css', '!*.min.css'],
					dest: 'assets/build',
					ext: '.min.css'
				}]
			}
		},

		uglify: {
		    // options: {
		    //   mangle: {
		    //     // except: ['jQuery', 'Angular']
		    //   }
		    // },
		    js_vendor_mini: {
		      files: {
		        'assets/build/vendor.min.js': ['assets/build/vendor.min.js']
		      }
		    },
		    js_user_mini: {
		      files: {
		        'assets/build/user.min.js': ['assets/build/user.min.js']
		      }
		    }
		},

		clean : {
		    yourTarget : {
		        src : [ 
		        		'assets/build/style.css',
		        	]
		    }
		},
		bower: {
		  dev: {
		    dest: '',
		    js_dest: 'assets/js/',
		    css_dest: 'assets/bower/css/',
		    less_dest: 'assets/bower/less/'
		  }
		},
		express: {
			all: {
				options: {
					port: 8000,
					hostname: 'localhost',
					bases: ['.'],
					livereload: true
				}
			}
		},
		copy: {
      all: {
        files: [
          { expand: true, cwd: 'assets/build/', src: ['**'], dest: 'public/' }
        ],
      }
    },
	});


	require('load-grunt-tasks')(grunt);



	/*
		Command list
		
		grunt dev	
		grunt watch

		grunt deploy
	*/
	grunt.registerTask('server', ['express','bower','dev','copy','watch']);
	grunt.registerTask('dev', ['sass_globbing','sass','autoprefixer','clean']);

	grunt.registerTask('deploy', ['sass_globbing','sass', 'autoprefixer', 'concat', 'uglify', 'clean']);
};