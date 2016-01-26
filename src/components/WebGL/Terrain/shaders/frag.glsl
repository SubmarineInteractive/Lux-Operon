/**
 * @author alteredq / http://alteredqualia.com/
 */
uniform vec3 diffuse;
uniform vec3 specular;
uniform float shininess;
uniform float opacity;
uniform bool enableDiffuse1;
uniform bool enableDiffuse2;
uniform bool enableSpecular;
uniform sampler2D tDiffuse1;
uniform sampler2D tDiffuse2;
uniform sampler2D tDetail;
uniform sampler2D tNormal;
uniform sampler2D tSpecular;
uniform sampler2D tDisplacement;
uniform float uNormalScale;
uniform vec2 uRepeatOverlay;
uniform vec2 uRepeatBase;
uniform vec2 uOffset;
varying vec3 vTangent;
varying vec3 vBinormal;
varying vec3 vNormal;
varying vec2 vUv;
uniform vec3 ambientLightColor;
#if MAX_DIR_LIGHTS > 0
  uniform vec3 directionalLightColor[ MAX_DIR_LIGHTS ];
  uniform vec3 directionalLightDirection[ MAX_DIR_LIGHTS ];
#endif
#if MAX_HEMI_LIGHTS > 0
  uniform vec3 hemisphereLightSkyColor[ MAX_HEMI_LIGHTS ];
  uniform vec3 hemisphereLightGroundColor[ MAX_HEMI_LIGHTS ];
  uniform vec3 hemisphereLightDirection[ MAX_HEMI_LIGHTS ];
#endif
#if MAX_POINT_LIGHTS > 0
  uniform vec3 pointLightColor[ MAX_POINT_LIGHTS ];
  uniform vec3 pointLightPosition[ MAX_POINT_LIGHTS ];
  uniform float pointLightDistance[ MAX_POINT_LIGHTS ];
  uniform float pointLightDecay[ MAX_POINT_LIGHTS ];
#endif
varying vec3 vViewPosition;

#define PI 3.14159
#define PI2 6.28318
#define RECIPROCAL_PI2 0.15915494
#define LOG2 1.442695
#define EPSILON 1e-6

#define saturate(a) clamp( a, 0.0, 1.0 )
#define whiteCompliment(a) ( 1.0 - saturate( a ) )

vec3 transformDirection( in vec3 normal, in mat4 matrix ) {

	return normalize( ( matrix * vec4( normal, 0.0 ) ).xyz );
}

vec3 inverseTransformDirection( in vec3 normal, in mat4 matrix ) {

	return normalize( ( vec4( normal, 0.0 ) * matrix ).xyz );
}

vec3 projectOnPlane(in vec3 point, in vec3 pointOnPlane, in vec3 planeNormal ) {

	float distance = dot( planeNormal, point - pointOnPlane );
	return - distance * planeNormal + point;
}

float sideOfPlane( in vec3 point, in vec3 pointOnPlane, in vec3 planeNormal ) {

	return sign( dot( point - pointOnPlane, planeNormal ) );
}

vec3 linePlaneIntersect( in vec3 pointOnLine, in vec3 lineDirection, in vec3 pointOnPlane, in vec3 planeNormal ) {

	return lineDirection * ( dot( planeNormal, pointOnPlane - pointOnLine ) / dot( planeNormal, lineDirection ) ) + pointOnLine;
}

float calcLightAttenuation( float lightDistance, float cutoffDistance, float decayExponent ) {

	if ( decayExponent > 0.0 ) {
	  return pow( saturate( -lightDistance / cutoffDistance + 1.0 ), decayExponent );
	}
	return 1.0;
}

vec3 F_Schlick( in vec3 specularColor, in float dotLH ) {

	float fresnel = exp2( ( -5.55437 * dotLH - 6.98316 ) * dotLH );
	return ( 1.0 - specularColor ) * fresnel + specularColor;
}

float G_BlinnPhong_Implicit( /* in float dotNL, in float dotNV */ ) {

	return 0.25;
}

