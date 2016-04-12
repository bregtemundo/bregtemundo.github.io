var scene, camera, renderer;

var WIDTH  = window.innerWidth;
var HEIGHT = window.innerHeight;

var SPEED = 0.01;
var ground, cubeCamera, cubeTarget;
function init() {
    scene = new THREE.Scene();

    

    initScene();
    initMesh();
    initEnv();
    initCamera();
    initLights();
    initRenderer();
    //initControls();

    document.body.appendChild(renderer.domElement);

    //window.addEventListener('resize', changeMaterial, false);
}

function initEnv(){
    // // CUBE CAMERA
    // cubeCamera = new THREE.CubeCamera( 1, 100000, 128 );
    // scene.add( cubeCamera );
    // // MATERIALS
    // cubeTarget = cubeCamera.renderTarget;

    // cubeTarget = THREE.ImageUtils.loadTexture( "textures/metal.jpg" );
    // cubeTarget.mapping = THREE.SphericalReflectionMapping;

    cubeTarget = THREE.ImageUtils.loadTexture( "textures/environment.jpg" );
    cubeTarget.mapping = THREE.EquirectangularReflectionMapping;
    cubeTarget.magFilter = THREE.LinearFilter;
    cubeTarget.minFilter = THREE.LinearMipMapLinearFilter;

    cubeTarget.wrapS = THREE.RepeatWrapping;
    cubeTarget.wrapT = THREE.RepeatWrapping;
    cubeTarget.repeat.set(14,14);

}

function initScene(){
    scene.fog = new THREE.Fog( 0xeeeeee, 1, 150 );
    //scene.fog.color.setHSL( 0.6, 0, 1 );

    // GROUND

    var groundGeo = new THREE.PlaneBufferGeometry( 1000, 400 );
    var groundMat = new THREE.MeshBasicMaterial( { color: 0xffffffff} );
    //groundMat.color.setHSL( 0.095, 1, 0.75 );

    ground = new THREE.Mesh( groundGeo, groundMat );
    ground.name = "ground";
    ground.rotation.x = -Math.PI/2;
    ground.position.y = -0.005;
    scene.add( ground );

    //ground.receiveShadow = true;

    // SKYDOME
/*
    var vertexShader = document.getElementById( 'vertexShader' ).textContent;
    var fragmentShader = document.getElementById( 'fragmentShader' ).textContent;
    var uniforms = {
        topColor:    { type: "c", value: new THREE.Color( 0x0077ff ) },
        bottomColor: { type: "c", value: new THREE.Color( 0xffffff ) },
        offset:      { type: "f", value: 33 },
        exponent:    { type: "f", value: 0.6 }
    };
    uniforms.topColor.value.copy( hemiLight.color );

    scene.fog.color.copy( uniforms.bottomColor.value );

    var skyGeo = new THREE.SphereGeometry( 4000, 32, 15 );
    var skyMat = new THREE.ShaderMaterial( { vertexShader: vertexShader, fragmentShader: fragmentShader, uniforms: uniforms, side: THREE.BackSide } );

    var sky = new THREE.Mesh( skyGeo, skyMat );
    scene.add( sky );
    */
}

function initCamera() {
    
   camera = new THREE.PerspectiveCamera(15.3, window.innerWidth / window.innerHeight, 1,  1000);   
         camera.position.x = 0;
         camera.position.y = 4.1;
         camera.position.z = -7.3;
         //camera.up = new THREE.Vector3(0, 0, 1);
         var target = new THREE.Vector3(0.000, 0.000, -1);
         //camera.up = new THREE.Vector3( 0, 0, 1 );
         camera.lookAt(target);


}


function initRenderer() {
    renderer = new THREE.WebGLRenderer({ antialias: true });
    renderer.setSize(WIDTH, HEIGHT);
    renderer.setClearColor(0xffffff, 1);
    renderer.gammaInput = true;
    renderer.gammaOutput = true;

    
}

function initControls(){
    controls = new THREE.OrbitControls( camera, renderer.domElement );
    //controls.addEventListener( 'change', render ); // add this only if there is no animation loop (requestAnimationFrame)
    controls.enableDamping = true;
    controls.dampingFactor = 0.25;

    // How far you can orbit vertically, upper and lower limits.
    // Range is 0 to Math.PI radians.
    controls.minPolarAngle = 40 * 0.0174532925; // radians
    controls.maxPolarAngle = 85 * 0.0174532925; // radians

    /*
    // How far you can orbit horizontally, upper and lower limits.
    // If set, must be a sub-interval of the interval [ - Math.PI, Math.PI ].
    controls.minAzimuthAngle = 90 * 0.0174532925; // radians
    controls.maxAzimuthAngle = 250 * 0.0174532925; // radians
    */
}

