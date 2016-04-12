module.exports = function(grunt){

require('load-grunt-tasks')(grunt);

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
        useSingleQuotes: true,
        signature: '// Hello, World!'
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
			files: ['bower_components/*/**'],
			tasks: ['bower','tags']
		},
	},

	// end of watch grunt

	// bower: installing bower components and copy the min files only
  bower: {
	  install: {
      options: {
        targetDir: './assets/library',
        layout: 'byComponent',
        install: true,
        verbose: false,
        cleanTargetDir: false,
        cleanBowerDir: false,
        bowerOptions: {}
      }
    }
	},

	// And dynamic script and links
	tags: {
		buildLinks: {
      options: {
        linkTemplate: '<link rel="stylesheet" type="text/css" href="{{ path }}" media="screen"/>',
        openTag: '<!-- start css template tags -->',
        closeTag: '<!-- end css template tags -->'
      },
      src: [
        'assets/library/**/*.min.css',
        'assets/build/**/*.css'
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
          'assets/library/**/jquery.min.js',
          'assets/library/**/*.min.js'
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

require('time-grunt')(grunt);


	grunt.registerTask('style',['sass_globbing','sass','autoprefixer']);

	grunt.registerTask('default',['bower','tags','style']);

	grunt.registerTask('server',['express','default','watch']);

};