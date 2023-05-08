import * as Dat from 'dat.gui';
import { Scene, Color, ArrowHelper, Vector3, AxesHelper, TextureLoader, RepeatWrapping, ClampToEdgeWrapping, MirroredRepeatWrapping, CubeTextureLoader, Fog, MeshBasicMaterial } from 'three';
import { Flower, Land } from 'objects';
import { BasicLights } from 'lights';
import { SphereGeometry, MeshToonMaterial, Mesh, Euler } from 'three';
import Planet from '../objects/Planet/Planet';
import Asteroid from '../objects/Asteroid/Asteroid';

const SPHERE_RADIUS = 3;

function getFaceCentroid(geometry, face) {
    return geometry.vertices[face.a].clone()
            .add(geometry.vertices[face.b])
            .add(geometry.vertices[face.c])
            .divideScalar(3);
}

const ORIGIN_VECTOR = new Vector3(0, 0, 0);
const length = 1;
const hex = 0xffff00;
const UP_VECTOR = new Vector3(0, 1, 0);

class MainScene extends Scene {
    constructor() {
        // Call parent Scene() constructor
        super();

        // set the space-sphere bounding box
        const spaceTexture = new TextureLoader().load("src/components/textures/nebula.png");
        const backgroundSphere = new SphereGeometry(200, 40, 20);
        backgroundSphere.scale(-1, 1, 1);
        const backgroundMat = new MeshBasicMaterial({map: spaceTexture});
        const backgroundMesh = new Mesh(backgroundSphere, backgroundMat);
        this.add(backgroundMesh);

        // Add meshes to scene
        this.planet = new Planet();

        // old basic sphere planet
        // const geometry = new SphereGeometry(SPHERE_RADIUS);
        // const material = new MeshToonMaterial({ color: 0x00ff00});
        // this.planet = new Mesh(geometry, material);

        // X is red, Y is green, Z is blue
        this.planet.add(new AxesHelper(5));

        const lights = new BasicLights();
        this.add(lights, this.planet);

        // ASTEROID TESTING
        const asteroid = new Asteroid("Asteroid1");
        this.add(asteroid);
        asteroid.translateX(5);

    }

    plantFlower(pos, face) {
        const flower = new Flower(this.planet);
        flower.position.copy(pos);
        // inspired from https://stackoverflow.com/questions/9038465/three-js-object3d-cylinder-rotation-to-align-to-a-vector
        flower.quaternion.setFromUnitVectors(UP_VECTOR, face.normal);
        this.planet.add(flower);
    }

    getPlanet() {
        return this.planet;
    }

}

export default MainScene;