float D_BlinnPhong( in float shininess, in float dotNH ) {

	return ( shininess * 0.5 + 1.0 ) * pow( dotNH, shininess );
}

vec3 BRDF_BlinnPhong( in vec3 specularColor, in float shininess, in vec3 normal, in vec3 lightDir, in vec3 viewDir ) {

	vec3 halfDir = normalize( lightDir + viewDir );
	float dotNH = saturate( dot( normal, halfDir ) );
	float dotLH = saturate( dot( lightDir, halfDir ) );

	vec3 F = F_Schlick( specularColor, dotLH );
	float G = G_BlinnPhong_Implicit( /* dotNL, dotNV */ );
	float D = D_BlinnPhong( shininess, dotNH );

	return F * G * D;
}

vec3 inputToLinear( in vec3 a ) {

	#ifdef GAMMA_INPUT
		return pow( a, vec3( float( GAMMA_FACTOR ) ) );
	#else
		return a;
	#endif
}

vec3 linearToOutput( in vec3 a ) {

	#ifdef GAMMA_OUTPUT
		return pow( a, vec3( 1.0 / float( GAMMA_FACTOR ) ) );
	#else
		return a;
	#endif
}

#ifdef USE_SHADOWMAP

	uniform sampler2D shadowMap[ MAX_SHADOWS ];
	uniform vec2 shadowMapSize[ MAX_SHADOWS ];
	uniform float shadowDarkness[ MAX_SHADOWS ];
	uniform float shadowBias[ MAX_SHADOWS ];

	varying vec4 vShadowCoord[ MAX_SHADOWS ];

	float unpackDepth( const in vec4 rgba_depth ) {

		const vec4 bit_shift = vec4( 1.0 / ( 256.0 * 256.0 * 256.0 ), 1.0 / ( 256.0 * 256.0 ), 1.0 / 256.0, 1.0 );
		float depth = dot( rgba_depth, bit_shift );
		return depth;
	}

	#if defined(POINT_LIGHT_SHADOWS)

		void adjustShadowValue1K( const float testDepth, const vec4 textureData, const float bias, inout float shadowValue ) {

			const vec4 bitSh = vec4( 1.0 / ( 256.0 * 256.0 * 256.0 ), 1.0 / ( 256.0 * 256.0 ), 1.0 / 256.0, 1.0 );
			if ( testDepth >= dot( textureData, bitSh ) * 1000.0 + bias )
				shadowValue += 1.0;
		}

    vec2 cubeToUV( vec3 v, float texelSizeY ) {

      vec3 absV = abs( v );

  		float scaleToCube = 1.0 / max( absV.x, max( absV.y, absV.z ) );
  		absV *= scaleToCube;

  		v *= scaleToCube * ( 1.0 - 2.0 * texelSizeY );

      vec2 planar = v.xy;

			float almostATexel = 1.5 * texelSizeY;
			float almostOne = 1.0 - almostATexel;

			if ( absV.z >= almostOne ) {

				if ( v.z > 0.0 )
					planar.x = 4.0 - v.x;

			} else if ( absV.x >= almostOne ) {

				float signX = sign( v.x );
				planar.x = v.z * signX + 2.0 * signX;

			} else if ( absV.y >= almostOne ) {

				float signY = sign( v.y );
				planar.x = v.x + 2.0 * signY + 2.0;
				planar.y = v.z * signY - 2.0;

			}

			return vec2( 0.125, 0.25 ) * planar + vec2( 0.375, 0.75 );
		}

	#endif
#endif

#ifdef USE_FOG

	uniform vec3 fogColor;

	#ifdef FOG_EXP2
		uniform float fogDensity;
	#else
		uniform float fogNear;
		uniform float fogFar;
	#endif

#endif