function initLights() {
    //spotlights
    light = new THREE.PointLight(0x999999);
     light.position.set(117.255, -156.340, 234.510);
     scene.add(light);
     light = new THREE.PointLight(0x4C4C4C);
     light.position.set(-156.340, -156.340, 117.255);
     scene.add(light);
     light = new THREE.PointLight(0x4C4C4C);
     light.position.set(0.000, 156.340, 156.340);
     scene.add(light);

    // LIGHTS

    hemiLight = new THREE.HemisphereLight( 0xffffff, 0xffffff, 0.6 );
    hemiLight.color.setHSL( 0.6, 1, 0.6 );
    hemiLight.groundColor.setHSL( 0.095, 1, 0.75 );
    hemiLight.position.set( 0, 500, 0 );
    scene.add( hemiLight );

    //

    dirLight = new THREE.DirectionalLight( 0xCFF6FB, 1 );
    //dirLight.color.setHSL( 0.1, 1, 0.95 );
    dirLight.position.set( -11, 30, 4 );
    dirLight.position.multiplyScalar( 20 );
    //scene.add( dirLight );
/*
    dirLight.castShadow = true;

    dirLight.shadowMapWidth = 2048;
    dirLight.shadowMapHeight = 2048;

    var d = 50;

    dirLight.shadowCameraLeft = -d;
    dirLight.shadowCameraRight = d;
    dirLight.shadowCameraTop = d;
    dirLight.shadowCameraBottom = -d;

    dirLight.shadowCameraFar = 3500;
    dirLight.shadowBias = -0.0001;
    //dirLight.shadowCameraVisible = true;*/
}

var mesh = null;
function initMeshSingle() {
    var loader = new THREE.JSONLoader();
    loader.load('./models/sofa.json', function(geometry, materials) {
        mesh = new THREE.Mesh(geometry, new THREE.MeshFaceMaterial(materials));
        mesh.scale.x = mesh.scale.y = mesh.scale.z = 0.015;
        mesh.translation = THREE.GeometryUtils.center(geometry);
        scene.add(mesh);
    });
}

function initMesh() {

    

    //return;
   

    var loader = new THREE.ObjectLoader();
    
    loader.load('./models/sofa.json', function(object) {
        //console.log(object);
        //scene.add(object);
        // var meshes = object.children;
        // for (var t = 0; t<meshes.length; t++){ 
        //     scene.add(meshes[t]);
        // }
        //scene.add(object)
        var meshes = new Array();
        object.traverse(function(child){            
            if(child instanceof THREE.Mesh) {
                console.log(child.name);
                //child.rotation.set(0, 45, 0);
                meshes.push(child); 
                if(child.name == 'floor'){
                    // !!!!! lightmap and aoMap need a second pair of uvs
                    child.geometry.faceVertexUvs[ 1 ] = child.geometry.faceVertexUvs[ 0 ];

                    var lm = THREE.ImageUtils.loadTexture('textures/floor_l.png');                    
                    var aom = THREE.ImageUtils.loadTexture('textures/floor_ao.png');                    
                    var mat = new THREE.MeshPhongMaterial(
                    {
                      color: 0xffffff,
                      lightMap: lm,
                      aoMap: aom,                      
                    });                    

                    child.material = mat;                   
        
                }                
                else if(child.name == 'kussens' || child.name == 'riet' || child.name == 'onderstel'){                    
                    // !!!!! lightmap and aoMap need a second pair of uvs
                    child.geometry.faceVertexUvs[ 1 ] = child.geometry.faceVertexUvs[ 0 ];

                    var mat = getMaterial( child.name.toLowerCase() );
                                        
                    child.material = mat;
                    child.material.needsUpdate = true;

                    //child2 = new THREE.Mesh(child.geometry, mat);
                    //scene.add(child2);
                }                                                       
            }
            if(child instanceof THREE.PerspectiveCamera) {
                if(child.name != 'Camera') {
                    camera = child;
                    //camera.fov = 2 * Math.atan( Math.tan( camera.fov / 2 ) * camera.aspect );                   
                }
            }
            console.log(child);
        });

        for (var t = 0; t<meshes.length; t++){ 
            mesh = meshes[t];
            //mesh.scale.x = mesh.scale.y = mesh.scale.z = 0.0009;
            scene.add(mesh);
        }
        

      


        initControls();
        render();
    });
}

