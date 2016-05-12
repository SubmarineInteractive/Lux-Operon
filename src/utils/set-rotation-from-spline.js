import clamp from 'utils/clamp';

let axis = new THREE.Vector3();

export default function setRotationFromSpline( object, path, value, rotationOrientation ) {
  const tangent = path.getTangent( clamp( 0, 1, value ) );
  axis.crossVectors( rotationOrientation, tangent ).normalize();
  const radians = Math.acos( rotationOrientation.dot( tangent ) );
  object.quaternion.setFromAxisAngle( axis, radians );
}