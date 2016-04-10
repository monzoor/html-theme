module.exports = function(grunt){

require('load-grunt-tasks')(grunt);
require('time-grunt')(grunt);

grunt.initConfig({
	pkg: grunt.file.readJSON('package.json'),

	// Start of style grunt 
	sass_globbing: {
		target: {
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

  // end of style grunt

	watch: {
		options: {
			livereload: true,
		},
		sass: {
	    files: 'assets/sass/**/*.scss',
	    tasks: ['sass_globbing','sass','autoprefixer']
	  },
		js: {
			files: ['assets/js/**/*.js'],
		},
		
	  bower_component: {
			files: ['assets/js/dist/**/*.js'],
			tasks: ['wiredep']
		},
	},
  bower: {
	  install: {
      options: {
        targetDir: './lib',
        layout: 'byType',
        install: true,
        verbose: false,
        cleanTargetDir: false,
        cleanBowerDir: false,
        bowerOptions: {}
      }
    }
	},
	tags: {
		buildLinks: {
      options: {
        linkTemplate: '<link rel="stylesheet" type="text/css" href="{{ path }}" media="screen"/>',
        openTag: '<!-- start css template tags -->',
        closeTag: '<!-- end css template tags -->'
      },
      src: [
        'lib/css/**/*.css'
      ],
      dest: 'index.html'
    },
    buildScripts: {
      options: {
          scriptTemplate: '<script type="text/javascript" src="{{ path }}"></script>',
          openTag: '<!-- start script template tags -->',
          closeTag: '<!-- end script template tags -->'
      },
      src: [
          'lib/js/jquery/jquery.min.js',
          'lib/js/**/*.min.js'
      ],
      dest: 'index.html'
    }
	},
	express: {
		all: {
			options: {
				port: 3000,
				hostname: 'localhost',
				bases: ['.'],
				livereload: true
			}
		}
	}
});

	grunt.registerTask('style',['sass_globbing','sass','autoprefixer']);

	grunt.registerTask('default',['bower','tags','style']);

	grunt.registerTask('server',['express','bower','tags','watch']);

};