get_random = function (list) {
  return list[Math.floor((Math.random()*list.length))];
} 



//find a random material for specific element
function getMaterial(part){
  // part lightmap and ambient occlusion
  var lm = THREE.ImageUtils.loadTexture('textures/' + part + '_l.png');                    
  var aom = THREE.ImageUtils.loadTexture('textures/' + part + '_ao.png');

  var map = null;
  var bump = null;
  var color = null;
  var bumpScale = 0;
  var reflectivity = 0;
  var shininess = 0;

  // part specifics
  if(part=="kussens") {
    var mats = [
    {
      map: 'textures/fabric/029_070_diffuse_1.jpg',
      bump: 'textures/fabric/029_070_bump.jpg'
    },
    {
      map: 'textures/fabric/1/diffuse.jpg',
      bump: 'textures/fabric/1/bump.jpg'
    },
    {
      map: 'textures/fabric/2/diffuse.jpg',
      bump: 'textures/fabric/2/bump.jpg'
    },
    {
      map: 'textures/fabric/3/diffuse.jpg',
      bump: 'textures/fabric/3/bump.jpg'
    }
    ];
    var fabric = get_random(mats);
    map = THREE.ImageUtils.loadTexture(fabric.map);
    bump = THREE.ImageUtils.loadTexture(fabric.bump);
    map.wrapS =   bump.wrapS = THREE.RepeatWrapping;
    map.wrapT =   bump.wrapT = THREE.RepeatWrapping;
    map.repeat.set( 6, 6 );
    bump.repeat.set( 6, 6 );
    bumpScale = 0.002;

    reflectivity = 0.1
    shininess = 5;
  }
  else if(part=="riet"){
    var mats = ['textures/wenge2.jpg', 'textures/linen.jpg']
    map = THREE.ImageUtils.loadTexture( get_random(mats) );
    map.wrapS = THREE.RepeatWrapping;
    map.wrapT = THREE.RepeatWrapping;
    map.repeat.set( 10, 10 );    
  }
  else if(part == "onderstel") {
    var colors = [0x222222, 0xffffff];
    color = get_random( colors );

    bump = THREE.ImageUtils.loadTexture('textures/noise.jpg');
    bump.wrapS =  THREE.RepeatWrapping;
    bump.wrapT = THREE.RepeatWrapping;
    bump.repeat.set( 26, 26 );

    bumpScale= 0.0006;
    reflectivity= 0.3;    
    shininess= 30;
  }
  

  var mat = new THREE.MeshPhongMaterial(
    {
      color: color,
      lightMap: lm,
      aoMap: aom,
      map: map,
      bumpMap: bump,
      bumpScale: bumpScale,
      //aoMapIntensity : 1.2,
      //lightMapIntensity : 2.75,
      //side: THREE.SingleSide,
      blending : "MultiplyBlending",

      envMap: cubeTarget,
      reflectivity: reflectivity,

      shininess: shininess
    });  
  
  return mat;
}


function rotateMesh() {
    if (!mesh) {
        return;
    }

    mesh.rotation.x -= SPEED * 2;
    mesh.rotation.y -= SPEED;
    mesh.rotation.z -= SPEED * 3;
}

function render() {
    requestAnimationFrame(render);
    //rotateMesh();
    renderer.render(scene, camera);

    //cubeCamera.updateCubeMap( renderer, scene );
}

document.getElementById('random').onclick = function (e) {
  changeMaterial();
}

function changeMaterial() {
         
         var objsToRemove = scene.children;
         for (var t = 0; t<objsToRemove.length; t++){    
            console.log(objsToRemove.length);        
             if (objsToRemove[t] instanceof THREE.Mesh) {                
               if (objsToRemove[t].name != "floor" && objsToRemove[t].name != "ground") {
                var mat = getMaterial(objsToRemove[t].name.toLowerCase());
                objsToRemove[t].material = mat;               
                objsToRemove[t].material.needsUpdate = true;                
                 
               }
             }
         }
      }

init();

