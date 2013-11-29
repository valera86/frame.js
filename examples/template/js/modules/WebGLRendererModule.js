( function ( config ) {

	var dom = document.createElement( 'div' );
	dom.style.position = 'absolute';
	dom.style.width = '100%';
	dom.style.height = '100%';

	var renderer = new THREE.WebGLRenderer( { antialias: true } );
	renderer.setSize( config.width, config.height );
	renderer.autoClear = false;
	renderer.domElement.style.position = 'absolute';
	dom.appendChild( renderer.domElement );

	var onWindowResize = function () {

		var scale = Math.min( dom.offsetWidth / config.width, dom.offsetHeight / config.height );

		var width = config.width * scale;
		var height = config.height * scale;

		renderer.domElement.style.left = ( dom.offsetWidth - width ) / 2 + 'px';
		renderer.domElement.style.top = ( dom.offsetHeight - height ) / 2 + 'px';
		renderer.domElement.style.width = width + 'px';
		renderer.domElement.style.height = height + 'px';

	};

	config.renderer = renderer;

	//

	return new FRAME.Module( {

		parameters: {

			dom: new FRAME.ModuleParameter.DOM( 'DOM', null )

		},

		init: function ( parameters ) {

			if ( parameters.dom !== null ) {

				parameters.dom.appendChild( dom );
				parameters.dom = null; // TODO: Fix hack

				//

				window.addEventListener( 'resize', onWindowResize );

				onWindowResize();

			}

		}

	} );

} )