void main() {

  vec3 outgoingLight = vec3( 0.0 );
  vec4 diffuseColor = vec4( diffuse, opacity );
  vec3 specularTex = vec3( 1.0 );
  vec2 uvOverlay = uRepeatOverlay * vUv + uOffset;
  vec2 uvBase = uRepeatBase * vUv;
  vec3 normalTex = texture2D( tDetail, uvOverlay ).xyz * 2.0 - 1.0;

  normalTex.xy *= uNormalScale;
  normalTex = normalize( normalTex );

  if( enableDiffuse1 && enableDiffuse2 ) {
    vec4 colDiffuse1 = texture2D( tDiffuse1, uvOverlay );
    vec4 colDiffuse2 = texture2D( tDiffuse2, uvOverlay );
    colDiffuse1.xyz = inputToLinear( colDiffuse1.xyz );
    colDiffuse2.xyz = inputToLinear( colDiffuse2.xyz );
    diffuseColor *= mix ( colDiffuse1, colDiffuse2, 1.0 - texture2D( tDisplacement, uvBase ) );
  } else if( enableDiffuse1 ) {
    diffuseColor *= texture2D( tDiffuse1, uvOverlay );
  } else if( enableDiffuse2 ) {
    diffuseColor *= texture2D( tDiffuse2, uvOverlay );
  }

  if( enableSpecular )
    specularTex = texture2D( tSpecular, uvOverlay ).xyz;

  mat3 tsb = mat3( vTangent, vBinormal, vNormal );
  vec3 finalNormal = tsb * normalTex;
  vec3 normal = normalize( finalNormal );
  vec3 viewPosition = normalize( vViewPosition );
  vec3 totalDiffuseLight = vec3( 0.0 );
  vec3 totalSpecularLight = vec3( 0.0 );

  #if MAX_POINT_LIGHTS > 0
    for ( int i = 0; i < MAX_POINT_LIGHTS; i ++ ) {

      vec3 lVector = pointLightPosition[ i ] + vViewPosition.xyz;
      float attenuation = calcLightAttenuation( length( lVector ), pointLightDistance[ i ], pointLightDecay[i] );
      lVector = normalize( lVector );
      vec3 pointHalfVector = normalize( lVector + viewPosition );
      float pointDotNormalHalf = max( dot( normal, pointHalfVector ), 0.0 );
      float pointDiffuseWeight = max( dot( normal, lVector ), 0.0 );
      float pointSpecularWeight = specularTex.r * max( pow( pointDotNormalHalf, shininess ), 0.0 );

      totalDiffuseLight += attenuation * pointLightColor[ i ] * pointDiffuseWeight;
      totalSpecularLight += attenuation * pointLightColor[ i ] * specular * pointSpecularWeight * pointDiffuseWeight;
    }
  #endif

  #if MAX_DIR_LIGHTS > 0
    vec3 dirDiffuse = vec3( 0.0 );
    vec3 dirSpecular = vec3( 0.0 );

    for( int i = 0; i < MAX_DIR_LIGHTS; i++ ) {

      vec3 dirVector = directionalLightDirection[ i ];
      vec3 dirHalfVector = normalize( dirVector + viewPosition );
      float dirDotNormalHalf = max( dot( normal, dirHalfVector ), 0.0 );
      float dirDiffuseWeight = max( dot( normal, dirVector ), 0.0 );
      float dirSpecularWeight = specularTex.r * max( pow( dirDotNormalHalf, shininess ), 0.0 );
      totalDiffuseLight += directionalLightColor[ i ] * dirDiffuseWeight;
      totalSpecularLight += directionalLightColor[ i ] * specular * dirSpecularWeight * dirDiffuseWeight;
    }
  #endif

  #if MAX_HEMI_LIGHTS > 0
    vec3 hemiDiffuse  = vec3( 0.0 );
    vec3 hemiSpecular = vec3( 0.0 );

    for( int i = 0; i < MAX_HEMI_LIGHTS; i ++ ) {

      vec3 lVector = hemisphereLightDirection[ i ];
      float dotProduct = dot( normal, lVector );
      float hemiDiffuseWeight = 0.5 * dotProduct + 0.5;
      totalDiffuseLight += mix( hemisphereLightGroundColor[ i ], hemisphereLightSkyColor[ i ], hemiDiffuseWeight );
      float hemiSpecularWeight = 0.0;
      vec3 hemiHalfVectorSky = normalize( lVector + viewPosition );
      float hemiDotNormalHalfSky = 0.5 * dot( normal, hemiHalfVectorSky ) + 0.5;
      hemiSpecularWeight += specularTex.r * max( pow( hemiDotNormalHalfSky, shininess ), 0.0 );
      vec3 lVectorGround = -lVector;
      vec3 hemiHalfVectorGround = normalize( lVectorGround + viewPosition );
      float hemiDotNormalHalfGround = 0.5 * dot( normal, hemiHalfVectorGround ) + 0.5;
      hemiSpecularWeight += specularTex.r * max( pow( hemiDotNormalHalfGround, shininess ), 0.0 );
      totalSpecularLight += specular * mix( hemisphereLightGroundColor[ i ], hemisphereLightSkyColor[ i ], hemiDiffuseWeight ) * hemiSpecularWeight * hemiDiffuseWeight;
    }
  #endif

  outgoingLight += diffuseColor.xyz * ( totalDiffuseLight + ambientLightColor + totalSpecularLight );
  #ifdef USE_SHADOWMAP
  	for ( int i = 0; i < MAX_SHADOWS; i ++ ) {

  		float texelSizeY =  1.0 / shadowMapSize[ i ].y;
  		float shadow = 0.0;

  #if defined( POINT_LIGHT_SHADOWS )

  		bool isPointLight = shadowDarkness[ i ] < 0.0;

  		if ( isPointLight ) {

  			float realShadowDarkness = abs( shadowDarkness[ i ] );
  			vec3 lightToPosition = vShadowCoord[ i ].xyz;

  	#if defined( SHADOWMAP_TYPE_PCF ) || defined( SHADOWMAP_TYPE_PCF_SOFT )

  			vec3 bd3D = normalize( lightToPosition );
  			float dp = length( lightToPosition );

  			adjustShadowValue1K( dp, texture2D( shadowMap[ i ], cubeToUV( bd3D, texelSizeY ) ), shadowBias[ i ], shadow );

  	#if defined( SHADOWMAP_TYPE_PCF )
  			const float Dr = 1.25;
  	#elif defined( SHADOWMAP_TYPE_PCF_SOFT )
  			const float Dr = 2.25;
  	#endif

  			float os = Dr *  2.0 * texelSizeY;

  			const vec3 Gsd = vec3( - 1, 0, 1 );

  			adjustShadowValue1K( dp, texture2D( shadowMap[ i ], cubeToUV( bd3D + Gsd.zzz * os, texelSizeY ) ), shadowBias[ i ], shadow );
  			adjustShadowValue1K( dp, texture2D( shadowMap[ i ], cubeToUV( bd3D + Gsd.zxz * os, texelSizeY ) ), shadowBias[ i ], shadow );
  			adjustShadowValue1K( dp, texture2D( shadowMap[ i ], cubeToUV( bd3D + Gsd.xxz * os, texelSizeY ) ), shadowBias[ i ], shadow );
  			adjustShadowValue1K( dp, texture2D( shadowMap[ i ], cubeToUV( bd3D + Gsd.xzz * os, texelSizeY ) ), shadowBias[ i ], shadow );
  			adjustShadowValue1K( dp, texture2D( shadowMap[ i ], cubeToUV( bd3D + Gsd.zzx * os, texelSizeY ) ), shadowBias[ i ], shadow );
  			adjustShadowValue1K( dp, texture2D( shadowMap[ i ], cubeToUV( bd3D + Gsd.zxx * os, texelSizeY ) ), shadowBias[ i ], shadow );
  			adjustShadowValue1K( dp, texture2D( shadowMap[ i ], cubeToUV( bd3D + Gsd.xxx * os, texelSizeY ) ), shadowBias[ i ], shadow );
  			adjustShadowValue1K( dp, texture2D( shadowMap[ i ], cubeToUV( bd3D + Gsd.xzx * os, texelSizeY ) ), shadowBias[ i ], shadow );
  			adjustShadowValue1K( dp, texture2D( shadowMap[ i ], cubeToUV( bd3D + Gsd.zzy * os, texelSizeY ) ), shadowBias[ i ], shadow );
  			adjustShadowValue1K( dp, texture2D( shadowMap[ i ], cubeToUV( bd3D + Gsd.zxy * os, texelSizeY ) ), shadowBias[ i ], shadow );

  			adjustShadowValue1K( dp, texture2D( shadowMap[ i ], cubeToUV( bd3D + Gsd.xxy * os, texelSizeY ) ), shadowBias[ i ], shadow );
  			adjustShadowValue1K( dp, texture2D( shadowMap[ i ], cubeToUV( bd3D + Gsd.xzy * os, texelSizeY ) ), shadowBias[ i ], shadow );
  			adjustShadowValue1K( dp, texture2D( shadowMap[ i ], cubeToUV( bd3D + Gsd.zyz * os, texelSizeY ) ), shadowBias[ i ], shadow );
  			adjustShadowValue1K( dp, texture2D( shadowMap[ i ], cubeToUV( bd3D + Gsd.xyz * os, texelSizeY ) ), shadowBias[ i ], shadow );
  			adjustShadowValue1K( dp, texture2D( shadowMap[ i ], cubeToUV( bd3D + Gsd.zyx * os, texelSizeY ) ), shadowBias[ i ], shadow );
  			adjustShadowValue1K( dp, texture2D( shadowMap[ i ], cubeToUV( bd3D + Gsd.xyx * os, texelSizeY ) ), shadowBias[ i ], shadow );
  			adjustShadowValue1K( dp, texture2D( shadowMap[ i ], cubeToUV( bd3D + Gsd.yzz * os, texelSizeY ) ), shadowBias[ i ], shadow );
  			adjustShadowValue1K( dp, texture2D( shadowMap[ i ], cubeToUV( bd3D + Gsd.yxz * os, texelSizeY ) ), shadowBias[ i ], shadow );
  			adjustShadowValue1K( dp, texture2D( shadowMap[ i ], cubeToUV( bd3D + Gsd.yxx * os, texelSizeY ) ), shadowBias[ i ], shadow );
  			adjustShadowValue1K( dp, texture2D( shadowMap[ i ], cubeToUV( bd3D + Gsd.yzx * os, texelSizeY ) ), shadowBias[ i ], shadow );

  			shadow *= realShadowDarkness * ( 1.0 / 21.0 );

  	#else
  			vec3 bd3D = normalize( lightToPosition );
  			float dp = length( lightToPosition );

  			adjustShadowValue1K( dp, texture2D( shadowMap[ i ], cubeToUV( bd3D, texelSizeY ) ), shadowBias[ i ], shadow );

  			shadow *= realShadowDarkness;

  	#endif

  		} else {

  #endif
  			float texelSizeX =  1.0 / shadowMapSize[ i ].x;
  			vec3 shadowCoord = vShadowCoord[ i ].xyz / vShadowCoord[ i ].w;
  			bvec4 inFrustumVec = bvec4 ( shadowCoord.x >= 0.0, shadowCoord.x <= 1.0, shadowCoord.y >= 0.0, shadowCoord.y <= 1.0 );
  			bool inFrustum = all( inFrustumVec );
  			bvec2 frustumTestVec = bvec2( inFrustum, shadowCoord.z <= 1.0 );
  			bool frustumTest = all( frustumTestVec );

  			if ( frustumTest ) {

  	#if defined( SHADOWMAP_TYPE_PCF )

  				shadowCoord.z += shadowBias[ i ];

  				const float ShadowDelta = 1.0 / 9.0;

  				float xPixelOffset = texelSizeX;
  				float yPixelOffset = texelSizeY;

  				float dx0 = - 1.25 * xPixelOffset;
  				float dy0 = - 1.25 * yPixelOffset;
  				float dx1 = 1.25 * xPixelOffset;
  				float dy1 = 1.25 * yPixelOffset;

  				float fDepth = unpackDepth( texture2D( shadowMap[ i ], shadowCoord.xy + vec2( dx0, dy0 ) ) );
  				if ( fDepth < shadowCoord.z ) shadow += ShadowDelta;

  				fDepth = unpackDepth( texture2D( shadowMap[ i ], shadowCoord.xy + vec2( 0.0, dy0 ) ) );
  				if ( fDepth < shadowCoord.z ) shadow += ShadowDelta;

  				fDepth = unpackDepth( texture2D( shadowMap[ i ], shadowCoord.xy + vec2( dx1, dy0 ) ) );
  				if ( fDepth < shadowCoord.z ) shadow += ShadowDelta;

  				fDepth = unpackDepth( texture2D( shadowMap[ i ], shadowCoord.xy + vec2( dx0, 0.0 ) ) );
  				if ( fDepth < shadowCoord.z ) shadow += ShadowDelta;

  				fDepth = unpackDepth( texture2D( shadowMap[ i ], shadowCoord.xy ) );
  				if ( fDepth < shadowCoord.z ) shadow += ShadowDelta;

  				fDepth = unpackDepth( texture2D( shadowMap[ i ], shadowCoord.xy + vec2( dx1, 0.0 ) ) );
  				if ( fDepth < shadowCoord.z ) shadow += ShadowDelta;

  				fDepth = unpackDepth( texture2D( shadowMap[ i ], shadowCoord.xy + vec2( dx0, dy1 ) ) );
  				if ( fDepth < shadowCoord.z ) shadow += ShadowDelta;

  				fDepth = unpackDepth( texture2D( shadowMap[ i ], shadowCoord.xy + vec2( 0.0, dy1 ) ) );
  				if ( fDepth < shadowCoord.z ) shadow += ShadowDelta;

  				fDepth = unpackDepth( texture2D( shadowMap[ i ], shadowCoord.xy + vec2( dx1, dy1 ) ) );
  				if ( fDepth < shadowCoord.z ) shadow += ShadowDelta;

  				shadow *= shadowDarkness[ i ];

  	#elif defined( SHADOWMAP_TYPE_PCF_SOFT )

  				shadowCoord.z += shadowBias[ i ];

  				float xPixelOffset = texelSizeX;
  				float yPixelOffset = texelSizeY;

  				float dx0 = - 1.0 * xPixelOffset;
  				float dy0 = - 1.0 * yPixelOffset;
  				float dx1 = 1.0 * xPixelOffset;
  				float dy1 = 1.0 * yPixelOffset;

  				mat3 shadowKernel;
  				mat3 depthKernel;

  				depthKernel[ 0 ][ 0 ] = unpackDepth( texture2D( shadowMap[ i ], shadowCoord.xy + vec2( dx0, dy0 ) ) );
  				depthKernel[ 0 ][ 1 ] = unpackDepth( texture2D( shadowMap[ i ], shadowCoord.xy + vec2( dx0, 0.0 ) ) );
  				depthKernel[ 0 ][ 2 ] = unpackDepth( texture2D( shadowMap[ i ], shadowCoord.xy + vec2( dx0, dy1 ) ) );
  				depthKernel[ 1 ][ 0 ] = unpackDepth( texture2D( shadowMap[ i ], shadowCoord.xy + vec2( 0.0, dy0 ) ) );
  				depthKernel[ 1 ][ 1 ] = unpackDepth( texture2D( shadowMap[ i ], shadowCoord.xy ) );
  				depthKernel[ 1 ][ 2 ] = unpackDepth( texture2D( shadowMap[ i ], shadowCoord.xy + vec2( 0.0, dy1 ) ) );
  				depthKernel[ 2 ][ 0 ] = unpackDepth( texture2D( shadowMap[ i ], shadowCoord.xy + vec2( dx1, dy0 ) ) );
  				depthKernel[ 2 ][ 1 ] = unpackDepth( texture2D( shadowMap[ i ], shadowCoord.xy + vec2( dx1, 0.0 ) ) );
  				depthKernel[ 2 ][ 2 ] = unpackDepth( texture2D( shadowMap[ i ], shadowCoord.xy + vec2( dx1, dy1 ) ) );

  				vec3 shadowZ = vec3( shadowCoord.z );
  				shadowKernel[ 0 ] = vec3( lessThan( depthKernel[ 0 ], shadowZ ) );
  				shadowKernel[ 0 ] *= vec3( 0.25 );

  				shadowKernel[ 1 ] = vec3( lessThan( depthKernel[ 1 ], shadowZ ) );
  				shadowKernel[ 1 ] *= vec3( 0.25 );

  				shadowKernel[ 2 ] = vec3( lessThan( depthKernel[ 2 ], shadowZ ) );
  				shadowKernel[ 2 ] *= vec3( 0.25 );

  				vec2 fractionalCoord = 1.0 - fract( shadowCoord.xy * shadowMapSize[ i ].xy );

  				shadowKernel[ 0 ] = mix( shadowKernel[ 1 ], shadowKernel[ 0 ], fractionalCoord.x );
  				shadowKernel[ 1 ] = mix( shadowKernel[ 2 ], shadowKernel[ 1 ], fractionalCoord.x );

  				vec4 shadowValues;
  				shadowValues.x = mix( shadowKernel[ 0 ][ 1 ], shadowKernel[ 0 ][ 0 ], fractionalCoord.y );
  				shadowValues.y = mix( shadowKernel[ 0 ][ 2 ], shadowKernel[ 0 ][ 1 ], fractionalCoord.y );
  				shadowValues.z = mix( shadowKernel[ 1 ][ 1 ], shadowKernel[ 1 ][ 0 ], fractionalCoord.y );
  				shadowValues.w = mix( shadowKernel[ 1 ][ 2 ], shadowKernel[ 1 ][ 1 ], fractionalCoord.y );

  				shadow = dot( shadowValues, vec4( 1.0 ) ) * shadowDarkness[ i ];
  	#else
  				shadowCoord.z += shadowBias[ i ];

  				vec4 rgbaDepth = texture2D( shadowMap[ i ], shadowCoord.xy );
  				float fDepth = unpackDepth( rgbaDepth );

  				if ( fDepth < shadowCoord.z )
  					shadow = shadowDarkness[ i ];
  	#endif

  			}

  #ifdef SHADOWMAP_DEBUG

  	if ( inFrustum ) {

  		if ( i == 0 ) {
  			outgoingLight *= vec3( 1.0, 0.5, 0.0 );
  		} else if ( i == 1 ) {
  			outgoingLight *= vec3( 0.0, 1.0, 0.8 );
  		} else {
  			outgoingLight *= vec3( 0.0, 0.5, 1.0 );
  		}
  	}

  #endif

  #if defined( POINT_LIGHT_SHADOWS )
  		}
  #endif
  		shadowMask = shadowMask * vec3( 1.0 - shadow );
  	}
  #endif

  	outgoingLight = linearToOutput( outgoingLight );

  #ifdef USE_FOG

  	#ifdef USE_LOGDEPTHBUF_EXT
  		float depth = gl_FragDepthEXT / gl_FragCoord.w;
  	#else
  		float depth = gl_FragCoord.z / gl_FragCoord.w;
  	#endif

  	#ifdef FOG_EXP2
  		float fogFactor = whiteCompliment( exp2( - fogDensity * fogDensity * depth * depth * LOG2 ) );
  	#else
  		float fogFactor = smoothstep( fogNear, fogFar, depth );
  	#endif

  	outgoingLight = mix( outgoingLight, fogColor, fogFactor );

  #endif

  gl_FragColor = vec4( outgoingLight, diffuseColor.a );
}